import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Inicio from '../components/inicio/Inicio'
import Monitores from '../components/monitores/Monitores'
import Monitorias from '../components/monitorias/Monitorias'
import { monitores } from '../redux/monitores/actions'
import { monitorias } from '../redux/monitorias/actions'
import { programas } from '../redux/programas/actions'
import { login } from '../redux/user/actions'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const AppRouter = () => {

    const [isAuthenticaded, setIsAuthenticaded] = useState(false);
    const [cargando, setCargando] = useState(true);
    const dispatch = useDispatch()

    useEffect(()=>{

        const auth = getAuth();

        onAuthStateChanged(auth, (user) => {
            if(user?.uid){
                dispatch(login(user.email));
                dispatch(programas());
                dispatch(monitores());
                dispatch(monitorias());
                setIsAuthenticaded(true);
            }
            else{
                setIsAuthenticaded(false)
            }
            setCargando(false);
        })

    }, [dispatch])

    if(cargando){
        return(
            <h4>Cargando...</h4>
        )
    }

  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={
                <PublicRoute isAuthenticaded={isAuthenticaded}>
                    <Inicio/>
                </PublicRoute>
            }/>
            <Route path='/monitorias' element={
                <PrivateRoute isAutheticaded={isAuthenticaded}>
                    <Monitorias/>
                </PrivateRoute>
            }/>
            <Route path='/monitores' element={
                <PrivateRoute isAutheticaded={isAuthenticaded}>
                    <Monitores/>
                </PrivateRoute>
            }/>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter