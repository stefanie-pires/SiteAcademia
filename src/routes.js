import React from "react"; 
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Principal from "./Components/PaginaPrincipal";
import Login from "./Components/Login";
import Informacoes from "./Components/Informacoes";
import Horarios from "./Components/Horarios/horarios"; // Importação do componente Horarios
import Planos from './Components/Planos/planos'; // Importação com caminho correto

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/horarios" element={<Horarios />} /> {/* Adicionando a rota para Horarios */}
        <Route path="/planos" element={<Planos />} /> {/* Corrigido aqui */}

      </Routes>
      <Informacoes />
    </BrowserRouter>
  );
}
