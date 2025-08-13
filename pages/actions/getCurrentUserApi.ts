// actions/getCurrentUserApi.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export default async function getCurrentUserApi() {
  const session = await getServerSession(authOptions); // ⬅️ без context

  if (!session?.user?.email) {
    return null;
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  return currentUser;
}
