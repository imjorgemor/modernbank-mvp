import React from 'react'

const ErrorMessage = ({children, tipo}) => {
    return (
        <div className={`alerta ${tipo}`}>
            {children}   
        </div>
    )
}

export default ErrorMessage
