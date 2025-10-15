import { auth } from "@/auth";
import { headers } from "next/headers";
import prisma from "@/lib/db"; // Import prisma client

const getCurrentUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user?.id) {
    return null;
  }

  // Fetch user from database to get the latest role and data
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      image: true,
    },
  });
  
  return user;
};

export default getCurrentUser;