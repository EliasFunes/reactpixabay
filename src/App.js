import React, {useState, useEffect} from 'react';
import Buscador from "./components/Buscador";
import ListadoImagenes from "./components/ListadoImagenes";

function App() {

    const [busqueda, guardarBusqueda] = useState('');
    const [imagenes, guardarImagenes] = useState([]);
    const [paginaActual, guardarPaginaActual] = useState(1);
    const [totalPaginas, guardarTotalPaginas] = useState(1);

    useEffect(() => {
        if(busqueda === '') return;
        const consultarApi = async () => {
            const imagenesPorPagina = 30;
            const key = '14779269-99c1d178c0ae0cc6ee04461bd';
            const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            guardarImagenes(resultado.hits);

            //calcular el total de paginas
            const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
            guardarTotalPaginas(calcularTotalPaginas);

            //mover la pantalla hacia la parte superior
            const jumbotron = document.querySelector('.jumbotron');
            jumbotron.scrollIntoView({behavior:'smooth', block:'start'});
        }
        consultarApi();
    }, [busqueda, paginaActual]);

    const paginaAnterior = () => {
        guardarPaginaActual(paginaActual - 1);
    }

    const paginaSiguiente = () => {
       guardarPaginaActual(paginaActual + 1);
    }

    return (
        <div className="app container">
            <div className="jumbotron">
                <p className="lead text-center">Buscador de Imágenes</p>
                <Buscador
                    guardarBusqueda={guardarBusqueda}
                />
            </div>
            <div className="row justify-content-center">
                <ListadoImagenes
                    imagenes={imagenes}
                />

                {(paginaActual === 1) ? null : (
                    <button onClick={paginaAnterior} type="button" className="btn btn-info mr-1">Anterior &laquo;</button>
                )}

                {(paginaActual === totalPaginas) ? null : (
                    <button onClick={paginaSiguiente} type="button" className="btn btn-info">Siguiente &raquo;</button>
                )}

            </div>
        </div>
    );
}

export default App;
