import { useState } from "react";
import "./styles/Main.css";

const MainPage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;
        
        const userMessage = { role: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        try {
            const response = await fetch("https://medi-gemma-backend.vercel.app/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input })
            });
            
            const data = await response.json();
            const botMessage = { role: "bot", text: data.reply || "I'm not sure how to respond." };
            setMessages((prev) => [...prev, botMessage]);
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
                            {msg.text}
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
