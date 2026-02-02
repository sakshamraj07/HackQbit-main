import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HeartPulse,
  AlertTriangle,
  PhoneCall,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
} from "lucide-react";
import Chatbot from "../components/Chatbot";

export default function HeroSection() {
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    const res = await fetch("https://formspree.io/f/mblzayyq", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (res.ok) {
      setIsSent(true);
      form.reset();
      setTimeout(() => setIsSent(false), 5000); // Hide after 5 seconds
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      {/* HERO SECTION */}
      <section
        className="h-screen w-full flex flex-col justify-center items-center text-center px-6 md:px-16 relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px]" />
        <div className="relative z-10 max-w-4xl">
          <h2 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
            <span className="text-[#0A0A0A]">Smart Health Diagnostics and </span>
            <span className="font-serif italic text-[#3BB273]">
              Assistance Platform
            </span>
          </h2>

          <p className="mt-6 text-lg md:text-xl text-black max-w-3xl mx-auto leading-relaxed">
            Many individuals delay medical consultation due to lack of awareness or
            access. Our platform helps you understand symptoms, get early assessments,
            and take timely actions.
          </p>

          <Link to="/symptom">
            <button className="mt-8 px-10 py-3 bg-gradient-to-l from-green-600 to-teal-500 text-white rounded-full font-semibold text-lg hover:opacity-90 transition-all duration-200 shadow-md">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      <Chatbot />

      {/* SERVICES SECTION */}
      <section
        id="services"
        className="min-h-screen relative flex flex-col items-center pt-24 pb-24 px-6 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #e0f7f4 0%, #c9f0dd 40%, #c3e5f8 100%)",
        }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-green-700 mb-6 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Our Health Services
        </motion.h1>

        <motion.p
          className="text-gray-700 text-lg md:text-xl max-w-2xl text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Explore tools to monitor your vitals, get personalized alerts, and access
          emergency help — all in one place.
        </motion.p>

        {/* SERVICE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
          <ServiceCard
            icon={<HeartPulse className="text-green-500 w-8 h-8 mr-3" />}
            title="Measure Your Health"
            text="Monitor your heart rate, temperature, and oxygen levels for better tracking."
            link="/healthmonitor"
            btnColor="bg-green-600 hover:bg-green-700"
          />
          <ServiceCard
            icon={<AlertTriangle className="text-blue-500 w-8 h-8 mr-3" />}
            title="Alerts & Recommendations"
            text="Receive personalized health alerts and preventive tips."
            link="/healthalerts"
            btnColor="bg-blue-600 hover:bg-blue-700"
          />
          <ServiceCard
            icon={<PhoneCall className="text-red-500 w-8 h-8 mr-3" />}
            title="Emergency Call"
            text="Quick access to emergency services and nearby hospitals."
            link="/emergency"
            btnColor="bg-red-600 hover:bg-red-700"
          />
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="min-h-screen flex flex-col items-center justify-center px-6 md:px-20 py-24"
        style={{
          background:
            "linear-gradient(135deg, #f6faf7 0%, #e0f7f4 40%, #c3e5f8 100%)",
        }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-green-700 mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Contact & Connect With Us
        </motion.h1>

        <p className="text-gray-700 max-w-2xl mb-12 text-lg text-center">
          Have questions, feedback, or need support? Reach out to our team — we’re here
          to help you stay healthy and informed.
        </p>

        {/* 2-Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full">
          {/* LEFT: Contact Info */}
          <motion.div
            className="bg-white/70 backdrop-blur-lg rounded-2xl p-10 shadow-lg border-2 border-green-300 flex flex-col justify-center text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-4xl font-extrabold text-green-700 mb-10 text-center">
              Get in Touch
            </h3>
            <div className="space-y-6 text-lg text-left">
              <ContactItem
                icon={<Mail className="text-blue-600 w-7 h-7" />}
                title="Email"
                info="support@healthassist.com"
              />
              <ContactItem
                icon={<PhoneCall className="text-green-600 w-7 h-7" />}
                title="Phone"
                info="+91 98765 43210"
              />
              <ContactItem
                icon={<MapPin className="text-red-600 w-7 h-7" />}
                title="Address"
                info="123 Health Street, Wellness City"
              />
            </div>
          </motion.div>

          {/* RIGHT: Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white/70 backdrop-blur-lg p-10 rounded-2xl shadow-lg border-2 border-green-300 relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-green-700 mb-6 text-center">
              Send Us a Message
            </h3>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              required
              className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none h-32"
            ></textarea>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-teal-500 text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-all w-full"
            >
              <Send size={18} /> Send Message
            </button>

            {isSent && (
              <motion.div
                className="absolute bottom-4 left-0 right-0 mx-auto text-center text-green-700 font-semibold flex items-center justify-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CheckCircle2 className="text-green-600" size={20} />
                Message sent successfully!
              </motion.div>
            )}
          </motion.form>
        </div>
      </section>
    </div>
  );
}

/* COMPONENTS */
function ServiceCard({ icon, title, text, link, btnColor }) {
  return (
    <motion.div
      className="bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-8 border hover:shadow-2xl transition-all flex flex-col justify-between"
      whileHover={{ scale: 1.03 }}
    >
      <div>
        <div className="flex items-center mb-4">
          {icon}
          <h2 className="text-2xl font-semibold">{title}</h2>
        </div>
        <p className="text-gray-700 mb-6">{text}</p>
      </div>
      <Link to={link}>
        <button
          className={`${btnColor} text-white px-6 py-2 rounded-lg transition-all w-full`}
        >
          Go to {title}
        </button>
      </Link>
    </motion.div>
  );
}

function ContactItem({ icon, title, info }) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <div>
        <h4 className="font-semibold text-gray-800 text-lg">{title}</h4>
        <p className="text-gray-700 text-base">{info}</p>
      </div>
    </div>
  );
}
