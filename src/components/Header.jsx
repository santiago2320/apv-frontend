import {Link} from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function Header() {

  const { cerrarSesion} = useAuth()
  return (
    <header className="py-10 bg-indigo-600">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <h1 className="text-center font-bold text-2xl text-indigo-200">Administrados de pacientes {""} 
          <span className="text-white font-black">Veterinaria</span>
        </h1>
        <nav className='flex flex-col items-center lg:flex-row lg:mt-0 gap-4 mt-5'>
          <Link to="/admin" className='text-white text-sm uppercase font-bold'>Pacientes</Link>
          <Link to="/admin/perfil" className='text-white text-sm uppercase font-bold'>Perfil</Link>

          <button 
          type='button' 
          className='text-white text-sm uppercase font-bold rounded-xl bg-slate-500'
          onClick={cerrarSesion}
          >Cerrar Sesión</button>
        </nav>
      </div>

    </header>
  )
}

export default Header