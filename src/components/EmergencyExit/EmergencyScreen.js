"use client";
import React, { useEffect, useState } from "react";

function EmergencyScreen({ onClose }) {
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    if(clicks === 2){
      setClicks(0);
      onClose();
    }
  }, [clicks, onClose])
  return (
    <div
      className="fixed inset-0 z-[9999] bg-gray-800 flex items-center justify-center text-white text-center p-4 select-none cursor-pointer"
      onClick={() => {setClicks(clicks+1)}}
    >
      <div>
        <h1 className="text-2xl font-bold mb-4">Modo Seguro Activado</h1>
        <p className="text-gray-200">
          Esta pantalla fue activada por seguridad.
          <br />
          Haz doble clic en cualquier parte para volver a la aplicación.
        </p>
      </div>
    </div>
  );
}

export default EmergencyScreen;
