"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Chrome, ArrowRight, Sparkles } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSocialLogin = async (provider: "github" | "google") => {
        setLoading(provider);
        setError(null);
        try {
            await authClient.signIn.social({
                provider,
                callbackURL: "/",
            });
        } catch (err: any) {
            setError("Authentication failed. Please try again.");
            setLoading(null);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
            {/* Ambient backgrounds */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full max-w-md p-6"
            >
                <div className="bg-card/50 backdrop-blur-xl border border-border/40 rounded-2xl p-8 shadow-2xl">
                    <div className="flex flex-col items-center mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: 0.1,
                            }}
                            className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary"
                        >
                            <Sparkles className="w-6 h-6" />
                        </motion.div>
                        <h1 className="text-2xl font-bold tracking-tight mb-2 text-foreground">
                            Welcome back
                        </h1>
                        <p className="text-muted-foreground text-center text-sm">
                            Sign in to continue to your workspace
                        </p>
                    </div>

                    <div className="space-y-4">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={!!loading}
                            onClick={() => handleSocialLogin("github")}
                            className="w-full relative group overflow-hidden bg-white dark:bg-card border border-gray-200 dark:border-border/50 hover:bg-gray-50 dark:hover:bg-white/5 text-stone-900 dark:text-foreground h-12 rounded-xl font-medium transition-all flex items-center justify-center gap-3"
                        >
                            <Github className="w-5 h-5" />
                            <span>Continue with GitHub</span>
                            {loading === "github" && (
                                <div className="absolute inset-0 bg-white/50 dark:bg-background/50 flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                </div>
                            )}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={!!loading}
                            onClick={() => handleSocialLogin("google")}
                            className="w-full relative group overflow-hidden bg-white dark:bg-card border border-gray-200 dark:border-border/50 hover:bg-gray-50 dark:hover:bg-white/5 text-stone-900 dark:text-foreground h-12 rounded-xl font-medium transition-all flex items-center justify-center gap-3"
                        >
                            <Chrome className="w-5 h-5" />
                            <span>Continue with Google</span>
                            {loading === "google" && (
                                <div className="absolute inset-0 bg-white/50 dark:bg-background/50 flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                </div>
                            )}
                        </motion.button>
                    </div>

                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 text-xs text-red-500 text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20"
                        >
                            {error}
                        </motion.p>
                    )}

                    <div className="mt-8 pt-6 border-t border-border/50 text-center text-balance">
                        <p className="text-xs text-muted-foreground">
                            By continuing, you agree to our{" "}
                            <a href="#" className="underline hover:text-foreground transition-colors">
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="#" className="underline hover:text-foreground transition-colors">
                                Privacy Policy
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
