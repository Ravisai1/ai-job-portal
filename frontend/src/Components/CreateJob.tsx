import React, { useState } from "react";
import api from "../Api/axios";

import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Box,
} from "@mui/material";

import WorkIcon from "@mui/icons-material/Work";

const CreateJob: React.FC = () => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateJob = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/jobs/addjobs",
        {
          title,
          company,
          location,
          salary,
          description,
        }
      );

      alert(response.data);

      setTitle("");
      setCompany("");
      setLocation("");
      setSalary("");
      setDescription("");
    } catch (error) {
      console.log(
        "Job Creation Failed",
        error
      );
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ mt: 5, mb: 5 }}
    >
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 5,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 3,
            }}
          >
            <WorkIcon
              color="primary"
              sx={{
                fontSize: 40,
                mr: 2,
              }}
            />

            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                }}
              >
                Create Job
              </Typography>

              <Typography color="text.secondary">
                Fill in the details to
                post a new job.
              </Typography>
            </Box>
          </Box>

          <Box
            component="form"
            onSubmit={handleCreateJob}
          >
            <Stack spacing={3}>
              <TextField
                label="Job Title"
                fullWidth
                required
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
              />

              <TextField
                label="Company"
                fullWidth
                required
                value={company}
                onChange={(e) =>
                  setCompany(
                    e.target.value
                  )
                }
              />

              <TextField
                label="Location"
                fullWidth
                required
                value={location}
                onChange={(e) =>
                  setLocation(
                    e.target.value
                  )
                }
              />

              <TextField
                label="Salary"
                type="number"
                fullWidth
                required
                value={salary}
                onChange={(e) =>
                  setSalary(
                    e.target.value
                  )
                }
              />

              <TextField
                label="Job Description"
                multiline
                rows={4}
                fullWidth
                required
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<WorkIcon />}
                sx={{
                  py: 1.5,
                }}
              >
                Create Job
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CreateJob;