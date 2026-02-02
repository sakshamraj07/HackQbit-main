import React from "react";
import { motion } from "framer-motion";
import {
  AiOutlineUpload,
  AiOutlineLoading3Quarters,
  AiOutlineCloseCircle,
} from "react-icons/ai";

const ReportUpload = ({ file, loading, handleFileChange, handleClearFile, handleUpload }) => {
  return (
    <motion.div
      key="upload-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative flex flex-col items-center border-2 border-dashed border-green-400 rounded-2xl p-6 md:p-10 bg-white/40 backdrop-blur-xl hover:bg-white/60 transition cursor-pointer shadow-lg">
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="cursor-pointer text-green-700 font-semibold md:text-lg hover:text-emerald-700 transition flex flex-col items-center"
        >
          <AiOutlineUpload className="text-green-600 text-5xl md:text-6xl mb-3 md:mb-4" />
          {file ? file.name : "Click to select a file"}
        </label>

        {file && (
          <motion.button
            onClick={handleClearFile}
            className="absolute top-2 right-2 text-green-700 hover:text-red-500 transition"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <AiOutlineCloseCircle size={24} />
          </motion.button>
        )}

        {file && file.type.startsWith("image/") && (
          <motion.img
            src={URL.createObjectURL(file)}
            alt="Preview"
            className="mt-4 max-h-64 rounded-xl shadow-md border border-white/40"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>

      <motion.button
        onClick={handleUpload}
        disabled={loading || !file}
        className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 md:py-4 rounded-2xl shadow-md hover:from-green-600 hover:to-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {loading && (
          <AiOutlineLoading3Quarters className="animate-spin mr-2 text-lg md:text-xl" />
        )}
        {loading ? "Analyzing Report..." : "Upload & Analyze"}
      </motion.button>
    </motion.div>
  );
};

export default ReportUpload;
