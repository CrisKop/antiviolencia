"use client";
import React from "react";

function EmergencyInfo({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full relative space-y-4">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-sm cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold text-center">
          Información de Emergencia
        </h2>

        <p className="text-gray-700">
          Si te encuentras en peligro, este sitio cuenta con un botón de
          emergencia visible en la esquina inferior derecha.
        </p>

        <p className="text-gray-700">
          Al hacer clic, se abrirá una pestaña neutra y esta página se ocultará
          inmediatamente para protegerte.
        </p>

        <p className="text-gray-700">
          Tu seguridad es lo más importante. Actúa con calma y solo si es
          necesario.
        </p>

        <p className="text-gray-700">
          Para regresar, cierra la pestaña abierta y toca dos veces la pantalla.
          O recarga la página.
        </p>

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-[#6A1B9A] hover:bg-[#4A148C] text-white px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmergencyInfo;
