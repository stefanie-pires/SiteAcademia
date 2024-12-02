import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Principal from "./Components/PaginaPrincipal";
import Login from "./Components/Login";
import Informacoes from "./Components/Informacoes";
import Horarios from "./Components/Horarios/horarios"; 
import Planos from './Components/Planos/planos'; 
import Cadastro from './Components/Cadastro/cadastro';
import ClienteDetalhes from './Components/DadosCliente/ClienteDetalhes';
import Erro from "./Components/Erro/ProtectedRoute";
import ProtectedRoute from "./Components/Erro/ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protege a rota /detalhes com o ProtectedRoute */}
        <Route path="/pessoa" element={<ProtectedRoute errorPage={<Erro />} targetPage={<ClienteDetalhes />} />} />
        
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/horarios" element={<Horarios />} />
        <Route path="/planos" element={<Planos />} />
      </Routes>
      <Informacoes />
    </BrowserRouter>
  );
}
