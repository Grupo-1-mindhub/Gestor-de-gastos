import { NuevoPresupuesto } from "./NuevoPresupuesto"
import { ControlPresupuesto } from "./ControlPresupuesto"


export const Header = ({presupuesto,setPresupuesto,isValidPresupuesto,setIsValidPresupuesto,gastos,setGastos}) => {

    return (
        <header>
        <h1>planificador de gastos</h1>
        {isValidPresupuesto ? (
        <ControlPresupuesto setIsValidPresupuesto={setIsValidPresupuesto} gastos={gastos} setPresupuesto={setPresupuesto}  setGastos={setGastos} presupuesto={presupuesto} /> ) : (
          <NuevoPresupuesto 
          presupuesto={presupuesto} 
          setPresupuesto={setPresupuesto} 
          isValidPresupuesto={isValidPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
          
          />
        )}
        
    </header>


  )
}