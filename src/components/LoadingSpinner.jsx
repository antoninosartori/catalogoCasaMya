import React from 'react'
import './LoadingSpinner.css'

const LoadingSpinner = () => {
    return(
        <>
            <div className='spinner-container'>
                <div className="spinner"></div>
                <h2>cargando</h2>
            </div>
        </>
    )
}

export default LoadingSpinner