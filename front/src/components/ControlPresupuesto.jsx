import { useEffect, useState } from "react";
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



export const ControlPresupuesto = ({gastos,presupuesto,setGastos,setPresupuesto,setIsValidPresupuesto}) => {
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)


    useEffect(() => {
      const totalGastado = gastos.reduce((total,gasto) => gasto.cantidad + total, 0)
      const totalDisponible = presupuesto - totalGastado
      const nuevoPorcentaje = ((presupuesto - totalDisponible) / presupuesto* 100).toFixed(2)
      console.log(nuevoPorcentaje);
      setDisponible(totalDisponible)
      setGastado(totalGastado)
      setTimeout(()=>{
        setPorcentaje(nuevoPorcentaje)
      },1500)
    }, [gastos])

    const handleResetApp = ()=>{
      console.log('reiniciando');
      const resultado = confirm('Deseas reiniciar presupuesto y gastos?');
      if(resultado){
        setGastos([])
        setPresupuesto(0)
        setIsValidPresupuesto(false)
        
      }else{
        console.log('no');
      }
    }
      
  
  
  
  
  const formatearMoneda=(cantidad)=>{
     return cantidad.toLocaleString('en-US',{
          style:'currency',
          currency:'USD'
        })
    }




  return (
    <div className="contenedor-presupuseto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          value={porcentaje}
          styles={buildStyles({
            pathColor:  porcentaje > 100 ? '#DC2626' : '#3B82F6',
            trailColor: '#d6d6d6',
            textColor: '#3B82F6'
          })}
          text={`${porcentaje}% gastado`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button  className="reset-app" type="button"
          onClick={()=> handleResetApp()}
        > 
          Resetear presupuesto
        </button>
          <p>
              <span>Presupuesto:</span> :  {formatearMoneda(presupuesto)}        
          </p>

          <p className={`${disponible < 0 ? 'negativo' : ''}`}>
              <span>disponible:</span> :  {formatearMoneda(disponible)}        
          </p>


          <p>
              <span>Gastado:</span> :  {formatearMoneda(gastado)}        
          </p>
      </div>
    </div>
  );
};
