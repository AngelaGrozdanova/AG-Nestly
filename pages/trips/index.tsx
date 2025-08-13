import React from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";

interface TripsPageProps {
  currentUser: any | null;
  reservations: any[];
}

function serializeUser(user: any) {
  return {
    ...user,
    createdAt:
      user.createdAt instanceof Date
        ? user.createdAt.toISOString()
        : user.createdAt,
    updatedAt:
      user.updatedAt instanceof Date
        ? user.updatedAt.toISOString()
        : user.updatedAt,
    emailVerified:
      user.emailVerified instanceof Date
        ? user.emailVerified.toISOString()
        : user.emailVerified,
  };
}

function serializeReservation(reservation: any) {
  return {
    ...reservation,
    createdAt:
      reservation.createdAt instanceof Date
        ? reservation.createdAt.toISOString()
        : reservation.createdAt,
    startDate:
      reservation.startDate instanceof Date
        ? reservation.startDate.toISOString()
        : reservation.startDate,
    endDate:
      reservation.endDate instanceof Date
        ? reservation.endDate.toISOString()
        : reservation.endDate,
    listing: {
      ...reservation.listing,
      createdAt:
        reservation.listing.createdAt instanceof Date
          ? reservation.listing.createdAt.toISOString()
          : reservation.listing.createdAt,
    },
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
        reservations: [],
      },
    };
  }

  const reservations = await getReservations({ userId: currentUser.id });

  return {
    props: {
      currentUser: serializeUser(currentUser),
      reservations: reservations.map(serializeReservation),
    },
  };
};

const TripsPage: React.FC<TripsPageProps> = ({ currentUser, reservations }) => {
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No trips found"
          subtitle="Looks like you haven't reserved any trips."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default TripsPage;
