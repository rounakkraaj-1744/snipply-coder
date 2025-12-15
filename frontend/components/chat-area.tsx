'use client';

import { Paperclip, Mic, Terminal, ChevronRight, FileText, Code2, Layers, CheckCircle2, ArrowUp } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type GenerationStatus = 'idle' | 'analyzing' | 'structuring' | 'writing' | 'complete';

export default function ChatArea() {
    const [input, setInput] = useState("");
    const [status, setStatus] = useState<GenerationStatus>('idle');
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

    const handleSubmit = () => {
        if (!input.trim()) return;
        setStatus('analyzing');

        // Mock structured generation stages for "perceived performance" and "trust"
        setTimeout(() => setStatus('structuring'), 1200);
        setTimeout(() => setStatus('writing'), 2400);
        setTimeout(() => setStatus('complete'), 4000);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="flex-1 flex flex-col h-[calc(100vh-2rem)] p-4 md:p-8 max-w-5xl mx-auto w-full transition-all duration-300 ease-out">

            {status === 'idle' ? (
                <div className="flex-1 flex flex-col items-center justify-center space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-4"
                    >
                        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                            System Command
                        </h1>
                        <p className="text-muted-foreground font-light max-w-lg mx-auto">
                            Describe your architecture. Atlaso will generate the blueprint.
                        </p>
                    </motion.div>

                    <div className="w-full max-w-2xl relative">
                        <div className="relative flex flex-col bg-card border border-border shadow-sm rounded-lg w-full transition-all duration-200 focus-within:ring-1 focus-within:ring-primary/20 focus-within:border-primary/40">
                            <textarea
                                ref={textareaRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="e.g. Scalable microservices backend for e-commerce with Kafka and Redis..."
                                className="w-full bg-transparent p-4 min-h-[120px] resize-none outline-none text-foreground placeholder:text-muted-foreground/50 text-base font-mono leading-relaxed"
                            />
                            <div className="flex items-center justify-between p-3 bg-secondary/30 border-t border-border rounded-b-lg">
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                        <Paperclip className="w-4 h-4" />
                                    </Button>
                                    <span className="text-xs text-muted-foreground font-mono ml-2">
                                        CTRL + ENTER to execute
                                    </span>
                                </div>
                                <Button
                                    onClick={handleSubmit}
                                    disabled={!input.trim()}
                                    className="font-mono text-xs px-4"
                                >
                                    EXECUTE
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Header Status - authoritative and precise */}
                    <div className="flex items-center gap-3 border-b border-border pb-4 w-full">
                        <Terminal className="w-4 h-4 text-muted-foreground" />
                        <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                            STATUS: <span className={status === 'complete' ? "text-green-600" : "text-primary animate-pulse"}>{status.toUpperCase()}</span>
                        </span>
                        {status === 'complete' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="ml-auto"
                            >
                                <Button variant="ghost" size="sm" onClick={() => { setStatus('idle'); setInput(''); }} className="text-xs text-muted-foreground hover:text-foreground">
                                    New Command
                                </Button>
                            </motion.div>
                        )}
                    </div>

                    {/* Document Display - Structured, scannable, dense */}
                    <div className="flex-1 overflow-y-auto space-y-10 pr-4 pb-10 scrollbar-hide">
                        {/* Section 1: System Overview */}
                        <section className="space-y-4">
                            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                System Overview
                            </h2>
                            {status === 'analyzing' ? (
                                <div className="space-y-3 pt-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-[90%]" />
                                    <Skeleton className="h-4 w-[95%]" />
                                </div>
                            ) : (
                                <div className="bg-card border border-border p-6 rounded-lg shadow-sm">
                                    <p className="text-foreground text-sm leading-7">
                                        The proposed architecture implements a <span className="font-semibold">scalable, event-driven microservices pattern</span> tailored for high-volume transactions.
                                        Core components include an API Gateway for request routing, dedicated services for distinct business domains, and an asynchronous messaging layer for reliable state management.
                                    </p>
                                </div>
                            )}
                        </section>

                        {/* Section 2: Key Decisions */}
                        <section className="space-y-4">
                            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                Architectural Decisions
                            </h2>
                            {['analyzing', 'structuring'].includes(status) ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                    <Skeleton className="h-24 w-full rounded-md" />
                                    <Skeleton className="h-24 w-full rounded-md" />
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 border border-border rounded-lg bg-card">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckCircle2 className="w-4 h-4 text-primary" />
                                            <span className="font-mono text-xs text-muted-foreground uppercase">CONSISTENCY</span>
                                        </div>
                                        <h3 className="font-medium text-foreground text-sm">Eventual Consistency via Kafka</h3>
                                        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                                            Decouples ingestion from processing. Ensures high availability during write bursts.
                                        </p>
                                    </div>
                                    <div className="p-4 border border-border rounded-lg bg-card">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckCircle2 className="w-4 h-4 text-primary" />
                                            <span className="font-mono text-xs text-muted-foreground uppercase">CACHING</span>
                                        </div>
                                        <h3 className="font-medium text-foreground text-sm">Redis-First Read Layer</h3>
                                        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                                            Reduces DB load for frequently accessed data. Cache-aside pattern implemented.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </section>

                        {/* Section 3: Blueprint */}
                        <section className="space-y-4">
                            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                Component Blueprint
                            </h2>
                            {status !== 'complete' ? (
                                <div className="w-full h-64 border border-dashed border-border rounded-lg flex items-center justify-center bg-secondary/10">
                                    <div className="flex flex-col items-center gap-3">
                                        <Layers className="w-8 h-8 text-muted-foreground/40 animate-pulse" />
                                        <span className="text-xs font-mono text-muted-foreground">GENERATING DIAGRAM...</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full border border-border rounded-lg bg-card overflow-hidden">
                                    {/* Mock diagram representation */}
                                    <div className="bg-secondary/30 p-2 border-b border-border flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-border" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-border" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-border" />
                                        <span className="ml-2 text-[10px] font-mono text-muted-foreground">overview.mermaid</span>
                                    </div>
                                    <div className="p-8 flex items-center justify-center bg-background/50">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs font-mono w-full max-w-2xl">
                                            <div className="flex flex-col items-center gap-2 p-4 border border-foreground/10 rounded bg-card shadow-sm">
                                                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">GW</div>
                                                <span>API Gateway</span>
                                            </div>
                                            <div className="flex items-center justify-center">
                                                <div className="h-px w-full bg-foreground/20 relative">
                                                    <ChevronRight className="w-3 h-3 absolute right-0 top-1/2 -translate-y-1/2 text-foreground/40" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center gap-2 p-4 border border-foreground/10 rounded bg-card shadow-sm">
                                                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">SVC</div>
                                                <span>Order Service</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </section>

                        {status === 'complete' && (
                            <div className="pt-6 flex justify-end gap-3 pb-8">
                                <Button variant="ghost" className="font-mono text-xs text-muted-foreground">
                                    <FileText className="w-3 h-3 mr-2" />
                                    Export Spec
                                </Button>
                                <Button variant="outline" className="font-mono text-xs border-primary/20 hover:bg-primary/5">
                                    <Code2 className="w-3 h-3 mr-2" />
                                    View Code
                                </Button>
                                <Button className="font-mono text-xs">
                                    Create Project
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}