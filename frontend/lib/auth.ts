import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const auth = {
    api: authClient,
};

// Server-side helper to check session
export async function getSession() {
    const session = await authClient.getSession({
        fetchOptions: {
            headers: await headers(),
        },
    });
    return session;
}

export async function checkAuth() {
    const session = await getSession();
    if (!session.data) {
        redirect("/login");
    }
    return session.data;
}
