import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { db } from '../../firebase/firebaseConfig';
import useForm from '../../hooks/useForm';
import { plus } from '../../media/iconos';
import { agregarMonitor } from '../../redux/monitores/actions';

const AddMonitor = ({programas}) => {

    const [values, handleInputChange, reset] = useForm({
        nombre: "",
        apellido: "",
        programa: "",
        semestre:"",
        cedula:"",
        correo:""
    })
    
    const {nombre, apellido, programa, semestre, cedula, correo} = values;

    const [enviando, setEnviando] = useState(false)
    const [close, setClose] = useState(true)
    const dispatch = useDispatch()

    const handleSubmit = (e) =>{
      e.preventDefault();
      setEnviando(true);
      addDoc(collection(db,"monitores"),values)
        .then((response)=>{
            const newMonitor = {
               ...values,
               id: response.id
            }
            dispatch(agregarMonitor(newMonitor))
        })
        .catch((error)=>{
          console.log(error)
        })
      setEnviando(false)
      reset()
    }

  return (
    <div className='cntr-add'>
        <div>
            <h5>Agregar nuevo monitor <span>{enviando?"Guardando monitor...":""}</span></h5>
            <button onClick={()=>setClose(!close)} className={close?"close":""}>
              <img src={plus} alt='plus icon'/>
            </button>
        </div>
        <form onSubmit={handleSubmit} className={close?"d-none":""}>
            <div>
                <label>Nombre</label>
                <input
                    type='text'
                    name='nombre'
                    value={nombre}
                    onChange={handleInputChange}
                    placeholder='Nombre del monitor...'
                    required/>
            </div>
            <div>
                  <label>Apellido</label>
                  <input
                    type='text'
                    name='apellido'
                    value={apellido}
                    onChange={handleInputChange}
                    placeholder='Apellido del monitor...'
                    required/>
            </div>
            <div>
                  <label>Programa académico</label>
                  <select
                    name='programa'
                    value={programa}
                    onChange={handleInputChange}
                    required
                  >
                    <option value=''>Todos los programas</option>
                    {
                      programas.map((prog)=>(
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
                    placeholder='Semestre del monitor...'
                    required/>
            </div>
            <div>
                  <label>Cédula</label>
                  <input
                    type='number'
                    name='cedula'
                    value={cedula}
                    onChange={handleInputChange}
                    placeholder='Cédula del monitor...'
                    required/>
            </div>
            <div>
                  <label>Correo</label>
                  <input
                    type='text'
                    name='correo'
                    value={correo}
                    onChange={handleInputChange}
                    placeholder='Correo del monitor...'
                    required/>
            </div>
            <div>
                <button>
                    Guardar monitor
                </button>
            </div>
        </form>
    </div>
  )
}

export default AddMonitor