import React from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";

import { SafeListing, SafeUser } from "@/types/safeUser";
import getListings from "../actions/getListings";
import PropertiesClient from "../properties/PropertiesClient";

interface PropertiesPageProps {
  currentUser: SafeUser | null;
  listings: SafeListing[];
}

function serializeUser(user: any): SafeUser {
  return {
    ...user,
    createdAt: user.createdAt?.toISOString?.() ?? user.createdAt,
    updatedAt: user.updatedAt?.toISOString?.() ?? user.updatedAt,
    emailVerified: user.emailVerified?.toISOString?.() ?? null,
  };
}

function serializeListing(listing: any): SafeListing {
  return {
    ...listing,
    createdAt: listing.createdAt?.toISOString?.() ?? listing.createdAt,
  };
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const currentUser = await getCurrentUser(context);

  if (!currentUser) {
    return {
      props: {
        currentUser: null,
        listings: [],
      },
    };
  }

  const listings = await getListings({ userId: currentUser.id });

  return {
    props: {
      currentUser: serializeUser(currentUser),
      listings: listings.map(serializeListing),
    },
  };
};

const PropertiesPage: React.FC<PropertiesPageProps> = ({
  currentUser,
  listings,
}) => {
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found"
          subtitle="Looks like you have no properties."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default PropertiesPage;
