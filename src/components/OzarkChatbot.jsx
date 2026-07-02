import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {  FaPaperPlane, FaTimes, FaSpinner} from "react-icons/fa";

const OzarkChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm Ozark AI, Olumide's portfolio assistant. Ask me anything about his projects, experience, technical thoughts, or educational background!",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const chatEndRef = useRef(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5002";

  // Scroll to bottom whenever messages list changes
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const predefinedPrompts = [
    "Tell me about Olumide's projects",
    "What is Olumide's work experience?",
    "Tell me about his OpenSS project",
    "Summarize his technical thoughts",
  ];

  const handleSend = async (textToSend) => {
    const query = textToSend || message;
    if (!query.trim() || isLoading) return;

    // Add user message
    const userMsg = { role: "user", content: query };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setMessage("");
    setIsLoading(true);
    setError(null);

    // Format history for the backend (excluding the very first welcome message)
    const history = updatedMessages
      .slice(1, -1) // skip the initial system welcome, and the current query itself
      .map((msg) => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content,
      }));

    try {
      const response = await fetch(`${apiBaseUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: query,
          history,
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Rate limit exceeded. Please try again later.");
        }
        throw new Error("Failed to get response from Ozark AI.");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch (err) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I ran into a connection issue. Please make sure the backend is running and try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 print:hidden font-sans">
      <AnimatePresence>
        {/* Chat window panel */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[360px] sm:w-[400px] h-[500px] sm:h-[550px] bg-wixWhite/95 dark:bg-wixDarkCard/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-wixAccent text-white flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                
                <div>
                  <h3 className="font-bold text-base leading-tight">Ozark AI</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                
                    <span className="text-[10px] text-white/80 font-medium">Portfolio Assistant</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-white/10 transition-colors text-white cursor-pointer"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* Messages box */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-wixDark/20">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-wixAccent text-white rounded-br-none"
                        : "bg-white dark:bg-gray-800 text-wixText dark:text-wixWhite rounded-bl-none border border-gray-100 dark:border-gray-700/50"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 text-wixText dark:text-wixWhite border border-gray-100 dark:border-gray-700/50 rounded-2xl rounded-bl-none px-4 py-3 text-sm flex items-center gap-2 shadow-sm">
                    <FaSpinner className="animate-spin text-wixAccent" />
                    <span>Ozark is thinking...</span>
                  </div>
                </div>
              )}
              {error && (
                <div className="p-2.5 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-xl text-xs text-center border border-red-100 dark:border-red-950/40">
                  {error}
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Predefined prompt pills (visible only when starting out or idle) */}
            {messages.length === 1 && !isLoading && (
              <div className="px-4 py-2.5 bg-gray-50/50 dark:bg-wixDark/20 border-t border-gray-100 dark:border-gray-800/60">
                <span className="text-[10px] uppercase font-bold tracking-wider text-wixTextSecondary dark:text-wixDarkTextSecondary mb-2 block">
                  Suggested Queries
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {predefinedPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(prompt)}
                      className="text-xs font-semibold px-3 py-1.5 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-750 text-wixTextSecondary dark:text-wixDarkTextSecondary hover:text-wixAccent dark:hover:text-wixWhite border border-gray-150 dark:border-gray-700 rounded-full transition-all cursor-pointer shadow-sm"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input area */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-wixDarkCard flex items-center gap-2"
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about projects, experience, or skills..."
                className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:border-wixAccent dark:focus:border-wixAccent text-wixText dark:text-wixWhite"
              />
              <button
                type="submit"
                disabled={!message.trim() || isLoading}
                className="p-3 bg-wixAccent hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center flex-shrink-0"
              >
                <FaPaperPlane className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating pill button */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-5 py-3.5 bg-wixAccent hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer font-bold text-sm tracking-wide"
        >
          <span>Ask Ozark AI</span>
        </motion.button>
      )}
    </div>
  );
};

export default OzarkChatbot;
