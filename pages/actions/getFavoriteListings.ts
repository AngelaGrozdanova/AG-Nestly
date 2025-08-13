import prisma from "@/app/libs/prismadb";
import { GetServerSidePropsContext } from "next";
import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListings(
  context: GetServerSidePropsContext
) {
  try {
    const currentUser = await getCurrentUser(context); // вече имаш context тук

    if (!currentUser) {
      return [];
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString(),
    }));

    return safeFavorites;
  } catch (error: any) {
    throw new Error(error);
  }
}
