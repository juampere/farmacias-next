'use client';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Importamos los estilos del archivo CSS
import styles from './Mapa.module.css';
import Botonera from './Botonera';

export default function Mapa({ farmacias }: { farmacias: any[] }) {
  const [verSoloTurno, setVerSoloTurno] = useState(true);

  // 1. CONFIGURACIÓN DEL MAPA (Campana)
  const areaEnfoque = L.latLngBounds([-34.2100, -58.9850], [-34.1450, -58.9350]);
  const limitesCiudad = L.latLngBounds([-34.2500, -59.0800], [-34.0800, -58.8500]);

  // 2. FUNCIÓN PARA CREAR EL ICONO PERSONALIZADO (✚)
  // Esta función recibe si la farmacia está de turno y devuelve el HTML/CSS del pin
  const crearIcono = (estaDeTurno: boolean) => {
    return L.divIcon({
      // Si está de turno, le agrega la clase "marcadorTurno" para que brille
      className: `${styles.marcadorCustom} ${estaDeTurno ? styles.marcadorTurno : ''}`,
      html: '<span>✚</span>',
      iconSize: [40, 40],      // Tamaño del círculo
      iconAnchor: [16, 16],    // Centrado exacto
      popupAnchor: [0, -15],   // Ajuste para que el Popup salga arriba del círculo
    });
  };

  const farmaciasFiltradas = verSoloTurno 
    ? farmacias.filter(f => f.turno === true) 
    : farmacias;

  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Botonera verSoloTurno={verSoloTurno} setVerSoloTurno={setVerSoloTurno} />

      <MapContainer 
        bounds={areaEnfoque}
        maxBounds={limitesCiudad}
        maxBoundsViscosity={1.0}
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {farmaciasFiltradas.map((f) => (
          <Marker 
            key={f._id.toString()} 
            position={[f.latitud, f.longitud]} 
            icon={crearIcono(f.turno)} // <--- LLAMADA A LA FUNCIÓN
          >
            <Popup>
              <div className={styles.popupContenedor}>
                {f.imagen_url ? (
                  <img src={f.imagen_url} className={styles.popupImagen} alt={f.nombre} />
                ) : (
                  <div className={styles.popupIcono}>✚</div>
                )}
                <h3 className={styles.titulo}>{f.nombre}</h3>
                <p className={styles.direccion}>{f.direccion}</p>
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${f.latitud},${f.longitud}`}
                  target="_blank"
                  className={styles.botonGps}
                >
                  CÓMO LLEGAR
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}