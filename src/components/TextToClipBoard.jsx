import React, { useState } from 'react'
import './TextToClipBoard.css'
import copy from '../assets/copy.svg'

const TextToClipBoard = ({ textToTitle, textToCopy, isCopiable }) => {
    const [isCopied, setIsCopied] = useState(false)
    const handleCopyClick = (event) => {
        event.preventDefault()
        navigator.clipboard.writeText(textToCopy);
        setIsCopied(true)
        setTimeout(() => { setIsCopied(false) }, 500)
    };

    const overlayClassName = isCopied ? 'mercadoPago-overlay mercadoPago-overlay__show' : 'mercadoPago-overlay'

    return (
        <div className='mercadoPago-row'>
            <h4>{textToTitle}</h4>
            <div className='mercadoPago-info'> 
                <span>{textToCopy}</span>
                {
                    isCopiable &&
                    <button onClick={handleCopyClick}>
                        <img src={copy} alt="copiar al cortapapeles" />
                    </button>
                }
            </div>

            <div className={overlayClassName}>
                <p>copiado</p>
            </div>
        </div>
    )
}

export default TextToClipBoard