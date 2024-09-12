import React from 'react';
import NavBar from './Components/NavBar';
import PaginaPrincipal from './Components/PaginaPrincipal';
import Informacoes from './Components/Informacoes';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <PaginaPrincipal />
      <Informacoes />
    </div>
  );
}

export default App;
