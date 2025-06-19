// components/Map.js
"use client";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import React from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 7.0831, // ejemplo: Ocaña, Colombia
  lng: -73.151,
};

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // usa variable de entorno
  });

  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
      <Marker position={center} />
    </GoogleMap>
  );
};

export default React.memo(Map);
