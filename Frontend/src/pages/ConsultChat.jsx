import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import API from "../utils/Api";
import { useParams, useNavigate } from "react-router-dom";
import { doctorsData } from "./Consultancy";
import { useAuth } from "../context/AuthContext";

const ConsultChat = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const doctor = doctorsData.find((d) => d.id === doctorId);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: user.name, text: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const { data } = await API.post("/consult/chat", { message: input });
      const doctorMsg = { sender: doctor.name, text: data.reply };
      setMessages((prev) => [...prev, doctorMsg]);
    } catch (err) {
      console.error(err);
    }

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <section
      className=" relative min-h-screen flex flex-col items-center justify-center text-gray-900 p-4 sm:p-8"
      style={{
        backgroundImage: "url('/consult.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60 backdrop-blur-[2px]" />

      <div className="relative z-10 w-full max-w-3xl h-[80vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl bg-white/70 border border-cyan-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-700 to-teal-500 text-white py-4 px-6 flex items-center justify-between shadow-md">
          <button
            onClick={() => navigate("/consult")}
            className="flex items-center gap-2 hover:opacity-80 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-medium">Back</span>
          </button>

          <h1 className="text-lg sm:text-xl font-semibold text-center flex-1">
            Chat with {doctor.name}
          </h1>

          <span className="hidden sm:block text-sm opacity-80 pr-2">
            {doctor.specialty}
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.length === 0 && (
            <p className="text-center text-gray-600 italic mt-10">
              Start chatting with {doctor.name}...
            </p>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.sender === user.name ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 md:p-4 max-w-[75%] rounded-2xl text-sm sm:text-base shadow-md ${
                  m.sender === user.name
                    ? "bg-gradient-to-l from-cyan-600 to-teal-500 text-white rounded-br-none"
                    : "bg-white/90 border border-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                <p>{m.text}</p>
                <small
                  className={`block mt-1 text-xs ${
                    m.sender === user.name ? "text-cyan-100" : "text-gray-500"
                  }`}
                >
                  {m.sender}
                </small>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white/90 backdrop-blur-md border-t border-gray-200 flex items-center gap-3 shadow-lg sticky bottom-0">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 p-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-cyan-500 text-gray-800"
          />
          <button
            onClick={sendMessage}
            className="bg-gradient-to-l from-cyan-600 to-teal-500 hover:opacity-90 px-6 py-3 rounded-xl text-white font-semibold shadow-lg transition-all"
          >
            Send
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConsultChat;
