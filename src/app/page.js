"use client";

import Layout from "@/app/layout";

import React from "react";

function page() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">
          Bienvenido a la Página Principal
        </h1>
        <p className="text-lg text-gray-700">
          Esta es la página principal de tu aplicación.
        </p>
      </div>
    </Layout>
  );
}

export default page;
