import { programasTypes } from "./types"


export const programasReducer = (state={programas:[]}, action) =>{
    switch(action.type){
        case programasTypes.cargarProgramas:
            return {
                ...state,
                programas: action.payload
            }
        default:
            return state
    }
}