import Image from "next/image";
import logo from "@/components/assets/images/pcslogo.png";
import { IoCartOutline } from "react-icons/io5";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex  bg-[#6600cc] border-b-4 h-20 items-center w-full justify-between  backdrop-filter backdrop-blur-xl border-green-500 sticky top-0 z-50">
      <nav className="flex items-center w-full sm:px-10 px-5 py-4">
        <div className="flex">
          <Link href="/" className="flex flex-row items-center gap-2">
            <Image src={logo} alt="logo" width={32} height={32}></Image>
            <p className="text-white font-bold">PC Shop</p>
          </Link>
        </div>
        <div className="flex w-full justify-center">
          <ul className="flex flex-row items-center gap-6 text-white font-bold">
            <Link href="/" className="hover:text-gray-300 transition-colors">
              Home
            </Link>
            <Link href="/" className="hover:text-gray-300 transition-colors">
              Browse
            </Link>
            <Link href="/" className="hover:text-gray-300 transition-colors">
              Cart
            </Link>
          </ul>
        </div>
      </nav>
      <div className="flex flex-row gap-5 p-5 h-full bg-[#5200a3] items-center">
        <div className="pr-2">
          <IoCartOutline
            color="white"
            size={32}
            className="hover:cursor-pointer hover:scale-110 transition-transform"
          />
        </div>
        <div>
          <button className="text-white font-bold hover:cursor-pointer hover:scale-110 transition-transform">
            LOGIN
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
