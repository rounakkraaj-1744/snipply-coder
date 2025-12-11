import { betterAuth } from "better-auth";

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_BASE_URL || "http://localhost:3000",
    secret: process.env.BETTER_AUTH_SECRET || "supersecretkey",
    trustedOrigins: [
        process.env.FRONTEND_URL || "http://localhost:3001"
    ],
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
});
