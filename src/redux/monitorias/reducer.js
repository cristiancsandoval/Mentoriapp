import { typesMonitorias } from "./types";

export const monitoriasReducer = (state={monitorias:[]}, action) =>{
    switch(action.type){
        case typesMonitorias.cargarMonitorias:
            return{
                ...state,
                monitorias: action.payload
            }
        case typesMonitorias.agregarMonitoria:
            return{
                ...state,
                monitorias:[
                    ...state.monitorias,
                    action.payload
                ]
            }
        case typesMonitorias.editarMonitoria:
            const arregloFiltrado = state.monitorias.filter((mon)=>(mon.id!==action.payload.id))
            return {
                ...state,
                monitorias:[
                    action.payload,
                    ...arregloFiltrado
                ]
            }
        case typesMonitorias.eliminarMonitoria:
            const nuevoArreglo = state.monitorias.filter((mon)=>(mon.id!==action.payload))
            return{
                ...state,
                monitorias: nuevoArreglo
            }
        default:
            return state
    }
}