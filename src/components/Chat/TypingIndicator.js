"use client";
import React from "react";
import { Bot } from "lucide-react";

const TypingIndicator = () => {
  return (
    <div className="flex gap-3 justify-start mb-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#B3E5FC] flex items-center justify-center shadow-md">
        <Bot size={16} className="text-[#424242]" />
      </div>
      <div className="bg-white border border-[#ccc] px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
        <div className="flex gap-1">
          <div
            className="w-2 h-2 bg-[#999] rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="w-2 h-2 bg-[#999] rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="w-2 h-2 bg-[#999] rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
