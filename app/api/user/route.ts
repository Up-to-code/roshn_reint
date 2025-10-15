import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export const DELETE = async (req: Request) => {
  const session = await auth.api.getSession({ 
    headers : await req.headers
   });
  if (!session || !session.user) {
    return new Response("Not authenticated", { status: 401 });
  }

  try {
    await prisma.user.delete({
      where: {
        id: session.user.id,
      },
    });
    return new Response("User deleted successfully!", { status: 200 });
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
};
