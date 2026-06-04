import { useEffect, useState } from "react";
import api from "../Api/axios";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Chip,
  Divider,
} from "@mui/material";

import WorkIcon from "@mui/icons-material/Work";
import EmailIcon from "@mui/icons-material/Email";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

interface Application {
  id: number;
  jobId: number;
  userEmail: string;
  status: string;
  appliedAt: string;
}

const MyApplications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api
      .get("/applications/my")
      .then((response) => {
        setApplications(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch applications:", error);
        setLoading(false);
      });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
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

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 10,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 700 }}
      >
        My Applications
      </Typography>

      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Total Applications: {applications.length}
      </Typography>

      {applications.map((app) => (
        <Card
          key={app.id}
          sx={{
            mb: 3,
            borderRadius: 3,
            boxShadow: 4,
          }}
        >
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography
                variant="h6"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <WorkIcon color="primary" />
                Job ID: {app.jobId}
              </Typography>

              <Chip
                label={app.status}
                color={getStatusColor(app.status)}
              />
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
              }}
            >
              <EmailIcon
                color="action"
                sx={{ mr: 1 }}
              />
              <Typography>
                {app.userEmail}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
              }}
            >
              <AssignmentTurnedInIcon
                color="action"
                sx={{ mr: 1 }}
              />
              <Typography>
                Status: {app.status}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <CalendarMonthIcon
                color="action"
                sx={{ mr: 1 }}
              />
              <Typography>
                {new Date(app.appliedAt).toLocaleString()}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default MyApplications;