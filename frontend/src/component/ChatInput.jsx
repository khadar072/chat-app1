import React, { useState, useEffect, useContext } from "react";
import { FiSend, FiPaperclip, FiX } from "react-icons/fi";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const ChatInput = () => {
  const { token, selectedUser } = useContext(UserContext); // get token and selectedUser
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Generate image preview
  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!message && !file) return; // safety check

    try {
      let base64Image = "";

      // Convert file to Base64 if it exists
      if (file) {
        base64Image = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = (err) => reject(err);
        });
      }

      // Prevent sending completely empty messages
      if (!message && !base64Image) {
        alert("Cannot send empty message.");
        return;
      }

      // Send message to server
      const response = await axios.post(
        `https://chat-app1-backend-mius.onrender.com/api/messages/send/${selectedUser._id}`,
        { text: message, image: base64Image },
        { headers: { token } }
      );

      if (response.data.success) {
        console.log("✅ Message sent:", response.data.message);
      } else {
        console.log("Send message failed:", response.data.message);
      }
    } catch (error) {
      console.error("Send message failed:", error.message);
    }

    // Clear input and file
    setMessage("");
    setFile(null);
  };

  const isSendDisabled = !message && !file; // disable if both empty

  return (
    <div className="p-3 border-t border-base-300">
      {/* Image preview */}
      {preview && (
        <div className="mb-2 relative w-32 h-32">
          <img
            src={preview}
            alt="preview"
            className="w-full h-full object-cover rounded-xl"
          />
          <button
            type="button"
            className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
            onClick={() => setFile(null)}
          >
            <FiX size={16} />
          </button>
        </div>
      )}

      <form onSubmit={handleSend} className="flex items-center gap-2 w-full">
        {/* File Upload */}
        <label
          htmlFor="file-upload"
          className="p-2 rounded-full hover:bg-base-200 cursor-pointer"
        >
          <FiPaperclip size={20} />
        </label>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        {/* Message Input */}
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 input input-ghost rounded-xl px-4 py-4 border border-base-300 focus:outline-none focus:ring focus:ring-primary"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={isSendDisabled}
          className={`p-2 rounded-xl text-white transition ${
            isSendDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-primary-focus"
          }`}
        >
          <FiSend size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
