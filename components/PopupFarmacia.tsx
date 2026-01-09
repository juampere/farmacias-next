'use client';

interface Props {
  nombre: string;
  direccion: string;
  latitud: number;
  longitud: number;
  imagen_url?: string;
}

export default function PopupFarmacia({ f }: { f: Props }) {
  // URL oficial para Google Maps
  const urlMaps = `https://www.google.com/maps/dir/?api=1&destination=${f.latitud},${f.longitud}`;

  return (
    <div style={{ textAlign: 'center', minWidth: '160px' }}>
      
      {/* ESPACIO DE IMAGEN O ICONO */}
      {f.imagen_url && f.imagen_url.trim() !== "" ? (
        <img 
          src={f.imagen_url} 
          alt={f.nombre}
          referrerPolicy="no-referrer"
          style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '4px', marginBottom: '8px' }} 
        />
      ) : (
        /* ICONO GENÉRICO: Un recuadro verde suave con una cruz blanca */
        <div style={{ 
          width: '100%', 
          height: '110px', 
          backgroundColor: '#e8f5e9', 
          borderRadius: '4px', 
          marginBottom: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '40px',
          color: '#4caf50'
        }}>
          ✚
        </div>
      )}

      <div style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: '2px' }}>{f.nombre}</div>
      <div style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>{f.direccion}</div>
      
      <a 
        href={urlMaps}
        target="_blank" 
        rel="noopener noreferrer"
        style={{
          display: 'block', backgroundColor: '#4285F4', color: 'white',
          padding: '10px', borderRadius: '5px', textDecoration: 'none',
          fontWeight: 'bold', fontSize: '12px'
        }}
      >
        CÓMO LLEGAR
      </a>
    </div>
  );
}