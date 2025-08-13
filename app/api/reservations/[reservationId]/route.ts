import { NextResponse } from "next/server";
import getCurrentUserApi from "@/pages/actions/getCurrentUserApi";
import prisma from "@/app/libs/prismadb";

export async function DELETE(request: Request) {
  const currentUser = await getCurrentUserApi();

  if (!currentUser) {
    return NextResponse.error();
  }

  const url = new URL(request.url);
  const reservationId = url.pathname.split("/").pop(); // изважда ID-то от URL-а

  if (!reservationId || typeof reservationId !== "string") {
    return new NextResponse("Invalid ID", { status: 400 });
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });

  return NextResponse.json(reservation);
}

// import { NextResponse } from "next/server";

// import getCurrentUserApi from "@/pages/actions/getCurrentUserApi";
// import prisma from "@/app/libs/prismadb";

// interface IParams {
//   reservationId?: string;
// }

// export async function DELETE(
//   request: Request,
//   { params }: { params: IParams }
// ) {
//   const currentUser = await getCurrentUserApi();

//   if (!currentUser) {
//     return NextResponse.error();
//   }

//   const { reservationId } = params;

//   if (!reservationId || typeof reservationId !== "string") {
//     throw new Error("Invalid ID");
//   }

//   const reservation = await prisma.reservation.deleteMany({
//     where: {
//       id: reservationId,
//       OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
//     },
//   });

//   return NextResponse.json(reservation);
// }
