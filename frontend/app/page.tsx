import ChatArea from "@/components/chat-area";
import { checkAuth } from "@/lib/auth";

export default async function Home() {
  await checkAuth();

  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <ChatArea />
    </div>
  );
}
