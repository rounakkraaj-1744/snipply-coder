'use client';

import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import { PanelLeft } from "lucide-react";
import { motion } from "framer-motion";

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
        <div className="flex h-screen overflow-hidden bg-background font-sans">
            <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
            <motion.main
                layout
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`
                    flex-1 overflow-y-auto relative outline-none transition-all duration-300 ease-in-out
                    ${isCollapsed ? 'ml-0' : 'ml-0'} 
                `}
            >
                {/* 
                   If user wants a dedicated toggle button OUTSIDE the sidebar when collapsed (like bolt.new sometimes does), 
                   we could add it here. But typically it's inside the sidebar header.
                   For now, the Sidebar component handles the toggle button.
                */}
                <div className="p-8 w-full max-w-7xl mx-auto min-h-full">
                    {children}
                </div>
            </motion.main>
        </div>
    );
}
