import React, { useState } from 'react'
import EditMonitoria from './EditMonitoria'

const DetalleMonitoria = ({monitoria, monitores}) => {

    const monitorId = monitoria.monitor

    const monitor = (monitorId!=="")
        ? monitores.find(mon=>(mon.id===monitorId)).nombre + " " + monitores.find(mon=>(mon.id===monitorId)).apellido
        : "Sin monitor asignado"

    const listaMonitores = monitores.filter(mon=>(mon.programa===monitoria.programa));

    const [close, setClose] = useState(true);

  return (
    <div>
        <div>
            <h5>{monitoria.materia}</h5>
            <button onClick={()=>setClose(!close)}>
                {close? "Ver detalle" : "Ocultar detalle"}
            </button>
        </div>
        <div className={close? "d-none" : ""}>
            <p><span>Programa académico: </span>{monitoria.programa}</p>
            <p><span>Fecha de inicio: </span>{monitoria.fechaInicio}</p>
            <p><span>Fecha de finalización: </span>{monitoria.fechaFinal}</p>
            <p><span>Horario: </span>{monitoria.horario}</p>
            <p><span>Salón: </span>{monitoria.salon}</p>
            <p><span>Monitor: </span>{monitor}</p>         
        </div>
        <EditMonitoria 
            clase={close? "d-none" : "cntr-edit"}
            monitoria={monitoria} 
            monitores={listaMonitores} 
            monitorActual={monitor==="Sin monitor asignado" ? "" : monitorId}
        />
    </div>
  )
}

export default DetalleMonitoria