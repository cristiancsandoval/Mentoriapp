import React from 'react'
import { useDispatch } from 'react-redux'
import { logo } from '../../media/iconos'
import { logout } from '../../redux/user/actions'
import BarraNav from './BarraNav'

const HeaderMA = ({select}) => {

  const dispatch = useDispatch()

  return (
    <header>
        <div>
            <img src={logo} alt='logo AM'/>
            <div className='cntr-title'>
                <h1>M<span className='hide'>entori</span><span className='app'>app</span></h1>
                <h2>Universidad de Bogotá</h2>
            </div>
            <button onClick={()=>dispatch(logout())}>
              Cerrar sesión
            </button>
        </div>
        <BarraNav select={select} />
    </header>
  )
}

export default HeaderMA