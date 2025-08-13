import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getFavoriteListings from "../actions/getFavoriteListings";
import getCurrentUser from "../actions/getCurrentUser";
import FavoritesClient from "./FavoritesClient";

import { GetServerSidePropsContext, GetServerSideProps } from "next";

interface ListingPageProps {
  currentUser: any | null; 
  listings: any[]; 
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const currentUser = await getCurrentUser(context);
  const listings = await getFavoriteListings(context);

  return {
    props: {
      currentUser: currentUser ? JSON.parse(JSON.stringify(currentUser)) : null,
      listings: listings.map((item) => ({
        ...item,
        createdAt: item.createdAt.toString(),
      })),
    },
  };
};

const ListingPage: React.FC<ListingPageProps> = ({ currentUser, listings }) => {
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default ListingPage;
