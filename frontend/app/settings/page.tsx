'use client';

import { MOCK_USER_PROFILE } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Smartphone, Laptop, Trash2, LogOut, Moon, Sun, Monitor, AlertCircle, Copy } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils'; // Assuming utils exists

export default function SettingsPage() {
    const [theme, setTheme] = useState(MOCK_USER_PROFILE.preferences.theme);
    const [copied, setCopied] = useState(false);

    const handleCopyId = () => {
        navigator.clipboard.writeText(MOCK_USER_PROFILE.id);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-12 max-w-3xl animate-in fade-in duration-500">
            {/* Header */}
            <div className="border-b border-border pb-6">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">Account</h2>
                <p className="text-sm text-muted-foreground mt-1">Manage your identity and preferences.</p>
            </div>

            {/* Identity Section */}
            <section className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Display Name
                        </label>
                        <input
                            type="text"
                            defaultValue={MOCK_USER_PROFILE.name}
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={MOCK_USER_PROFILE.email}
                            disabled
                            className="flex h-9 w-full rounded-md border border-input bg-muted/50 px-3 py-1 text-sm text-muted-foreground shadow-sm cursor-not-allowed"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">User ID</label>
                    <div
                        onClick={handleCopyId}
                        className="flex items-center justify-between w-full p-2 border border-input rounded-md bg-muted/30 text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer group"
                    >
                        <span>{MOCK_USER_PROFILE.id}</span>
                        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-[10px]">{copied ? 'Copied' : 'Copy'}</span>
                            <Copy className="w-3 h-3" />
                        </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground">Used for API authentication and support.</p>
                </div>
            </section>

            {/* Preferences Section */}
            <section className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium text-foreground">Preferences</h3>
                    <p className="text-sm text-muted-foreground">Customize your workspace experience.</p>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-sm font-medium">Interface Theme</p>
                            <p className="text-xs text-muted-foreground">Select your preferred color scheme.</p>
                        </div>
                        <div className="flex items-center p-1 bg-secondary rounded-lg border border-border">
                            {(['light', 'system', 'dark'] as const).map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTheme(t)}
                                    className={cn(
                                        "p-2 rounded-md transition-all cursor-pointer",
                                        theme === t ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                                    )}
                                    title={`Switch to ${t} theme`}
                                >
                                    {t === 'light' && <Sun className="w-4 h-4" />}
                                    {t === 'dark' && <Moon className="w-4 h-4" />}
                                    {t === 'system' && <Monitor className="w-4 h-4" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Sessions Section */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-medium text-foreground">Active Sessions</h3>
                        <p className="text-sm text-muted-foreground">Manage devices logged into your account.</p>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                        Sign out of all sessions
                    </Button>
                </div>

                <div className="rounded-lg border border-border overflow-hidden bg-card">
                    <div className="divide-y divide-border">
                        {MOCK_USER_PROFILE.sessions.map((session) => (
                            <div key={session.id} className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-secondary rounded-full text-muted-foreground">
                                        {session.device.toLowerCase().includes('phone') ? <Smartphone className="w-5 h-5" /> : <Laptop className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">
                                            {session.device}
                                            {session.isCurrent && <span className="ml-2 text-[10px] bg-emerald-500/10 text-emerald-600 px-1.5 py-0.5 rounded-full border border-emerald-500/20 font-semibold tracking-wide">CURRENT</span>}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            {session.location} • Last active {session.lastActive}
                                        </p>
                                    </div>
                                </div>
                                {!session.isCurrent && (
                                    <button className="text-muted-foreground hover:text-destructive p-2 hover:bg-destructive/10 rounded-md transition-colors cursor-pointer" title="Revoke session">
                                        <LogOut className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Danger Zone */}
            <section className="pt-6 border-t border-border">
                <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-6">
                    <h3 className="text-base font-semibold text-destructive flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Danger Zone
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 mb-4">
                        Deleting your account is irreversible. All projects, templates, and data will be permanently removed.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                            Account created on {new Date(MOCK_USER_PROFILE.createdAt).toLocaleDateString()}
                        </span>
                        <Button variant="destructive" size="sm" className="gap-2">
                            <Trash2 className="w-4 h-4" />
                            Delete Account
                        </Button>
                    </div>
                </div>

                <div className="flex justify-end pt-2">
                    <button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">
                        Save changes
                    </button>
                </div>
            </section>
        </div>
    );
}
