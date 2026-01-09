import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import axios from 'axios';
import * as cheerio from 'cheerio';
import clientPromise from '../lib/mongodb';

// Función para normalizar nombres
const normalizarParaBusqueda = (nombre: string) => {
  return nombre
    .toUpperCase()
    .replace(/['´` ]/g, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
};

async function ejecutarScraper() {
  try {
    console.log("Iniciando scraper de CampanaNoticias...");
    
    // 1. Visitamos la web
    const { data } = await axios.get('https://m.campananoticias.com/farmacias');
    const $ = cheerio.load(data);
    
    const encontradosEnWeb: string[] = [];

    // 2. Usamos la clase ".ph-name" que encontraste vos
    $('.ph-name').each((i, el) => {
      const texto = $(el).text().trim();
      if (texto) {
        encontradosEnWeb.push(normalizarParaBusqueda(texto));
      }
    });

    console.log("Farmacias encontradas de turno:", encontradosEnWeb);

    if (encontradosEnWeb.length === 0) {
      console.log("⚠️ No se encontró nada con la clase .ph-name");
      process.exit(0);
    }

    const client = await clientPromise;
    const db = client.db("campana_db");
    const collection = db.collection("farmacias");

    // 3. Reset de turnos
    await collection.updateMany({}, { $set: { turno: false } });

    // 4. Actualizar farmacias de turno
    for (const apodo of encontradosEnWeb) {
      const resultado = await collection.updateOne(
        { nombre_busqueda: apodo },
        { $set: { turno: true } }
      );
      
      if (resultado.matchedCount > 0) {
        console.log(`✅ Marcada: ${apodo}`);
      } else {
        console.log(`❓ No encontrada en DB: ${apodo}`);
      }
    }

    console.log("--- Proceso completado ---");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

ejecutarScraper();