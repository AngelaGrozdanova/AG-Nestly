import { GetServerSideProps } from "next";

import getListingById from "../actions/getListingById";
import getReservations from "../actions/getReservations";
import getCurrentUser from "../actions/getCurrentUser";

import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import ListingClient from "./ListingClient";

import { SafeListing, SafeUser, SafeReservation } from "@/types/safeUser";

interface ListingPageProps {
  listing: SafeListing & { user: SafeUser };
  currentUser: SafeUser | null;
  reservations: SafeReservation[];
}

const ListingPage = ({ listing, currentUser, reservations }: ListingPageProps) => {
  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </ClientOnly>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const listingId = context.params?.listingId;

  if (!listingId || typeof listingId !== "string") {
    return {
      notFound: true,
    };
  }

  const listing = await getListingById({ listingId });
  const currentUser = await getCurrentUser(context);
  const reservations = await getReservations({ listingId });

  if (!listing) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      listing,
      currentUser: currentUser
        ? {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null,
          }
        : null,
      reservations,
    },
  };
};

export default ListingPage;
