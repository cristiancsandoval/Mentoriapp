import React from 'react'
import { useNavigate } from 'react-router-dom'

const BarraNav = ({select}) => {

    const navigate = useNavigate()

  return (
    <nav>
        <button onClick={()=>navigate('/monitorias')} className={select.includes('monitorias')? "selected" : ""}>
            Monitorías
        </button>
        <button onClick={()=>navigate('/monitores')} className={select.includes('monitorias')? "" : "selected"}>
            Monitores
        </button>
    </nav>
  )
}

export default BarraNav