import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { monitoresReducer } from "../monitores/reducer";
import { monitoriasReducer } from "../monitorias/reducer";
import { programasReducer } from "../programas/reducer";
import { userReducer } from "../user/reducer";

const composeEnhancers = (typeof window !== 'undefined' && 
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    user: userReducer,
    programas: programasReducer,
    monitores: monitoresReducer,
    monitorias: monitoriasReducer
})

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)
