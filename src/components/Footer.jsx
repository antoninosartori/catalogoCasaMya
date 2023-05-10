import React from 'react'
import './Footer.css'

import linkedin from '../assets/linkedin.svg'

const Footer = () => {
    return(
        <footer>
            <nav>
                <p>Desarrollado por Antonino Sartori</p>
                <div className='socialMedia-container'>
                    <a className='sociaMedia-item' href="https://www.linkedin.com/in/antonino-sartori/" target='_blank' rel='noreferrer'>
                        <img className='socialMedia-image' src={linkedin} alt="Perfil de LinkedIn" />
                    </a>
                </div>
            </nav>
        </footer>
    )
}

export default Footer