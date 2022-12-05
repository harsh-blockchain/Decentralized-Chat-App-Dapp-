import React, { useContext } from "react";
import { chatAppContext } from "../context/context";
import Avtaar from "../assets/acountName.png";
import Image from "next/image";

const Chat = () => {
  const {
    friend,
    allUsers,
    account,
    setReciever,
    setMessage,
    sendMessages,
    message,
    allMessages,
    getUserName,
    name,
    setName,
  } = useContext(chatAppContext);

  const convertTime = (time) => {
    const date = new Date(time * 1000);

    const Time =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const dates =
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      " " +
      Time;
    return dates;
  };

  return (
    <div className="bg-[#313b55] text-white w-full h-[580px] overflow-y-scroll flex flex-col rounded-2xl px-6 py-8 scrollbar scrollbar-thumb-orange-700 scrollbar-track-slate-500">
      {friend.length > 0 && (
        <div className="flex space-x-4 border-b border-slate-500 pb-4">
          <Image src={Avtaar} width={45} height={25} alt="img" />
          <div className="flex flex-col">
            <div className="font-semibold text-lg">{friend.name}</div>
            <div className="text-md font-medium">{friend.pubKey}</div>
          </div>
        </div>
      )}

      <div className="my-5 gap-6 flex flex-col justify-between">
        {friend.length > 0 &&
          allMessages.map((item, index) => (
            <div className="flex justify-end flex-col" key={index}>
              {item.sender.toLowerCase() === account ? (
                <div className="flex text-white w-1/2 ml-96 bg-green-400 px-4 py-6 rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl">
                  <div className="flex flex-col">
                    <div className="flex space-x-4 items-center text-md text-slate-700 font-semibold">
                      <Image src={Avtaar} width={45} height={25} alt="img" />
                      <div>me</div>
                      <div>{convertTime(item.timestamp.toNumber())}</div>
                    </div>

                    <div className="ml-10 mt-4 mb-4 mr-5 font-medium text-lg">
                      {item.mssg}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-[0.7] flex flex-start justify-start text-white bg-orange-400 px-4 py-6 rounded-tl-3xl rounded-tr-3xl rounded-br-3xl w-1/2">
                  <div>
                    <div className="flex space-x-4 items-center text-md text-slate-700 font-semibold">
                      <Image src={Avtaar} width={45} height={25} alt="img" />
                      <div>
                        {item.sender.slice(0, 6)}....
                        {item.sender.slice(-6, item.sender.length)}
                      </div>
                      <div>{convertTime(item.timestamp.toNumber())}</div>
                    </div>

                    <div className="ml-10 mt-4 mb-4 mr-5 font-medium text-lg">
                      {item.mssg}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Chat;
