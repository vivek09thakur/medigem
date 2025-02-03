import { useState, useEffect } from "react";
import Markdown from 'react-markdown'
import "./styles/Main.css";

const MainPage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const [displayText, setDisplayText] = useState("");
    const api = import.meta.env.VITE_API_URL;

    const typeMessage = (text, index = 0) => {
        if (index < text.length) {
            setDisplayText(prev => text.substring(0, index + 1));
            setTimeout(() => typeMessage(text, index + 1), 20);
        } else {
            setTyping(false);
        }
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        try {
            const response = await fetch(`${api}/chat/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input })
            });

            const data = await response.json();
            const botMessage = { role: "bot", text: data.response || "I'm not sure how to respond." };
            setMessages((prev) => [...prev, botMessage]);
            setTyping(true);
            setDisplayText("");
            typeMessage(botMessage.text);
        } catch (error) {
            setMessages((prev) => [...prev, { role: "bot", text: "Error fetching response." }]);
        }
    };

    return (
        <div className="container">
            <div className="chat-box">
                <div className="messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.role}`}>
                            {msg.role === "bot" ? (
                                <Markdown>
                                    {index === messages.length - 1 && typing ? displayText : msg.text}
                                </Markdown>
                            ) : (
                                msg.text
                            )}
                        </div>
                    ))}
                </div>
                <div className="input-box">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default MainPage;