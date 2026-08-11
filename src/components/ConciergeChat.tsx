import React, { useState, useRef, useEffect } from 'react';
import { useHotel } from '../context/HotelContext';
import { Sparkles, X, Send, RefreshCw, Calendar, Utensils, Flower2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage } from '../types';

export const ConciergeChat: React.FC = () => {
  const { isConciergeOpen, setIsConciergeOpen, setCurrentPage } = useHotel();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'concierge',
      text: 'Good day. I am Aurelia, Head Concierge at The Haven. It is my absolute pleasure to assist you. May I offer recommendations on our suites, Michelin dining at L\'Étoile, or reserve a thermal spa ritual for your visit?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        'Recommend a romantic suite',
        'Tell me about Michelin dining',
        'What spa rituals are available?',
        'Book airport helicopter transfer'
      ]
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isConciergeOpen) {
      scrollToBottom();
    }
  }, [messages, isConciergeOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          conversationHistory: messages
        })
      });

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'concierge',
        text: data.reply || 'Allow me to verify that with our private team. Is there anything else I may prepare for you?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Concierge Chat error:', err);
      const errorMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'concierge',
        text: 'Forgive me, my digital ledger encountered a transient connection delay. Rest assured, our team is at your complete service. Would you like me to take you directly to our reservation calendar?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Concierge Badge/Trigger Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsConciergeOpen(!isConciergeOpen)}
          className="group relative flex items-center gap-2.5 px-5 py-3 bg-[#0D2A22] text-[#F7F8F5] rounded-sm shadow-2xl border border-[#C8A96E]/50 hover:border-[#C8A96E] transition-all duration-300 cursor-pointer"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8A96E] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C8A96E]"></span>
          </span>
          <Sparkles className="w-4 h-4 text-[#C8A96E] group-hover:rotate-12 transition-transform" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold">
            Concierge AI
          </span>
        </motion.button>
      </div>

      {/* Slide-over / Modal Drawer */}
      <AnimatePresence>
        {isConciergeOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsConciergeOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            />

            {/* Chat Drawer Window */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md bg-[#F7F8F5] h-full shadow-2xl flex flex-col z-10 border-l border-[#0D2A22]/10"
            >
              {/* Header */}
              <div className="p-5 bg-[#0D2A22] text-[#F7F8F5] border-b border-[#C8A96E]/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#163C32] border border-[#C8A96E]/40 flex items-center justify-center text-[#C8A96E]">
                    <Sparkles className="w-5 h-5 text-[#C8A96E]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg italic tracking-wide text-[#F7F8F5]">
                      Aurelia — Concierge
                    </h3>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-[#C8A96E] font-sans font-bold">
                      The Haven 5-Star Butler AI
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsConciergeOpen(false)}
                  className="p-2 text-[#F7F8F5]/70 hover:text-[#F7F8F5] hover:bg-[#163C32] rounded-sm transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Action Navigation Bar */}
              <div className="bg-white px-4 py-2.5 border-b border-[#0D2A22]/10 flex items-center justify-around text-[10px] font-sans uppercase tracking-[0.15em] text-[#C8A96E] font-bold">
                <button
                  onClick={() => {
                    setIsConciergeOpen(false);
                    setCurrentPage('booking');
                  }}
                  className="flex items-center gap-1 hover:text-[#0D2A22] transition-colors cursor-pointer"
                >
                  <Calendar className="w-3 h-3 text-[#C8A96E]" /> Book Stay
                </button>
                <span className="text-[#0D2A22]/20">•</span>
                <button
                  onClick={() => {
                    setIsConciergeOpen(false);
                    setCurrentPage('dining');
                  }}
                  className="flex items-center gap-1 hover:text-[#0D2A22] transition-colors cursor-pointer"
                >
                  <Utensils className="w-3 h-3 text-[#C8A96E]" /> Michelin Menu
                </button>
                <span className="text-[#0D2A22]/20">•</span>
                <button
                  onClick={() => {
                    setIsConciergeOpen(false);
                    setCurrentPage('spa');
                  }}
                  className="flex items-center gap-1 hover:text-[#0D2A22] transition-colors cursor-pointer"
                >
                  <Flower2 className="w-3 h-3 text-[#C8A96E]" /> Spa Rituals
                </button>
              </div>

              {/* Messages Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] p-4 rounded-sm text-xs font-sans leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#0D2A22] text-[#F7F8F5] shadow-sm'
                          : 'bg-white text-[#0D2A22] border border-[#0D2A22]/10'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                      <span
                        className={`block text-[9px] mt-2 font-mono ${
                          msg.sender === 'user' ? 'text-[#F7F8F5]/50' : 'text-[#C8A96E]'
                        }`}
                      >
                        {msg.timestamp}
                      </span>
                    </div>

                    {/* Quick Suggestion Chips */}
                    {msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5 max-w-[90%]">
                        {msg.suggestions.map((sug, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSend(sug)}
                            className="text-[10px] font-sans px-3 py-1.5 bg-white hover:bg-[#C8A96E] text-[#0D2A22] hover:text-[#0D2A22] border border-[#C8A96E]/40 rounded-sm transition-all duration-300 text-left font-medium cursor-pointer"
                          >
                            {sug}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-center gap-2 p-3 bg-white border border-[#0D2A22]/10 rounded-sm w-fit text-xs text-[#C8A96E] font-medium">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#C8A96E]" />
                    <span>Aurelia is composing a response...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-[#F7F8F5] border-t border-[#0D2A22]/10">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask Aurelia about suites, dining, spa, transfers..."
                    className="flex-1 bg-white border border-[#0D2A22]/10 focus:border-[#C8A96E] text-xs px-4 py-3 rounded-sm focus:outline-none text-[#0D2A22] placeholder-[#0D2A22]/40"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="p-3 bg-[#0D2A22] hover:bg-[#C8A96E] text-[#F7F8F5] hover:text-[#0D2A22] rounded-sm disabled:opacity-40 transition-colors shrink-0 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

