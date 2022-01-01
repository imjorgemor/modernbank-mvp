import { useState, useEffect } from 'react'
import Header from './components/Header'
import IconoNuevoGasto from "./assets/nuevo-gasto.svg"
import Modal from './components/Modal';
import { generarId } from "./services"
import ListadoGastos from './components/ListadoGastos';
import Filter from './components/Filter';


function App() {

    const [presupuesto, setPresupuesto] = useState(
        localStorage.getItem('presupuesto') ?? 0
    );

    const [gastos, setGastos] = useState(
        localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
    );

    const [isValidBudget, setIsValidBudget] = useState(false);
    const [modal, setModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);

    const [gastoEditar, setGastoEditar] = useState({});

    const [filtro, setFiltro] = useState('');

    const [gastosFiltrados, setGastosFiltrados] = useState([]);



    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setModal(true);

            setTimeout(() => {
                setAnimarModal(true)
            }, 500);
        }
    }, [gastoEditar])

    useEffect(() => {
        Number(localStorage.setItem('presupuesto', presupuesto ?? 0))
    }, [presupuesto])

    useEffect(() => {
        const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
        if (presupuestoLS > 0) return setIsValidBudget(true);
    }, [])

    useEffect(() => {
        Number(localStorage.setItem('gastos', JSON.stringify(gastos) ?? []))
    }, [gastos])

    useEffect(() => {
        if (filtro) {
            const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro);
            setGastosFiltrados(gastosFiltrados)

        }
    }, [filtro])



    const handleNuevoGasto = () => {
        setModal(true);
        setGastoEditar({});
        setTimeout(() => {
            setAnimarModal(true)
        }, 500);
    }

    const guardarGasto = gasto => {
        if (gasto.id) {
            //actualizar
            const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
            setGastos(gastosActualizados);
            setGastoEditar({});
        } else {
            //nuevo gasto
            gasto.id = generarId();
            gasto.fecha = Date.now();
            setGastos([...gastos, gasto]);
        }

        setAnimarModal(false)
        setTimeout(() => {
            setModal(false)
        }, 500);
    }

    const eliminarGasto = id => {
        const gastosActualizados = gastos.filter(gasto => gasto.id !== id);
        setGastos(gastosActualizados);
    }


    return (
        <div className={modal ? 'fijar' : ''}>
            <Header
                setGastos={setGastos}
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                isValidBudget={isValidBudget}
                setIsValidBudget={setIsValidBudget}
                gastos={gastos}
            />

            {isValidBudget &&
                <>
                    <main>
                        <Filter
                            setFiltro={setFiltro}
                            filtro={filtro}
                        />
                        <ListadoGastos
                            gastos={gastos}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                            filtro={filtro}
                            gastosFiltrados={gastosFiltrados}


                        />

                    </main>
                    <div className='nuevo-gasto'>
                        <img
                            src={IconoNuevoGasto}
                            alt="icono nuevo gasto"
                            onClick={handleNuevoGasto} />
                    </div>
                </>
            }

            {modal && <Modal
                setModal={setModal}
                animarModal={animarModal}
                setAnimarModal={setAnimarModal}
                guardarGasto={guardarGasto}
                gastoEditar={gastoEditar}
                setGastoEditar={setGastoEditar}
            />
            }
        </div>
    )
}

export default App
