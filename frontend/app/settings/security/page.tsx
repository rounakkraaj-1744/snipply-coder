'use client';

import { Lock, Shield, Trash2, Smartphone } from "lucide-react";

export default function SecuritySettings() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Privacy & Security</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your password and security settings.
                </p>
            </div>

            <div className="space-y-6">
                {/* Password */}
                <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-4">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                        <Lock className="w-4 h-4 text-primary" />
                        Change Password
                    </h4>
                    <div className="space-y-4 max-w-md">
                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="current">Current Password</label>
                            <input
                                id="current"
                                type="password"
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="new">New Password</label>
                            <input
                                id="new"
                                type="password"
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            />
                        </div>
                        <div className="pt-2">
                            <button className="bg-secondary hover:bg-secondary/80 text-secondary-foreground h-9 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                                Update Password
                            </button>
                        </div>
                    </div>
                </div>

                {/* 2FA */}
                <div className="p-6 bg-card border border-border rounded-xl shadow-sm flex items-center justify-between">
                    <div className="space-y-1">
                        <h4 className="text-sm font-medium flex items-center gap-2">
                            <Smartphone className="w-4 h-4 text-primary" />
                            Two-Factor Authentication
                        </h4>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                    </div>
                    <button className="border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                        Enable 2FA
                    </button>
                </div>

                {/* Delete Account */}
                <div className="p-6 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/20 rounded-xl shadow-sm space-y-4">
                    <h4 className="text-sm font-medium text-red-600 dark:text-red-400 flex items-center gap-2">
                        <Trash2 className="w-4 h-4" />
                        Delete Account
                    </h4>
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground max-w-[80%]">
                            Permanently delete your account and all of your content. This action cannot be undone.
                        </p>
                        <button className="bg-red-600 text-white hover:bg-red-700 h-9 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
