import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { ListadosGastos } from "./components/ListadosGastos";
import { Modal } from "./components/Modal";
import IconoNuevoGasto from "../img/nuevo-gasto.svg";
import { generarId } from "./components/helpers";
import { Filtros } from "./components/Filtros";
const App = () => {
  const [gastos, setGastos] = useState(
    //Busca en el local Storage de gastos, si existe asignalo si no agrega un array vacio
    localStorage.getItem("gastos") ? JSON.parse(localStorage.getItem("gastos")) : []
  );

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [editarGastos, setEditarGastos] = useState({});
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])
  useEffect(() => {
    if (Object.keys(editarGastos).length > 0) {
      setModal(true);

      setTimeout(() => {
        setMostrarModal(true);
      }, 500);
    }
  }, [editarGastos]);

  const handleNuevoGasto = () => {
    setModal(true);
    setEditarGastos({});
    setTimeout(() => {
      setMostrarModal(true);
    }, 500);
  };

  useEffect(() => {
    //si cambia el presupuesto, guarda el presupuesto, si no, asigna 0
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto]);

  useEffect(() => {
    //Añade el gasto en local storage, en string si no existe gastos, asigna un array vacio
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  }, [gastos]);

  useEffect(() => {
    //asigna presupuesto a local storage si no existe asigna 0
    const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0;
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  }, []);


  useEffect(() => {
    if(filtro){
      //filtrar gastos por categoria devuelve 
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro);
      setGastosFiltrados(gastosFiltrados);


    }
  }, [filtro])
  

  const guardarGasto = (gasto) => {
    if (gasto.id) {
      //Actualizar
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      setGastos(gastosActualizados);
      setEditarGastos({});
    } else {
      //Nuevo Gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
    setMostrarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 1000);
  };

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter((gasto) => gasto.id !== id);
    console.log(gastosActualizados);
    setGastos(gastosActualizados);
  };
  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros 
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadosGastos
              gastos={gastos}
              setEditarGastos={setEditarGastos}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          editarGastos={editarGastos}
          guardarGasto={guardarGasto}
          setEditarGastos={setEditarGastos}
        />
      )}
    </div>
  );
};

export default App;
