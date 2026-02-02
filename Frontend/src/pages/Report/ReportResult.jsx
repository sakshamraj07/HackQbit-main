import React from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ReportResult = ({ result, selectedHistoryItem }) => {
  return (
    <motion.div
      key="result-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-10 p-6 md:p-10 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/40 shadow-lg hover:shadow-green-200/40 transition-all duration-300 text-gray-900"
    >
      <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent text-center mb-6">
        📑 Report Summary
      </h2>

      {selectedHistoryItem && (
        <div className="text-center text-sm text-gray-700 mb-6">
          Viewing summary for:{" "}
          <span className="font-semibold text-green-700">
            {selectedHistoryItem.name}
          </span>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="prose max-w-none leading-relaxed text-gray-800"
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => (
              <h1
                className="text-2xl font-bold text-green-700 border-b border-gray-300 pb-1 mb-4"
                {...props}
              />
            ),
            h2: ({ node, ...props }) => (
              <h2
                className="text-xl font-semibold text-green-700 mt-6 mb-3"
                {...props}
              />
            ),
            p: ({ node, ...props }) => (
              <p className="text-gray-800 mb-4" {...props} />
            ),
            strong: ({ node, ...props }) => (
              <strong
                className="text-emerald-700 font-semibold bg-emerald-100 px-1 rounded"
                {...props}
              />
            ),
            blockquote: ({ node, ...props }) => (
              <blockquote
                className="border-l-4 border-green-500 pl-4 italic text-gray-700 bg-green-50 rounded-md py-2"
                {...props}
              />
            ),
            li: ({ node, ...props }) => (
              <li
                className="mb-2 pl-2 before:content-['✔'] before:mr-2 before:text-green-600"
                {...props}
              />
            ),
            code: ({ node, inline, ...props }) =>
              inline ? (
                <code
                  className="bg-gray-200 text-green-700 px-1 py-0.5 rounded text-sm"
                  {...props}
                />
              ) : (
                <pre className="bg-gray-100 text-green-700 p-3 rounded-lg overflow-x-auto shadow-inner">
                  <code {...props} />
                </pre>
              ),
          }}
        >
          {result}
        </ReactMarkdown>
      </motion.div>
    </motion.div>
  );
};

export default ReportResult;
