import React, { useState } from 'react'
import useForm from '../../hooks/useForm'
import { addDoc,collection } from "@firebase/firestore";
import { db } from '../../firebase/firebaseConfig';
import { useDispatch } from 'react-redux';
import { agregarMonitoria } from '../../redux/monitorias/actions';
import { plus } from '../../media/iconos';

const AddMonitoria = ({programas, monitores}) => {

    const [values, handleInputChange, reset] = useForm({
        materia:"",
        programa: "",
        fechaInicio:"",
        fechaFinal:"",
        horario: "",
        salon: "",
        monitor: ""
    })

    const [enviando, setEnviando] = useState(false)
    const [close, setClose] = useState(true)
    const dispatch = useDispatch()

    const {materia, programa, fechaInicio, fechaFinal, horario, salon, monitor} = values;

    const listaMonitores = monitores.filter((mon)=>mon.programa.includes(programa));

    const handleSubmit = (e) =>{
        e.preventDefault();
        setEnviando(true);
        addDoc(collection(db,"monitorias"),values)
            .then((resp)=>{
                const newMonitoria = {
                    ...values,
                    id: resp.id
                }
                dispatch(agregarMonitoria(newMonitoria))
                reset()
                setEnviando(false)
            })
            .catch(e=>{
                console.log(e)
            })
        setEnviando(false)
    }

  return (
    <div className='cntr-add'>
        <div>
            <h5>Agregar nueva monitoría <span>{enviando?"Guardando monitoría...":""}</span></h5>
            <button onClick={()=>setClose(!close)} className={close?"close":""}>
                <img src={plus} alt='plus icon'/>
            </button>
        </div>
        <form onSubmit={handleSubmit} className={close?"d-none":""}>
            <div>
                <label>Materia</label>
                <input
                    type='text'
                    name='materia'
                    value={materia}
                    onChange={handleInputChange}
                    placeholder='Nombre de la materia'
                    required
                />
            </div>
            <div>
                <label>Programa académico</label>
                <select
                    name='programa'
                    value={programa}
                    onChange={handleInputChange}
                    required
                >
                    <option value=''>Seleccionar programa</option>
                    {
                        programas.map((prom)=>(
                            <option key={prom.id}>
                                {prom.nombre}
                            </option>
                        ))
                    }
                </select>
            </div>
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
                        listaMonitores.map((mon)=>(
                            <option key={mon.id} value={mon.id}>
                                {mon.nombre} {mon.apellido}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div>
                <button>
                    Guardar monitoría
                </button>
            </div>
        </form>
    </div>
  )
}

export default AddMonitoria