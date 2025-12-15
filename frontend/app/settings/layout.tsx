'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, CreditCard, Shield, Lock, Bell } from "lucide-react";

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const navItems = [
        { name: 'Profile', href: '/settings', icon: User },
        { name: 'Billing & Plans', href: '/settings/billing', icon: CreditCard },
        { name: 'Privacy & Security', href: '/settings/security', icon: Lock },
        { name: 'Notifications', href: '/settings/notifications', icon: Bell },
    ];

    return (
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 p-8">
            <aside className="-mx-4 lg:w-1/5">
                <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        // Exact match for /settings, prefix for others if needed
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                    flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${isActive
                                        ? 'bg-muted text-foreground'
                                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                                    }
                `}
                            >
                                <Icon className="w-4 h-4" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </aside>
            <div className="flex-1 lg:max-w-2xl">
                {children}
            </div>
        </div>
    );
}
