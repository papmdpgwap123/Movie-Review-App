import React from "react";
import { AppBar, Box, Typography, Toolbar } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { Outlet } from "react-router-dom"; 

const HomeLayout = () => {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
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

      <Box
        sx={{
          position: "absolute",
          top: "64px", 
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
        <Outlet />
      </Box>
    </Box>
  );
};

export default HomeLayout;
