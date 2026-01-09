'use client'; // Esto lo convierte en Client Component

import dynamic from 'next/dynamic';

// Aquí es donde hacemos la carga dinámica segura
const MapaReal = dynamic(() => import('./Mapa'), { 
  ssr: false,
  loading: () => (
    <div style={{ height: '500px', background: '#f2f2f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      Cargando mapa de Campana...
    </div>
  )
});

export default function MapaContenedor({ farmacias }: { farmacias: any[] }) {
  return <MapaReal farmacias={farmacias} />;
}