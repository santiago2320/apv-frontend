import {createContext, useState, useEffect} from 'react'
import clienteAxios from '../config/axios'
import useAuth from '../hooks/useAuth'

// Creamos el context
const pacientesContext = createContext()


//Vienen los datos
const PacientesProvider = ({children}) => {

    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})
    const {auth} = useAuth();

    // Cuando carge el componente,se muestran los resultados de pacientes
    useEffect(()=>{
        const obtenerPaciente = async () => {

            try {
                //Obtener el token porque es donde esta el id del veterinario.
                const token = localStorage.getItem('token');
                if(!token) return
                // Enviar un request autenticado con el token
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                // Extraer la respuesta
                const {data} = await clienteAxios('/pacientes',config)
                //Tenemos los datos lo colocamos en setPacientes
                setPacientes(data);
            } catch (error) {
                console.log(error);
            }
        }
        obtenerPaciente()
    },[auth])
    
    // Guardar paciente en la API
    const guardarPaciente = async (paciente) => {
        
        // Obtenemos el token
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        // Condición para saber si es un registro nuevo o estamos editando
        if(paciente.id){
            try {
                 const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente,config)
                
                 //Iteramos sobre pacientes para verificar si id es igual al id del datal que es el response del request qu enviamos hacia la api.
                 const pacientesActualizado = pacientes.map(pacienteState => pacienteState._id === 
                 data._id ? data : pacienteState)
                 // Actualizar el estado de pacientes con el nuevo array, generarn una re-rendirazación.
                 setPacientes(pacientesActualizado)

            } catch (error) {
                console.log(error);
            }
        }else{ // Condicion si estamos editando
            try {
                // Accedemos a los datos enviados del servidor.
                const { data } = await clienteAxios.post('/pacientes', paciente,config)
                // Nos crea un nuevo quitando los campos antes de los ...
                const {createdAt,updatedAt,__v,...pacienteAlmacenado} = data
                console.log(pacienteAlmacenado);
                // Agrear nuevo paciente al inicio de la lista
                setPacientes([pacienteAlmacenado, ...pacientes])
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    }

    // Editar pacientes
    const setEdicion = (paciente) => {
        setPaciente(paciente)
    }

    // Eliminar Paciente
    const eliminarPaciente = async id => {
        const confirmar = confirm('¿Confirmas que deseal eliminar?')
        // Si es true la alerta eliminamos el paciente
        if(confirmar){
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                
                // Delete eliminar paciente, pasamos el id y config
                const {data} = await clienteAxios.delete(`/pacientes/${id}`,config)
                // filter nos permite sacar los registros que son iguales o direferentes - pasamos como condicion todo los que sean diferentes
                const pacientesActualizado = pacientes.filter(pacienteState => pacienteState._id !== id)
                //seteamos en la funcion del state
                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error.response.data.msg);
            }   
        }
    }

    // dentro de la etiqueta del provider van todos los componentes hijos
    // Es inmportante pasaer en el value = {{las funciones que vamos utulizar}}
    return(
        <pacientesContext.Provider 
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
            }}
        >
            {children}
        </pacientesContext.Provider>
    )
}

export {
    PacientesProvider
}


export default pacientesContext