import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"
import { typesMonitores } from "./types"


export const cargarMonitores = (data) =>{
    return{
        type: typesMonitores.cargarMonitores,
        payload: data
    }
}

export const monitores = () =>{    
    
    return async (dispatch)=>{
        const querySnapshot = await getDocs(collection(db, "monitores"))
        const data = [];
        querySnapshot.forEach((doc)=>{
            data.push({
                ...doc.data(),
                id: doc.id
            })
        });
        dispatch(cargarMonitores(data))
    }
}

export const agregarMonitor = (data) =>{
    return{
        type: typesMonitores.agregarMonitor,
        payload: data
    }
}

export const editarMonitor = (data) =>{
    return{
        type: typesMonitores.editarMonitor,
        payload: data
    }
}

export const deleteMonitor = (id) =>{
    return{
        type: typesMonitores.eliminarMonitor,
        payload: id
    }
}