import React from "react";
import images from "../assets";
import Image from "next/image";
import Link from "next/link";

const Navbar = ({ connectWallet, account }) => {
  const items = [
    {
      name: "HOME",
      url: "/",
    },
    {
      name: "CHAT",
      url: "/",
    },
    {
      name: "CONTACT",
      url: "/",
    },
    {
      name: "ABOUT",
      url: "/",
    },
    {
      name: "SETTINGS",
      url: "/",
    },
  ];
  return (
    <div className="flex">
      <div className="flex items-center justify-between m-8 w-full ">
        <div>
          <Image src={images.buddy} alt="logo" width={60} height={60} />
        </div>

        <div className="flex space-x-8 text-white items-center text-xl font-semibold">
          {items.map((item, index) => (
            <div
              key={index}
              className="px-5 py-2 hover:bg-[#313b55] rounded-3xl duration-300 ease-in-out hover:text-green-500 hover:scale-110 transition-all"
            >
              <Link href={item.url}>
                {item.name === "CHAT" ? (
                  <div className="text-orange-500 border-b border-orange-500">
                    {item.name}
                  </div>
                ) : (
                  <div className="text-[#8b99be]">{item.name}</div>
                )}
              </Link>
            </div>
          ))}
          {!account ? (
            <div
              className="bg-[#313b55] px-6 py-3 rounded-lg flex space-x-3 items-center text-center cursor-pointer hover:scale-110 ease-in-out duration-300 transition-all text-orange-400"
              onClick={connectWallet}
            >
              Connect Wallet
            </div>
          ) : (
            <div className="bg-[#313b55] px-6 py-3 rounded-lg flex space-x-3 items-center text-center cursor-pointer text-orange-400">
              <Image
                src={images.avatar}
                alt="metamask"
                width={20}
                height={15}
              />
              <div>
                {account.slice(0, 8)}...{account.slice(-8, account.length)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
