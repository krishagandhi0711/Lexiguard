import React, { useState } from "react";
import axios from "axios";

export default function ChatWithDocument({ documentText }) {
  const [messages, setMessages] = useState([]); // {role: "user"/"bot", text: "..."}
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setMessages([...messages, { role: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/chat", {
        message: userMessage,
        document_text: documentText,
      });
      const botReply = response.data.reply;
      setMessages((prev) => [...prev, { role: "bot", text: botReply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "bot", text: "Error connecting to server." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col space-y-4 bg-[#064E3B]/90 p-4 rounded-lg shadow-xl">
      <div className="flex-1 overflow-y-auto max-h-[500px] flex flex-col space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg ${msg.role === "user" ? "bg-cyan-700 self-end" : "bg-gray-800 self-start"} text-gray-200`}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div className="text-gray-400">Typing...</div>}
      </div>
      <div className="flex space-x-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something about your document..."
          className="flex-1 p-3 rounded-lg bg-[#0F2A40]/90 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
          rows={2}
        />
        <button
          onClick={sendMessage}
          className="bg-cyan-600 text-white py-3 px-6 rounded-lg hover:bg-cyan-500"
        >
          Send
        </button>
      </div>
    </div>
  );
}
