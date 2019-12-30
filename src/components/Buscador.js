import React, {useState} from 'react';
import Error from "./Error";

const Buscador = ({guardarBusqueda}) => {
    const [terminoBusqueda, guardarTerminoBusqueda] = useState('');
    const [error, guardarError] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        //validar
        if(terminoBusqueda === ''){
            guardarError(true);
            return;
        }
        guardarError(false);
        //enviar
        guardarBusqueda(terminoBusqueda);
    }


    return (
        <form action="" onSubmit={handleSubmit}>
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imágen, ejemplo: Fútbol o café"
                        onChange={e => guardarTerminoBusqueda(e.target.value)}/>
                </div>
                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"/>
                </div>
            </div>
            {(error) ? <Error mensaje="Agrega un término de búsqueda "/>: null}
        </form>
    );
};

export default Buscador;
