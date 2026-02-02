import React, { useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/report.png";

const Report = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    reportFile: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, reportFile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    if (!formData.firstName || !formData.lastName || !formData.gender) {
      setMessage({ type: "error", text: "❌ Please fill all required fields." });
      setIsLoading(false);
      return;
    }

    setMessage({ type: "success", text: "✅ Medical Record Submitted Successfully!" });

    setFormData({
      firstName: "",
      lastName: "",
      gender: "",
      reportFile: null,
    });

    setAnalysis(null);

    setTimeout(() => {
      setMessage({ type: "", text: "" });
      setIsLoading(false);
    }, 3000);
  };

  const handleAnalyze = async () => {
    if (!formData.reportFile) return alert("Upload a report first");
    setAnalyzing(true);

    const formDataObj = new FormData();
    formDataObj.append("reportFile", formData.reportFile);

    try {
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formDataObj,
      });
      const data = await response.json();
      setAnalysis(data.analyzed);
    } catch (error) {
      alert("Error analyzing report");
    } finally {
      setAnalyzing(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative text-gray-900 overflow-hidden">
      {/* Background Image */}
      <img
        src={logo}
        alt="abstract background"
        className="absolute inset-0 w-full h-full object-cover opacity-60 z-0 pointer-events-none"
      />

      {/* Report Card */}
      <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 backdrop-blur-xl bg-white/70 p-6 rounded-2xl shadow-2xl border border-white/80 w-full max-w-md flex flex-col justify-center mx-auto mt-20"
      >
        {/* Medical Report Heading */}
        <h1
          className="text-2xl font-bold text-center mb-4 text-blue-900"
          style={{
            textShadow: "2px 2px 4px rgba(255,255,255,0.7)",
          }}
        >
          Report Analyzer
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {/* Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              name="firstName"
              placeholder="First Name *"
              value={formData.firstName}
              onChange={handleChange}
              className="px-4 py-2 rounded-xl bg-white text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name *"
              value={formData.lastName}
              onChange={handleChange}
              className="px-4 py-2 rounded-xl bg-white text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <p className="font-medium mb-1 text-gray-900">Gender *</p>
            {["Male", "Female", "Other"].map((option) => (
              <label key={option} className="mr-3 text-gray-900">
                <input
                  type="radio"
                  name="gender"
                  value={option}
                  checked={formData.gender === option}
                  onChange={handleChange}
                  className="mr-1 accent-blue-500"
                  required
                />
                {option}
              </label>
            ))}
          </div>

          {/* Upload Report (Below Gender) */}
          <div>
            <h3 className="text-lg font-semibold mb-1 text-gray-900">Upload Report</h3>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={handleChange}
              className="px-4 py-2 rounded-xl bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors w-full"
            />
            {formData.reportFile && (
              <p className="mt-2 text-gray-800 text-sm">{formData.reportFile.name} uploaded</p>
            )}
            <button
              type="button"
              onClick={handleAnalyze}
              className="mt-2 px-5 py-2 rounded-xl bg-gradient-to-r from-green-600 to-green-800 text-white font-semibold text-lg hover:shadow-xl transition-all"
              disabled={analyzing}
            >
              {analyzing ? "Analyzing..." : "Analyze Report"}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-green-600 to-green-800 text-white font-semibold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Submitting...
              </div>
            ) : (
              "Submit Record"
            )}
          </button>
        </form>

        {/* Message */}
        {message.text && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}

        {/* Analyzed Data */}
        {analysis && (
          <div className="mt-6 p-4 bg-gray-200 rounded-xl border border-gray-300 text-gray-900">
            <h2 className="text-xl font-bold mb-2 text-blue-800">Analyzed Data</h2>
            <p><strong>Name:</strong> {analysis.name}</p>
            <p><strong>Age:</strong> {analysis.age}</p>
 </div>
        )}
      </motion.div>
    </div>
  );
};

export default Report;