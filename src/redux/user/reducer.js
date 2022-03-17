import { userTypes } from "./types";

export const userReducer = (state={user:""}, action) =>{
    switch (action.type){
        case userTypes.login:
            return{
                ...state,
                user: action.payload
            }
        case userTypes.logout:
            return{
                ...state,
                user: ""
            }
        default:
            return state;
    }
}