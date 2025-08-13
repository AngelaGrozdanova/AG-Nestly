import { GetServerSideProps } from "next";

import getListings, { IListingsParams } from "./actions/getListings";
import getCurrentUser from "./actions/getCurrentUser";

import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

import type { Listing } from "@/generated/prisma";
import type { SafeUser } from "@/types/safeUser";

interface HomeProps {
  listings: (Listing & { createdAt: string })[];
  currentUser: SafeUser | null;
  hasFilters: boolean;
}

export default function Home({ listings, currentUser, hasFilters }: HomeProps) {
  if (!listings || listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title={hasFilters ? "No exact matches" : "No listings found"}
          subtitle={
            hasFilters
              ? "Try changing or removing some filters."
              : "There are currently no listings available."
          }
          showReset={hasFilters}
        />
      </ClientOnly>
    );
  }

  // throw new Error("Something went wrong!");

  return (
    <ClientOnly>
      <Container>
        <div
          className="
            pt-24
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8"
        >
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const {
      userId,
      guestCount,
      roomCount,
      bathroomCount,
      startDate,
      endDate,
      locationValue,
      category,
    } = context.query;

    const searchParams: IListingsParams = {
      userId: typeof userId === "string" ? userId : undefined,
      guestCount: guestCount ? Number(guestCount) : undefined,
      roomCount: roomCount ? Number(roomCount) : undefined,
      bathroomCount: bathroomCount ? Number(bathroomCount) : undefined,
      startDate: typeof startDate === "string" ? startDate : undefined,
      endDate: typeof endDate === "string" ? endDate : undefined,
      locationValue:
        typeof locationValue === "string" ? locationValue : undefined,
      category: typeof category === "string" ? category : undefined,
    };

    const hasFilters =
      !!guestCount ||
      !!roomCount ||
      !!bathroomCount ||
      !!startDate ||
      !!endDate ||
      !!locationValue ||
      !!category;

    const listings = await getListings(searchParams);
    const rawUser = await getCurrentUser(context);

    const currentUser: SafeUser | null = rawUser
      ? {
          ...rawUser,
          createdAt: rawUser.createdAt.toISOString(),
          updatedAt: rawUser.updatedAt.toISOString(),
          emailVerified: rawUser.emailVerified
            ? rawUser.emailVerified.toISOString()
            : null,
        }
      : null;

    return {
      props: {
        listings,
        currentUser,
        hasFilters,
      },
    };
  } catch (error) {
    console.error("getServerSideProps error:", error);
    return {
      props: {
        listings: [],
        currentUser: null,
        hasFilters: false,
      },
    };
  }
};
