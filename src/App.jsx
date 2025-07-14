import "./index.css";
import Grid from "./components/Grid";
import Header from "./components/Header";
import GridHeader from "./components/GridHeader";
import ModalFilter from "./components/ModalFilter";
import { useState } from "react";

function App() {
  const [filteredCount, setFilteredCount] = useState(0);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [filtros, setFiltros] = useState({
    location: "",
    guests: 0,
  });

  return (
    <>
      <Header abrirModal={() => setMostrarModal(true)} />
      {mostrarModal && (
        <ModalFilter
          cerrarModal={() => setMostrarModal(false)}
          setFiltros={setFiltros}
        />
      )}
      <GridHeader totalStays={filteredCount} />
      <Grid filtros={filtros} setFilteredCount={setFilteredCount} />
    </>
  );
}

export default App;
