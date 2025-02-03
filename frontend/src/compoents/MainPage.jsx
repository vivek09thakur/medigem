import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import "./styles/Main.css";

const MainPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [showBanner, setShowBanner] = useState(true);
  const api = import.meta.env.VITE_API_URL;

  const suggestions = [
    "🤒 What are the symptoms of dengue fever?",
    "🍎 How to manage diabetes naturally?",
    "🤢 Common causes of stomach pain",
    "🏠 Best home remedies for cold and cough",
  ];

  const typeMessage = (text, index = 0) => {
    if (index < text.length) {
      setDisplayText((prev) => text.substring(0, index + 1));
      setTimeout(() => typeMessage(text, index + 1), 0.5);
    } else {
      setTyping(false);
    }
  };

  const sendMessage = async (messageText = input) => {
    if (!messageText.trim()) return;

    setShowBanner(false);
    const userMessage = { role: "user", text: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch(`${api}/chat/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText }),
      });

      const data = await response.json();
      const botMessage = {
        role: "bot",
        text: data.response || "I'm not sure how to respond. 😕",
      };
      setMessages((prev) => [...prev, botMessage]);
      setTyping(true);
      setDisplayText("");
      typeMessage(botMessage.text);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Error fetching response. ❌" },
      ]);
    }
  };

  return (
    <div className="container">
      <div className="chat-box">
        {showBanner && messages.length === 0 && (
          <div className="welcome-banner">
            <h2>Hi I'm medigem 👋</h2>
            <p>Ask me anything about health and medical advice! 💊 🏥</p>
          </div>
        )}
        {messages.length === 0 && (
          <div className="suggestions">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion-pill"
                onClick={() => sendMessage(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              {msg.role === "bot" ? (
                <Markdown>
                  {index === messages.length - 1 && typing
                    ? displayText
                    : msg.text}
                </Markdown>
              ) : (
                msg.text + " 💬"
              )}
            </div>
          ))}
        </div>
        <div className="input-box">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setShowBanner(false);
            }}
            placeholder="Type a message... ✍️"
          />
          <button onClick={() => sendMessage()}>Send 📤</button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
