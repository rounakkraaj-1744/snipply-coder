'use client';

import { Paperclip, Mic, ArrowUp, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function ChatArea() {
    const [input, setInput] = useState("");
    const [status, setStatus] = useState<'idle' | 'generating'>('idle');
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
        setIsListening(!isListening);
        if (!isListening) {
            // Mock voice input
            setTimeout(() => {
                setIsListening(false);
                setInput(prev => prev + " (Voice input)");
            }, 1500);
        }
    };

    const handleSubmit = () => {
        if (!input.trim()) return;
        setStatus('generating');

        // Mock generation completion to reset (optional, or keep generic for demo)
        setTimeout(() => {
            setStatus('idle');
            setInput("");
        }, 4000);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const suggestions = [
        "Create a landing page",
        "Build a dashboard",
        "Design a blog",
        "Make a portfolio"
    ];

    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-2rem)] p-4 relative overflow-hidden transition-all duration-500 ease-out">

            <div className="max-w-3xl w-full space-y-8 z-10 relative">

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
                    <div className={`
                        relative flex flex-col bg-card border shadow-md rounded-2xl w-full transition-all duration-200 ease-out
                        ${status === 'generating' ? 'border-primary/50 ring-1 ring-primary/20 shadow-lg' : 'border-border focus-within:ring-1 focus-within:ring-primary/20 focus-within:border-primary/40'}
                    `}>

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
                            onKeyDown={handleKeyDown}
                            placeholder="Describe your app architecture..."
                            disabled={status === 'generating'}
                            className="w-full bg-transparent p-5 min-h-[60px] max-h-[200px] resize-none outline-none text-foreground placeholder:text-muted-foreground/60 text-lg leading-relaxed font-sans disabled:opacity-50 transition-opacity"
                            rows={1}
                        />

                        {/* Toolbar */}
                        <div className="flex items-center justify-between p-3 pl-4">
                            <div className="flex items-center gap-1">
                                <label className={`p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/40 rounded-full transition-colors cursor-pointer relative ${status === 'generating' ? 'pointer-events-none opacity-50' : ''}`} title="Attach file">
                                    <input type="file" className="hidden" onChange={handleFileChange} disabled={status === 'generating'} />
                                    <Paperclip className="w-5 h-5" />
                                </label>
                                <button
                                    onClick={toggleListening}
                                    className={`p-2 rounded-full transition-all duration-300 ${isListening ? 'text-destructive bg-destructive/10' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40'} ${status === 'generating' ? 'pointer-events-none opacity-50' : ''}`}
                                    title="Voice input"
                                    disabled={status === 'generating'}
                                >
                                    <Mic className={`w-5 h-5 ${isListening ? 'animate-pulse' : ''}`} />
                                </button>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-xs text-muted-foreground hidden md:inline-block pointer-events-none select-none">
                                    Use <kbd className="font-sans border border-border rounded px-1 bg-muted/20">⌘</kbd> + <kbd className="font-sans border border-border rounded px-1 bg-muted/20">Enter</kbd> to submit
                                </span>
                                <Button
                                    size="icon"
                                    onClick={handleSubmit}
                                    className={`rounded-xl transition-all duration-300 ${input.trim() || status === 'generating' ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`}
                                    disabled={!input.trim() || status === 'generating'}
                                >
                                    {status === 'generating' ? <div className="w-2 h-2 bg-primary-foreground rounded-full animate-bounce" /> : <ArrowUp className="w-5 h-5" />}
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Suggestions - only show when idle */}
                {status === 'idle' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
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
                )}

                {/* AI Thinking / Results Area - Progressive Disclosure */}
                <AnimatePresence>
                    {status === 'generating' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: 10, height: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="w-full space-y-6 pt-4 overflow-hidden"
                        >
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                                <span className="font-medium text-foreground">Analyzing request...</span>
                            </div>

                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <Skeleton className="h-32 w-full md:w-2/3 rounded-xl bg-secondary/30" />
                                    <div className="hidden md:block w-1/3 space-y-3">
                                        <Skeleton className="h-8 w-full rounded-lg bg-secondary/30" />
                                        <Skeleton className="h-8 w-3/4 rounded-lg bg-secondary/30" />
                                        <Skeleton className="h-8 w-5/6 rounded-lg bg-secondary/30" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Skeleton className="h-24 rounded-xl bg-secondary/30" />
                                    <Skeleton className="h-24 rounded-xl bg-secondary/30" />
                                    <Skeleton className="h-24 rounded-xl bg-secondary/30" />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}