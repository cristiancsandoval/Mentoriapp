import React, {useState} from 'react'
import useForm from '../../hooks/useForm'
import { doc, setDoc , deleteDoc} from "firebase/firestore";
import { db } from '../../firebase/firebaseConfig';
import { useDispatch } from 'react-redux';
import { deleteMonitoria, editarMonitoria } from '../../redux/monitorias/actions';
import { arrow } from '../../media/iconos';

const EditMonitoria = ({clase, monitoria, monitores, monitorActual}) => {

    const [values, handleInputChange] = useForm({
        fechaInicio: monitoria.fechaInicio,
        fechaFinal:monitoria.fechaFinal,
        horario: monitoria.horario,
        salon: monitoria.salon,
        monitor: monitorActual
    })

    const {fechaInicio, fechaFinal, horario, salon, monitor} = values;

    const dispatch = useDispatch()

    const handleSubmit = (e) =>{
        e.preventDefault()
        const monitoriaActualizada = {
            ...values,
            materia: monitoria.materia,
            programa: monitoria.programa
        }
        setDoc(doc(db,"monitorias", monitoria.id), monitoriaActualizada)
            .then(()=>{
                const objeto = {
                    ...monitoriaActualizada,
                    id: monitoria.id
                }
                dispatch(editarMonitoria(objeto))
            })
            .catch((e)=>{
                console.log(e)
            })
    }

    const eliminarMonitoria = () =>{

        deleteDoc(doc(db, "monitorias", monitoria.id))
        dispatch(deleteMonitoria(monitoria.id))
    }

    const [close, setClose] = useState(true)

  return (
    <div className={clase}>
        <div>
            <h6>Editar monitoría {monitoria.nombre}</h6>
            <button onClick={()=>setClose(!close)} className={close?"close":""}>
                <img src={arrow} alt="arrow icon"/>
            </button>
        </div>
        <form onSubmit={handleSubmit} className={close? "d-none" : ""}>
            <div>
                <div>
                    <label>Fecha inicio</label>
                    <input
                        type='date'
                        name='fechaInicio'
                        value={fechaInicio}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Fecha final</label>
                    <input
                        type='date'
                        name='fechaFinal'
                        value={fechaFinal}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>
            <div>
                <label>Horario</label>
                <input
                    type='text'
                    name='horario'
                    value={horario}
                    onChange={handleInputChange}
                    placeholder='Horario de clase'
                    required
                />
            </div>
            <div>
                <label>Salón</label>
                <input
                    type='text'
                    name='salon'
                    value={salon}
                    onChange={handleInputChange}
                    placeholder='Código del salón asignado'
                    required
                />
            </div>
            <div>
                <label>Monitor asignado</label>
                <select
                    name='monitor'
                    value={monitor}
                    onChange={handleInputChange}
                >
                    <option value=''>Sin monitor asignado</option>
                    {
                        monitores.map((mon)=>(
                            <option key={mon.id} value={mon.id}>
                                {mon.nombre} {mon.apellido}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div>
                <button>Actualizar monitoría</button>
            </div>
        </form>
        <button onClick={()=>eliminarMonitoria()}>
            Eliminar monitoria
        </button>
    </div>
  )
}

export default EditMonitoria