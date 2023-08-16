import { Gasto } from "./Gasto";

export const ListadosGastos = ({
  gastos,
  setEditarGastos,
  eliminarGasto,
  filtro,
  gastosFiltrados,
}) => {
  return (
    <div className="listado-gastos contenedor">
      <h2>{gastos.length ? "Listado de gastos" : "No hay gastos aun"} </h2>

      {
        filtro ? (
          <>
          <h2>{gastosFiltrados.length ? 'Gastos' : 'No hay gastos aun'} </h2>
         {
           gastosFiltrados.map(gasto => (
             <Gasto
               key={gasto.id}
               gasto={gasto}
               setEditarGastos={setEditarGastos}
               eliminarGasto={eliminarGasto}
               />
           ))}
               </>

        
        ) : 
        ( 
          <>
          {gastos.map(gasto => (
          <Gasto
          key={gasto.id}
          gasto={gasto}
          setEditarGastos={setEditarGastos}
          eliminarGasto={eliminarGasto}
          />   
      
        ))}
          </>
        )
      }
    </div>
  );
};
