import clientPromise from '@/lib/mongodb';
import MapaContenedor from '@/components/MapaContenedor';

async function getFarmacias() {
  const client = await clientPromise;
  const db = client.db("campana_db");
  const farmacias = await db.collection("farmacias").find({}).toArray();
  // Limpieza de IDs para que Next.js no dé error
  return JSON.parse(JSON.stringify(farmacias));
}

export default async function Home() {
  const farmacias = await getFarmacias();

  return (
    <main style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* El mapa ahora ocupa todo el espacio */}
      <MapaContenedor farmacias={farmacias} />
    </main>
  );
}