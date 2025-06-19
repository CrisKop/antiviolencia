"use client";
import React from "react";

function EmergencyButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 z-[9999] bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-3 rounded-full shadow-lg transition-all duration-200 cursor-pointer"
      title="Activar modo seguro"
    >
      Emergencia
    </button>
  );
}

export default EmergencyButton;
