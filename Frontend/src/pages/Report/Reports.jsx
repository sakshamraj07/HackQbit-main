import React, { useState, useEffect } from "react";
import API from "../../utils/Api";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineCloseCircle } from "react-icons/ai";
import reportBg from "../../assets/report.png";
import ReportUpload from "./ReportUpload";
import ReportResult from "./ReportResult";
import ReportHistory from "./ReportHistory";

const Reports = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);

  const fetchHistory = async () => {
    try {
      const res = await API.get("/reports/history");
      setHistory(res.data);
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleClearFile = () => setFile(null);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setSelectedHistoryItem(null);
      const res = await API.post("/reports/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data.explanation);
      fetchHistory();
    } catch (err) {
      console.error(err);
      alert("Something went wrong while analyzing the report.");
    } finally {
      setLoading(false);
      setFile(null);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    const confirmed = window.confirm("Are you sure you want to delete this report?");
    if (!confirmed) return;

    try {
      await API.delete(`/reports/delete/${id}`);
      setHistory((prev) => prev.filter((item) => item._id !== id));
      if (selectedHistoryItem && selectedHistoryItem._id === id) clearCurrentView();
    } catch (err) {
      console.error("Error deleting report:", err);
      alert("Failed to delete report.");
    }
  };

  const handleViewHistoryItem = (item) => {
    setSelectedHistoryItem(item);
    setResult(item.explanation);
    setShowHistory(false);
  };

  const clearCurrentView = () => {
    setResult("");
    setSelectedHistoryItem(null);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center p-4 md:p-8 py-12 font-sans relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${reportBg})`,
      }}
    >
      {/* Soft overlay */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] -z-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white/30 backdrop-blur-2xl shadow-2xl rounded-3xl p-6 md:p-10 w-full max-w-3xl border border-white/40 relative z-10 text-gray-900"
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent drop-shadow-md">
            🧾 Medical Report Analyzer
          </h1>

          <AnimatePresence>
            {result && (
              <motion.button
                key="clear-btn"
                onClick={clearCurrentView}
                className="flex items-center text-sm text-green-700 hover:text-red-500 transition"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AiOutlineCloseCircle className="mr-1" />
                Clear
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <p className="text-gray-800 text-center mb-6 md:mb-8 text-sm md:text-base leading-relaxed">
          Upload your <span className="text-green-700 font-semibold">report (PDF/Image)</span>.  
          Our AI will <span className="text-green-700 font-semibold">analyze</span> and explain it in simple,
          easy-to-understand terms.
        </p>

        <AnimatePresence mode="wait">
          {!result ? (
            <ReportUpload
              file={file}
              loading={loading}
              handleFileChange={handleFileChange}
              handleClearFile={handleClearFile}
              handleUpload={handleUpload}
            />
          ) : (
            <ReportResult result={result} selectedHistoryItem={selectedHistoryItem} />
          )}
        </AnimatePresence>
      </motion.div>

      {history.length > 0 && (
        <ReportHistory
          history={history}
          showHistory={showHistory}
          setShowHistory={setShowHistory}
          handleViewHistoryItem={handleViewHistoryItem}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Reports;
