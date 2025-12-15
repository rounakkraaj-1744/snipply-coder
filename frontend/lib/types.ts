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

export interface UserSession {
    id: string;
    device: string;
    location: string;
    lastActive: string;
    isCurrent: boolean;
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    avatar?: string;
    preferences: {
        theme: "light" | "dark" | "system";
        autoSave: boolean;
        aiVerbosity: "concise" | "balanced" | "detailed";
    };
    sessions: UserSession[];
}

export interface Invoice {
    id: string;
    date: string;
    amount: string;
    status: "paid" | "pending";
}

export interface BillingInfo {
    plan: {
        name: string;
        status: "active" | "canceled" | "past_due";
        renewalDate: string;
        cost: string;
    };
    usage: {
        projects: number;
        projectsLimit: number;
        storage: string;
        storageLimit: string;
        resetDate: string;
    };
    paymentMethod: {
        brand: string;
        last4: string;
        expiry: string;
    };
    invoices: Invoice[];
}

export interface PlanTier {
    id: string;
    name: string;
    price: string;
    interval: string;
    description: string;
    features: string[];
    recommended?: boolean;
}

export interface AccessLog {
    id: string;
    event: string;
    ip: string;
    location: string;
    date: string;
}

export interface PrivacySecuritySettings {
    dataUsage: {
        trainingOptOut: boolean;
        conversationRetention: "indefinite" | "30_days" | "no_retention";
    };
    security: {
        twoFactorEnabled: boolean;
        passwordLastChanged: string;
    };
    accessLogs: AccessLog[];
}
