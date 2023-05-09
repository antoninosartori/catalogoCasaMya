import React from 'react'
import './Card.css'
const Card = ({ id, marca, nombre, foto, capacidad, precio, encargado }) => {
    return (
        <article className='card-container' key={id}>
            <div className='card-photo'>
                <img className='card-image' src={foto} alt="" />
                <span className='card-capacity'>{`${capacidad}ml`}</span>
            </div>
            <div className='card-body'>
                <h4 className='card-productBrand'>{marca}</h4>
                <h4 className='card-productName'>{nombre}</h4>
            </div>
            <div className='card-footer'>
                <h5 className='card-price'>{`$${precio}`}</h5>
            </div>
            {encargado && 
                <span className='card-incoming'>proximamente</span>
            }
        </article>
    )
}

export default Card