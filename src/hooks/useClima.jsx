import { useContext } from "react";                     //importa el hook de react useContext
import ClimaContext from "../context/ClimaProvider";    //importa el Context creado en ClimaProvider

const useClima = () => {                                //crea el hook useClima
    return useContext(ClimaContext)                     //ejecuta useContext que extrae la información alojada en el Provider
}
export default useClima