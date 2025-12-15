import { Project, Template, UserProfile, BillingInfo, PrivacySecuritySettings } from './types';

export const MOCK_PROJECTS: Project[] = [
    {
        id: '1',
        title: 'E-commerce Microservices',
        description: 'A scalable e-commerce backend with order processing, inventory management, and user authentication services.',
        status: 'completed',
        updatedAt: '2023-10-25T14:30:00Z',
    },
    {
        id: '2',
        title: 'Real-time Chat App',
        description: 'WebSocket-based chat application architecture with message persistence and presence tracking.',
        status: 'draft',
        updatedAt: '2023-10-28T09:15:00Z',
    },
    {
        id: '3',
        title: 'Investment Dashboard',
        description: 'Fintech dashboard for tracking portfolio performance with real-time market data integration.',
        status: 'draft',
        updatedAt: '2023-11-01T11:45:00Z',
    },
    {
        id: '4',
        title: 'Log Aggregation System',
        description: 'Centralized logging infrastructure using ELK stack design patterns.',
        status: 'completed',
        updatedAt: '2023-10-15T16:20:00Z',
    },
];

export const MOCK_TEMPLATES: Template[] = [
    {
        id: 't1',
        name: 'SaaS Starter Kit',
        description: 'Complete architecture for a multi-tenant SaaS application with auth, billing, and isolation strategies.',
        tags: ['Next.js', 'PostgreSQL', 'Stripe'],
        category: 'system design',
    },
    {
        id: 't2',
        name: 'Event-Driven Pipeline',
        description: 'High-throughput event processing pipeline using Kafka and serverless consumers.',
        tags: ['Kafka', 'AWS Lambda', 'Redis'],
        category: 'backend',
    },
    {
        id: 't3',
        name: 'Kubernetes Cluster',
        description: 'Production-ready K8s cluster configuration with monitoring, logging, and ingress.',
        tags: ['Kubernetes', 'Terraform', 'Prometheus'],
        category: 'infra',
    },
    {
        id: 't4',
        name: 'RAG Chatbot',
        description: 'Retrieval-Augmented Generation architecture for building custom AI assistants context.',
        tags: ['LangChain', 'Pinecone', 'OpenAI'],
        category: 'AI',
    },
    {
        id: 't5',
        name: 'Video Streaming API',
        description: 'Scalable backend for transcoding and serving adaptive bitrate video content.',
        tags: ['FFmpeg', 'CDN', 'S3'],
        category: 'backend',
    },
];

export const MOCK_USER_PROFILE: UserProfile = {
    id: 'user_2x9a8b7c6d5e4f3g2h1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    createdAt: '2023-01-15T08:30:00Z',
    preferences: {
        theme: 'system',
        autoSave: true,
        aiVerbosity: 'balanced',
    },
    sessions: [
        {
            id: 'sess_1',
            device: 'Chrome on macOS',
            location: 'San Francisco, US',
            lastActive: 'Now',
            isCurrent: true,
        },
        {
            id: 'sess_2',
            device: 'Safari on iPhone',
            location: 'San Francisco, US',
            lastActive: '2 hours ago',
            isCurrent: false,
        },
    ],
};

export const MOCK_BILLING_INFO: BillingInfo = {
    plan: {
        name: 'Pro Team',
        status: 'active',
        renewalDate: '2023-12-15',
        cost: '$49.00',
    },
    usage: {
        projects: 12,
        projectsLimit: 20,
        storage: '4.2GB',
        storageLimit: '10GB',
        resetDate: '2023-12-01',
    },
    paymentMethod: {
        brand: 'Visa',
        last4: '4242',
        expiry: '12/25',
    },
    invoices: [
        { id: 'inv_001', date: 'Nov 15, 2023', amount: '$49.00', status: 'paid' },
        { id: 'inv_002', date: 'Oct 15, 2023', amount: '$49.00', status: 'paid' },
        { id: 'inv_003', date: 'Sep 15, 2023', amount: '$49.00', status: 'paid' },
    ],
};

export const MOCK_PRIVACY_SETTINGS: PrivacySecuritySettings = {
    dataUsage: {
        trainingOptOut: true,
        conversationRetention: '30_days',
    },
    security: {
        twoFactorEnabled: false,
        passwordLastChanged: '2023-09-10',
    },
    accessLogs: [
        { id: 'log_1', event: 'Login', ip: '192.168.1.1', location: 'San Francisco, US', date: '2023-11-16 09:30 AM' },
        { id: 'log_2', event: 'API Key Created', ip: '192.168.1.1', location: 'San Francisco, US', date: '2023-11-15 02:15 PM' },
        { id: 'log_3', event: 'Password Changed', ip: '192.168.1.1', location: 'San Francisco, US', date: '2023-09-10 10:00 AM' },
    ],
};

export const AVAILABLE_PLANS: import('./types').PlanTier[] = [
    {
        id: 'daily',
        name: 'Daily',
        price: '$5',
        interval: 'day',
        description: 'Perfect for short-term projects and quick experiments.',
        features: ['Unlimited Projects', '1GB Storage', 'Basic Support'],
    },
    {
        id: 'weekly',
        name: 'Weekly',
        price: '$25',
        interval: 'week',
        description: 'Great for focused sprints and week-long hackathons.',
        features: ['Unlimited Projects', '5GB Storage', 'Priority Support'],
    },
    {
        id: 'monthly',
        name: 'Monthly',
        price: '$80',
        interval: 'month',
        description: 'Ideal for ongoing development and small teams.',
        features: ['Unlimited Projects', '20GB Storage', 'Priority Support', 'Team Access'],
        recommended: true,
    },
    {
        id: 'semi-annual',
        name: 'Semi-Annual',
        price: '$400',
        interval: '6 months',
        description: 'Commit to long-term growth with significant savings.',
        features: ['Unlimited Projects', '50GB Storage', '24/7 Support', 'Team Access', 'Advanced Analytics'],
    },
    {
        id: 'annual',
        name: 'Annual',
        price: '$700',
        interval: 'year',
        description: 'Maximum value for serious businesses and enterprises.',
        features: ['Unlimited Projects', 'Unlimited Storage', 'Dedicated Support', 'SSO', 'Audit Logs'],
    },
];
