import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import SymptomChecker from "./components/SymptomChecker/SymptomChecker";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from './components/ProtectedRoutes';
import HealthMonitor from "./pages/HealthMonitor";
import Reports from "./pages/Report/Reports";
import Community from "./components/Community/Community";
import Consult from "./pages/Consultancy";
import ConsultChat from "./pages/ConsultChat";
import HealthAlerts from "./pages/HealthAlert";
import Services from "./pages/Services";
import Emergency from "./pages/Emergency";

function App() {
  const location = useLocation();

  // Paths where Navbar should be hidden
  const pathsWithoutNavbar = ["/login", "/signup"];
  const hideForConsultChat = location.pathname.startsWith("/consult/chat");

  const normalizedPathname = location.pathname.endsWith("/")
    ? location.pathname.slice(0, -1)
    : location.pathname;

  const hideNavbar =
    pathsWithoutNavbar.includes(normalizedPathname.toLowerCase()) ||
    hideForConsultChat;

  return (
    <div className="flex flex-col min-h-screen font-inter">
      {/* Conditionally render Navbar */}
      {!hideNavbar && <Navbar />}

      <div className={`flex-grow flex flex-col ${!hideNavbar ? "pt-16" : ""}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/healthalerts"
            element={
              <ProtectedRoute>
                <HealthAlerts />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/healthmonitor"
            element={
              <ProtectedRoute>
                <HealthMonitor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report"
            element={
              <ProtectedRoute>
                <Reports/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/symptom"
            element={
              <ProtectedRoute>
                <SymptomChecker />
              </ProtectedRoute>
            }
          />
          <Route
            path="/community"
            element={
              <ProtectedRoute>
                <Community />
              </ProtectedRoute>
            }
          />
          <Route
            path="/consult"
            element={
              <ProtectedRoute>
                <Consult />
              </ProtectedRoute>
            }
          />
          <Route
            path="/consult/chat/:doctorId"
            element={
              <ProtectedRoute>
                <ConsultChat />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
