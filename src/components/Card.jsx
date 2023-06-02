import React, { useContext, useState } from 'react'
import './Card.css'
import ImagePlaceholder from './ImagePlaceholder'

// import whatsapp from '../assets/whatsapp.svg'
//import addCartImg from '../assets/cart.svg'
import cartEmptyImg from '../assets/cartEmpty.svg'
import cartFullImg from '../assets/cartBlack.svg'

import deleteImg from '../assets/delete.svg'
import { appContext } from '../context/appContext'

const Card = ({ id, marca, nombre, foto, capacidad, precio, estado, desc, precioSinDesc, isInCart, genero }) => {
    const { cart, setCart, setOpenCart } = useContext(appContext)
    const [ whatsappLinkClassName, setWhatsappLinkClassName] = useState('cart-image cart-image__inactive')
    const [ isImageLoaded, setIsImageLoaded] = useState(false)
    const classNameImage = isImageLoaded ? 'card-image' : 'inactive'
   // const defaultMessage = 'Hola, estoy interesado en el producto'
    const precioFormatted = Number(precio)
    const isOnCart = cart.some(product => product.id === id)
    const showCart = isOnCart ? cartFullImg : cartEmptyImg
    

    
    const cardHover = () => {
        setWhatsappLinkClassName('cart-image')
    }

    const cardMouseOut = () => {
        setWhatsappLinkClassName('cart-image cart-image__inactive')
    }

    const addToCart = () => {
        if(!precioFormatted){
            return
        }
        if(isOnCart) {return}
        
        const newProduct = {id, marca, nombre, foto, capacidad, precio: precioFormatted, estado, desc, precioSinDesc, genero}
        //const isOnCart = cart.some(product => product.id === id)
        const newCart = [...cart, newProduct]
        setCart(newCart)
        setOpenCart(true)
    }

    const removeFromCart = () => {
        const filter = cart.filter(product => product.id !== id )
        setCart(filter)
        if(filter.length === 0){
            setOpenCart(false)
        }
    }

    const cardStatusClassName = estado === 'agotado' ? 'card-status card-status__unavailable' : 'card-status'

    return (
        <article onMouseOver={cardHover} onMouseOut={cardMouseOut} className='card-container' key={id}>
            <div className='card-photo'>
                
                {!isImageLoaded &&  < ImagePlaceholder /> }
                   
                <img onLoad={() => {setIsImageLoaded(true)}} className={classNameImage} src={foto} alt={`Imagen del producto ${marca} - ${nombre}`}/>
                {/* <span className='card-capacity'>{`${capacidad}ml`}</span> */}
            </div>
            <div className='card-body'>
                {estado && 
                    <span className={cardStatusClassName}>{estado}</span>
                }
                <span className='card-capacity'>{`${capacidad}ml`}</span>
                <h4 className='card-productBrand'>{marca}</h4>
                <h4 className='card-productName'>{nombre}</h4>
            </div>
            <div className='card-footer'>
                {desc &&
                    <div className='card-discount'>
                        <span className='card-discount__off'>{`%${desc}`}</span>
                        <h6 className='card-discount__price'>{`$${precioSinDesc}`}</h6>
                    </div>
                }
                <h5 className='card-price'>{`$${precioFormatted}`}</h5>
                {/* <a className={whatsappLinkClassName} href={`https://wa.me/543446544456?text=${defaultMessage} ${marca} - ${nombre} x${capacidad}ml`} target='_blank' rel='noreferrer'>
                    <img className='whatsapp-image' src={whatsapp} alt="Enviar mensaje de texto con ese mensaje" />
                </a> */}
                {!isInCart
                    ? <a className={whatsappLinkClassName} >
                        <img onClick={addToCart} className='whatsapp-image' src={showCart} alt="Enviar mensaje de texto con ese mensaje" />
                    </a>
                    :
                    <img onClick={removeFromCart} className='cart-product__deleteImg' src={deleteImg} alt="Eliminar producto del carrito" />
                }
                
            </div>
        </article>
    )
}

export default Card