import { useState } from "react";
import Markdown from "react-markdown";
import "./styles/Main.css";

const api = import.meta.env.VITE_API_URL;

// Helper function to check message status
const checkMessageStatus = async (requestId) => {
  const response = await fetch(`${api}/chat/status/${requestId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

const MainPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  const suggestions = [
    "What are the symptoms of dengue fever? 🤒",
    "How to manage diabetes naturally? 🍎",
    "Common causes of stomach pain 🤢",
    "Best home remedies for cold and cough 🏠",
  ];

  const sendMessage = async (messageText = input) => {
    if (!messageText.trim()) return;

    setShowBanner(false);
    const userMessage = { role: "user", text: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Send the message to the backend
      const response = await fetch(`${api}/chat/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText }),
      });

      const data = await response.json();
      const requestId = data.requestId;

      // Add a placeholder message for the bot's response
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Processing your request..." },
      ]);

      // Poll for the actual response
      const pollInterval = setInterval(async () => {
        const result = await checkMessageStatus(requestId);

        if (result.status === "complete") {
          clearInterval(pollInterval); // Stop polling
          setMessages((prev) => [
            ...prev.slice(0, -1), // Remove the "Processing..." message
            { role: "bot", text: result.message.message },
          ]);
          setIsLoading(false);
        }
      }, 2000); // Poll every 2 seconds
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "An error occurred while processing your request." },
      ]);
      setIsLoading(false);
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
                <Markdown>{String(msg.text)}</Markdown>
              ) : (
                msg.text
              )}
            </div>
          ))}

          {isLoading && (
            <div className="message bot loading">
              <div className="loading-spinner"></div>
            </div>
          )}
        </div>

        <div className="input-box">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setShowBanner(false);
            }}
            placeholder="Type a message..."
            disabled={isLoading}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !isLoading) {
                sendMessage();
              }
            }}
          />
          <button onClick={() => sendMessage()} disabled={isLoading}>
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;