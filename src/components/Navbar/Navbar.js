import Image from "next/image";

export default function Navbar() {
  return (
<nav className="flex justify-center items-center px-5 sm:px-50 sm:justify-start py-4">

      {/*
   <div className="text-lg font-bold uppercase tracking-wide">Menú</div>
      */}
      
      <div className="flex items-center gap-4">
              <Image
        src="/LOGO.png" // desde la carpeta public
        alt="Descripción de la imagen"
        width={70}
        height={42}
        priority // opcional: carga prioritaria
      />

        <a href="#" className="hover:underline">
          Inicio
        </a>
        <a href="#" className="hover:underline">
          Modelos
        </a>
        <a href="#" className="hover:underline">
          Contacto
        </a>
      </div>
    </nav>
  );
}
