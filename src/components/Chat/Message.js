"use client";
import React from "react";
import { Bot, User } from "lucide-react";
import Map from "../Maps/Map"; // Asegúrate de que la ruta sea correcta

const Message = ({ sender, message, timestamp, ubicacion }) => {
  const isBot = sender.toLowerCase() === "bot" || sender.toLowerCase() === "ai";

  return (
    <div
      className={`flex gap-3 ${
        isBot ? "justify-start" : "justify-end"
      } mb-4 group`}
    >
      {isBot && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#B3E5FC] flex items-center justify-center shadow-md">
          <Bot size={16} className="text-[#424242]" />
        </div>
      )}
      <div className={`max-w-[80%] ${isBot ? "order-2" : "order-1"}`}>
        <div
          className={`px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md ${
            isBot
              ? "bg-white border border-[#ccc] text-[#424242] rounded-tl-sm"
              : "bg-[#B3E5FC] text-[#424242]  rounded-tr-sm"
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message}
          </p>
          {ubicacion && (
            <div className="mt-2">
              <Map
                lat={ubicacion.lat}
                lng={ubicacion.lng}
                zoom={15}
                height="200px"
                width="150%"
              />
            </div>
          )}
        </div>
        {timestamp && (
          <p
            className={`text-xs text-[#888] mt-1 px-1 ${
              isBot ? "text-left" : "text-right"
            }`}
          >
            {timestamp}
          </p>
        )}
      </div>
      {!isBot && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#a44fd8] flex items-center justify-center shadow-md">
          <User size={16} className="text-[#ffffff]" />
        </div>
      )}
    </div>
  );
};

export default Message;
