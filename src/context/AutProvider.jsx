import {useState, useEffect, createContext} from 'react'
import clienteAxios from '../config/axios'
import Alerta from '../components/Alerta';

// Como se va llamar el context de este provider
const AuthContext = createContext()

const AuthProvider = ({children})=> {

    const [cargando, setCargando] = useState(true);
    // Si el objeto esta lleno significa que el usuario esta autenticado.
    const [auth, setAuth] = useState({})
    const [alerta, setAlerta] = useState({})

    // utilizamos useEffect si el usuario esta autenticado
    useEffect(() => {
        const autenticarUsuario = async () =>{
            // Obtener el token del localstorage
            const token = localStorage.getItem('token')
            if(!token){
                setCargando(false)
                return
            }

            const config = {
                // Header son la autorizacion en postman - axios lo define como headers.
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                // Petición obtener perfil
                const {data} = await clienteAxios('/veterinarios/perfil',config)
                console.log(data);
                // Muestra la informacion en state.
                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({})
            }
            setCargando(false)
        }
        autenticarUsuario();
    },[]) // [] dependencias vacias para que se ejecute una sola vez.

    // Cerrar cesión
    const cerrarSesion = () => {
        // Eliminamos el token del localStorage con RemoveItem
        localStorage.removeItem('token')
        setAuth({})
    }

    // Perfil
    const actualizarPerfil = async datos =>{
         // Obtener el token del localstorage - Configuracion 
         const token = localStorage.getItem('token')
         if(!token){
             setCargando(false)
             return
         }
         const config = {
            // Header son la autorizacion en postman - axios lo define como headers.
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/perfil/${datos._id}`
            const {data} = await clienteAxios.put(url,datos,config)
                
            return {
                msg: 'Almacenado correctamente'
            }

        } catch (error) {
            return {
                msg: error.response.msg,
                error: true
            }
        }
    }

    // CAMBIAR PASSWORD DE PERFIL
    const savePassword = async (datos) => {
        
        // Obtener el token del localstorage - Configuracion 
        const token = localStorage.getItem('token')
        if(!token){
            setCargando(false)
            return
        }
        const config = {
           // Header son la autorizacion en postman - axios lo define como headers.
           headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`
           }
       }

       try {
            const url = '/veterinarios/cambiar-password'
            // Respuesta que obtenemos de axios
            const {data} = await clienteAxios.put(url,datos,config)
            console.log(data);
            return{
                msg:data.msg
            }
       } catch (error) {
            return{
                msg: error.response.data.msg,
                error: true
            }
       }
    }

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion, 
                actualizarPerfil,
                savePassword
            }}
        >
            {children}
        </AuthContext.Provider>        
    )
}

export {
    AuthProvider
}

export default AuthContext