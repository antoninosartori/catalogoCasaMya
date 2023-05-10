import React from 'react'
import './GoUpArrow.css'
import upArrow from '../assets/upArrow.svg'

const GoUpArrow = () => {

    const handleGoUpArrow = (event) => {
        event.preventDefault()
        window.scrollTo( 0,0 )
    }

    return(
        <div className='upArrow-container'>
            <button onClick={handleGoUpArrow} className='upArrow-button'>
                <img className='upArrow-image' src={upArrow} alt="Volver arriba" />
            </button>
        </div>
    )
}

export default GoUpArrow