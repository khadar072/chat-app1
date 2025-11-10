import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

export const UserContext = createContext();

const ConnectUserContext = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [author, setAuthor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:5015"; // ✅ match your backend

  // 🟢 LOGIN
  const login = async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, formData);
      if (response.data.success) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setToken(token);
        alert(response.data.message || "Login successful!");
        connectSocket()
        navigate("/"); // ✅ Redirect after login
      } else {
        alert(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("An error occurred during login. Please try again.");
    }
  };

  // 🟢 REGISTER
  const register = async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/register`, formData);
      if (response.data.success) {
        alert(response.data.message || "Registration successful!");
        navigate("/login");
        connectSocket()
      } else {
        alert(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration failed:", error.message);
      alert("An error occurred during registration. Please try again.");
    }
  };

  // 🟢 GET CURRENT USER
  const getUser = async () => {
    if (!token) return;
    try {
      const response = await axios.get(`${BASE_URL}/api/auth/get-user`, {
        headers: { token },
      });
      if (response.data.success) {
        setAuthor(response.data.user);
        connectSocket()
      }
    } catch (error) {
      console.error("Fetching user failed:", error.message);
    }
  };

  // 🟢 GET USERS
  const getUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/messages/get-users`, {
        headers: { token },
      });
      if (response.data.success) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.error("Get users failed:", error.message);
    }
  };

  // 🟢 GET MESSAGES
  const getMessages = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/messages/get-messages/${id}`, {
        headers: { token },
      });
      if (response.data.success) {
        setMessages(response.data.messages);
      }
    } catch (error) {
      console.error("Get messages failed:", error.message);
    }
  };

  // 🟢 SEND MESSAGE (socket + axios)
  const sendMessage = async ({ message, file }) => {
    if (!selectedUser) return;
    try {
      const response = await axios.post(
        `${BASE_URL}/api/messages/send/${selectedUser._id}`,
        { text: message, image: file },
        { headers: { token } }
      );

      if (response.data.success) {
        const newMsg = response.data.message;
        setMessages((prev) => [...prev, newMsg]);
      }
    } catch (error) {
      console.error("Send message failed:", error.message);
    }
  };

  // 🟢 CONNECT SOCKET
const connectSocket = () => {
  if (!author || socket?.connected) return;

  const newSocket = io(BASE_URL, {
    query: { userId: author._id },
  });

  newSocket.connect()

  

  setSocket(newSocket); // ✅ store socket in state

    newSocket.on("getOnlineUsers", (users) => {
    setOnlineUsers(users);
  });
};


  // 🟢 DISCONNECT SOCKET
  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      console.log("🔴 Socket disconnected");
    }
  };



  const subscripeToMessage=()=>{
      if(!selectedUser) return

      socket.on('newMessage',(newMessage)=>{
        if (newMessage.sendId !=selectedUser._id) return
           setMessages((p)=>[...p,newMessage])
      })
  }

  const unSubscripeToMessage=()=>{
   socket.off('newMessage') 
  }

  // Auto connect socket when author loads
  useEffect(() => {
    if (author) connectSocket();
    return () => disconnectSocket();
  }, [author]);

  // Load user on app mount
  useEffect(() => {
    getUser();
  }, [token]);

  const value = {
    token,
    setToken,
    register,
    login,
    author,
    setAuthor,
    getUsers,
    getUser,
    getMessages,
    users,
    setUsers,
    messages,
    setMessages,
    selectedUser,
    setSelectedUser,
    onlineUsers,
    sendMessage,
    connectSocket,
    disconnectSocket,
    setSocket,
    socket,
    subscripeToMessage,
    unSubscripeToMessage,
    isLoading,
    setIsLoading
  };

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
};

export default ConnectUserContext;
