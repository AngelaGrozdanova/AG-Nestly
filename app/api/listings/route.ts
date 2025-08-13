import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
// import getCurrentUser from "@/pages/actions/getCurrentUser";

import getCurrentUserApi from "@/pages/actions/getCurrentUserApi";

export async function POST(request: Request) {
  const currentUser = await getCurrentUserApi();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  // Проверка дали всички полета са налични
  //   if (
  //     !title ||
  //     !description ||
  //     !imageSrc ||
  //     !category ||
  //     !roomCount ||
  //     !bathroomCount ||
  //     !guestCount ||
  //     !location ||
  //     !price
  //   ) {
  //     return NextResponse.error(); // Връща грешка ако някое поле липсва
  //   }

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
