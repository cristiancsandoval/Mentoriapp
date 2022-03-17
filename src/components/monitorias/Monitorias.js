import React from 'react'
import { useSelector } from 'react-redux'
import useForm from '../../hooks/useForm'
import HeaderMA from '../header/HeaderMA'
import AddMonitoria from './AddMonitoria'
import DetalleMonitoria from './DetalleMonitoria'

const Monitorias = () => {

  const {monitorias} = useSelector(store=>store.monitorias)
  const {programas} = useSelector(store=>store.programas)
  const {monitores} = useSelector(store=>store.monitores)

  const [values, handleInputChange] = useForm({
    nombre: "",
    programa: ""
  })

  const {nombre, programa} = values;
  
  const listaMonitorias = monitorias!==undefined 
    ? monitorias.filter((mon)=>((mon.materia.toLowerCase().includes(nombre.toLowerCase()))&&(mon.programa.includes(programa))))
    : []

  const listaProgramas = programas!==undefined
    ? programas
    : []
  
  const listaMonitores = monitores!==undefined
  ? monitores
  : []

  return (
    <div className='cntr-general'>
        <HeaderMA select='monitorias'/>
        <main>
            <div className='srch-monitorias'>
              <label>Buscar monitoría</label>
              <div>
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
                <input
                  type='text'
                  placeholder='Buscar monitoría...'
                  name='nombre'
                  value={nombre}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <AddMonitoria programas={listaProgramas} monitores={listaMonitores}/>
            <div className='cntr-lista'>
              <h4>Lista de monitorías</h4>
              {
                listaMonitorias.map((monitoria)=>(
                    <DetalleMonitoria key={monitoria.id} monitoria={monitoria} monitores={listaMonitores}/>
                ))
              }
            </div>
        </main>
    </div>
  )
}

export default Monitorias