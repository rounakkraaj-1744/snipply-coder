'use client';

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

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
    HelpCircle,
    Search,
} from "lucide-react";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

export default function Sidebar({ isCollapsed, toggleSidebar }: SidebarProps) {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [isDark, setIsDark] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [activeItem, setActiveItem] = useState('home');
    const searchInputRef = useRef<HTMLInputElement>(null);

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login");
                },
            },
        });
    };

    // Initialize theme from localStorage and system preference
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

        setIsDark(shouldBeDark);
        document.documentElement.classList.toggle('dark', shouldBeDark);
    }, []);

    // Cmd+K to focus search
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                searchInputRef.current?.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
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
        <motion.div
            initial={false}
            animate={{ width: isCollapsed ? 64 : 256 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`
                h-screen bg-sidebar border-r border-sidebar-border flex flex-col text-sm font-medium
                overflow-hidden z-20 relative
            `}
        >
            {/* Header */}
            <div className={`p-4 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                <AnimatePresence mode="popLayout">
                    {!isCollapsed && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex items-center gap-2.5 px-2 overflow-hidden"
                        >
                            <div className="p-1.5 rounded-md bg-primary text-primary-foreground shrink-0">
                                <Command className="w-5 h-5" />
                            </div>
                            <span className="text-lg font-bold tracking-tight text-sidebar-foreground truncate whitespace-nowrap">
                                atlaso
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
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

            {/* Search */}
            <div className="px-3 mb-2">
                {!isCollapsed ? (
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        </div>
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-9 pr-3 py-1.5 bg-sidebar-accent/50 border border-transparent focus:border-sidebar-border focus:bg-background rounded-md text-sm outline-none transition-all placeholder:text-muted-foreground/70"
                        />
                        <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                            <span className="text-xs text-muted-foreground/50 border border-border px-1.5 py-0.5 rounded">⌘K</span>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => {
                            if (isCollapsed) toggleSidebar();
                            setTimeout(() => searchInputRef.current?.focus(), 300);
                        }}
                        className="w-full flex justify-center p-2 rounded-md hover:bg-sidebar-accent/50 text-muted-foreground transition-colors"
                        title="Search (Cmd+K)"
                    >
                        <Search className="w-5 h-5 shrink-0" />
                    </button>
                )}
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
                                    flex items-center w-full rounded-md relative z-10
                                    transition-colors duration-200 group
                                    ${isCollapsed
                                        ? 'justify-center p-2'
                                        : 'gap-3 px-3 py-2'
                                    }
                                `}
                                title={isCollapsed ? item.label : undefined}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute inset-0 bg-sidebar-primary/10 rounded-md -z-10"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <Icon className={`
                                    shrink-0 transition-colors duration-200
                                    ${isActive ? 'text-sidebar-primary' : 'text-muted-foreground group-hover:text-sidebar-foreground'}
                                    ${isCollapsed ? 'w-5 h-5' : 'w-4.5 h-4.5'}
                                `} />
                                <AnimatePresence mode="popLayout">
                                    {!isCollapsed && (
                                        <motion.span
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: "auto" }}
                                            exit={{ opacity: 0, width: 0 }}
                                            className="whitespace-nowrap overflow-hidden"
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </button>
                        );
                    })}
                </div>
            </nav>

            {/* Bottom Actions */}
            {/* Bottom Actions */}
            <div className="p-3 mt-auto space-y-1 border-t border-sidebar-border/50">
                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className={`
                        flex items-center w-full rounded-md text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors group
                        ${isCollapsed ? 'justify-center p-2' : 'gap-3 px-3 py-2'}
                    `}
                    title={isCollapsed ? (isDark ? 'Light Mode' : 'Dark Mode') : undefined}
                >
                    {isDark ? (
                        <Sun className={`shrink-0 w-4.5 h-4.5 ${isCollapsed ? 'w-5 h-5' : ''}`} />
                    ) : (
                        <Moon className={`shrink-0 w-4.5 h-4.5 ${isCollapsed ? 'w-5 h-5' : ''}`} />
                    )}
                    <AnimatePresence mode="popLayout">
                        {!isCollapsed && (
                            <motion.span
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: "auto" }}
                                exit={{ opacity: 0, width: 0 }}
                                className="whitespace-nowrap overflow-hidden"
                            >
                                {isDark ? 'Light Mode' : 'Dark Mode'}
                            </motion.span>
                        )}
                    </AnimatePresence>
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
                            {user?.image ? (
                                <img src={user.image} alt={user.name || "User"} className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-4 h-4 text-muted-foreground" />
                            )}
                        </div>
                        <AnimatePresence mode="popLayout">
                            {!isCollapsed && (
                                <motion.div
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: "auto" }}
                                    exit={{ opacity: 0, width: 0 }}
                                    className="flex items-center flex-1 min-w-0 gap-2 overflow-hidden"
                                >
                                    <div className="flex-1 text-left overflow-hidden whitespace-nowrap min-w-0">
                                        <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name || "Guest"}</p>
                                        <p className="text-xs text-muted-foreground truncate">{user?.email || "Sign in"}</p>
                                    </div>
                                    <ChevronUp className={`w-4 h-4 text-muted-foreground transition-transform duration-200 shrink-0 ${showProfileMenu ? 'rotate-180' : ''}`} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                    {/* Profile Menu Dropdown */}
                    {showProfileMenu && (
                        <div className="absolute bottom-full left-0 right-0 mb-2 mx-1 bg-popover border border-border rounded-lg shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200 z-50">
                            <div className="p-1">
                                <Link
                                    href="/settings"
                                    onClick={() => setShowProfileMenu(false)}
                                    className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-popover-foreground text-sm"
                                >
                                    <User className="w-4 h-4" />
                                    <span>Profile</span>
                                </Link>
                                <Link
                                    href="/settings"
                                    onClick={() => setShowProfileMenu(false)}
                                    className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-popover-foreground text-sm"
                                >
                                    <Settings className="w-4 h-4" />
                                    <span>Settings</span>
                                </Link>
                                <Link
                                    href="/settings/billing"
                                    onClick={() => setShowProfileMenu(false)}
                                    className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-popover-foreground text-sm"
                                >
                                    <CreditCard className="w-4 h-4" />
                                    <span>Billing</span>
                                </Link>
                                <div className="h-px bg-border my-1" />
                                <Link
                                    href="/support"
                                    onClick={() => setShowProfileMenu(false)}
                                    className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-popover-foreground text-sm"
                                >
                                    <HelpCircle className="w-4 h-4" />
                                    <span>Support</span>
                                </Link>
                                <button
                                    onClick={() => {
                                        setShowProfileMenu(false);
                                        handleLogout();
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
        </motion.div>
    );
}