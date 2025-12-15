'use client';

import { Paperclip, Mic, ArrowUp } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function ChatArea() {
    const [input, setInput] = useState("");
    const [username] = useState("John");
    const [isListening, setIsListening] = useState(false);
    const [attachment, setAttachment] = useState<File | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    }, [input]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAttachment(e.target.files[0]);
        }
    };

    const toggleListening = () => {
        // Mock listening interaction
        setIsListening(!isListening);
        if (!isListening) {
            setTimeout(() => {
                setIsListening(false);
                setInput(prev => prev + " (Voice input)");
            }, 2000);
        }
    };

    const suggestions = [
        "Create a landing page",
        "Build a dashboard",
        "Design a blog",
        "Make a portfolio"
    ];

    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-2rem)] p-4 relative overflow-hidden">

            <div className="max-w-3xl w-full space-y-12 z-10 relative">

                {/* Greeting - Clean and minimal */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center space-y-4"
                >
                    <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground">
                        What are we building?
                    </h1>
                    <p className="text-lg text-muted-foreground font-light max-w-lg mx-auto leading-relaxed">
                        Describe your system, and I'll generate the architecture and code.
                    </p>
                </motion.div>

                {/* Input Area - Calm and contained */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                    className="relative w-full"
                >
                    <div className="relative flex flex-col bg-card border border-border shadow-md rounded-2xl w-full focus-within:ring-1 focus-within:ring-primary/20 focus-within:border-primary/40 transition-all duration-300">

                        {attachment && (
                            <div className="px-4 pt-4 animate-in fade-in slide-in-from-bottom-2">
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border text-sm text-foreground">
                                    <Paperclip className="w-3.5 h-3.5" />
                                    {attachment.name}
                                    <button onClick={() => setAttachment(null)} className="ml-1 hover:text-destructive transition-colors">&times;</button>
                                </span>
                            </div>
                        )}

                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Describe your app architecture..."
                            className="w-full bg-transparent p-5 min-h-[60px] max-h-[200px] resize-none outline-none text-foreground placeholder:text-muted-foreground/60 text-lg leading-relaxed font-sans"
                            rows={1}
                        />

                        {/* Toolbar */}
                        <div className="flex items-center justify-between p-3 pl-4">
                            <div className="flex items-center gap-1">
                                <label className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/40 rounded-full transition-colors cursor-pointer relative" title="Attach file">
                                    <input type="file" className="hidden" onChange={handleFileChange} />
                                    <Paperclip className="w-5 h-5" />
                                </label>
                                <button
                                    onClick={toggleListening}
                                    className={`p-2 rounded-full transition-all duration-300 ${isListening ? 'text-destructive bg-destructive/10' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40'}`}
                                    title="Voice input"
                                >
                                    <Mic className={`w-5 h-5 ${isListening ? 'animate-pulse' : ''}`} />
                                </button>
                            </div>

                            <Button
                                size="icon"
                                className={`rounded-xl transition-all duration-300 ${input.trim() ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`}
                                disabled={!input.trim()}
                            >
                                <ArrowUp className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </motion.div>

                {/* Suggestions - Subtle and minimal */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="flex justify-center flex-wrap gap-2"
                >
                    {suggestions.map((suggestion, idx) => (
                        <button
                            key={suggestion}
                            onClick={() => setInput(suggestion)}
                            className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground bg-transparent border border-transparent hover:border-border/60 hover:bg-secondary/20 rounded-full transition-all duration-200 cursor-pointer"
                        >
                            {suggestion}
                        </button>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}