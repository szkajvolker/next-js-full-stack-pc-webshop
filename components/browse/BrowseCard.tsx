/**
 * Category browse cards component
 * Displays clickable category cards for navigation
 * Maps through BROWSEITEMS to create category links
 */
"use client";
import { BROWSEITEMS } from "@/constants/data";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BrowseCard = () => {
  const router = useRouter();

  return (
    <div className="flex flex-row overflow-y-auto">
      {BROWSEITEMS.map(({ itemname, slug, image }) => (
        <div key={itemname} className="">
          <button
            type="button"
            onClick={() => router.push(`/browse/${slug}`)}
            className="flex flex-col justify-between bg-white items-center p-4 border border-gray-400 rounded transition hover:border-purple-700 w-27.5 h-30 cursor-pointer"
          >
            <Image
              src={image}
              alt="image"
              width={130}
              height={130}
              className="object-cover"
            />{" "}
            <p className="mt-2 font-semibold text-xs text-gray-400">
              {itemname}
            </p>
          </button>
        </div>
      ))}
    </div>
  );
};

export default BrowseCard;
