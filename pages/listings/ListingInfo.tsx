import useCountries from "@/hooks/useCountries";
import { SafeUser } from "@/types/safeUser";
import { IconType } from "react-icons";
import Avatar from "../components/Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";
import {
  FaUserFriends,
  FaDoorOpen,
  FaBath,
  FaWifi,
  FaUtensils,
  FaSnowflake,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { format } from "date-fns";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;

  const joinedDate = user?.createdAt
    ? format(new Date(user.createdAt), "MMMM yyyy")
    : null;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex items-center gap-2">
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        {joinedDate && (
          <div className="text-sm text-neutral-500">Joined in {joinedDate}</div>
        )}

        <div className="bg-nestly">
          <img src="/images/bg-nestly.png" className="bg-1" />
          <img src="/images/bg-nestly.png" className="bg-2" />

          <img src="/images/nestly-bg.png" className="bg-3" />

          <img src="/images/nestly-bg.png" className="bg-4" />
        </div>
        <div className="flex flex-wrap items-center gap-4 font-light text-neutral-500 mt-2">
          <div className="flex items-center gap-1">
            <FaUserFriends className="text-gray-600" />
            <span>{guestCount} guests</span>
          </div>
          <div className="flex items-center gap-1">
            <FaDoorOpen className="text-gray-600" />
            <span>{roomCount} rooms</span>
          </div>
          <div className="flex items-center gap-1">
            <FaBath className="text-gray-600" />
            <span>{bathroomCount} bathrooms</span>
          </div>
        </div>
      </div>

      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-700 whitespace-pre-line">
        {description}
      </div>
      <hr />

      <div className="text-md font-semibold">What this place offers</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-neutral-600">
        <div className="flex items-center gap-2">
          <FaWifi /> Free WiFi
        </div>
        <div className="flex items-center gap-2">
          <FaUtensils /> Kitchen
        </div>
        <div className="flex items-center gap-2">
          <FaSnowflake /> Air Conditioning
        </div>
        <div className="flex items-center gap-2">
          <FaRegCalendarAlt /> Flexible Cancellation
        </div>
      </div>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* House Rules */}
        <div className="rounded-2xl border border-neutral-200 bg-rose-501 shadow-sm hover:shadow-md transition p-6">
          <div className="text-lg font-semibold mb-4 flex items-center gap-3 text-neutral-700">
            <span className="text-xl">🏠</span>
            House Rules
          </div>
          <ul className="space-y-3">
            {[
              { text: "No smoking", icon: "🚭" },
              { text: "No pets", icon: "🐾" },
              { text: "Check-in after 3:00 PM", icon: "🕒" },
              { text: "Check-out before 11:00 AM", icon: "⏰" },
            ].map(({ text, icon }, index) => (
              <li
                key={index}
                className="flex items-center gap-3 text-sm text-neutral-700 bg-neutral-50 rounded-lg px-3 py-2 hover:bg-neutral-100 transition"
              >
                <span className="text-lg">{icon}</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cancellation Policy */}
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition p-6">
          <div className="text-lg font-semibold mb-4 flex items-center gap-3 text-neutral-700">
            <span className="text-xl">❌</span>
            Cancellation Policy
          </div>
          <ul className="space-y-3">
            {[
              { text: "Free cancellation within 48 hours", icon: "🕓" },
              { text: "50% refund before 7 days", icon: "💸" },
            ].map(({ text, icon }, index) => (
              <li
                key={index}
                className="flex items-center gap-3 text-sm text-neutral-700 bg-neutral-50 rounded-lg px-3 py-2 hover:bg-neutral-100 transition"
              >
                <span className="text-lg">{icon}</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Additional Info */}
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition p-6">
          <div className="text-lg font-semibold mb-4 flex items-center gap-3 text-neutral-700">
            <span className="text-xl">ℹ️</span>
            Additional Info
          </div>
          <ul className="space-y-3">
            {[
              { text: "Quiet hours after 10 PM", icon: "🔇" },
              { text: "Government ID required", icon: "🪪" },
            ].map(({ text, icon }, index) => (
              <li
                key={index}
                className="flex items-center gap-3 text-sm text-neutral-700 bg-neutral-50 rounded-lg px-3 py-2 hover:bg-neutral-100 transition"
              >
                <span className="text-lg">{icon}</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <div className="text-md font-semibold mb-2">Location</div>
        <Map center={coordinates} />
      </div>

      {/* <hr /> */}
    </div>
  );
};

export default ListingInfo;
