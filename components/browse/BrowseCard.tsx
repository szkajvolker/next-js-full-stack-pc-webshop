"use client";
import { BROWSEITEMS } from "@/constants/data";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BrowseCard = () => {
  const router = useRouter();

  return (
    <ul className="flex justify-center items-center px-10 pt-2">
      {BROWSEITEMS.map(({ itemname, slug }) => (
        <li key={itemname}>
          <button
            type="button"
            onClick={() => router.push(`/browse/${slug}`)}
            className="flex flex-col items-center p-4 border border-gray-400 rounded transition hover:bg-gray-200"
          >
            <Image
              src="/assets/database/images/asus-rog-strix-b650e-e-gaming-wifi.png"
              alt="image"
              width={100}
              height={100}
            />{" "}
            <p className="mt-2 font-semibold text-xs text-gray-400">
              {itemname}
            </p>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default BrowseCard;
