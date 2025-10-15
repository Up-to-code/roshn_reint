import getCurrentUser from "@/app/actions/getCurrentUser";
import { redirect } from "next/navigation";

 
interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const user = await getCurrentUser();

  if (user) {
    if (user.role === "ADMIN") redirect("/admin");
    redirect("/dashboard");
  }

  return <div className="min-h-screen">{children}</div>;
}
