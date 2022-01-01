import React from 'react'
import NewBudget from './NewBudget'
import ControlPresupuesto from './ControlPresupuesto'

const header = ({ presupuesto, setPresupuesto, isValidBudget, setIsValidBudget, gastos, setGastos }) => {
    return (
        <header>
            <h1>Expense tracker app</h1>
            {isValidBudget ? (
                <ControlPresupuesto
                    presupuesto={presupuesto}
                    gastos={gastos}
                    setPresupuesto={setPresupuesto}
                    setGastos={setGastos}
                    setIsValidBudget={setIsValidBudget}
                />
            ) : (
                <NewBudget
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setIsValidBudget={setIsValidBudget}
                />
            )}
        </header>
    )
}

export default header
