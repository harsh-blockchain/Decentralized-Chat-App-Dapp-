import React, { useContext } from "react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { chatAppContext } from "../context/context";
import Navbar from "../components/Navbar";
import FeaturesBar from "../components/FeaturesBar";
import List from "../components/List";
import Chat from "../components/Chat";

const index = () => {
  const {
    connectWallet,
    account,
    friend,
    allUsers,
    setReciever,
    setMessage,
    sendMessages,
    message,
    allMessages,
    getUserName,
    name,
    setName,
  } = useContext(chatAppContext);

  return (
    <div className="bg-[#28282B] h-screen pb-28 w-full">
      <div className=" max-w-[1590px] mx-auto">
        <Navbar connectWallet={connectWallet} account={account} />
        <FeaturesBar />

        <div className="flex my-10 mx-4 space-x-8">
          <div className="flex flex-[0.35]">
            <List />
          </div>
          <div className="flex flex-[0.55] flex-col">
            <div className="flex flex-[0.9]">
              <Chat />
            </div>
            <div className="items-center flex flex-[0.1] mr-4 mt-2 space-x-4">
              <input
                type="text"
                placeholder="Enter your message"
                className="bg-slate-600 outline-none border-none mx-5 text-gray-200 w-full text-xl px-6 py-3 rounded-3xl placeholder-gray-400"
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className="bg-[#31bc77] px-6 py-3 rounded-3xl flex space-x-3 items-center text-center cursor-pointer hover:scale-110 ease-in-out duration-300 transition-all text-gray-800 text-xl font-semibold"
                onClick={() =>
                  sendMessages(setReciever(friend.pubKey), message)
                }
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
