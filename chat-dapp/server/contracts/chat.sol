// SPDX-License-Identifier: MIT

pragma solidity >=0.4.0 <0.9.0;

contract chat{

    // user Struct

    struct User{
        string name;
        friend[] friendList;
    }

    struct friend{
        address pubKey;
        string name;
    }

    struct message{
        address sender;
        uint256 timestamp;
        string mssg;
    }

    struct allUserStruct{
        string name;
        address accountAddress;
    }

    allUserStruct[] getAllUsers;

    mapping(address => User) userList;
    mapping(bytes32 => message[]) allMessages;

    // function check User Exist

    function checkUserExist(address _pubKey)public view returns(bool){
        return bytes(userList[_pubKey].name).length > 0;
    }

    function createAccount(string memory _name) external{
        require(!checkUserExist(msg.sender),"User Already Exist");
        require(bytes(_name).length > 0, "Username cannot be Empty");

        userList[msg.sender].name = _name;
        getAllUsers.push(allUserStruct(_name,msg.sender));
        }

    function getUsername(address pubKey) external view returns(string memory){
        require(checkUserExist(pubKey),"User is not registered");
        return userList[pubKey].name;
    }

    function checkAlreadyFriends(address pubKey1, address pubkey2) internal view returns(bool){

        if(userList[pubKey1].friendList.length > userList[pubkey2].friendList.length){
            address temp = pubKey1;
            pubKey1 = pubkey2;
            pubkey2 = temp;
        }

        for(uint i = 0; i < userList[pubKey1].friendList.length; i++){
            if(userList[pubKey1].friendList[i].pubKey == pubkey2) return true;
        }
        return false;
    }


    //function Add friend

    function addFriend(address friendKey,string memory _name) external{
        require(checkUserExist(msg.sender),"Create an Account First");
        require(checkUserExist(friendKey),"User is not Registered");
        require(bytes(_name).length > 0, "Username cannot be Empty");
        require(msg.sender != friendKey, "User cannot add themselves as friend");
        require(!checkAlreadyFriends(msg.sender,friendKey),"These users are already friends");

        userList[msg.sender].friendList.push(friend(friendKey,_name));
        userList[friendKey].friendList.push(friend(msg.sender,userList[msg.sender].name));


    }

    function getMyfriendList() external view returns(friend[] memory){
        return userList[msg.sender].friendList;
    }


    // get chat code

    function getChatCode(address pubKey1,address pubKey2) internal pure returns(bytes32){
        if(pubKey1 < pubKey2){
            return keccak256(abi.encodePacked(pubKey1,pubKey2));
        }else{
            return keccak256(abi.encodePacked(pubKey2,pubKey1));
        }
    }

    function sendMessage(address friendKey,string memory _msg) external{
        require(checkUserExist(msg.sender),"Create an Account First");
        require(checkUserExist(friendKey),"User is not Registered");
        require(checkAlreadyFriends(msg.sender,friendKey),"you are not friend with given user");

        bytes32 _chatCode = getChatCode(msg.sender,friendKey);
        message memory newMessage = message(msg.sender,block.timestamp,_msg);
        allMessages[_chatCode].push(newMessage);
       
    }

    // read message

    function readMessage(address friendKey) external view returns(message[] memory){
        bytes32 _chatCode = getChatCode(msg.sender,friendKey);
        return allMessages[_chatCode];
    }

    function getAllAppUser() public view returns(allUserStruct[] memory){
        return getAllUsers;
    }
}