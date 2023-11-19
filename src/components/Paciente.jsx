import usePaciente from "../hooks/usePacientes"

// extraemos el objeto de paciente
const Paciente = ({paciente}) => {

    const{setEdicion,eliminarPaciente} = usePaciente()

    const{email, fecha, nombre, propietario, sintomas, _id} = paciente

    // Formatear fecha
    const formatearFecha = fecha => {
        const nuevaFecha = new Date(fecha)
        // Traductir la fecha al idioam
        return new Intl.DateTimeFormat('es', {dateStyle: 'long'}).format(nuevaFecha)
    }

  return (
    <div className='mx-5 my-10 bg-white shadow-md px-4 py-5 rounded-xl lg:my-5'>
        <p className='font-bold uppercase text-indigo-800 my-3'>Nombre: {""}
            <span className='font-normal normal-case text-black'>{nombre}</span>
        </p>

        <p className='font-bold uppercase text-indigo-800 my-3'>Propietario: {""}
            <span className='font-normal normal-case text-black'>{propietario}</span>
        </p>

        <p className='font-bold uppercase text-indigo-800 my-3'>email: {""}
            <span className='font-normal normal-case text-black'>{email}</span>
        </p>

        <p className='font-bold uppercase text-indigo-800 my-3'>Fecha de alta: {""}
            <span className='font-normal normal-case text-black'>{formatearFecha(fecha)}</span>
        </p>

        <p className='font-bold uppercase text-indigo-800 my-3'>sintomas: {""}
            <span className='font-normal normal-case text-black'>{sintomas}</span>
        </p>

        <div className='flex justify-between my-5'>

            <button
                type='button'
                className='py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase rounded-lg'
                onClick={()=> setEdicion(paciente)}
            >Editar</button>

             <button
                type='button'
                className='py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase rounded-lg'
                onClick={()=> eliminarPaciente(_id)}
            >Eliminar</button>
        </div>
    </div>
  )
}

export default Paciente