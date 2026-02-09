import { useState, useEffect } from "react";

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "👋 Hi! I’m CarbonBot. Ask me about emissions, goals, streaks, or eco tips 🌱",
    },
  ]);

  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);

  /* ======================
     🎤 Speech Recognition
     ====================== */
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
  }

  const startListening = () => {
    if (!recognition) {
      alert("Speech recognition not supported in this browser");
      return;
    }

    setListening(true);
    recognition.start();

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };
  };

  /* ======================
     🔊 Text to Speech
     ====================== */
  const speak = (text) => {
    if (!voiceOn || !window.speechSynthesis) return;

    const synth = window.speechSynthesis;
    const voices = synth.getVoices();

    const preferredVoice =
      voices.find(
        (v) => v.name.toLowerCase().includes("google") && v.lang === "en-US"
      ) || voices.find((v) => v.lang === "en-US");

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = preferredVoice || null;
    utterance.rate = 0.95;
    utterance.pitch = 1;

    synth.cancel();
    synth.speak(utterance);
  };

  useEffect(() => {
    window.speechSynthesis.getVoices();
  }, []);

  /* ======================
     💬 Send Message (BACKEND)
     ====================== */
  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");

    try {
      const res = await fetch("http://localhost:5001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          context: {
            emissions: {
              transport: 2.52,
              electricity: 18.86,
              food: 3.0,
              total: 24.38,
            },
            goal: 10,
            streak: 3,
          },
        }),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();

      const botReply = {
        role: "bot",
        text: data.reply,
      };

      setMessages((prev) => [...prev, botReply]);
      speak(data.reply);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "❌ Unable to reach server. Please try again.",
        },
      ]);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-950 flex justify-center px-6 py-10">
      <div className="w-full max-w-5xl bg-gray-900 border border-gray-800 rounded-2xl flex flex-col shadow-xl">

        {/* Header */}
        <div className="px-8 py-5 border-b border-gray-800 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold text-white">💬 CarbonBot</h2>
            <p className="text-gray-400 text-sm">
              Your personal sustainability assistant
            </p>
          </div>

          <button
            onClick={() => setVoiceOn((v) => !v)}
            className="text-sm px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800"
          >
            {voiceOn ? "🔊 Voice On" : "🔇 Muted"}
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[70%] px-5 py-3 rounded-2xl text-base leading-relaxed
                ${
                  msg.role === "user"
                    ? "ml-auto bg-green-600 text-white"
                    : "bg-gray-800 text-gray-200"
                }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-gray-800 px-6 py-4 flex items-center gap-3">
          <button
            onClick={startListening}
            className={`p-3 rounded-xl border
              ${
                listening
                  ? "bg-green-600 border-green-600"
                  : "border-gray-700 hover:bg-gray-800"
              }`}
            title="Speak"
          >
            🎤
          </button>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or speak your question…"
            className="flex-1 bg-gray-800 border border-gray-700 rounded-xl
                       px-5 py-3 text-base text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-green-500"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          <button
            onClick={handleSend}
            className="bg-green-600 hover:bg-green-700
                       text-white px-6 py-3 rounded-xl font-medium"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
