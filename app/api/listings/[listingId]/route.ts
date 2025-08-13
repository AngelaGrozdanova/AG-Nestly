import { NextResponse } from "next/server";
import getCurrentUserApi from "@/pages/actions/getCurrentUserApi";
import prisma from "@/app/libs/prismadb";

export async function DELETE(request: Request) {
  const currentUser = await getCurrentUserApi();

  if (!currentUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const url = new URL(request.url);
  const listingId = url.pathname.split("/").pop();

  if (!listingId || typeof listingId !== "string") {
    return new NextResponse("Invalid ID", { status: 400 });
  }

  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
  });

  if (!listing || listing.userId !== currentUser.id) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  await prisma.listing.delete({
    where: { id: listingId },
  });

  return NextResponse.json({ success: true });
}

export async function GET(
  req: Request,
  { params }: { params: { listingId: string } }
) {
  try {
    const listing = await prisma.listing.findUnique({
      where: { id: params.listingId },
    });
    if (!listing) {
      return new NextResponse("Not Found", { status: 404 });
    }
    return NextResponse.json(listing);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { listingId: string } }
) {
  try {
    const body = await req.json();

    const listing = await prisma.listing.update({
      where: { id: params.listingId },
      data: {
        title: body.title,
        description: body.description,
        price: body.price,
        imageSrc: body.imageSrc,
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
