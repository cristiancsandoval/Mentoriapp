import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"
import { typesMonitorias } from "./types"


export const cargarMonitorias = (data) =>{
    return{
        type: typesMonitorias.cargarMonitorias,
        payload: data
    }
}

export const monitorias = () =>{    
    
    return async (dispatch)=>{
        const querySnapshot = await getDocs(collection(db, "monitorias"))
        const data = [];
        querySnapshot.forEach((doc)=>{
            data.push({
                ...doc.data(),
                id: doc.id
            })
        });
        dispatch(cargarMonitorias(data))
    }

}

export const agregarMonitoria = (data) =>{
    return{
        type: typesMonitorias.agregarMonitoria,
        payload: data
    }
}

export const editarMonitoria = (data) =>{
    return{
        type:typesMonitorias.editarMonitoria,
        payload: data
    }
}

export const deleteMonitoria = (id) =>{
    return{
        type: typesMonitorias.eliminarMonitoria,
        payload: id
    }
}