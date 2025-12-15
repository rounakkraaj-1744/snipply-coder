import { Project, Template, UserProfile, BillingInfo } from "./types";

export const MOCK_PROJECTS: Project[] = [
    {
        id: "p-1",
        title: "E-commerce Platform",
        description: "A full-stack e-commerce solution with cart and checkout.",
        status: "completed",
        updatedAt: "2023-10-25T14:30:00Z",
    },
    {
        id: "p-2",
        title: "SaaS Dashboard",
        description: "Analytics dashboard for a subscription-based service.",
        status: "draft",
        updatedAt: "2023-11-02T09:15:00Z",
    },
    {
        id: "p-3",
        title: "Personal Portfolio",
        description: "Minimalist portfolio site for designers.",
        status: "completed",
        updatedAt: "2023-11-10T18:45:00Z",
    },
    {
        id: "p-4",
        title: "Social Media App",
        description: "Mobile-first social networking application.",
        status: "draft",
        updatedAt: "2023-11-12T11:20:00Z",
    },
];

export const MOCK_TEMPLATES: Template[] = [
    {
        id: "t-1",
        name: "Microservices Architecture",
        description: "Scalable backend system using microservices pattern.",
        tags: ["Distributed", "Scalable", "Backend"],
        category: "system design",
    },
    {
        id: "t-2",
        name: "Serverless Native",
        description: "Event-driven architecture on AWS Lambda.",
        tags: ["AWS", "Lambda", "Event-driven"],
        category: "infra",
    },
    {
        id: "t-3",
        name: "AI Chatbot API",
        description: "REST API for a conversational AI agent.",
        tags: ["NLP", "Python", "FastAPI"],
        category: "AI",
    },
    {
        id: "t-4",
        name: "Real-time Notification Service",
        description: "WebSocket-based notification delivery system.",
        tags: ["WebSockets", "Node.js", "Redis"],
        category: "backend",
    },
];

export const MOCK_USER_PROFILE: UserProfile = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    theme: "system",
};

export const MOCK_BILLING_INFO: BillingInfo = {
    plan: "Pro Plan",
    usage: "2,450 / 5,000 credits",
    paymentMethod: "Visa ending in 4242",
    invoices: [
        { id: "inv-001", date: "Oct 12, 2023", amount: "$29.00" },
        { id: "inv-002", date: "Nov 12, 2023", amount: "$29.00" },
        { id: "inv-003", date: "Dec 12, 2023", amount: "$29.00" },
    ],
};
