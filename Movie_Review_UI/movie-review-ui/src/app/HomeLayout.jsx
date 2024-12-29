import React from "react";
import { AppBar, Box, Typography, Toolbar } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { Outlet } from "react-router-dom"; // For nested routes (children components)

const HomeLayout = () => {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh", // Ensure content fills entire height of the screen
        backgroundColor: "#f0f2f5", // Background color for the entire app
      }}
    >
      {/* Fixed Header */}
      <AppBar
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "#384A7B",
        }}
      >
        <Toolbar>
          <MovieIcon sx={{ mr: 2 }} />
          <Typography variant="h6">Movie Reviews</Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          position: "absolute",
          top: "64px", // Height of AppBar (64px by default)
          left: 0,
          right: 0,
          bottom: 0,
          background: "#1A2127", // Background color for the content area
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        {/* Outlet for nested routes (to display the child components) */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default HomeLayout;
