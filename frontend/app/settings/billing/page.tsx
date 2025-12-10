'use client';

import { Check, CreditCard, Zap, Download } from "lucide-react";

export default function BillingSettings() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Billing & Plans</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your subscription plan and payment methods.
                </p>
            </div>

            {/* Current Plan */}
            <div className="p-6 bg-gradient-to-br from-primary/10 via-card to-card border border-primary/20 rounded-xl shadow-sm space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Zap className="w-32 h-32" />
                </div>
                <div className="relative">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-lg font-semibold text-primary">Pro Plan</h4>
                            <p className="text-sm text-muted-foreground">You are currently on the Pro plan.</p>
                        </div>
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
                            Active
                        </span>
                    </div>

                    <div className="mt-6 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="font-medium">Credits Used</span>
                            <span className="text-muted-foreground">2,450 / 5,000</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[49%]" />
                        </div>
                        <p className="text-xs text-muted-foreground">Renewal on Jan 12, 2026</p>
                    </div>
                </div>
            </div>

            {/* Available Plans */}
            <div className="grid gap-6 md:grid-cols-2">
                <div className="p-6 bg-card border border-border rounded-xl shadow-sm flex flex-col">
                    <div className="mb-4">
                        <h4 className="font-semibold">Free</h4>
                        <div className="text-2xl font-bold mt-2">$0<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                        <p className="text-sm text-muted-foreground mt-1">Perfect for getting started.</p>
                    </div>
                    <ul className="space-y-2 mb-6 flex-1 text-sm">
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> 500 Credits/mo</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Community Support</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Basic Analytics</li>
                    </ul>
                    <button className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground h-9 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                        Downgrade
                    </button>
                </div>
                <div className="p-6 bg-card border border-primary rounded-xl shadow-md ring-1 ring-primary/20 flex flex-col relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                        Current Plan
                    </div>
                    <div className="mb-4">
                        <h4 className="font-semibold">Pro</h4>
                        <div className="text-2xl font-bold mt-2">$29<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                        <p className="text-sm text-muted-foreground mt-1">For power users and pros.</p>
                    </div>
                    <ul className="space-y-2 mb-6 flex-1 text-sm">
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> 5,000 Credits/mo</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Priority Support</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Advanced Analytics</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Private Projects</li>
                    </ul>
                    <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-9 px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-default opacity-80" disabled>
                        Current Plan
                    </button>
                </div>
            </div>

            {/* Invoice History */}
            <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-4">
                <h4 className="text-sm font-medium">Invoice History</h4>
                <div className="divide-y divide-border">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-secondary rounded-full">
                                    <CreditCard className="w-4 h-4 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Pro Plan - Monthly</p>
                                    <p className="text-xs text-muted-foreground">Dec 12, 2025</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium">$29.00</span>
                                <button className="p-2 hover:bg-secondary rounded-md text-muted-foreground hover:text-foreground transition-colors">
                                    <Download className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
