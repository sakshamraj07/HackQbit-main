import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HeartPulse, AlertTriangle, PhoneCall } from "lucide-react";

export default function Services() {
  return (
    <div
      className="min-h-screen relative flex flex-col items-center pt-24 px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #e0f7f4 0%, #c9f0dd 40%, #c3e5f8 100%)",
      }}
    >
      {/* 🌈 Decorative glowing blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-300 opacity-30 blur-3xl rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 opacity-25 blur-3xl rounded-full -z-10" />

      {/* 🚨 Emergency Flash Card */}
      <motion.div
        className="fixed top-24 right-4 bg-white/70 backdrop-blur-md border border-red-200 shadow-xl rounded-2xl p-4 w-64 flex flex-col items-center text-center z-20"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <PhoneCall className="w-8 h-8 text-red-500 mb-2" />
        <h3 className="text-lg font-semibold text-red-700">Emergency Call</h3>
        <p className="text-sm text-gray-700 mb-3">
          Quick access to emergency services and contacts.
        </p>
        <Link to="/emergency">
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-all flex items-center justify-center gap-2">
            🚨 Go to Emergency
          </button>
        </Link>
      </motion.div>

      {/* Header */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-green-700 mb-6 text-center drop-shadow-sm"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Other Health Services
      </motion.h1>

      <motion.p
        className="text-gray-700 text-lg md:text-xl max-w-2xl text-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Explore powerful tools to monitor your vitals, receive preventive
        insights, and respond quickly in emergencies.
      </motion.p>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* 🩺 Health Monitor */}
        <motion.div
          className="bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-8 border border-green-100 hover:shadow-2xl transition-all"
          whileHover={{ scale: 1.03 }}
        >
          <div className="flex items-center mb-4">
            <HeartPulse className="text-green-500 w-8 h-8 mr-3" />
            <h2 className="text-2xl font-semibold text-green-700">
              Measure Your Health
            </h2>
          </div>
          <p className="text-gray-700 mb-6">
            Monitor your <strong>heart rate</strong>, <strong>temperature</strong>, and
            <strong> oxygen levels</strong> at regular intervals for accurate tracking.
          </p>
          <Link to="/healthmonitor">
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all">
              Go to Health Monitor
            </button>
          </Link>
        </motion.div>

        {/* ⚠️ Health Alerts */}
        <motion.div
          className="bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-8 border border-blue-100 hover:shadow-2xl transition-all"
          whileHover={{ scale: 1.03 }}
        >
          <div className="flex items-center mb-4">
            <AlertTriangle className="text-blue-500 w-8 h-8 mr-3" />
            <h2 className="text-2xl font-semibold text-blue-700">
              Alerts & Recommendations
            </h2>
          </div>
          <p className="text-gray-700 mb-6">
            Receive personalized <strong>health alerts</strong> and preventive
            recommendations based on your health patterns.
          </p>
          <Link to="/healthalerts">
            <button className="bg-blue-600 text-white px-6 py-2 mt-4 rounded-lg hover:bg-blue-700 transition-all">
              Go to Health Alerts
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <p className="text-gray-600 mt-12 mb-8 text-sm">
        Designed for your well-being — stay informed, stay healthy 💚
      </p>
    </div>
  );
}
