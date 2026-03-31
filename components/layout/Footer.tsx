import Image from "next/image";
import footerIcons from "../../constants/data";

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col bg-n-3">
        <div className="flex flex-row justify-between lg:px-30 px-5 bg-n-1">
          {" "}
          <div className="flex flex-row m-10 gap-3 items-center">
            <Image
              src="/assets/images/pcslogo.png"
              alt="logo"
              width={32}
              height={32}
            />
            <p className="text-white text-2xl">
              {" "}
              <strong>PC WEBSHOP</strong>
            </p>
          </div>
          <ul className="flex flex-row m-10 gap-2">
            {footerIcons.map((icon) => (
              <li key={icon.name}>
                <Image
                  src={icon.src}
                  alt={icon.name}
                  width={32}
                  height={32}
                  className="hover:scale-120"
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-row justify-between lg:px-30 px-5">
          <div className="flex flex-row lg:m-10 m-2">
            <p className="text-gray-400 text-xs border-r-2 px-10">
              © {new Date().getFullYear()} Web Shop All rights Reserved!{" "}
            </p>
            <p className="text-gray-400 text-xs lg:px-10 px-2">
              Legal Notice. Terms and Conditions.
            </p>
          </div>

          <div className="m-10">
            <p className="text-xs text-gray-400">
              Developer: <strong>Istvan Szabo</strong>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
