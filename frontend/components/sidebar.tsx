'use client';

import {
    Home,
    FolderKanban,
    LayoutTemplate,
    History,
    Command,
    Sun,
    Moon,
    User,
    LogOut,
    Settings,
    ChevronUp,
    CreditCard,
    HelpCircle
} from "lucide-react";
import { useState, useEffect } from "react";

interface SidebarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

export default function Sidebar({ isCollapsed, toggleSidebar }: SidebarProps) {
    const [isDark, setIsDark] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [activeItem, setActiveItem] = useState('home');

    // Initialize theme from localStorage and system preference
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

        setIsDark(shouldBeDark);
        document.documentElement.classList.toggle('dark', shouldBeDark);
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', newTheme);
    };

    const navItems = [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'projects', label: 'Projects', icon: FolderKanban },
        { id: 'templates', label: 'Templates', icon: LayoutTemplate },
        { id: 'history', label: 'History', icon: History },
    ];

    return (
        <div
            className={`
                h-screen bg-sidebar border-r border-sidebar-border flex flex-col text-sm font-medium
                transition-all duration-300 ease-in-out
                ${isCollapsed ? 'w-16' : 'w-64'}
            `}
        >
            {/* Header */}
            <div className={`p-4 mb-2 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                {!isCollapsed && (
                    <div className="flex items-center gap-2.5 px-2 overflow-hidden">
                        <div className="p-1.5 rounded-md bg-primary text-primary-foreground shrink-0">
                            <Command className="w-5 h-5" />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-sidebar-foreground truncate whitespace-nowrap opacity-100 transition-opacity duration-300">
                            Snipply
                        </span>
                    </div>
                )}

                <button
                    onClick={toggleSidebar}
                    className={`
                        p-1.5 rounded-md hover:bg-sidebar-accent/50 text-muted-foreground transition-colors
                        ${isCollapsed ? 'mx-auto' : ''}
                    `}
                >
                    <LayoutTemplate className="w-5 h-5 shrink-0" />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 space-y-1 overflow-hidden hover:overflow-y-auto">
                <div className="space-y-0.5">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeItem === item.id;

                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveItem(item.id)}
                                className={`
                                    flex items-center w-full rounded-md
                                    transition-all duration-200 group relative
                                    ${isActive
                                        ? 'bg-sidebar-primary/10 text-sidebar-primary'
                                        : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                                    }
                                    ${isCollapsed
                                        ? 'justify-center p-2'
                                        : 'gap-3 px-3 py-2'
                                    }
                                `}
                                title={isCollapsed ? item.label : undefined}
                            >
                                <Icon className={`
                                    shrink-0
                                    ${isActive ? 'text-sidebar-primary' : 'text-muted-foreground group-hover:text-sidebar-foreground'}
                                    ${isCollapsed ? 'w-5 h-5' : 'w-4.5 h-4.5'}
                                `} />
                                {!isCollapsed && (
                                    <span className="whitespace-nowrap overflow-hidden transition-all duration-300 opacity-100">
                                        {item.label}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </nav>

            {/* Bottom Actions */}
            <div className="p-3 mt-auto space-y-1 border-t border-sidebar-border/50 overflow-hidden">
                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className={`
                        flex items-center w-full rounded-md text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors
                        ${isCollapsed ? 'justify-center p-2' : 'gap-3 px-3 py-2'}
                    `}
                    title={isCollapsed ? (isDark ? 'Light Mode' : 'Dark Mode') : undefined}
                >
                    {isDark ? (
                        <Sun className={`shrink-0 w-4.5 h-4.5 ${isCollapsed ? 'w-5 h-5' : ''}`} />
                    ) : (
                        <Moon className={`shrink-0 w-4.5 h-4.5 ${isCollapsed ? 'w-5 h-5' : ''}`} />
                    )}
                    {!isCollapsed && (
                        <span className="whitespace-nowrap overflow-hidden transition-all duration-300 opacity-100">
                            {isDark ? 'Light Mode' : 'Dark Mode'}
                        </span>
                    )}
                </button>

                {/* Profile Section */}
                <div className="relative pt-1">
                    <button
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className={`
                            flex items-center w-full rounded-md hover:bg-sidebar-accent/50 transition-colors
                            ${showProfileMenu ? 'bg-sidebar-accent/50' : ''}
                            ${isCollapsed ? 'justify-center p-1.5' : 'gap-3 px-3 py-2'}
                        `}
                    >
                        <div className="w-8 h-8 rounded-full bg-sidebar-border overflow-hidden ring-1 ring-border flex items-center justify-center shrink-0">
                            <User className="w-4 h-4 text-muted-foreground" />
                        </div>
                        {!isCollapsed && (
                            <>
                                <div className="flex-1 text-left overflow-hidden whitespace-nowrap min-w-0">
                                    <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
                                    <p className="text-xs text-muted-foreground truncate">Pro Plan</p>
                                </div>
                                <ChevronUp className={`w-4 h-4 text-muted-foreground transition-transform duration-200 shrink-0 ${showProfileMenu ? 'rotate-180' : ''}`} />
                            </>
                        )}
                    </button>

                    {/* Profile Menu Dropdown */}
                    {showProfileMenu && (
                        <div className="absolute bottom-full left-0 right-0 mb-2 mx-1 bg-popover border border-border rounded-lg shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200 z-50">
                            <div className="p-1">
                                <button className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-popover-foreground text-sm">
                                    <User className="w-4 h-4" />
                                    <span>Profile</span>
                                </button>
                                <button className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-popover-foreground text-sm">
                                    <Settings className="w-4 h-4" />
                                    <span>Settings</span>
                                </button>
                                <button className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-popover-foreground text-sm">
                                    <CreditCard className="w-4 h-4" />
                                    <span>Billing</span>
                                </button>
                                <div className="h-px bg-border my-1" />
                                <button className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-popover-foreground text-sm">
                                    <HelpCircle className="w-4 h-4" />
                                    <span>Help Center</span>
                                </button>
                                <button
                                    onClick={() => {
                                        setShowProfileMenu(false);
                                        // Add your logout logic here
                                    }}
                                    className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md hover:bg-destructive/10 text-destructive hover:text-destructive transition-colors text-sm"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}