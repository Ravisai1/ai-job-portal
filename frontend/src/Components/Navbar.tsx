import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Alert,
  Snackbar,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<
    "success" | "error" | "warning" | "info"
  >("success");
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    // alert("Logged out successfully");
    setMessage("Logged out successfully");
    setSeverity("success");
    setOpen(true);
    navigate("/login");
  };

  return (
    <>
      <AppBar position="static" elevation={3}>
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <WorkIcon sx={{ mr: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              AI Job Portal
            </Typography>
          </Box>

          {/* USER Menu */}
          {role === "USER" && (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button color="inherit" component={Link} to="/jobs">
                Jobs
              </Button>

              <Button color="inherit" component={Link} to="/my-applications">
                My Applications
              </Button>
            </Box>
          )}

          {/* RECRUITER Menu */}
          {role === "RECRUITER" && (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button color="inherit" component={Link} to="/jobs">
                Jobs
              </Button>

              <Button color="inherit" component={Link} to="/CreateJob">
                Create Job
              </Button>

              <Button color="inherit" component={Link} to="/Dashboard">
                Dashboard
              </Button>
            </Box>
          )}

          {/* Logout */}
          <Button
            variant="contained"
            color="error"
            sx={{ ml: 3 }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={severity}
          variant="filled"
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Navbar;
