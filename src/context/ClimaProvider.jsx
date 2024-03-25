import { createContext, React, useState } from "react";
import axios from "axios";

const ClimaContext = createContext();   //crea el context ClimaContex

const ClimaProvider = ({children}) => { //Componente de PRovider con children

    const [busqueda, setBusqueda] = useState({      //objeto con la información del formulario
        ciudad: '',
        pais: ''
    })
    const [resultado, setResultado] = useState({})  //crea el state con el resultado de la consulta del clima

    const [cargando, setCargando] = useState(false) //state para el spinner

    const [noResultado, setNoResultado] = useState('')

    const datosBusqueda = (e) => {                  //funcion que se ejecuta al enviar el formulario
        
        setBusqueda({
            ...busqueda,                            //copia el valor anterior de busqueda
            [e.target.name]: e.target.value         //y el key como el name del input  con su value tecleado por el usuario
        })
    }   

    const consultarClima = async (datos) => {             //funcion que se conecta a la API. Toma como parametro los datos (busqueda)
        setResultado({})
        setCargando(true)
        setNoResultado(false)
        try {
            const {ciudad, pais} = datos;                   //extrae ciudad y pais
            const appId = import.meta.env.VITE_API_KEY          //trae el API key
            const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${appId}` //url del json generado

            const {data} = await axios(url)                 //consulta la API de geolocalización

            const {lat, lon} = data[0]                      //extrae latitud y longitud
            
            const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
            const {data: clima} = await axios(urlClima)     //consulta la API y renombra data como clima para no conflictuar con data de geolocalizacion
            // console.log(clima)
            setResultado(clima)

            
        } catch (error) {
            console.log(error)
            setNoResultado('No hay resultados')
            console.log(noResultado)
        }
        setCargando(false)                                  //Fuera del try catch para que se llegue hasta esta linea la ejecución
    }

    return (
        <ClimaContext.Provider              //renderiza el componente PRovider de ClimaContext
            value={{
                busqueda,
                datosBusqueda,
                consultarClima, 
                resultado,
                cargando,
                noResultado
            }}
        >                                   
            {children}                      
        </ClimaContext.Provider>
    )
}
export {
    ClimaProvider                       //Exporta el Provider para que sea usado en otros arcvhivos
}
export default ClimaContext            //Exporta el Context
