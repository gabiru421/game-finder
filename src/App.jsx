import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detalhes from "./pages/Detalhes";
import Favoritos from "./pages/Favoritos";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<Detalhes />} />
        <Route path="/favoritos" element={<Favoritos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;