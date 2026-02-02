import React from "react";

const PostList = ({ posts, user, handleDeletePost }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center text-gray-600 mt-10">
        No posts yet. Be the first to share something! 🌿
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div
          key={post._id}
          className="p-6 rounded-3xl backdrop-blur-xl bg-white/60 border border-white/60 shadow-lg hover:shadow-xl transition-all"
        >
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-lg font-semibold text-gray-800">
              {post.user?.name || "Anonymous"}
            </h4>
            <span className="text-sm text-gray-500 bg-white/70 px-2 py-1 rounded-full">
              {post.category}
            </span>
          </div>

          <p className="text-black mb-3">{post.content}</p>

          {user && user._id === post.user?._id && (
            <button
              onClick={() => handleDeletePost(post._id)}
              className="text-sm text-red-500 hover:text-red-600"
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;