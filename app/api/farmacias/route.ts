import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("campana_db");

    // Traemos todas las farmacias de la colección
    const farmacias = await db
      .collection("farmacias")
      .find({})
      .toArray();

    return NextResponse.json(farmacias);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error al conectar con la base de datos" }, { status: 500 });
  }
}