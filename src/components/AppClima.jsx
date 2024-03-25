import Formulario from "./Formulario"
import Resultado from "./Resultado"
import Loading from "./Loading"
import useClima from "../hooks/useClima"
import Footer from "./Footer"

const AppClima = () => {
    const { resultado, cargando, noResultado } = useClima()
    return (
        <>
            <div className="struct">
                <main className="dos-columnas">
                    <Formulario/>
                    {/* mostrar spinner y resultado */}
                                                        {/*si hay cargando, render a <Loading>, si no, evalua si hay resultado y carga <Resultado> */}
                    {cargando ? <Loading/> :             //si hay resultado carga <Resultado> y 
                    resultado?.name ? <Resultado/> :    //si la consulta falla renderiza noResultado
                    noResultado && <p>{noResultado}</p>}        
                    
                </main>
                <Footer/>
            </div>
        </>
    )
}

export default AppClima
