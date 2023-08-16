import { useState } from "react"
import { Mensaje } from "./Mensaje"

export const NuevoPresupuesto = ({presupuesto,setPresupuesto,setIsValidPresupuesto}) => {
  const [mensaje,setMensaje] = useState('')

  const handlePresupuesto=(e)=>{
    e.preventDefault()
    if(!(presupuesto) || (presupuesto) < 0){
      setMensaje('no es un presupuesto valido');
      setIsValidPresupuesto(false)
      return
    }else{
      setMensaje('');
      setIsValidPresupuesto(true)
    }
  }
  return (
    <div className="contenedor-presupuesto contenedor sombre">
        
        <form className="formulario" onSubmit={handlePresupuesto}>
            <div className="campo">
                <label htmlFor="">Definir Presupuesto</label>
                <input
                    className="nuevo-presupuesto"
                    value={presupuesto}
                    type="number"
                    placeholder="añade tu presupuesto"
                    onChange={e => setPresupuesto(Number(e.target.value))}
                    
                    
                    />
                    <input type="submit"  value="añadir"/>
              </div>
                {mensaje && <Mensaje tipo="error" > {mensaje} </Mensaje> }

        </form>
    
    </div>
  )
}