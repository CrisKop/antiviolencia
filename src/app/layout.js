import "./globals.css";
import ClientSideWrapper from "@/components/ClientSideWrapper"; // Importa el componente ClientSideWrapper (osea la parte del layout que usa cliente)

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Sitio de ayuda</title>
      </head>
      <body>
        <ClientSideWrapper />
        {children}
      </body>
    </html>
  );
}
