import React, { useState } from "react";
import API from "../../utils/Api";

const PostForm = ({ socket, user, token }) => {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("general");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const response = await API.post(
        "/community/posts",
        { content, category },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      socket.emit("newPost", response.data);
      setContent("");
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to post. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 mb-10 rounded-3xl backdrop-blur-xl bg-white/50 border border-white/60 shadow-lg"
    >
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        Create a New Post 🌱
      </h3>

      <div className="mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share something inspiring..."
          rows="4"
          className="w-full p-3 rounded-2xl border border-gray-300 bg-white/70 backdrop-blur-xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 rounded-xl border border-gray-300 bg-white/70 backdrop-blur-xl text-black focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
        >
          <option value="general">General</option>
          <option value="doctor">Doctor</option>
          <option value="health">Health</option>
        </select>

        <button
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-400 text-white font-semibold rounded-xl shadow-md hover:scale-105 transition-transform"
        >
          Post ✨
        </button>
      </div>
    </form>
  );
};

export default PostForm;