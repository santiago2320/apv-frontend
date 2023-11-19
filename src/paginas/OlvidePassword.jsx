import {Link} from 'react-router-dom';
import {useState} from 'react'
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const OlvidePassword = () => {
  const [email, setEmail] = useState('')

  const [alerta,setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault();

    if(email === ''){
      setAlerta({msg: 'El email es obligatorio',error:true})
      return
    }

    try {
      // data es la respuesta que nos da axios
      const {data} = await clienteAxios.post('/veterinarios/olvide-password', {email})
      console.log(data);
      
      // La alerta de responde del controlador.
      setAlerta({msg: data.msg})
    } catch (error) {
      setAlerta({
        // La alerta del controlador.
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {msg} = alerta


  return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-3xl">Recupera tu Acceso y no Pierdas {""}
              <span className="text-black">tus Pacientes</span>
            </h1>
        </div>

        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
            { msg && <Alerta
              alerta={alerta}
            />}
            <form action="" onSubmit={handleSubmit}>

                <div className="my-5">
                  <label className="uppercase text-gray-600 block text-xl font-bold">Email:</label>
                  <input 
                    type="email" 
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                    placeholder="Email de Registro"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className='my-5 text-center'>
                  <input type="submit" value="Enviar Instrucciones" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-2 hover:cursor-pointer hover:bg-indigo-600 md:w-auto content-center" />
                </div>

            </form>

            <nav className='mt-8 lg:flex lg:justify-between'>

                <Link className='block text-center my-5 text-gray-500 hover:font-semibold'  
                  to="/">¿Ya tienes una cuenta? Inicia Sesión</Link>
                <Link className='block text-center my-5 text-gray-500 hover:font-semibold'
                  to="/registrar">¿No tienes una cuenta? Regístrate</Link>

            </nav>

        </div>
    </>
  )
}

export default OlvidePassword