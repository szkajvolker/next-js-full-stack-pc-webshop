/**
 * Main application header/navigation component
 * Contains logo, navigation links, dark mode toggle, cart button, and login button
 */
import Image from "next/image";
import Link from "next/link";
import DarkModeToggle from "../ui/DarkModeToggle";
import CartButton from "../cart/CartButton";
import LoginButton from "../auth/LoginButton";

const Header = () => {
  return (
    <header className="flex bg-n-1 border-b-4 h-20 items-center w-full justify-between  backdrop-filter backdrop-blur-xl mb-5 border-green-500 sticky top-0 z-50">
      <nav className="flex items-center justify w-full px-4">
        <div className="flex flex-row">
          <Link href="/" className="flex flex-row items-center gap-4">
            <Image
              src="/assets/images/pcslogo.png"
              alt="logo"
              width={32}
              height={32}
            />
            <p className="text-white font-bold">PC Shop</p>
          </Link>
        </div>
        <div className="flex w-full justify-center">
          <ul className="flex flex-row items-center gap-6 text-white font-bold">
            <Link href="/" className="hover:text-gray-300 transition-colors">
              Home
            </Link>
            <Link
              href="/browse"
              className="hover:text-gray-300 transition-colors"
            >
              Browse
            </Link>
            <Link
              href="/cart"
              className="hover:text-gray-300 transition-colors"
            >
              Cart
            </Link>
          </ul>
        </div>
        <div>
          <DarkModeToggle />
        </div>
      </nav>
      <div className="flex flex-row gap-5 p-5 h-full bg-[#5200a3] items-center">
        <div className="pr-2">
          <CartButton />
        </div>
        <div>
          <LoginButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
