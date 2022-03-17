import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { db } from '../../firebase/firebaseConfig';
import useForm from '../../hooks/useForm';
import { arrow } from '../../media/iconos';
import { deleteMonitor, editarMonitor } from '../../redux/monitores/actions';

const EditMonitor = ({monitor, clase}) => {

    const [values, handleInputChange] = useForm({
        semestre: monitor.semestre,
        cedula: monitor.cedula,
        correo: monitor.correo
    })
    
    const {semestre, cedula, correo} = values;
    const dispatch = useDispatch()

    const handleSubmit = (e) =>{
      e.preventDefault();
      const monitorActualizado = {
        ...values,
        nombre: monitor.nombre,
        apellido: monitor.apellido,
        programa: monitor.programa
      };
      setDoc(doc(db,"monitores", monitor.id), monitorActualizado)
        .then(()=>{
            const objeto = {
              ...monitorActualizado,
              id: monitor.id
            }
            dispatch(editarMonitor(objeto))
        })
        .catch((error)=>{
          console.log(error)
        })
    }

    const eliminarMonitor = () => {

      deleteDoc(doc(db, "monitores", monitor.id))
      dispatch(deleteMonitor(monitor.id))

    }

    const [close, setClose] = useState(true)

  return (
    <div className={clase}>
        <div>
            <h6>Editar monitor</h6>
            <button onClick={()=>setClose(!close)} className={close?"close":""}>
                <img src={arrow} alt="arrow icon"/>
            </button>
        </div>
        <form onSubmit={handleSubmit} className={close? "d-none" : ""}>
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
                <button>Actualizar monitor</button>
            </div>
        </form>
        <button onClick={()=>eliminarMonitor()}>
          Eliminar monitor
        </button>
    </div>
  )
}

export default EditMonitor