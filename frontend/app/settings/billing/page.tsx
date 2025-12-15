'use client';

import { MOCK_BILLING_INFO } from "@/lib/mock-data";
import { Check, CreditCard, Zap, Download, AlertCircle } from "lucide-react";

export default function BillingSettings() {
    const billing = MOCK_BILLING_INFO;

    // Parse usage string for progress bar (mock logic)
    // "2,450 / 5,000 credits" -> 49%
    const usageParts = billing.usage.replace(/,/g, '').match(/(\d+)\s*\/\s*(\d+)/);
    const usagePercent = usageParts ? (parseInt(usageParts[1]) / parseInt(usageParts[2])) * 100 : 0;

    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h3 className="text-lg font-medium">Billing & Plans</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your subscription plan and payment methods.
                </p>
            </div>

            {/* Current Plan Card */}
            <div className="p-6 bg-gradient-to-br from-primary/5 via-card to-card border border-primary/20 rounded-xl shadow-sm space-y-6 relative overflow-hidden text-foreground">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <Zap className="w-48 h-48 -rotate-12" />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h4 className="text-xl font-semibold text-foreground flex items-center gap-2">
                                {billing.plan}
                                <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20 uppercase tracking-wide">
                                    Active
                                </span>
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                                Your next billing date is <span className="font-medium text-foreground">January 12, 2024</span>.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3 p-4 bg-background/50 backdrop-blur-sm rounded-lg border border-border/50">
                        <div className="flex justify-between text-sm">
                            <span className="font-medium flex items-center gap-2">
                                CREDITS USAGE
                                <span className="text-muted-foreground font-normal text-xs">(Resets monthly)</span>
                            </span>
                            <span className="font-mono text-primary">{billing.usage}</span>
                        </div>
                        <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-500 rounded-full"
                                style={{ width: `${usagePercent}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Method */}
            <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-4">
                <h4 className="text-sm font-medium">Payment Method</h4>
                <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-secondary/10">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-card border border-border rounded-md shadow-sm">
                            <CreditCard className="w-5 h-5 text-foreground" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-foreground">{billing.paymentMethod}</p>
                            <p className="text-xs text-muted-foreground">Expires 12/25</p>
                        </div>
                    </div>
                    <button className="text-sm text-primary hover:underline font-medium cursor-pointer">
                        Update
                    </button>
                </div>
            </div>

            {/* Invoice History */}
            <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Invoice History</h4>
                    <button className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 cursor-pointer">
                        View all
                    </button>
                </div>

                {billing.invoices.length > 0 ? (
                    <div className="divide-y divide-border rounded-lg border border-border overflow-hidden">
                        {billing.invoices.map((invoice) => (
                            <div key={invoice.id} className="flex items-center justify-between p-4 bg-card hover:bg-secondary/20 transition-colors group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-secondary rounded-full text-muted-foreground group-hover:text-primary transition-colors">
                                        <Download className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">{invoice.amount}</p>
                                        <p className="text-xs text-muted-foreground">{invoice.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-md uppercase">Paid</span>
                                    <button className="p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer" title="Download PDF">
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-muted-foreground">
                        <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-20" />
                        <p className="text-sm">No invoices found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
