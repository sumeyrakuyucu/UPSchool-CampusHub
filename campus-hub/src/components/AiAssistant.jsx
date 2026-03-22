import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, User } from 'lucide-react';
import { getGeminiResponse } from '../services/gemini';
import './AiAssistant.css';

const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([
    { role: 'ai', text: 'Selam! Ben Hubie, senin gerçek zekalı akademik asistanınım. Gemini üzerinden sana canlı yanıt verebilirim. Nasıl yardımcı olabilirim?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMsgText = message;
    const userMessage = { role: 'user', text: userMsgText };
    setChat(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    try {
      const aiResponseText = await getGeminiResponse(userMsgText);
      setChat(prev => [...prev, { role: 'ai', text: aiResponseText }]);
    } catch (err) {
      setChat(prev => [...prev, { role: 'ai', text: "Bir hata oluştu, lütfen tekrar dener misin?" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={`ai-assistant-wrapper ${isOpen ? 'active' : ''}`}>
      {/* Floating Button */}
      {!isOpen && (
        <button className="ai-toggle-btn" onClick={() => setIsOpen(true)}>
          <div className="ai-badge">AI</div>
          <Bot size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="ai-chat-window animate-fade-in">
          <div className="ai-chat-header">
            <div className="ai-info">
              <div className="ai-avatar">
                <Sparkles size={16} color="white" />
              </div>
              <div>
                <h4>Hubie (Yapay Zeka)</h4>
                <span>Çevrimiçi asistanın</span>
              </div>
            </div>
            <button className="chat-close" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="ai-chat-body">
            {chat.map((msg, idx) => (
              <div key={idx} className={`chat-bubble ${msg.role}`}>
                <div className="bubble-icon">
                  {msg.role === 'ai' ? <Bot size={14} /> : <User size={14} />}
                </div>
                <div className="bubble-content">
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="chat-bubble ai">
                <div className="bubble-content typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="ai-chat-footer">
            <input 
              type="text" 
              placeholder="Hubie'ye bir şey sor..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="send-btn" onClick={handleSend} disabled={isTyping}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiAssistant;
