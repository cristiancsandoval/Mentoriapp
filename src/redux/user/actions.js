import { userTypes } from "./types"
import {getAuth, signOut} from "firebase/auth"

export const login = (user) =>{
    return{
        type: userTypes.login,
        payload: user
    }
}

export const logout = () =>{
    return(dispatch) => {
        const auth = getAuth();
        signOut(auth)
        .then(() => {
            dispatch(cerrarSesion())
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export const cerrarSesion = () =>{
    return{
        type: userTypes.logout
    }
}