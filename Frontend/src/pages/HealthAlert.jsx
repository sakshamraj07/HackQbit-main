import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import for navigation
import Api from "../utils/Api"; // ✅ Import the Api utility

const HealthAlerts = () => {
  const navigate = useNavigate(); // ✅ initialize navigation

  const [form, setForm] = useState({
    name: "",
    email: "",
    medicine: {
      takesMedicine: false,
      times: {
        morning: false,
        afternoon: false,
        evening: false,
      },
    },
    drinksMoreThan6L: false,
    sleepTime: "22:00",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes("medicine.times")) {
      const key = name.split(".")[2];
      setForm((prev) => ({
        ...prev,
        medicine: {
          ...prev.medicine,
          times: {
            ...prev.medicine.times,
            [key]: checked,
          },
        },
      }));
    } else if (name === "takesMedicine") {
      setForm((prev) => ({
        ...prev,
        medicine: {
          ...prev.medicine,
          takesMedicine: checked,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // ✅ Use the Api utility to make the POST request
      const res = await Api.post("/alerts/preferences", form);
      if (res.data.success) {
        setMessage("✅ Your preferences have been saved! Health alerts will be sent to your email.");
        setTimeout(() => navigate("/"), 2000); // ✅ redirect to home after 2 seconds
      } else {
        setMessage("⚠ Unable to save your preferences. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-700">
          🌿 Health Alerts Setup
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* Medicine */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Do you take medicines?
            </label>
            <input
              type="checkbox"
              name="takesMedicine"
              checked={form.medicine.takesMedicine}
              onChange={handleChange}
              className="mr-2"
            />
            <span>Yes</span>

            {form.medicine.takesMedicine && (
              <div className="mt-2 ml-6 space-x-4">
                <label>
                  <input
                    type="checkbox"
                    name="medicine.times.morning"
                    checked={form.medicine.times.morning}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  Morning
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="medicine.times.afternoon"
                    checked={form.medicine.times.afternoon}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  Afternoon
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="medicine.times.evening"
                    checked={form.medicine.times.evening}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  Evening
                </label>
              </div>
            )}
          </div>

          {/* Water intake */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Do you drink more than 6L of water per day?
            </label>
            <input
              type="checkbox"
              name="drinksMoreThan6L"
              checked={form.drinksMoreThan6L}
              onChange={handleChange}
              className="mr-2"
            />
            <span>Yes</span>
          </div>

          {/* Sleep time */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              What time do you sleep or want to sleep?
            </label>
            <input
              type="time"
              name="sleepTime"
              value={form.sleepTime}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* ✅ Updated Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white rounded-lg py-2 hover:bg-green-700 transition"
          >
            {loading ? "Saving..." : "Get Personalized Messages"}
          </button>

          {message && (
            <p className="text-center mt-4 text-gray-700 font-medium">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default HealthAlerts;