import React, {useState} from 'react'
import ErrorMessage from './ErrorMessage';

const NewBudget = ({ presupuesto, setPresupuesto, setIsValidBudget }) => {

    const [errorMessage, setErrorMessage] = useState('');

    const handlePresupuesto = (e) => {
        e.preventDefault();
        //console.log(Number(presupuesto)); todos los inputs vienen en string y hay que cambiarlos a integer

        if(!(presupuesto) || (presupuesto) < 0) {
            setErrorMessage('No es un presupuesto válido')
            return;
        }

        setErrorMessage('');
        setIsValidBudget(true);
    }


    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <form onSubmit={handlePresupuesto} className="formulario">
                <div className="campo">
                    <label htmlFor="">Set total budget</label>
                    <input
                        className="nuevo-presupuesto"
                        type="number"
                        placeholder="Add your total budget"
                        value={presupuesto}
                        onChange={e => setPresupuesto(Number(e.target.value))}
                    />
                    <input type="submit" value="Add" />
                </div>

                {errorMessage && <ErrorMessage tipo="error">{errorMessage}</ErrorMessage> }


            </form>

        </div>
    )
}

export default NewBudget
