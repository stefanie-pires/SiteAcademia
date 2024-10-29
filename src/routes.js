import React from "react"; 
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Principal from "./Components/PaginaPrincipal";
import Login from "./Components/Login";
import Informacoes from "./Components/Informacoes";
import Horarios from "./Components/Horarios/horarios"; 
import Planos from './Components/Planos/planos'; 
import Cadastro from './Components/Cadastro/cadastro';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} /> {/* Corrigido aqui */}
        <Route path="/horarios" element={<Horarios />} />
        <Route path="/planos" element={<Planos />} />
      </Routes>
      <Informacoes />
    </BrowserRouter>
  );
}
