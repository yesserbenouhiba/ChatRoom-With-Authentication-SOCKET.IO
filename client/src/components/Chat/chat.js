import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import "./chat.css";
import InfoBar from "../InfoBar/InfoBar";
import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import Input from "../Input/Input";

let socket;
function Chat() {
  const navigate = useNavigate();
  const ENDPOINT = "http://localhost:5000";
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    const { username } = queryString.parse(location.search);
    setUsername(username);

    // Create the socket connection when the component mounts
    socket = io(ENDPOINT);

    const handleConnect = () => {
      console.log("user connected");
      socket.emit("join", { username });
    };

    socket.on("connect", handleConnect);

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.off("connect", handleConnect);
      socket.disconnect();
    };
  }, [ENDPOINT, username, location.search]);

  const handleLogout = async () => {
    try {
      localStorage.clear();
      Cookies.remove("token");
      navigate("/");
    } catch (error) {
      console.error("Error during signout:", error);
    }
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", messageInput);
    setMessageInput("");
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar />
        <Messages messages={messages} username={username} />
        <Input
          message={messageInput}
          setMessage={setMessageInput}
          sendMessage={handleMessageSubmit}
        />
      </div>
      <TextContainer onlineUsers={onlineUsers} />
    </div>
  );
}

export default Chat;
