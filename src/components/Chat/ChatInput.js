// ChatInput.js
"use client";
import React, { useState } from "react";
import { Send, Mic } from "lucide-react";

const ChatInput = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-4xl max-w-[100vw] border-t border-[#ccc] p-4">
      <form onSubmit={handleSubmit} className="flex gap-3 items-end">
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={disabled}
            className="w-full px-4 py-3 pr-12 border border-[#ccc] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#B3E5FC] focus:border-transparent transition-all duration-200 hover:border-[#999] disabled:opacity-50 disabled:cursor-not-allowed bg-white text-[#424242]"
            style={{ minHeight: "48px", maxHeight: "120px", resize: "none" }}
            onInput={(e) => {
              const target = e.target;
              target.style.height = "auto";
              target.style.height = Math.min(target.scrollHeight, 120) + "px";
            }}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 text-[#999] hover:text-[#333] transition-colors duration-200"
          >
            <Mic size={18} />
          </button>
        </div>
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="p-3 bg-[#B3E5FC] text-white rounded-2xl hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#6A1B9A] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
