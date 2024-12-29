import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "../app/WelcomePage";
import App from "../app/App";
import HomeLayout from "../app/HomeLayout";
function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<WelcomePage />} />
          <Route path="reviews" element={<App />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
