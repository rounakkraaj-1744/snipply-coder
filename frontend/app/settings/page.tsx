'use client';

import { User, Mail, Camera } from "lucide-react";

export default function AccountSettings() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Account Settings</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your account information and preferences.
                </p>
            </div>

            <div className="space-y-6">
                {/* Profile Picture */}
                <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-4">
                    <h4 className="text-sm font-medium">Profile Picture</h4>
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center text-3xl font-bold text-secondary-foreground relative overflow-hidden group">
                            <span className="group-hover:opacity-20 transition-opacity">JD</span>
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <Camera className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <button className="text-sm font-medium bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-md transition-colors">
                                Upload new picture
                            </button>
                            <p className="text-xs text-muted-foreground">
                                JPG, GIF or PNG. Max size of 800K.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Personal Information */}
                <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-4">
                    <h4 className="text-sm font-medium">Personal Information</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="firstName">
                                First name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input
                                    id="firstName"
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pl-9 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="John"
                                    defaultValue="John"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="lastName">
                                Last name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input
                                    id="lastName"
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pl-9 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Doe"
                                    defaultValue="Doe"
                                />
                            </div>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
                                Email address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input
                                    id="email"
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pl-9 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="john.doe@example.com"
                                    defaultValue="john.doe@example.com"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end pt-2">
                        <button className="bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
