import React, { useState } from "react";
import { X, Send, Sparkles, Bot, User } from "lucide-react";
import { useApp } from "../../context/AppContext.jsx";

export const AICounselorModal = () => {
  const { profile } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Namaste! I am your StudyPath AI Study Abroad Advisor. Ask me anything about admission criteria, APS certificate for Germany, Canada GIC, UK Graduate Route visa, or scholarships in INR!",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const sampleQuestions = [
    "How do I get an APS certificate for Germany?",
    "Can I apply for UK Master’s with a 3-year B.Com / B.Sc degree?",
    "What is the living expense for Ireland in INR?",
    "What are the DSU scholarship rules in Italy?",
  ];

  const handleSend = async (questionText) => {
    const textToSend = questionText || inputValue.trim();
    if (!textToSend || loading) return;

    setMessages((prev) => [...prev, { sender: "user", text: textToSend }]);
    setInputValue("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-counselor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: textToSend,
          context: profile || {},
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [...prev, { sender: "ai", text: data.answer }]);
      } else {
        throw new Error("Server response was not ok");
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
            "Here is the standard guidance for Indian students:\n\n" +
            "• **Academic Eligibility:** Most European and UK universities accept 60%+ from recognized Indian institutions.\n" +
            "• **Financial Proof:** Germany requires €11,904 in a Sperrkonto; Canada requires $20,635 CAD in a GIC; UK requires tuition + living for 28 days.\n" +
            "• *Note: Match data is estimated. Confirm with official embassy advisories.*",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          aria-label="Open AI Overseas Counselor chat"
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all font-semibold text-sm group"
        >
          <div className="relative">
            <Bot className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white dark:border-slate-900"></span>
          </div>
          <span className="hidden sm:inline">Ask AI Counselor</span>
        </button>
      </div>

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 w-[92vw] sm:w-[420px] h-[550px] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col z-50 overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h4 className="font-bold text-sm">StudyPath AI Counselor</h4>
                <p className="text-[11px] text-blue-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full"></span>{" "}
                  Live guidance for Indian students
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              type="button"
              aria-label="Close counselor chat"
              className="p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50 dark:bg-slate-950/40 text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "ai" && (
                  <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80 rounded-tl-none shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === "user" && (
                  <div className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 p-2 text-xs">
                <Bot className="w-4 h-4 animate-spin text-blue-600" />
                <span>AI Counselor is evaluating guidelines...</span>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-1.5 overflow-x-auto scrollbar-none">
            {sampleQuestions.slice(0, 2).map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(q)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-slate-700 dark:text-slate-300 text-[10px] font-medium transition-colors border border-slate-200 dark:border-slate-700 shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about admissions, visas, or costs..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 border-none focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || loading}
                aria-label="Send query"
                className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-1 text-[9px] text-center text-slate-400">
              AI recommendations are estimates. Never guarantees visa or
              admission.
            </div>
          </div>
        </div>
      )}
    </>
  );
};
