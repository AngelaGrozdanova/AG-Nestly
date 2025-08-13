// // actions/getCurrentUserApi.ts
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../api/auth/[...nextauth]";
// import prisma from "@/app/libs/prismadb";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function getCurrentUserApi(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const session = await getServerSession(req, res, authOptions);

//   if (!session?.user?.email) {
//     return null;
//   }

//   const currentUser = await prisma.user.findUnique({
//     where: {
//       email: session.user.email,
//     },
//   });

//   return currentUser;
// }
