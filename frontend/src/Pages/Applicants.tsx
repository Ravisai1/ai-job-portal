import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Api/axios";
import type { Application } from "../types/Application";

import {
  Container,
  Card,
  CardContent,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Chip,
  Alert,
  Snackbar,
  NativeSelect,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import EmailIcon from "@mui/icons-material/Email";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

const Applicants: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<
    "success" | "error" | "warning" | "info"
  >("success");
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const { jobid } = useParams();

  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    api
      .get(`/applications/jobId/${jobid}`)
      .then((response) => {
        const normalizedData = response.data.map((app: Application) => ({
          ...app,
          status: app.status.toUpperCase(),
        }));

        setApplications(normalizedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [jobid]);

  const handleStatusChange = (id: number, status: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app)),
    );
  };

  const updateStatus = async (id: number, status: string) => {
    setLoadingId(id);
    try {
      await api.put(`/applications/${id}/status`, {
        status,
      });

      setMessage("Status updated successfully!");

      setSeverity("success");
      setOpen(true);
    } catch (error) {
      console.error(error);

      setMessage("Failed to update status");

      setSeverity("error");
      setOpen(true);
    } finally {
      setLoadingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case "APPLIED":
        return "info";
      case "REVIEWING":
        return "warning";
      case "SHORTLISTED":
        return "secondary";
      case "SELECTED":
        return "success";
      case "REJECTED":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 4,
          }}
        >
          <PeopleIcon color="primary" sx={{ fontSize: 42, mr: 2 }} />

          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Applicants
            </Typography>

            <Typography color="text.secondary">
              Total Applicants : {applications.length}
            </Typography>
          </Box>
        </Box>

        {/* No Data */}
        {applications.length === 0 ? (
          <Card
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 3,
            }}
          >
            <Typography variant="h6">No applicants found.</Typography>
          </Card>
        ) : (
          applications.map((app) => (
            <Card
              key={app.id}
              sx={{
                mb: 3,
                borderRadius: 3,
                boxShadow: 4,
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  {/* Email + Status */}
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box display="flex" alignItems="center">
                      <EmailIcon color="action" sx={{ mr: 1 }} />

                      <Typography variant="h6">{app.userEmail}</Typography>
                    </Box>

                    <Chip
                      label={app.status}
                      color={getStatusColor(app.status)}
                    />
                  </Box>

                  {/* Applied Date */}
                  <Box display="flex" alignItems="center">
                    <CalendarMonthIcon color="action" sx={{ mr: 1 }} />

                    <Typography>
                      {new Date(app.appliedAt).toLocaleString()}
                    </Typography>
                  </Box>

                  {/* Status Dropdown */}
                  <FormControl fullWidth>
                    <InputLabel variant="standard">Status</InputLabel>

                    <NativeSelect
                      value={app.status}
                      onChange={(e) =>
                        handleStatusChange(app.id, e.target.value)
                      }
                    >
                      <option value="APPLIED">Applied</option>

                      <option value="REVIEWING">Reviewing</option>

                      <option value="SHORTLISTED">Shortlisted</option>

                      <option value="REJECTED">Rejected</option>

                      <option value="SELECTED">Selected</option>
                    </NativeSelect>
                  </FormControl>

                  {/* Update Button */}
                  <Button
                    variant="contained"
                    disabled={loadingId === app.id}
                    startIcon={<AssignmentTurnedInIcon />}
                    onClick={() => updateStatus(app.id, app.status)}
                  >
                    {loadingId === app.id ? "Updating..." : "Update Status"}
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))
        )}
      </Container>
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

export default Applicants;
