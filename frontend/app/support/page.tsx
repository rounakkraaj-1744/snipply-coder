'use client';

import { HelpCircle, MessageCircle, Mail, FileText } from "lucide-react";
import { useState } from "react";

export default function SupportPage() {
    const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

    const faqs = [
        {
            question: "How do I upgrade my plan?",
            answer: "You can upgrade your plan at any time from the Settings > Billing page. Changes take effect immediately."
        },
        {
            question: "Can I export my code?",
            answer: "Yes! All projects built with Snipply can be exported as a ZIP file or deployed directly to Vercel/Netlify."
        },
        {
            question: "What happens if I run out of credits?",
            answer: "If you exceed your monthly credit limit, you can purchase additional credit packs or wait for your monthly refresh."
        },
        {
            question: "Is there a refund policy?",
            answer: "We offer a 14-day money-back guarantee for all new subscriptions if you're not satisfied with our service."
        }
    ];

    return (
        <div className="max-w-4xl mx-auto p-8 space-y-12">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                    <HelpCircle className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight">How can we help?</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Search our knowledge base or get in touch with our support team.
                </p>
            </div>

            {/* Contact Options */}
            <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow text-center space-y-4 cursor-pointer group">
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                        <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Live Chat</h3>
                        <p className="text-sm text-muted-foreground">Talk to our team in real-time.</p>
                    </div>
                </div>
                <div className="p-6 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow text-center space-y-4 cursor-pointer group">
                    <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                        <Mail className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Email Support</h3>
                        <p className="text-sm text-muted-foreground">Get a response within 24 hours.</p>
                    </div>
                </div>
                <div className="p-6 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow text-center space-y-4 cursor-pointer group">
                    <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mx-auto text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
                        <FileText className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Documentation</h3>
                        <p className="text-sm text-muted-foreground">Guides and API references.</p>
                    </div>
                </div>
            </div>

            {/* FAQ */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-border rounded-lg overflow-hidden bg-card">
                            <button
                                onClick={() => setActiveQuestion(activeQuestion === index ? null : index)}
                                className="flex items-center justify-between w-full p-4 text-left font-medium hover:bg-accent/50 transition-colors"
                            >
                                {faq.question}
                                <HelpCircle className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${activeQuestion === index ? 'rotate-180' : ''}`} />
                            </button>
                            {activeQuestion === index && (
                                <div className="p-4 pt-0 text-muted-foreground text-sm border-t border-border/50 bg-accent/20">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
