// FILE: actions/update-user-name.ts
"use server";

import { revalidatePath } from "next/cache";
 import { getCurrentUser } from "@/lib/session";
import { userNameSchema } from "@/lib/validations/user";
import { z } from "zod";
import { prisma } from "@/lib/db";

export type FormData = z.infer<typeof userNameSchema>;

export async function updateUserName(userId: string, data: FormData) {
  try {
    const session = await getCurrentUser();

    if (!session?.id || session.id !== userId) {
      return {
        status: "error",
        message: "Unauthorized",
      };
    }

    const { name } = userNameSchema.parse(data);

    // Update user name in database
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
      },
    });

    revalidatePath("/dashboard/settings");
    revalidatePath("/dashboard");

    return {
      status: "success",
      message: "Your name has been updated.",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        status: "error",
        message: "Invalid name. Name must be between 3 and 32 characters.",
      };
    }

    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }
}