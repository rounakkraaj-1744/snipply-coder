'use client';

import { MOCK_USER_PROFILE } from "@/lib/mock-data";
import { User, Mail, Moon, Sun, Laptop, Trash2, AlertTriangle } from "lucide-react";
import { useState } from "react";

export default function AccountSettings() {
    const user = MOCK_USER_PROFILE;
    const [theme, setTheme] = useState(user.theme);

    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h3 className="text-lg font-medium">Account Settings</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your account information and preferences.
                </p>
            </div>

            <div className="space-y-6">
                {/* Basic Info */}
                <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-4">
                    <h4 className="text-sm font-medium">Basic Information</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="name">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input
                                    id="name"
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pl-9 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    defaultValue={user.name}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="email">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input
                                    id="email"
                                    className="flex h-9 w-full rounded-md border border-input bg-muted px-3 py-1 pl-9 text-sm shadow-sm text-muted-foreground cursor-not-allowed"
                                    value={user.email}
                                    readOnly
                                />
                            </div>
                            <p className="text-[10px] text-muted-foreground">Email cannot be changed.</p>
                        </div>
                    </div>
                </div>

                {/* Preferences */}
                <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-4">
                    <h4 className="text-sm font-medium">Preferences</h4>
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">Interface Theme</label>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { value: 'light', label: 'Light', icon: Sun },
                                { value: 'dark', label: 'Dark', icon: Moon },
                                { value: 'system', label: 'System', icon: Laptop },
                            ].map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => setTheme(option.value as any)}
                                    className={`
                                        flex items-center justify-center gap-2 p-3 rounded-lg border text-sm font-medium transition-all cursor-pointer
                                        ${theme === option.value
                                            ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary/20'
                                            : 'border-input hover:border-primary/50 hover:bg-secondary/50 text-muted-foreground'
                                        }
                                    `}
                                >
                                    <option.icon className="w-4 h-4" />
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="p-6 border border-destructive/20 bg-destructive/5 rounded-xl space-y-4">
                    <div className="flex items-center gap-3 text-destructive">
                        <AlertTriangle className="w-5 h-5" />
                        <h4 className="text-sm font-medium">Danger Zone</h4>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-foreground">Delete Account</p>
                            <p className="text-xs text-muted-foreground">
                                Permanently remove your account and all of its contents. This action is not reversible.
                            </p>
                        </div>
                        <button className="bg-white hover:bg-destructive/10 text-destructive border border-destructive/30 shadow-sm px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer">
                            <Trash2 className="w-4 h-4" />
                            Delete Account
                        </button>
                    </div>
                </div>

                <div className="flex justify-end pt-2">
                    <button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">
                        Save changes
                    </button>
                </div>
            </div>
        </div>
    );
}
