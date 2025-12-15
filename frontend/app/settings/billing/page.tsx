'use client';

import { MOCK_BILLING_INFO } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { CreditCard, Download, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BillingPage() {
    const { plan, usage, paymentMethod, invoices } = MOCK_BILLING_INFO;

    const usagePercentage = Math.round((usage.projects / usage.projectsLimit) * 100);
    // Parse storage string "4.2GB" -> 4.2
    const storageValue = parseFloat(usage.storage);
    const storageLimitValue = parseFloat(usage.storageLimit);
    const storagePercentage = (storageValue / storageLimitValue) * 100;

    return (
        <div className="space-y-12 max-w-3xl animate-in fade-in duration-500">

            {/* Header */}
            <div className="border-b border-border pb-6">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">Billing & Plans</h2>
                <p className="text-sm text-muted-foreground mt-1">Manage subscription, payment method, and billing history.</p>
            </div>

            {/* Current Plan */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={cn(
                                        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border",
                                        plan.status === 'active' ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-secondary text-secondary-foreground"
                                    )}>
                                        <CheckCircle2 className="w-3 h-3 mr-1" />
                                        {plan.status.toUpperCase()}
                                    </span>
                                    <span className="text-sm text-muted-foreground">Renews on {new Date(plan.renewalDate).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-foreground">{plan.cost}</p>
                                <p className="text-xs text-muted-foreground">per month</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Projects</span>
                                    <span className="font-medium">{usage.projects} / {usage.projectsLimit}</span>
                                </div>
                                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary rounded-full transition-all duration-500"
                                        style={{ width: `${usagePercentage}%` }}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Storage</span>
                                    <span className="font-medium">{usage.storage} / {usage.storageLimit}</span>
                                </div>
                                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary rounded-full transition-all duration-500"
                                        style={{ width: `${storagePercentage}%` }}
                                    />
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground pt-2">
                                Usage resets on {new Date(usage.resetDate).toLocaleDateString()}.
                            </p>
                        </div>

                        <div className="flex gap-3 mt-6 pt-6 border-t border-border">
                            <Button variant="outline" size="sm">Change Plan</Button>
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                                Cancel Subscription
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="md:col-span-1">
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm h-full flex flex-col">
                        <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">Payment Method</h3>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-secondary rounded-md">
                                <CreditCard className="w-5 h-5 text-foreground" />
                            </div>
                            <div>
                                <p className="font-medium text-foreground">{paymentMethod.brand} •••• {paymentMethod.last4}</p>
                                <p className="text-xs text-muted-foreground">Expires {paymentMethod.expiry}</p>
                            </div>
                        </div>
                        <Button variant="link" className="px-0 text-primary h-auto text-sm mt-auto self-start">
                            Update card <ArrowUpRight className="w-3 h-3 ml-1" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* Invoices */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-foreground">Invoice History</h3>
                </div>

                <div className="border border-border rounded-xl overflow-hidden bg-card">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-secondary/30 text-muted-foreground uppercase text-xs font-medium">
                            <tr>
                                <th className="px-6 py-3">Invoice ID</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {invoices.map((invoice) => (
                                <tr key={invoice.id} className="hover:bg-secondary/20 transition-colors">
                                    <td className="px-6 py-4 font-mono text-xs">{invoice.id}</td>
                                    <td className="px-6 py-4">{invoice.date}</td>
                                    <td className="px-6 py-4 font-medium">{invoice.amount}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 uppercase tracking-widest">
                                            {invoice.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 text-xs cursor-pointer">
                                            <Download className="w-3 h-3" />
                                            PDF
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
