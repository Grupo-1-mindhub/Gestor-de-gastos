import { useState, useEffect } from "react";
import { Mensaje } from "./Mensaje";
import CerrarBtn from "../../img/cerrar.svg";

export const Modal = ({
  setModal,
  mostrarModal,
  setMostrarModal,
  guardarGasto,
  editarGastos,
  setEditarGastos
}) => {
  const [mensaje, setMensaje] = useState("");
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fecha, setFecha] = useState()
  const [id, setId] = useState()

  useEffect(() => {
    if (Object.keys(editarGastos).length > 0) {
      setNombre(editarGastos.nombre);
      setCantidad(editarGastos.cantidad);
      setCategoria(editarGastos.categoria);
      setFecha(editarGastos.fecha)
      setId(editarGastos.id)
    }
  }, []);




  const cerrarModal = () => {
    setTimeout(() => {
      setEditarGastos({})
      guardarGasto()
      setMostrarModal(false);
    }, 500);
    setTimeout(() => {
      setModal(false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([nombre, cantidad, categoria].includes("")) {
      setMensaje("todos los campos son obligatorios");
      setTimeout(() => {
        setMensaje("");
      }, 1000);
      return;
    } else {
      guardarGasto({ cantidad, categoria, nombre,id,fecha });
    }
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarBtn} alt="cerrarModal" onClick={cerrarModal} />
      </div>
      <form
        onSubmit={handleSubmit}
        className={`formulario ${mostrarModal ? "animar" : "cerrar"} `}
      >
        <legend>{editarGastos.nombre ? 'Editar Gastos': 'Nuevo Gasto' } </legend>
        {mensaje && <Mensaje tipo="error">{mensaje} </Mensaje>}
        <div className="campo">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            placeholder="añade el nombre del gasto"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            type="number"
            placeholder="añade la cantidad del gasto"
            id="cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </div>

        <div className="campo">
          <label htmlFor="categoria">categoria</label>
          <select
            name=""
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Seleccione</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>

        <input type="submit" value={editarGastos.nombre ? 'Guardar cambios': 'Agregar Gastos' } />
      </form>
    </div>
  );
};
