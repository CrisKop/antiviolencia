// This component is used to ensure that the EmergencyInfo component is only rendered on the client side
// and not during server-side rendering. It checks if the ad has been shown before using sessionStorage, and if not, it displays the EmergencyInfo component.

"use client";
import { useEffect, useState, useRef } from "react";
import EmergencyInfo from "@/components/Ad/EmergencyInfo";
import EmergencyScreen from "@/components/EmergencyExit/EmergencyScreen";
import EmergencyButton from "./EmergencyExit/EmergencyButton";

export default function ClientSideWrapper() {
  const [showEmergencyScreen, setShowEmergencyScreen] = useState(false);
  const [showingAd, setShowingAd] = useState(false);
  const yaProcesado = useRef(false); // se usa useRef para evitar re-renderizados innecesarios

  useEffect(() => {
    if (yaProcesado.current) return;
    yaProcesado.current = true;

    const yaMostrado = sessionStorage.getItem("adShown");

    // Verifica si ya se mostró el anuncio en la sesión
    if (!yaMostrado) {
      setShowingAd(true);
      sessionStorage.setItem("adShown", "true"); //  marca que ya se mostró el anuncio
    }
  }, []);

  useEffect(() => {
    if (showEmergencyScreen) {
      window.open("https://google.com", "_blank");
    }
  }, [showEmergencyScreen]);

  return (
    <>
      {showingAd ?? <EmergencyInfo onClose={() => setShowingAd(false)} />}

      {showEmergencyScreen && (
        <EmergencyScreen onClose={() => setShowEmergencyScreen(false)} />
      )}

      {!showEmergencyScreen && (
        <EmergencyButton onClick={() => setShowEmergencyScreen(true)} />
      )}
    </>
  );
}
