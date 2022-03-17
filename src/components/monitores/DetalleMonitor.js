import React, { useState } from 'react'
import EditMonitor from './EditMonitor'

const DetalleMonitor = ({monitor, monitorias}) => {

    const listaMonitorias = monitorias.filter((mon)=>(mon.monitor===monitor.id))
    
    const nombreMonitorias = () => {
        let lista = []
        if(listaMonitorias===[]){
            lista = ["No se han asignado monitorías"]
        }
        else{
            listaMonitorias.forEach(mon=>(
                lista.push(mon.materia)
            ))
        }
        return lista
    }

    const [close, setClose] = useState(true);

  return (
    <div >
        <div>
            <h5>{monitor.nombre} {monitor.apellido}</h5>
            <button onClick={()=>setClose(!close)}>
                {close? "Ver detalle" : "Ocultar detalle"}
            </button>
        </div>
        <div className={close? "d-none" : ""}>
            <p><span>Programa académico: </span>{monitor.programa}</p>
            <p><span>Semestre: </span>{monitor.semestre}</p>
            <p><span>Cédula: </span>{monitor.cedula}</p>
            <p><span>Correo: </span>{monitor.correo}</p>
            <p><span>Monitorías: </span></p>
            {
                nombreMonitorias().map((nom, index)=>(
                    <p key={index}>
                        {nom}
                    </p>
                ))
            }   
        </div>
        <EditMonitor 
            clase={close? "d-none" : "cntr-edit"}
            monitor={monitor}
        />
    </div>
  )
}

export default DetalleMonitor