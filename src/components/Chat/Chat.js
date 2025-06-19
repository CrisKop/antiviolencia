// Chat.js
"use client";
import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import { MessageCircle, Settings, MoreVertical } from "lucide-react";

function ChatBox() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "Bot",
      message:
        "Hola, gracias por tomarte el tiempo de responder el formulario.",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
    {
      id: "2",
      sender: "Bot",
      message: "He revisado tus respuestas y es una situación dificil.",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
    {
      id: "3",
      sender: "Bot",
      message:
        "Puedes contarme un poco más sobre tu situación actual? Estoy aquí para ayudarte.",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const [userMessages, setUserMessages] = useState([]);

  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  //#MARK: Manejo de mensajes enviados por el usuario
  const handleSendMessage = async (message) => {
    const newMessage = {
      id: Date.now().toString(),
      sender: "User",
      message,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updatedUserMessages = [...userMessages, newMessage];

    setMessages((prev) => [...prev, newMessage]);
    setUserMessages(updatedUserMessages);
    setIsTyping(true);

    //Despues de un tiempo, simula la respuesta de la IA
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        sender: "Bot",
        message: generateAIResponse(message, updatedUserMessages),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        ubicacion: userMessages.length === 2 ? "Test" : null,
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  // #MARK: Determinar ruta de apoyo
  // Esta función determina la ruta de apoyo adecuada según las palabras clave en los mensajes del usuario
  const determineSupportRoute = (messages) => {
    console.log("Determinando ruta de apoyo con mensajes:", messages);
    const text = messages.join(" ").toLowerCase();

    const routes = [
      {
        name: "Comisaría de Familia",
        keywords: [
          "pareja",
          "familiar",
          "hogar",
          "violencia intrafamiliar",
          "esposo",
          "mamá",
          "papá",
          "hermano",
        ],
      },
      {
        name: "Alcaldía Municipal de Ocaña",
        keywords: [
          "ayuda social",
          "vivienda",
          "asistencia",
          "ayuda económica",
          "alcaldía",
          "programa",
        ],
      },
      {
        name: "Fiscalía",
        keywords: [
          "denuncia",
          "denunciar",
          "abuso sexual",
          "sexual",
          "delito sexual",
          "abuso",
          "agresión",
          "delito",
          "amenaza",
          "acoso",
          "violación",
          "violador",
        ],
      },
      {
        name: "Fundación Mujer y Futuro",
        keywords: [
          "mujer",
          "violencia de género",
          "empoderamiento",
          "ayuda psicológica",
          "acompañamiento",
        ],
      },
      {
        name: "UNICEF",
        keywords: [
          "niño",
          "niña",
          "menor",
          "infancia",
          "adolescente",
          "maltrato infantil",
        ],
      },
      {
        name: "Proyecto A Tu Lado",
        keywords: [
          "acompañamiento",
          "terapia",
          "escucha",
          "soporte emocional",
          "psicológico",
          "charlar",
        ],
      },
      {
        name: "Consejo Noruego",
        keywords: [
          "desplazado",
          "refugiado",
          "víctima",
          "conflicto armado",
          "ayuda internacional",
          "protección",
        ],
      },
    ];

    for (const route of routes) {
      if (route.keywords.some((keyword) => text.includes(keyword))) {
        return route.name;
      }
    }

    // Si no se encuentra una ruta específica, elige una al azar
    console.log("No se encontró una ruta específica, eligiendo al azar");
    const randomRoute = routes[Math.floor(Math.random() * routes.length)];
    return randomRoute.name;
  };

  //MARK: Generar respuesta de la IA
  // Función principal que responde como la IA
  const generateAIResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();

    const keywords = {
      ayuda: ["ayuda", "necesito", "puedes", "me puedes", "ayúdame", "cómo"],
      violencia: ["violencia", "agresión", "maltrato", "abuso"],
      emociones: [
        "miedo",
        "ansiedad",
        "estrés",
        "triste",
        "nervioso",
        "depresión",
      ],
      seguridad: ["seguro", "entorno", "proteger", "protegido"],
      apoyo: ["amigos", "familia", "soporte", "apoyo", "acompañado"],
    };

    const responses = {
      ayuda: [
        "Claro, estoy aquí para ayudarte. ¿En qué aspecto necesitas apoyo?",
        "Estoy contigo. Dime más sobre lo que necesitas.",
      ],
      violencia: [
        "Gracias por confiar en mí. Hablar sobre la violencia es un paso valiente.",
        "Estoy aquí para ti. ¿Quieres contarme más sobre lo que estás viviendo?",
      ],
      emociones: [
        "Tus emociones son importantes. ¿Quieres contarme más sobre cómo te sientes?",
        "Lidiar con emociones fuertes no es fácil. Estoy contigo.",
      ],
      seguridad: [
        "Tu seguridad es prioridad. ¿Te sientes en peligro en este momento?",
        "Podemos hablar sobre cómo sentirte más seguro/a en tu entorno.",
      ],
      apoyo: [
        "Tener apoyo marca la diferencia. ¿Sientes que cuentas con alguien cercano?",
        "Hablemos sobre tu red de apoyo. Estoy aquí contigo.",
      ],
      default: [
        "Gracias por compartir eso. Estoy aquí para escucharte.",
        "Me interesa lo que dices. ¿Podrías contarme un poco más?",
        "Estoy contigo. Puedes contarme lo que quieras.",
      ],
    };

    console.log("Mensaje del usuario:", msg);
    console.log("Mensajes del usuario acumulados:", userMessages);
    console.log(userMessages.length, "mensajes acumulados");
    console.log("Palabras clave:", keywords);

    // Detectar respuesta por categoría
    for (const category in keywords) {
      console.log("Categoría detectada:", category);
      const options = responses[category];
      let response = options[Math.floor(Math.random() * options.length)];

      // Verificar si ya se pueden sugerir rutas
      if (userMessages.length === 2) {
        console.log("Detectado mas de 3 mensajes del usuario");
        const route = determineSupportRoute(userMessages.map((m) => m.message));
        console.log("Ruta de apoyo sugerida:", route);
        if (route) {
          return `🟪 Analizando tu caso. Determinamos que podrías contactar con: **${route}**. Esta está ubicada en la ubicación enviada ¿Necesitas más ayuda? \n\n Puedes llamar a 30028457 o visitar la pagina de la ruta si deseas más información o no te es posible llegar a la ubicación.`;
        }
      }

      return response;
    }

    // Respuesta por defecto
    const defaultOptions = responses.default;
    const defaultResponse =
      defaultOptions[Math.floor(Math.random() * defaultOptions.length)];

    if (userMessages.length >= 3) {
      const route = determineSupportRoute(userMessages);
      if (route) {
        return (
          defaultResponse +
          `\n\n🟪 Además, considero que podrías acudir a: **${route}** para recibir orientación.`
        );
      }
    }

    return defaultResponse;
  };

  return (
    <div className="min-h-screen max-w-[100vw] bg-[#FAFAFA] flex-col">
      <div className="mx-auto h-screen flex flex-col items-center">
        {/* Header */}
        <div className="w-full bg-[#B3E5FC] border-b border-[#ccc] px-6 py-4 flex items-center justify-around shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#B3E5FC] flex items-center justify-center shadow-md">
              <MessageCircle size={20} className="text-[#424242]" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-[#424242]">Nuna AI</h1>
              <p className="text-sm text-[#666]">
                Tu espacio seguro para hablar, entender y sanar
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-[#666] hover:text-[#333] hover:bg-[#eee] rounded-lg transition-all duration-200">
              <Settings size={18} />
            </button>
            <button className="p-2 text-[#666] hover:text-[#333] hover:bg-[#eee] rounded-lg transition-all duration-200">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="max-w-4xl flex-1 overflow-y-auto px-6 py-4 space-y-1">
          {messages.map((msg) => (
            <Message key={msg.id} {...msg} ubicacion={msg.ubicacion ?? null} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
}

export default ChatBox;
