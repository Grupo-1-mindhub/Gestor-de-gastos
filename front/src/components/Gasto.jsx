import { formatearFecha } from "./helpers";
import "../index.css";

import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

import IconoAhorro from "../../img/icono_ahorro.svg";
import IconoCasa from "../../img/icono_casa.svg";
import IconoGastos from "../../img/icono_gastos.svg";
import IconoComida from "../../img/icono_comida.svg";
import IconoOcio from "../../img/icono_ocio.svg";
import IconoSalud from "../../img/icono_salud.svg";
import IconoSuscripciones from "../../img/icono_suscripciones.svg";

export const Gasto = ({ gasto, setEditarGastos,eliminarGasto }) => {
  const diccionarioIconos = {
    ahorro: IconoAhorro,
    comida: IconoComida,
    casa: IconoCasa,
    gastos: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones,
  };

  const { categoria, nombre, cantidad,id, fecha } = gasto;
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setEditarGastos(gasto)}>editar</SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction 
      onClick={()=>eliminarGasto(id)}
      destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );
  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={diccionarioIconos[categoria]} alt="icono gasto" />
            <div className="descripcion-gasto">
              <p className="categoria">{categoria}</p>
              <p className="nombre-gasto">{nombre} </p>
              <p className="fecha-gasto">
                agregado el: {""}
                <span>{formatearFecha(fecha)} </span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">${cantidad} </p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};
