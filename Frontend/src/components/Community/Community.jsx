import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { io } from "socket.io-client";
import API, { SOCKET_URL } from "../../utils/Api";
import PostForm from "./PostForm";
import PostList from "./PostList";

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  withCredentials: true,
});

const Community = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("general");

  // 🌿 Random background images
  const backgroundImages = [
    "/consult.jpg",
    "/health-bg.jpg",
    "/nature-bg.jpg",
    "/wellness-bg.jpg",
    "/people-bg.jpg",
  ];
  const randomImage =
    backgroundImages[Math.floor(Math.random() * backgroundImages.length)];

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const headers = token ? { Authorization: `Bearer ${token} `} : {};
        const response = await API.get(`/community/posts?category=${category}`, {
          headers,
        });
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch community posts:", err);
        setError("Failed to load community posts. Please try again later.");
        setLoading(false);
      }
    };

    fetchPosts();

    socket.on("newPost", (post) => {
      if (category === "all" || post.category === category) {
        setPosts((prevPosts) => [post, ...prevPosts]);
      }
    });

    return () => socket.off("newPost");
  }, [token, category]);

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        if (!user || !user._id) {
          navigate("/login");
          return;
        }
        await API.delete(`/community/posts/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(posts.filter((post) => post._id !== postId));
      } catch (err) {
        console.error("Failed to delete post:", err);
        alert("Failed to delete post. You can only delete your own posts.");
      }
    }
  };

  if (loading)
    return (
      <div className="pt-20 text-center min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-green-50 to-emerald-50 text-gray-700">
        <FaSpinner className="animate-spin text-5xl mb-4 text-emerald-500" />
        <h3 className="text-3xl font-bold">Loading Community...</h3>
      </div>
    );

  if (error)
    return (
      <div className="pt-20 text-center min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 via-white to-rose-50 text-gray-700">
        <h3 className="text-3xl font-extrabold text-red-500">Error</h3>
        <p className="text-gray-500 mt-2">{error}</p>
      </div>
    );

  return (
    <section className="py-20 px-4 md:px-10 lg:px-20 min-h-screen text-gray-800 relative overflow-hidden bg-gradient-to-br from-white via-green-50 to-teal-50">

      {/* 🌿 Animated Background */}
      <div
        className="absolute inset-0 bg-cover bg-center -z-20 animate-slow-zoom"
        style={{
          backgroundImage:` url("${randomImage}")`,
        }}
      ></div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-100/80 via-white/60 to-teal-100/70 backdrop-blur-[2px]"></div>

      {/* 🩺 Infinite ECG Wave Background */}
      <div className="absolute inset-0 z-0 opacity-25 overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1600 200"
          preserveAspectRatio="none"
          className="w-[200%] h-full animate-wave"
        >
          <defs>
            <pattern
              id="wavePattern"
              x="0"
              y="0"
              width="400"
              height="200"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0,100 Q50,60 100,100 T200,100 T300,100 T400,100"
                stroke="#10b981"
                strokeWidth="2"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="1600" height="200" fill="url(#wavePattern)" />
        </svg>
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-200 rounded-full blur-3xl opacity-20 animate-float-slow"></div>
      <div className="absolute bottom-10 right-20 w-72 h-72 bg-teal-200 rounded-full blur-3xl opacity-25 animate-float"></div>

      {/* 🌼 Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500 text-center mb-8 drop-shadow-sm">
          Community Forum 🌱
        </h2>

        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Share your experiences, ask for advice, and connect with others in the health community.
        </p>

        {/* Category Bar */}
        <div className="flex justify-center mb-10">
          <div className="backdrop-blur-2xl bg-white/50 border border-white/60 shadow-xl rounded-full px-4 py-2 flex gap-2">
            {["all", "general", "doctor", "health"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                  category === cat
                    ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg scale-105"
                    : "bg-white/70 text-gray-700 hover:bg-white hover:shadow-md"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Post Section */}
        {user ? (
          <PostForm socket={socket} user={user} token={token} />
        ) : (
          <div className="text-center p-6 rounded-3xl bg-white/80 shadow-xl border border-gray-200 mb-10 backdrop-blur-md">
            <p className="text-lg text-gray-700">
              Please log in to share your thoughts and connect with others 🌿
            </p>
          </div>
        )}

        <PostList
          posts={posts}
          user={user}
          handleDeletePost={handleDeletePost}
        />
      </div>
    </section>
  );
};

export default Community;