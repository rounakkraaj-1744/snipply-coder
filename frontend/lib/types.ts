export interface Project {
    id: string;
    title: string;
    description: string;
    status: "draft" | "completed";
    updatedAt: string;
}

export interface Template {
    id: string;
    name: string;
    description: string;
    tags: string[];
    category: "system design" | "backend" | "infra" | "AI";
}

export interface UserProfile {
    name: string;
    email: string;
    theme: "light" | "dark" | "system";
}

export interface Invoice {
    id: string;
    date: string;
    amount: string;
}

export interface BillingInfo {
    plan: string;
    usage: string;
    paymentMethod: string;
    invoices: Invoice[];
}
