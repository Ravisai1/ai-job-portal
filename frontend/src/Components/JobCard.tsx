import { useNavigate } from "react-router-dom";
import api from "../Api/axios";
import type { Job } from "../types/Job";

import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Stack,
} from "@mui/material";

import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DescriptionIcon from "@mui/icons-material/Description";
import WorkIcon from "@mui/icons-material/Work";

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleApply = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();

    try {
      const response = await api.post(
        `/applications/${job.id}/apply`,
        {}
      );

      alert(response.data);
    } catch (error) {
      console.error("Failed to apply:", error);
      alert("Application Failed");
    }
  };

  return (
    <Card
      sx={{
        mb: 3,
        borderRadius: 3,
        boxShadow: 4,
        cursor: "pointer",
        transition: "0.3s",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: 8,
        },
      }}
      onClick={() => navigate(`/jobs/${job.id}`)}
    >
      <CardContent>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <WorkIcon color="primary" />
          {job.title}
        </Typography>

        <Stack spacing={1}>
          <Box display="flex" alignItems="center">
            <BusinessIcon
              color="action"
              sx={{ mr: 1 }}
            />
            <Typography>
              <strong>Company:</strong> {job.company}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <LocationOnIcon
              color="action"
              sx={{ mr: 1 }}
            />
            <Typography>
              <strong>Location:</strong> {job.location}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <CurrencyRupeeIcon
              color="action"
              sx={{ mr: 1 }}
            />
            <Typography>
              <strong>Salary:</strong> {job.salary}
            </Typography>
          </Box>

          <Box display="flex" alignItems="flex-start">
            <DescriptionIcon
              color="action"
              sx={{ mr: 1, mt: 0.3 }}
            />
            <Typography>
              <strong>Description:</strong>{" "}
              {job.description}
            </Typography>
          </Box>
        </Stack>

        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {role === "USER" && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleApply}
            >
              Apply Now
            </Button>
          )}

          {role === "RECRUITER" && (
            <Button
              variant="contained"
              color="secondary"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/applicants/jobId/${job.id}`);
              }}
            >
              View Applicants
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobCard;