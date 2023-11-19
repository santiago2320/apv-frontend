import {useState,useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

function NuevoPassword() {

  const [password,setPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false) // Aun no es valido
  const [passwordModificado, setPasswordModificado] = useState(false);
  // leer el token de la URL
  const params = useParams()
  const {token} = params

  // Ejecutamos cuando el componente este listo.
  useEffect(()=> {
    const comprobarToken = async () => {
      try {
        // Enviamos la petición
        await clienteAxios(`veterinarios/olvide-password/${token}`)
        setAlerta ({
          msg: 'coloca tu Nuevo Password'
        })
        setTokenValido(true)
      } catch (error) {
        setAlerta({
          msg: 'Hubo un error con el enlace.',
          error: true
        })
      }
    }
    comprobarToken()
  },[])

  const handleSubmit = async (e) => {
      e.preventDefault();

      // Validar el password
      if(password < 6){
        setAlerta({
          msg: 'El password debe ser minimo de 6 caracteres',
          error: true
        })
        return
      }
      
      // Interactuar con nuestra API
      try {
        const url = `/veterinarios/olvide-password/${token}`
        //Extraemos data de la respuesta de axios
        const {data} = await clienteAxios.post(url,{password})
        setAlerta({
          msg: data.msg
        })
        // Si el password es modificado
        setPasswordModificado(true)

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        })
      }
  }

  // Extreaemos la alerta si es tanto false o true
  const {msg} = alerta

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-3xl">Reestablece tu Password y no Pierdas Acceso {""}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>

        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
            { msg && <Alerta
              alerta={alerta} 
            />}

            {tokenValido && (
              <>
                  <form onSubmit={handleSubmit}>
                    <div className="my-5">
                          <label className="uppercase text-gray-600 block text-xl font-bold">Nuevo Password:</label>
                          <input 
                            type="password" 
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                            placeholder="Tu Password"
                            value={password}
                            onChange={ e => setPassword(e.target.value)}
                            />
                    </div>
                    
                    <div className='my-5 text-center'>
                      <input type="submit" value="Guardar Nuevo Password" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-2 hover:cursor-pointer hover:bg-indigo-600 md:w-auto content-center" />
                    </div>
                  </form>
              </>
            )}
            {passwordModificado && (
                <Link className='block text-center my-5 text-gray-500 hover:font-semibold'  
                to="/">Iniciar Sesión</Link>
            )}
        </div>
    </>
  )
}

export default NuevoPassword