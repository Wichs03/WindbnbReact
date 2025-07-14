import "./index.css";
import Grid from "./components/Grid";
import Header from "./components/Header";
import GridHeader from "./components/GridHeader";
import ModalFilter from "./components/ModalFilter";
import { useState } from "react";

function App() {
  const [mostrarModal, setMostrarModal] = useState(false);

  return (
    <>
      <Header abrirModal={() => setMostrarModal(true)} />
      {mostrarModal && (
        <ModalFilter cerrarModal={() => setMostrarModal(false)} />
      )}
      <GridHeader />
      <Grid />
    </>
  );
}

export default App;
