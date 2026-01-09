import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import clientPromise from '../lib/mongodb';

async function prepararNombres() {
  try {
    const client = await clientPromise;
    const db = client.db("campana_db");
    const collection = db.collection("farmacias");

    const farmacias = await collection.find({}).toArray();

    for (const f of farmacias) {
      // Creamos el "apodo" sin espacios ni apóstrofes
      const nombreLimpio = f.nombre
        .toUpperCase()
        .replace(/['´` ]/g, "")
        .trim();

      await collection.updateOne(
        { _id: f._id },
        { $set: { nombre_busqueda: nombreLimpio } }
      );
      console.log(`Listo: ${f.nombre} -> ${nombreLimpio}`);
    }

    console.log("¡Base de datos preparada!");
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

prepararNombres();