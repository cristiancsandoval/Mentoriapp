import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"
import { programasTypes } from "./types"

export const cargarProgramas = (data) =>{
    return{
        type: programasTypes.cargarProgramas,
        payload: data
    }
}

export const programas = () =>{    
    
    return async (dispatch)=>{
        const querySnapshot = await getDocs(collection(db, "programas"))
        let data = [];
        querySnapshot.forEach((doc)=>{
            data = (doc.data().programas)
        });
        dispatch(cargarProgramas(data))
    }

}