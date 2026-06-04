import React, { useEffect, useState } from "react";
import type { Job } from "../types/Job";
import api from "../Api/axios";
import JobCard from "../Components/JobCard";

import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Paper,
} from "@mui/material";

import WorkIcon from "@mui/icons-material/Work";

const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/jobs/getjobs")
      .then((response) => {
        setJobs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch jobs:", error);
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
      {/* Header */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          gap={2}
        >
          <WorkIcon
            color="primary"
            sx={{ fontSize: 40 }}
          />

          <Box>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700 }}
            >
              Available Jobs
            </Typography>

            <Typography
              color="text.secondary"
            >
              Total Jobs: {jobs.length}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Job List */}
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
            No jobs available.
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default Jobs;