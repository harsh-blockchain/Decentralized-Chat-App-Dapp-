import React, { useContext, useEffect, useState } from "react";
import { chatAppContext } from "../context/context";
import Avtaar from "../assets/acountName.png";
import Image from "next/image";

const List = () => {
  const {
    allUsers,
    friends,
    addFriends,
    setFriendKey,
    setFriendName,
    setFriend,
    friend,
  } = useContext(chatAppContext);
  const [status, setStatus] = useState("My Friends");
  return (
    <div className="bg-[#313b55] text-white w-full h-[660px] rounded-2xl px-6 py-8 overflow-y-scroll flex flex-col scrollbar scrollbar-thumb-orange-700 scrollbar-track-slate-500">
      <div className="text-center items-center space-x-6 flex justify-center mb-2">
        <div
          onClick={() => setStatus("My Friends")}
          className={`${
            status === "My Friends"
              ? "text-orange-500 border-b border-orange-500 cursor-pointer font-medium text-lg"
              : "text-white font-medium text-lg cursor-pointer"
          }`}
        >
          My Friends
        </div>
        <div
          onClick={() => setStatus("All Users")}
          className={`${
            status !== "My Friends"
              ? "text-orange-500 border-b border-orange-500 cursor-pointer font-medium text-lg"
              : "text-white font-medium text-lg cursor-pointer"
          }`}
        >
          All Users
        </div>
      </div>
      <div>
        {status !== "My Friends"
          ? allUsers.map((user, index) => (
              <div
                key={index}
                className="flex border-b border-gray-500 py-5 scrollbar scrollbar-thumb-orange-700 scrollbar-track-slate-500 justify-between"
              >
                <div className="flex space-x-4">
                  <Image src={Avtaar} width={45} height={25} alt="img" />
                  <div className="flex flex-col">
                    <div className="font-semibold text-lg">{user.name}</div>
                    <div className="text-md font-medium">
                      {user.accountAddress.slice(0, 9)}...
                      {user.accountAddress.slice(
                        -9,
                        user.accountAddress.length
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() =>
                    addFriends(
                      setFriendKey(user.accountAddress),
                      setFriendName(user.name)
                    )
                  }
                  className="bg-[#375194] px-6 py-3 rounded-3xl flex space-x-3 items-center text-center cursor-pointer hover:scale-110 ease-in-out duration-300 transition-all text-orange-400"
                >
                  Add Friend
                </button>
              </div>
            ))
          : friends.map((user, index) => (
              <div
                key={index}
                className="flex border-b border-gray-500 py-5 justify-between hover:scale-95 cursor-pointer ease-in-out duration-300 transition-all hover:bg-slate-700"
                onClick={() => setFriend(user)}
              >
                <div className="flex space-x-4">
                  <Image src={Avtaar} width={45} height={25} alt="img" />
                  <div className="flex flex-col">
                    <div className="font-semibold text-lg">{user.name}</div>
                    <div className="text-md font-medium">
                      {user.pubKey.slice(0, 9)}...
                      {user.pubKey.slice(-9, user.pubKey.length)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default List;
