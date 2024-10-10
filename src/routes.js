import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBar from "./Components/NavBar";
import Principal from "./Components/PaginaPrincipal"
import Login from "./Components/Login";
import Informacoes from "./Components/Informacoes";

export default function AppRoutes() {
  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Informacoes />
    </BrowserRouter>
  );
}