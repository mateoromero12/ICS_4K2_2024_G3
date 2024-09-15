import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import InterfazDador from "./Components/Dador/InterfazDador";
import InterfazTransportista from "./Components/Transportista/InterfazTransportista";
import InterfazCotizacion from "./Components/Cotizacion/InterfazCotizacion";
import InterfazPago from './Components/Pago/InterfazPago';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dador" element={<InterfazDador />} />
        <Route path="/transportista" element={<InterfazTransportista />} />
        <Route path="/transportista/:id" element={<InterfazCotizacion />} />
        <Route path="/pago" element={<InterfazPago />} />
      </Routes>
    </Router>
  );
}

export default App;
