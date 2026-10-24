import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
    processClinicalTriage,
    GENERAL_DISCLAIMER,
    QUICK_PROMPTS
} from "../services/clinicalTriage";
import "./styles/Chatbot.scss";

const INITIAL_MESSAGE = {
    id: "welcome-msg",
    sender: "bot",
    title: "👋 Welcome to CareAI Clinical Triage",
    text: "I am your AI-powered clinical triage assistant. I can help evaluate non-emergency symptoms and guide you to the appropriate diagnostic screening module:\n\n• **Dermatology / Skin Cancer** (Melanoma ABCD criteria)\n• **Neuro-Oncology / Brain Tumors** (MRI analysis)\n• **Movement Disorders** (Parkinson's voice biomarkers)\n• **Cognitive Neurology** (Alzheimer's screening)\n\nPlease describe what symptoms you or your patient are experiencing, or pick one of the clinical prompts below.",
    action: null,
    severity: "low",
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
};

const Chatbot = () => {
    const [messages, setMessages] = useState([INITIAL_MESSAGE]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = (textToSend) => {
        const query = (textToSend || input).trim();
        if (!query) return;

        const userMsg = {
            id: "user-" + Date.now(),
            sender: "user",
            text: query,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simulate clinical knowledge retrieval and reasoning delay
        setTimeout(() => {
            const triageResult = processClinicalTriage(query);
            const botMsg = {
                id: "bot-" + Date.now(),
                sender: "bot",
                title: triageResult.title,
                text: triageResult.message,
                action: triageResult.action,
                severity: triageResult.severity,
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            };
            setMessages((prev) => [...prev, botMsg]);
            setIsTyping(false);
        }, 600);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleClear = () => {
        setMessages([
            {
                ...INITIAL_MESSAGE,
                id: "welcome-" + Date.now(),
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            }
        ]);
    };

    return (
        <div className="chatbot-page">
            {/* Header */}
            <header className="chatbot-header">
                <div className="header-title-group">
                    <div className="bot-avatar-badge" aria-hidden="true">
                        🩺
                    </div>
                    <div className="title-info">
                        <h1>
                            CareAI Clinical Triage Assistant
                            <span className="status-dot" title="Online Clinical Agent"></span>
                        </h1>
                        <p>Evidence-based multi-disease clinical triage & diagnostic routing</p>
                    </div>
                </div>
                <div className="header-actions">
                    <button
                        type="button"
                        className="clear-btn"
                        onClick={handleClear}
                        title="Reset conversation"
                    >
                        Reset Conversation
                    </button>
                </div>
            </header>

            {/* Medical Disclaimer Banner */}
            <div className="disclaimer-banner" role="alert">
                <span>{GENERAL_DISCLAIMER}</span>
            </div>

            {/* Messages Feed */}
            <main className="chat-messages-container" aria-live="polite">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`message-row ${msg.sender === "user" ? "user-row" : "bot-row"}`}
                    >
                        <div className="avatar" aria-hidden="true">
                            {msg.sender === "user" ? "👤" : "🤖"}
                        </div>
                        <div className={`message-bubble ${msg.severity === "critical" ? "emergency" : ""}`}>
                            {msg.title && <div className="msg-title">{msg.title}</div>}
                            <div className="msg-content">{msg.text}</div>

                            {msg.action && (
                                <div className="action-card">
                                    <Link to={msg.action.route} className="action-link">
                                        <span>➔</span>
                                        {msg.action.label}
                                    </Link>
                                </div>
                            )}

                            <div className="msg-time">{msg.timestamp}</div>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="message-row bot-row">
                        <div className="avatar" aria-hidden="true">🤖</div>
                        <div className="typing-indicator" aria-label="Clinical AI is formulating response">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </main>

            {/* Quick Symptom Chips */}
            <nav className="quick-prompts-bar" aria-label="Suggested Clinical Prompts">
                {QUICK_PROMPTS.map((item, idx) => (
                    <button
                        key={idx}
                        type="button"
                        className="chip-btn"
                        onClick={() => handleSend(item.prompt)}
                    >
                        {item.label}
                    </button>
                ))}
            </nav>

            {/* Input Controls */}
            <footer className="chat-input-area">
                <input
                    type="text"
                    placeholder="Describe your symptoms (e.g., asymmetrical mole, morning headaches, hand tremors, memory lapses)..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isTyping}
                    aria-label="Patient Symptom Intake"
                />
                <button
                    type="button"
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isTyping}
                >
                    Send
                </button>
            </footer>
        </div>
    );
};

export default Chatbot;
