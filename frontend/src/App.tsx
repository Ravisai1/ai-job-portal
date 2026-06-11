import { Route, Routes,useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Jobs from "./Pages/Jobs";
import MyApplications from "./Pages/MyApplications";
import Login from "./Pages/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import JobDetails from "./Components/JobDetails";
import CreateJob from "./Components/CreateJob";
import Applicants from "./Pages/Applicants";
import Dashboard from "./Pages/Dashboard";

function App() {
  const location=useLocation();
  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/register" || location.pathname === "/login"
    
  return (
    <>
       {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="*" element={<Login />} />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-applications"
          element={
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute>
              <JobDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/CreateJob"
          element={
            <ProtectedRoute>
              <CreateJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Applicants/jobId/:jobid"
          element={
            <ProtectedRoute>
              <Applicants />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
