import React from "react";
import { AppBar, Box, Typography, Toolbar, Button } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { useNavigate } from "react-router-dom";
const WelcomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/reviews");
  };
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#f0f2f5",
      }}
    >
      {/* Fixed Header */}
      <AppBar sx={{ backgroundColor: "#384A7B" }}>
        <Toolbar>
          <MovieIcon sx={{ mr: 2 }} />
          <Typography variant="h6">Movie Reviews</Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          position: "absolute",
          top: "64px", // Height of AppBar
          left: 0,
          right: 0,
          bottom: 0,
          background: "#1A2127",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            color: "white",
            maxWidth: "90%",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              mb: 4,
              fontSize: {
                xs: "2rem",
                sm: "3rem",
                md: "3.75rem",
              },
            }}
          >
            Welcome to Movie Reviews
          </Typography>

          <Typography
            variant="h5"
            sx={{
              mb: 4,
              fontSize: {
                xs: "1rem",
                sm: "1.5rem",
                md: "1.75rem",
              },
            }}
          >
            Discover the latest movies, read reviews, and join our community of
            movie enthusiasts.
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "white",
              color: "#1976d2",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
              padding: "10px 30px",
              textTransform: "none",
            }}
            onClick={handleClick}
          >
            Click here to see the movie reviews
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default WelcomePage;
