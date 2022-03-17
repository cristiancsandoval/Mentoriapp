import React from 'react'
import { useSelector } from 'react-redux'
import useForm from '../../hooks/useForm'
import HeaderMA from '../header/HeaderMA'
import AddMonitor from './AddMonitor'
import DetalleMonitor from './DetalleMonitor'

const Monitores = () => {

  const {monitorias} = useSelector(store=>store.monitorias)
  const {programas} = useSelector(store=>store.programas)
  const {monitores} = useSelector(store=>store.monitores)

  const [values, handleInputChange] = useForm({
    nombre: "",
    apellido: "",
    programa: "",
    semestre:"",
    cedula:"",
    correo:""
  })

  const {nombre, apellido, programa, semestre, cedula, correo} = values;

  const listaMonitores = monitores!==undefined 
    ? monitores.filter((mon)=>(
          (mon.nombre.toLowerCase().includes(nombre.toLowerCase()))
          && (mon.apellido.toLowerCase().includes(apellido.toLowerCase()))
          && (mon.programa.includes(programa))
          && (mon.semestre.includes(semestre))
          && (mon.cedula.includes(cedula))
          && (mon.correo.toLowerCase().includes(correo.toLowerCase()))
      ))
    : []

    const listaProgramas = programas!==undefined
    ? programas
    : []
  
    const listaMonitorias = monitorias!==undefined
    ? monitorias
    : []

  return (
    <div className='cntr-general'>
        <HeaderMA select='monitores'/>
        <main>
            <form className='srch-monitores'>
                <label>Buscar monitor</label>
                <div>
                  <label>Nombre</label>
                  <input
                    type='text'
                    name='nombre'
                    value={nombre}
                    onChange={handleInputChange}
                    placeholder='Nombre del monitor...'/>
                </div>
                <div>
                  <label>Apellido</label>
                  <input
                    type='text'
                    name='apellido'
                    value={apellido}
                    onChange={handleInputChange}
                    placeholder='Apellido del monitor...'/>
                </div>
                <div>
                  <label>Programa académico</label>
                  <select
                    name='programa'
                    value={programa}
                    onChange={handleInputChange}
                  >
                    <option value=''>Todos los programas</option>
                    {
                      listaProgramas.map((prog)=>(
                        <option key={prog.id}>
                          {prog.nombre}
                        </option>
                      ))
                    }
                  </select>
                </div>
                <div>
                  <label>Semestre</label>
                  <input
                    type='number'
                    name='semestre'
                    value={semestre}
                    onChange={handleInputChange}
                    placeholder='Semestre del monitor...'/>
                </div>
                <div>
                  <label>Cédula</label>
                  <input
                    type='number'
                    name='cedula'
                    value={cedula}
                    onChange={handleInputChange}
                    placeholder='Cédula del monitor...'/>
                </div>
                <div>
                  <label>Correo</label>
                  <input
                    type='text'
                    name='correo'
                    value={correo}
                    onChange={handleInputChange}
                    placeholder='Correo del monitor...'/>
                </div>
            </form>
            <AddMonitor programas={listaProgramas}/>
            <div className='cntr-lista'>
              <h4>Lista de monitores</h4>
              {
                listaMonitores.map((monitor)=>(
                  <DetalleMonitor key={monitor.id} monitor={monitor} monitorias={listaMonitorias}/>
                ))
              }
            </div>
        </main>
    </div>
  )
}

export default Monitores