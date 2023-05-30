import React from 'react'
import './Footer.css'
import whatsapp from '../assets/whatsappBlack.svg'
import linkedin from '../assets/linkedin.svg'
const whatsappMessage = 'Hola, quisiera obtener mas inforamción acerca'
const Footer = () => {
    return(
        <footer>
            <nav>
                <p>Desarrollado por Antonino Sartori</p>
                <div className='socialMedia-container'>
                    <a className='sociaMedia-item' href="https://www.linkedin.com/in/antonino-sartori/" target='_blank' rel='noreferrer'>
                        <img className='socialMedia-image' src={linkedin} alt="Perfil de LinkedIn" />
                    </a>
                    <a className='sociaMedia-item' href={`https://wa.me/543446544456?text=${whatsappMessage}`} target='_blank' rel='noreferrer'>
                        <img className=' socialMedia-image' src={whatsapp} alt="Enviar mensaje de texto con ese mensaje" />
                    </a>
                </div>
            </nav>
        </footer>
    )
}

export default Footer