import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginpage";
import DashBoardPage from "./pages/DashBoardPage";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashBoardPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
