// // components/listings/ListingForm.tsx
// import { useState } from "react";

// interface ListingFormProps {
//   initialData: any;
//   onSubmit: (data: any) => void;
// }

// const ListingForm: React.FC<ListingFormProps> = ({ initialData, onSubmit }) => {
//   const [title, setTitle] = useState(initialData.title || "");
//   const [description, setDescription] = useState(initialData.description || "");
//   const [price, setPrice] = useState(initialData.price || 0);
//   const [imageSrc, setImageSrc] = useState(initialData.imageSrc || "");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     onSubmit({
//       title,
//       description,
//       price,
//       imageSrc,
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//       <input
//         type="text"
//         placeholder="Title"
//         className="p-2 border rounded"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />

//       <textarea
//         placeholder="Description"
//         className="p-2 border rounded"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />

//       <input
//         type="number"
//         placeholder="Price"
//         className="p-2 border rounded"
//         value={price}
//         onChange={(e) => setPrice(Number(e.target.value))}
//       />

//       <input
//         type="text"
//         placeholder="Image URL"
//         className="p-2 border rounded"
//         value={imageSrc}
//         onChange={(e) => setImageSrc(e.target.value)}
//       />

//       <button
//         type="submit"
//         className="bg-rose-500 text-white py-2 px-4 rounded hover:opacity-90"
//       >
//         Save Changes
//       </button>

//         <div className="bg-nestly">
//           {/* <img src="/images/bg-nestly.png" className="bg-1" /> */}
//           {/* <img src="/images/bg-nestly.png" className="bg-2" /> */}

//           {/* <img src="/images/nestly-bg.png" className="bg-3" /> */}

//           {/* <img src="/images/nestly-bg.png" className="bg-4" /> */}
//         </div>
//     </form>
//   );
// };

// export default ListingForm;

// components/listings/ListingForm.tsx
import { useState } from "react";
import Footer from "../components/Footer";

interface ListingFormProps {
  initialData: any;
  onSubmit: (data: any) => void;
}

const ListingForm: React.FC<ListingFormProps> = ({ initialData, onSubmit }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [price, setPrice] = useState(initialData.price || 0);
  const [imageSrc, setImageSrc] = useState(initialData.imageSrc || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, price, imageSrc });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-10"
      >
        {/* Лява част - формата */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-nestly">
            {/* <img src="/images/bg-nestly.png" className="bg-1" />
        <img src="/images/bg-nestly.png" className="bg-2" /> */}

            <img src="/images/nestly-bg.png" className="bgf" />

            <img src="/images/nestly-bg.png" className="bgg" />

            <img src="/images/bg-nestly.png" className="bgr" />
            <img src="/images/bg-nestly.png" className="bgh" />

            <img src="/images/nestly-bg.png" className="bgj" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              className="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:border-rose-500 focus:ring-rose-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter listing title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:border-rose-500 focus:ring-rose-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your property"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (per night)
            </label>
            <input
              type="number"
              className="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:border-rose-500 focus:ring-rose-500"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="text"
              className="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:border-rose-500 focus:ring-rose-500"
              value={imageSrc}
              onChange={(e) => setImageSrc(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-rose-500 text-white py-3 px-6 rounded-lg font-semibold shadow hover:bg-rose-600 transition duration-200 ease-in-out self-start"
          >
            Save Changes
          </button>
        </div>
        {/* Дясна част - preview на снимката */}
        <div className="flex-1 flex items-center justify-center border border-gray-200 rounded-lg p-4 bg-gray-50">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Listing preview"
              className="max-h-[300px] w-auto rounded-md object-contain shadow"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/400x300?text=Invalid+Image+URL";
              }}
            />
          ) : (
            <div className="text-gray-400 italic">
              Image preview will appear here
            </div>
          )}
        </div>
      </form>

      <Footer />
    </>
  );
};

export default ListingForm;
