import { typesMonitores } from "./types";


export const monitoresReducer = (state={monitores:[]}, action) =>{
    switch(action.type){
        case typesMonitores.cargarMonitores:
            return{
                ...state,
                monitores: action.payload
            }
        case typesMonitores.agregarMonitor:
            return{
                ...state,
                monitores:[
                    action.payload,
                    ...state.monitores
                ]
            }
        case typesMonitores.editarMonitor:
            const arregloFiltrado = state.monitores.filter((mon)=>(mon.id!==action.payload.id))
            return {
                ...state,
                monitores:[
                    action.payload,
                    ...arregloFiltrado
                ]
            }
        case typesMonitores.eliminarMonitor:
            const nuevoArreglo = state.monitores.filter((mon)=>(mon.id!==action.payload));
            return{
                ...state,
                monitores:nuevoArreglo
            }
        default:
            return state
    }
}