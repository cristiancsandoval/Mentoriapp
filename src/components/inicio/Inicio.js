import React, { useState } from 'react'
import { logoLight } from '../../media/iconos'
import {getAuth, signInWithEmailAndPassword } from "firebase/auth"
import '../../firebase/firebaseConfig';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/user/actions';

const Inicio = () => {

  const [showLogin, setShowLogin] = useState(false);
  const [cargando, setCargando] = useState(false)
  const [alert, setAlert] = useState("")
  const dispatch = useDispatch()
  
  const [values, setValues] = useState({
      correo:"",
      contrasena: ""
  })

  const {correo, contrasena} = values;

  const handleChange = ({target}) =>{

    setValues({
      ...values,
      [target.name]: target.value
    })

  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!showLogin){
      setShowLogin(true)
    }else{
      if((correo==="")||(contrasena==="")){
          setAlert("Llene todos los campos")
      }else{
        setCargando(true);
        const auth = getAuth();
        signInWithEmailAndPassword(auth, correo, contrasena)
          .then(({user})=>{
              dispatch(login(user.email))
              setCargando(false)
              setValues({correo:"",contrasena:""})
              setAlert("")
          })
          .catch((error)=>{
              console.log(error)
              setAlert("Credenciales inválidas")
              setCargando(false)
          })
      }
    }
  }

  return (
    <div className='cntr-inicio'>
        <div>
          <img src={logoLight} alt='logo monitoriapp'/>
          <h1>M<span className='anim'>entori</span><span className='app'>app</span></h1>
          <h2>Universidad de Bogotá</h2>
        </div>
        <form onSubmit={handleSubmit} className={showLogin? "" : "hidden"}>
          <div>
            <label>Correo electrónico</label>
            <input
              type='email'
              placeholder='Ingrese el correo electrónico'
              autoComplete='on'
              name='correo'
              value={correo}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Contraseña</label>
            <input
              type='password'
              placeholder='Ingrese su contraseña'
              autoComplete='on'
              name='contrasena'
              value={contrasena}
              onChange={handleChange}
            />
          </div>
          <button>
            Iniciar sesión como coordinador
          </button>                         
        </form>
        <h6 className={cargando?"":"alert"}>
          {cargando?"Cargando...":alert}
        </h6>
    </div>
  )
}

export default Inicio