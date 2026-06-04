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
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import EmailIcon from "@mui/icons-material/Email";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

const Applicants: React.FC = () => {
  const { jobid } = useParams();

  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    api
      .get(`/applications/jobId/${jobid}`)
      .then((response) => {
        setApplications(response.data);
      })
      .catch((error) => {
        console.log("Failed to fetch applications", error);
      });
  }, [jobid]);

  const handleStatusChange = (
    id: number,
    status: string
  ) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status } : app
      )
    );
  };

  const updateStatus = async (id: number) => {
    const app = applications.find(
      (a) => a.id === id
    );

    if (!app) return;

    try {
      await api.put(
        `/applications/${id}/status`,
        {
          status: app.status,
        }
      );

      alert("Status updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
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
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 4,
        }}
      >
        <PeopleIcon
          color="primary"
          sx={{ fontSize: 42, mr: 2 }}
        />

        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700 }}
          >
            Applicants
          </Typography>

          <Typography color="text.secondary">
            Total Applicants :{" "}
            {applications.length}
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
          <Typography variant="h6">
            No applicants found.
          </Typography>
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
                  <Box
                    display="flex"
                    alignItems="center"
                  >
                    <EmailIcon
                      color="action"
                      sx={{ mr: 1 }}
                    />

                    <Typography variant="h6">
                      {app.userEmail}
                    </Typography>
                  </Box>

                  <Chip
                    label={app.status}
                    color={getStatusColor(
                      app.status
                    )}
                  />
                </Box>

                {/* Applied Date */}
                <Box
                  display="flex"
                  alignItems="center"
                >
                  <CalendarMonthIcon
                    color="action"
                    sx={{ mr: 1 }}
                  />

                  <Typography>
                    {new Date(
                      app.appliedAt
                    ).toLocaleString()}
                  </Typography>
                </Box>

                {/* Status Dropdown */}
                <FormControl fullWidth>
                  <InputLabel>
                    Status
                  </InputLabel>

                  <Select
                    value={
                      app.status?.toUpperCase() ||
                      ""
                    }
                    label="Status"
                    onChange={(e) =>
                      handleStatusChange(
                        app.id,
                        e.target.value
                      )
                    }
                  >
                    <MenuItem value="APPLIED">
                      Applied
                    </MenuItem>

                    <MenuItem value="REVIEWING">
                      Reviewing
                    </MenuItem>

                    <MenuItem value="SHORTLISTED">
                      Shortlisted
                    </MenuItem>

                    <MenuItem value="REJECTED">
                      Rejected
                    </MenuItem>

                    <MenuItem value="SELECTED">
                      Selected
                    </MenuItem>
                  </Select>
                </FormControl>

                {/* Update Button */}
                <Button
                  variant="contained"
                  startIcon={
                    <AssignmentTurnedInIcon />
                  }
                  onClick={() =>
                    updateStatus(app.id)
                  }
                >
                  Update Status
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};

export default Applicants;