// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import ListingForm from "@/pages/listings/ListingForm";
// import Loading from "@/pages/loading";

// export default function EditListingPage() {
//   const router = useRouter();
//   const { listingId } = router.query;

//   const [listing, setListing] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Зареждаме данните за обявата
//   useEffect(() => {
//     if (!listingId) return;

//     axios
//       .get(`/api/listings/${listingId}`)
//       .then((res) => {
//         setListing(res.data);
//       })
//       .catch(() => toast.error("Failed to load listing"))
//       .finally(() => setIsLoading(false));
//   }, [listingId]);

//   // Изпращаме ъпдейта
//   const handleUpdate = async (data: any) => {
//     try {
//       await axios.put(`/api/listings/${listingId}`, data);
//       toast.success("Listing updated!");
//       router.push("/properties"); // връщаме към списъка
//     } catch {
//       toast.error("Failed to update listing");
//     }
//   };

//   <Loading />;

//   if (!listing) {
//     return <div className="p-10 text-center">Listing not found</div>;
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Edit Listing</h1>
//       <ListingForm initialData={listing} onSubmit={handleUpdate} />
//     </div>
//   );
// }

// pages/listings/[listingId]/edit.tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingForm from "@/pages/listings/ListingForm";
import Loading from "@/pages/loading";

export default function EditListingPage() {
  const router = useRouter();
  const { listingId } = router.query;

  const [listing, setListing] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!listingId) return;

    axios
      .get(`/api/listings/${listingId}`)
      .then((res) => {
        setListing(res.data);
      })
      .catch(() => toast.error("Failed to load listing"))
      .finally(() => setIsLoading(false));
  }, [listingId]);

  const handleUpdate = async (data: any) => {
    try {
      await axios.put(`/api/listings/${listingId}`, data);
      toast.success("Listing updated!");
      router.push("/properties");
    } catch {
      toast.error("Failed to update listing");
    }
  };

  if (isLoading) return <Loading />;

  if (!listing) {
    return <div className="p-10 text-center text-gray-500">Listing not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Update/Edit Listing</h1>
      <ListingForm initialData={listing} onSubmit={handleUpdate} />
    </div>
  );
}
