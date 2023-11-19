import {useState} from 'react'
import {Link} from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

const Registrar = () => {

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')

  //State de Alerta
  const [alerta,setAlerta] = useState({})

  // Evento cuando cliente click Crear Cuenta - Validamos los campos
  const handleSubmit= async e => {
      e.preventDefault()

      if([nombre,email,password,repetirPassword].includes('')){
          setAlerta({msg: 'Hay campos vacios', error:true})
        return;
      }

      if(password !== repetirPassword){
        setAlerta({msg: 'Los password no son iguales', error:true})
        return;
      }
      
      if(password.length < 6){
          setAlerta({msg: 'El Password Debe tener mas de 6 caracteres', error:true})
          return;
      }

      // Si no hay alertar, vaciamos las alertas
      setAlerta({})
      
      // Crear el usuario en la api
      try {
        // Url a Registrar Veterinario
        // const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios`
        await clienteAxios.post('/veterinarios', {nombre,email,password})
        // alerta que los datos son creados correctamente
        setAlerta({
          msg: 'Creado Corrrectamente, revisa tu email',
          error: false,
        })
      } catch (error) {
        // Accedemos a la alerta del backend mediante el response.
        setAlerta({
          error: true,
          msg: error.response.data.msg
        })
      }


  }

  const{msg} = alerta

  return (
    <>
      <div>
            <h1 className="text-indigo-600 font-black text-3xl">Crea tu Cuenta y Administra {""}
              <span className="text-black">tus Pacientes</span>
            </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
            { msg && <Alerta
              alerta={alerta}
            />}
            
            <form action="" onSubmit={handleSubmit}>

                <div className="my-5">
                  <label className="uppercase text-gray-600 block text-xl font-bold">Nombre:</label>
                  <input 
                    type="text" 
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                    placeholder="Tu Nombre"
                    value={nombre}
                    onChange={ e => setNombre(e.target.value)}
                    />
                </div>

                <div className="my-5">
                  <label className="uppercase text-gray-600 block text-xl font-bold">Email:</label>
                  <input 
                    type="email" 
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                    placeholder="Tu Email"
                    value={email}
                    onChange={ e => setEmail(e.target.value)}
                    />
                    
                </div>

                <div className="my-5">
                  <label className="uppercase text-gray-600 block text-xl font-bold">Password:</label>
                  <input 
                    type="password" 
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                    placeholder="Tu Password"
                    value={password}
                    onChange={ e => setPassword(e.target.value)}
                    />
                </div>

                <div className="my-5">
                  <label className="uppercase text-gray-600 block text-xl font-bold">Repetir Password:</label>
                  <input 
                    type="password" 
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                    placeholder="Repite tu Password"
                    value={repetirPassword}
                    onChange={ e => setRepetirPassword(e.target.value)}
                    />
                </div>

                <div className='my-5 text-center'>
                  <input type="submit" value="Crear Cuenta" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-2 hover:cursor-pointer hover:bg-indigo-600 md:w-auto content-center" />
                </div>

            </form>

              <nav className='mt-8 lg:flex lg:justify-between'>

                <Link className='block text-center my-5 text-gray-500 hover:font-semibold'  
                  to="/">¿Ya tienes una cuenta? Inicia Sesión</Link>
                <Link className='block text-center my-5 text-gray-500 hover:font-semibold'
                  to="/olvide-password">Olvide mi Password</Link>

              </nav>

              
        </div>
      
    </>
  )
}

export default Registrar