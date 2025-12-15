'use client';

import { MOCK_PRIVACY_SETTINGS } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Shield, Key, Eye, FileText, Download, Trash2, Smartphone, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function SecurityPage() {
    const { dataUsage, security, accessLogs } = MOCK_PRIVACY_SETTINGS;
    const [optOut, setOptOut] = useState(dataUsage.trainingOptOut);
    const [tfa, setTfa] = useState(security.twoFactorEnabled);

    return (
        <div className="space-y-12 max-w-3xl animate-in fade-in duration-500">
            {/* Header */}
            <div className="border-b border-border pb-6">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">Privacy & Security</h2>
                <p className="text-sm text-muted-foreground mt-1">Control your data, security preferences, and access logs.</p>
            </div>

            {/* AI Privacy & Data Usage */}
            <section className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                        <Eye className="w-4 h-4 text-primary" />
                        AI Service Privacy
                    </h3>
                    <p className="text-sm text-muted-foreground">Manage how your data interacts with our AI models.</p>
                </div>

                <div className="bg-card border border-border rounded-xl divide-y divide-border">
                    <div className="p-6 flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-foreground">Model Training Opt-out</p>
                            <p className="text-xs text-muted-foreground max-w-md">
                                When enabled, your project data and prompts will not be used to improve our models.
                                <span className="block mt-1 text-emerald-600 dark:text-emerald-500">Your data is yours. We do not sell it.</span>
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={optOut} onChange={() => setOptOut(!optOut)} className="sr-only peer" />
                            <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-background after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>

                    <div className="p-6 flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-foreground">Conversation Retention</p>
                            <p className="text-xs text-muted-foreground max-w-lg">
                                Determines how long we store your chat history for context continuity.
                            </p>
                        </div>
                        <select
                            className="bg-transparent text-sm border border-input rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                            defaultValue={dataUsage.conversationRetention}
                        >
                            <option value="indefinite">Indefinite (Recommended)</option>
                            <option value="30_days">30 Days</option>
                            <option value="no_retention">No Retention</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* Security Controls */}
            <section className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                        <Shield className="w-4 h-4 text-primary" />
                        Security
                    </h3>
                    <p className="text-sm text-muted-foreground">Protect your account with verification and encryption.</p>
                </div>

                <div className="bg-card border border-border rounded-xl divide-y divide-border">
                    <div className="p-6 flex items-center justify-between">
                        <div className="flex gap-4">
                            <div className="p-2 bg-secondary rounded-lg self-start">
                                <Key className="w-5 h-5 text-foreground" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-foreground">Password</p>
                                <p className="text-xs text-muted-foreground">Last changed on {new Date(security.passwordLastChanged).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm">Change Password</Button>
                    </div>

                    <div className="p-6 flex items-center justify-between">
                        <div className="flex gap-4">
                            <div className="p-2 bg-secondary rounded-lg self-start">
                                <Smartphone className="w-5 h-5 text-foreground" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                                <p className="text-xs text-muted-foreground max-w-md">Add an extra layer of security to your account.</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={tfa} onChange={() => setTfa(!tfa)} className="sr-only peer" />
                            <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-background after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>
                </div>
            </section>

            {/* Access Logs */}
            <section className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" />
                        Access Logs
                    </h3>
                    <p className="text-sm text-muted-foreground">Recent activity on your account.</p>
                </div>

                <div className="border border-border rounded-xl overflow-hidden bg-card">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-secondary/30 text-muted-foreground uppercase text-xs font-medium">
                            <tr>
                                <th className="px-6 py-3">Event</th>
                                <th className="px-6 py-3">Location</th>
                                <th className="px-6 py-3">IP Address</th>
                                <th className="px-6 py-3 text-right">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {accessLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-secondary/20 transition-colors">
                                    <td className="px-6 py-4 font-medium">{log.event}</td>
                                    <td className="px-6 py-4 text-muted-foreground">{log.location}</td>
                                    <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{log.ip}</td>
                                    <td className="px-6 py-4 text-right text-muted-foreground">{log.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Data Rights */}
            <section className="space-y-6 pt-6 border-t border-border">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-base font-semibold text-foreground">Data Rights</h3>
                        <p className="text-sm text-muted-foreground">Export a copy of your personal data or request deletion.</p>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="outline" size="sm" className="gap-2">
                            <Download className="w-4 h-4" />
                            Export Data
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
