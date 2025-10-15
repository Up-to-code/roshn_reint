// FILE: actions/update-user-role.ts
"use server";

import { revalidatePath } from "next/cache";
import { prisma as db } from "@/lib/db";
 import { userRoleSchema } from "@/lib/validations/user";
import { z } from "zod";
import { auth } from "@/auth";
import { headers } from "next/headers";

export type FormData = z.infer<typeof userRoleSchema>;

export async function updateUserRole(userId: string, data: FormData) {
  try {
    // Get current session
    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })
    // Check if user is authenticated
    if (!session?.user?.id) {
      return {
        status: "error",
        message: "Unauthorized. Please sign in.",
      };
    }

    // Check if user is updating their own role
    if (session.user.id !== userId) {
      return {
        status: "error",
        message: "Unauthorized. You can only update your own role.",
      };
    }

    // Validate the data
    const validatedData = userRoleSchema.parse(data);

    // Update user role in database
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        role: validatedData.role,
      },
    });

    // Revalidate relevant paths
    revalidatePath("/dashboard/settings");
    revalidatePath("/dashboard");

    return {
      status: "success",
      message: "Your role has been updated successfully.",
    };
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return {
        status: "error",
        message: "Invalid role data provided.",
      };
    }

    // Handle database errors
    console.error("Error updating user role:", error);
    
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }
}