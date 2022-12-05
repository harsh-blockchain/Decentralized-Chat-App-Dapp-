import { ethers } from "ethers";
import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";
import { chatAddress, chatABI } from "../config";

export const chatAppContext = createContext();

export const ChatAppProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendKey, setFriendKey] = useState("");
  const [friendName, setFriendName] = useState("");
  const [friend, setFriend] = useState("");
  const [reciever, setReciever] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return console.log("Please install MetaMask first.");

    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    setAccount(accounts[0]);

    window.ethereum.on("accountsChanged", (accounts) => {
      setAccount(accounts[0]);
    });
  };

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const createAccount = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const chat = new ethers.Contract(chatAddress, chatABI, signer);
      const transaction = await chat.createAccount(userName);
      await transaction.wait();
      setShowModel(false);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDetails = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const chat = new ethers.Contract(chatAddress, chatABI, signer);
      const all_Users = await chat.getAllAppUser();
      setAllUsers(all_Users);

      const all_friends = await chat.getMyfriendList();
      setFriends(all_friends);
    } catch (err) {
      console.log(err);
    }
  };

  const addFriends = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const chat = new ethers.Contract(chatAddress, chatABI, signer);
      const transaction = await chat.addFriend(friendKey, friendName);
      await transaction.wait();
      setShowModel(false);
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessages = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const chat = new ethers.Contract(chatAddress, chatABI, signer);
      const msg = await chat.sendMessage(reciever, message);
      await msg.wait();
    } catch (err) {
      console.log(err);
    }
  };

  const readingMessages = async (reciever) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const chat = new ethers.Contract(chatAddress, chatABI, signer);
      const msg = await chat.readMessage(friend.pubKey);
      setAllMessages(msg);
    } catch (error) {
      console.log(error);
    }
  };

  const [name, setName] = useState("");

  const getUserName = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const chat = new ethers.Contract(chatAddress, chatABI, signer);
      const name = await chat.getUsername(friend.pubKey);
      return name;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    fetchDetails();
    readingMessages(reciever);
  });

  return (
    <chatAppContext.Provider
      value={{
        account,
        connectWallet,
        userName,
        setUserName,
        createAccount,
        showModel,
        setShowModel,
        allUsers,
        friends,
        addFriends,
        setFriendKey,
        setFriendName,
        setFriend,
        friend,
        allMessages,
        setReciever,
        setMessage,
        sendMessages,
        message,
        getUserName,
        name,
        setName,
        setAllMessages,
      }}
    >
      {children}
    </chatAppContext.Provider>
  );
};
