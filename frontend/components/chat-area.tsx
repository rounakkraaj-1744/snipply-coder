'use client';

import { Paperclip, Mic, ArrowUp } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ChatArea() {
    const [input, setInput] = useState("");
    const [username] = useState("John"); // Ideally fetched from auth context
    const [isListening, setIsListening] = useState(false);
    const [attachment, setAttachment] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAttachment(e.target.files[0]);
        }
    };

    const toggleListening = () => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            if (!isListening) {
                // Mock listening start - in a real app, instantiate SpeechRecognition
                setIsListening(true);
                setTimeout(() => {
                    setIsListening(false);
                    setInput(prev => prev + " (Voice input simulation)");
                }, 3000);
            } else {
                setIsListening(false);
            }
        } else {
            alert("Speech recognition isn't supported in this browser.");
        }
    };

    const suggestions = [
        "Create a landing page",
        "Build a dashboard",
        "Design a blog",
        "Make a portfolio"
    ];

    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-2rem)] p-4">
            <div className="max-w-3xl w-full space-y-8">

                {/* Greeting */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center space-y-2"
                >
                    <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-4xl">
                        <span className="text-primary">{username}</span>, what are we building today???
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        I can help you build web apps, websites, and more.
                    </p>
                </motion.div>

                {/* Input Area */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="relative group"
                >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                    <div className="relative flex flex-col bg-card border border-border rounded-xl shadow-lg ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 transition-all">
                        {attachment && (
                            <div className="px-4 pt-4">
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                    <Paperclip className="w-3 h-3" />
                                    {attachment.name}
                                    <button onClick={() => setAttachment(null)} className="ml-1 hover:text-destructive">&times;</button>
                                </span>
                            </div>
                        )}
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Describe your app..."
                            className="w-full bg-transparent p-4 min-h-[120px] resize-none outline-none text-foreground placeholder:text-muted-foreground/70"
                        />

                        {/* Toolbar */}
                        <div className="flex items-center justify-between p-3 border-t border-border/50 bg-muted/30 rounded-b-xl">
                            <div className="flex items-center gap-2">
                                <label className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors cursor-pointer relative">
                                    <input type="file" className="hidden" onChange={handleFileChange} />
                                    <Paperclip className="w-5 h-5" />
                                </label>
                                <button
                                    onClick={toggleListening}
                                    className={`p-2 rounded-md transition-colors ${isListening ? 'text-red-500 bg-red-100 animate-pulse' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}
                                >
                                    <Mic className="w-5 h-5" />
                                </button>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`
                                    p-2 rounded-lg transition-all duration-200
                                    ${input.trim()
                                        ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm'
                                        : 'bg-muted text-muted-foreground cursor-not-allowed'
                                    }
                                `}
                                disabled={!input.trim()}
                            >
                                <ArrowUp className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Suggestions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex justify-center flex-wrap gap-2"
                >
                    {suggestions.map((suggestion) => (
                        <motion.button
                            key={suggestion}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setInput(suggestion)}
                            className="px-4 py-2 text-sm bg-card border border-border rounded-full hover:border-primary/50 hover:bg-accent/50 hover:text-accent-foreground transition-all duration-200 text-muted-foreground shadow-sm"
                        >
                            {suggestion}
                        </motion.button>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}