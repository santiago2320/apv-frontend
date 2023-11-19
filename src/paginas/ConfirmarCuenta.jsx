import {useEffect, useState} from 'react'
import {useParams,Link} from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

const ConfirmarCuenta = () => {
    const [cuentaConfirmada, setConfirmada] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [alerta, setAlerta] = useState({});

    // Leer el parametro(id) de la URl
    const params = useParams()
    const {id} = params

    useEffect(()=>{
      const confirmaCuenta = async () => {
        try {
          const url = `/veterinarios/confirmar/${id}`;
          // Data contien los datos JSON devuelto por la API
          const {data} = await clienteAxios(url);
          //confirma la cuenta
          setConfirmada(true);
          // Obtnemos la respuesta del servidor
          setAlerta({
            msg: data.msg
          })

        } catch (error) {
          // Data - accemos al mensajer del backend (VeterinariController) Cuando el token no es valido
          setAlerta({
            msg: error.response.data.msg,
            error:true
          })
        }
        
        setCargando(false)
      }
      confirmaCuenta();
    },[])

    return (
      <>
          <div>
            <h1 className="text-indigo-600 font-black text-3xl">Confirma tu Cuenta y Comienza a Administrar {""}
              <span className="text-black">tus Pacientes</span>
            </h1>
          </div>

        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
            {!cargando && <Alerta
              alerta={alerta}
            />}

            {cuentaConfirmada && (
              <Link className='block text-center my-5 text-gray-500 hover:font-semibold' to="/">Iniciar Sesión</Link>
            )}
              
        </div>
      </>
    )
  }
  
  export default ConfirmarCuenta