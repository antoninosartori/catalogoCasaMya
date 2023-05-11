import React, { useState } from 'react'
import './Card.css'
import ImagePlaceholder from './ImagePlaceholder'

import whatsapp from '../assets/whatsapp.svg'

const Card = ({ id, marca, nombre, foto, capacidad, precio, estado }) => {
    const [ whatsappLinkClassName, setWhatsappLinkClassName] = useState('whatsapp-link inactive')
    const [ isImageLoaded, setIsImageLoaded] = useState(false)
    const classNameImage = isImageLoaded ? 'card-image' : 'inactive'
    const defaultMessage = 'Hola, estoy interesado en el producto'

    const cardHover = () => {
        setWhatsappLinkClassName('whatsapp-link')
    }

    const cardMouseOut = () => {
        setWhatsappLinkClassName('whatsapp-link inactive')
    }

    return (
        <article onMouseOver={cardHover} onMouseOut={cardMouseOut} className='card-container' key={id}>
            <div className='card-photo'>
                
                {!isImageLoaded &&  < ImagePlaceholder /> }
                   
                <img onLoad={() => {setIsImageLoaded(true)}} className={classNameImage} src={foto} alt={`Imagen del producto ${marca} - ${nombre}`}/>
                {/* <span className='card-capacity'>{`${capacidad}ml`}</span> */}
            </div>
            <div className='card-body'>
                {estado && 
                    <span className='card-status'>{estado}</span>
                }
                <span className='card-capacity'>{`${capacidad}ml`}</span>
                <h4 className='card-productBrand'>{marca}</h4>
                <h4 className='card-productName'>{nombre}</h4>
            </div>
            <div className='card-footer'>
                <h5 className='card-price'>{`$${precio}`}</h5>
                <a className={whatsappLinkClassName} href={`https://wa.me/543446544456?text=${defaultMessage} ${marca} - ${nombre} x${capacidad}ml`} target='_blank' rel='noreferrer'>
                    <img className='whatsapp-image' src={whatsapp} alt="Enviar mensaje de texto con ese mensaje" />
                </a>
            </div>
           {/*  {encargado && 
                <span className='card-incoming'>proximamente</span>
            } */}
        </article>
    )
}

export default Card