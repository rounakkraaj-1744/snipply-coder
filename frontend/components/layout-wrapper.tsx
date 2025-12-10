'use client';

import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import { PanelLeft } from "lucide-react";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Optional: Persist state
    useEffect(() => {
        const savedState = localStorage.getItem('sidebarCollapsed');
        if (savedState) {
            setIsCollapsed(savedState === 'true');
        }
    }, []);

    const toggleSidebar = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        localStorage.setItem('sidebarCollapsed', String(newState));
    };

    return (
        <div className="flex min-h-screen bg-background font-sans">
            <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
            <main
                className={`
                    flex-1 transition-all duration-300 ease-in-out
                    ${isCollapsed ? 'ml-0' : 'ml-0'} 
                    /* Since Sidebar is relative and not absolute fixed, we don't need margin left if they are in a flex container. 
                       The Sidebar width itself will animate. */
                `}
            >
                {/* 
                   If user wants a dedicated toggle button OUTSIDE the sidebar when collapsed (like bolt.new sometimes does), 
                   we could add it here. But typically it's inside the sidebar header.
                   For now, the Sidebar component handles the toggle button.
                */}
                <div className="p-8 w-full max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
