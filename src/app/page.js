"use client";

import Layout from "@/app/layout";
import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React from "react";

function Page() {

   const router = useRouter();

  const irAApp = () => {
    router.push("/form");
  };


  return (
    <Layout>
     <div className="relative min-h-screen text-white">
      {/* Imagen de fondo */}
     <div className="absolute inset-0 z-0">
  <Image
    src="/Banner.jpg"
    alt="Fondo"
    fill
    className="object-cover"
    priority
  />
</div>

      {/* Capa oscura encima */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Contenido + Navbar */}
      <div className="relative z-20">
        <Navbar />
   <div className="flex flex-col items-center sm:items-start justify-center min-h-[85vh] px-4 text-center sm:text-left sm:px-50">
      <p className="text-lg sm:text-xl text-gray-200 mb-2 max-w-2xl">
    Tu espacio seguro
  </p>
  <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 max-w-2xl">
    Plataforma Elira
  </h1>
  <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-xl">
    Tu lugar para buscar ayuda si te tienes miedo o te sientes inseguro en tu entorno.
  </p>
  <button onClick={irAApp} className="bg-[#6A1B9A] text-white font-semibold px-6 py-3 rounded hover:bg-gray-200 hover:text-black cursor-pointer transition">
    Busca ayuda →
  </button>
</div>

      </div>
    </div>
    </Layout>
  );
}

export default Page;
