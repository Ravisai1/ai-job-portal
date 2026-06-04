import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../Api/axios";
import type { Job } from "../types/Job";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";

import {
  Container,
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  CircularProgress,
} from "@mui/material";

const JobDetails: React.FC = () => {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    api
      .get(`/jobs/${id}`)
      .then((response) => {
        setJob(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch Job Details:", error);
      });
  }, [id]);

  if (!job) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 5,
          p: 2,
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            {job.title}
          </Typography>

          <Typography variant="h6" color="primary">
            {job.company}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <LocationOnIcon sx={{ mr: 1 }} />
            <Typography>{job.location}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <CurrencyRupeeIcon sx={{ mr: 1 }} />
            <Typography>{job.salary}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <PersonIcon sx={{ mr: 1 }} />
            <Typography>{job.createdBy}</Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Job Description
          </Typography>

          <Typography color="text.secondary">{job.description}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default JobDetails;
