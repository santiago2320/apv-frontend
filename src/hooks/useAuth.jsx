import {useContext} from  'react' // Extraer los datos de authContext
import AuthContext from '../context/AutProvider'

const useAuth = ()=> {
    return useContext(AuthContext)
}

export default useAuth
