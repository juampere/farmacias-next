'use client';

interface Props {
  verSoloTurno: boolean;
  setVerSoloTurno: (valor: boolean) => void;
}

export default function Botonera({ verSoloTurno, setVerSoloTurno }: Props) {
  return (
    <div style={{ 
      position: 'absolute', 
      top: '20px', 
      left: '50%', 
      transform: 'translateX(-50%)', 
      zIndex: 1000, 
      display: 'flex', 
      gap: '8px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(8px)',
      padding: '5px',
      borderRadius: '30px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
      width: 'max-content' // Se ajusta al contenido
    }}>
      <button 
        onClick={() => setVerSoloTurno(true)}
        style={{
          padding: '10px 20px',
          borderRadius: '25px',
          border: 'none',
          backgroundColor: verSoloTurno ? '#007AFF' : 'transparent',
          color: verSoloTurno ? 'white' : '#555',
          fontWeight: '600',
          cursor: 'pointer',
          transition: '0.2s'
        }}
      >
        De Turno
      </button>
      <button 
        onClick={() => setVerSoloTurno(false)}
        style={{
          padding: '10px 20px',
          borderRadius: '25px',
          border: 'none',
          backgroundColor: !verSoloTurno ? '#007AFF' : 'transparent',
          color: !verSoloTurno ? 'white' : '#555',
          fontWeight: '600',
          cursor: 'pointer',
          transition: '0.2s'
        }}
      >
        Todas
      </button>
    </div>
  );
}