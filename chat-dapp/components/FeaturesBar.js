import Image from "next/image";
import React, { useState, useEffect, useContext } from "react";
import images from "../assets";
import deletes from "../assets/delete.png";
import { chatAppContext } from "../context/context";

const FeaturesBar = () => {
  const {
    setUserName,
    userName,
    createAccount,
    setShowModel,
    showModel,
    setFriend,
    setAllMessages,
  } = useContext(chatAppContext);

  const doSomething = async () => {
    setAllMessages([]);
    setFriend([]);
  };
  return (
    <div className="mx-4">
      <div className="flex items-center justify-between mx-2 my-8">
        <div className="bg-[#313b55] px-6 py-3 flex space-x-3 items-center mx-4 my-2 text-xl text-white max-w-3xl rounded-full ">
          <Image src={images.search} alt="img" width={25} height={25} />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none border-none mx-5 text-gray-200 w-full text-xl"
          />
        </div>
        <div className="space-x-8 flex">
          <div className="bg-[#313b55] px-6 py-3 rounded-lg flex space-x-3 items-center text-center cursor-pointer text-orange-400 hover:scale-110 ease-in-out duration-300 transition-all">
            <Image src={deletes} alt="img" width={25} height={25} />
            <div className="font-semibold" onClick={doSomething}>
              Clear Chat
            </div>
          </div>
          <div className="bg-[#313b55] px-6 py-3 rounded-lg flex space-x-3 items-center text-center cursor-pointer text-orange-400 hover:scale-110 ease-in-out duration-300 transition-all">
            <Image src={images.user} alt="img" width={25} height={25} />

            <div
              className="font-semibold"
              onClick={() => setShowModel(!showModel)}
            >
              Create Account
            </div>
          </div>
        </div>
      </div>
      {showModel && (
        <div className="my-8 flex justify-between max-w-3xl mx-auto">
          <div className="bg-[#313b55] px-6 py-3 rounded-lg flex space-x-3 items-center text-center cursor-pointer">
            <Image src={images.accountName} alt="img" width={25} height={25} />
            <input
              type="text"
              placeholder="Account Name"
              className="text-gray-300 text-xl bg-transparent outline-none border-none mx-5 "
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <button
            className="px-6 py-3 rounded-2xl font-bold text-xl flex items-center text-center cursor-pointer bg-[#313b55] hover:bg-[#2c3c65] text-orange-400 hover:scale-110 ease-in-out duration-300 transition-all"
            onClick={() => createAccount(userName)}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default FeaturesBar;
