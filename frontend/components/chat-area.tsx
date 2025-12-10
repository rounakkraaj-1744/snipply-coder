'use client';

import { Paperclip, Mic, ArrowUp } from "lucide-react";
import { useState } from "react";

export default function ChatArea() {
    const [input, setInput] = useState("");
    const [username] = useState("John"); // Ideally fetched from auth context

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
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-4xl">
                        <span className="text-primary">{username}</span>, what are we building today???
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        I can help you build web apps, websites, and more.
                    </p>
                </div>

                {/* Input Area */}
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                    <div className="relative flex flex-col bg-card border border-border rounded-xl shadow-lg ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 transition-all">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Describe your app..."
                            className="w-full bg-transparent p-4 min-h-[120px] resize-none outline-none text-foreground placeholder:text-muted-foreground/70"
                        />

                        {/* Toolbar */}
                        <div className="flex items-center justify-between p-3 border-t border-border/50 bg-muted/30 rounded-b-xl">
                            <div className="flex items-center gap-2">
                                <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors">
                                    <Paperclip className="w-5 h-5" />
                                </button>
                                <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors">
                                    <Mic className="w-5 h-5" />
                                </button>
                            </div>
                            <button
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
                            </button>
                        </div>
                    </div>
                </div>

                {/* Suggestions */}
                <div className="flex justify-center flex-wrap gap-2">
                    {suggestions.map((suggestion) => (
                        <button
                            key={suggestion}
                            onClick={() => setInput(suggestion)}
                            className="px-4 py-2 text-sm bg-card border border-border rounded-full hover:border-primary/50 hover:bg-accent/50 hover:text-accent-foreground transition-all duration-200 text-muted-foreground shadow-sm"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}