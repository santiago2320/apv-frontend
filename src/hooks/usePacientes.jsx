import {useContext} from  'react' // Extraer los datos de pacienteContext
import pacientesContext from '../context/PacientesProvider'

const usePaciente = ()=> {
    return useContext(pacientesContext)
}

export default usePaciente
