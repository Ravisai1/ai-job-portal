import { useEffect, useState } from "react";
import api from "../Api/axios";
import type { Job } from "../types/Job";
import JobCard from "../Components/JobCard";

import {
  Container,
  Typography,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";

const Dashboard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/jobs/my")
      .then((response) => {
        setJobs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Failed to fetch jobs", error);
        setLoading(false);
      });
  }, []);

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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Dashboard Header */}
      <Paper
        elevation={4}
        sx={{
          p: 3,
          borderRadius: 3,
          mb: 4,
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <DashboardIcon
            color="primary"
            sx={{ fontSize: 45 }}
          />

          <Box>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700 }}
            >
              Recruiter Dashboard
            </Typography>

            <Typography color="text.secondary">
              Manage your posted jobs and applicants.
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Stats Card */}
      <Paper
        elevation={2}
        sx={{
          p: 2,
          mb: 4,
          borderRadius: 3,
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <WorkIcon color="action" />

          <Typography variant="h6">
            Total Posted Jobs: {jobs.length}
          </Typography>
        </Box>
      </Paper>

      {/* Job Cards */}
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
          />
        ))
      ) : (
        <Paper
          sx={{
            p: 5,
            textAlign: "center",
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h6"
            color="text.secondary"
          >
            You haven't posted any jobs yet.
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default Dashboard;