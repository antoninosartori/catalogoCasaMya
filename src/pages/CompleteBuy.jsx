import React, { useContext, useState } from 'react'
import './CompleteBuy.css'
import Header from '../components/Header'
import { appContext } from '../context/appContext'
import { Link, Navigate } from 'react-router-dom'
// assets
import car from '../assets/car.svg'
import fragance4 from '../assets/fragance4.svg'
import smile from '../assets/smile.svg'
import { mercadoPagoInfo } from '../consts/const'
import TextToClipBoard from '../components/TextToClipBoard'



const CompleteBuy = () => {
    const { cart, calculateTotal } = useContext(appContext)
    if (cart.length === 0) {
        return <Navigate to={"/"} />
    }

    return (
        <>
            <Header checkoutHeader />
            <main>
                <section className='completeBuy-container'>
                    <h2>Finalizar compra</h2>
                    <div className='completeBuy-section'>
                        <form className='completeBuy-form'>
                            <h3>completá tus datos</h3>
                            <div className='completeBuy-form__container'>
                                <div className='input-group'>
                                    <input type="text" placeholder='Nombre' className='completeBuy-input' />
                                    <input type="text" placeholder='Apellido' className='completeBuy-input' />
                                </div>
                                <div className='input-group'>
                                    <input type="email" placeholder='Email' className='completeBuy-input' />
                                    <input type="tel" placeholder='Celular' className='completeBuy-input' />
                                </div>
                                <div className='input-group'>
                                    <input type="email" placeholder='Ciudad' className='completeBuy-input' />
                                    <input type="tel" placeholder='Provincia' className='completeBuy-input' />
                                    <input type="number" placeholder='Codigo postal' className='completeBuy-input' />
                                </div>
                            </div>
                            <div className='delivery-container'>
                                <img src={car} alt="Foto de auto que representa el envio a domicilio" />
                                <p>Esta compra incluye el envío del producto hasta tu casa</p>
                            </div>
                            <div className='delivery-container'>
                                <img src={fragance4} alt="Foto de auto que representa el envio a domicilio" />
                                <p>Al hacer click en <em>COMPRAR</em> te guardamos el producto por 24 horas.</p>
                            </div>
                            <div className='delivery-container'>
                                <img src={smile} alt="Foto de auto que representa el envio a domicilio" />
                                <p>Nosotros ponemos el compromiso de guardarte tu producto, asi que esperamos lo mismo de vos con la responsabilidad del pago</p>
                            </div>
                            <div className='completeBuy-button__container'>
                                <Link className='contactForm-sendButton goBackCart' to='/checkout'> volver atras </Link>
                                <button className='completeBuy-button contactForm-sendButton'>comprar</button>
                            </div>
                        </form>
                        <aside className='completeBuy-account'>
                            <h3>nuestros datos</h3>
                            <article className='mercadoPago-container'>
                                {
                                    mercadoPagoInfo.map(item => (
                                        < TextToClipBoard key={item.title} textToTitle={item.title} textToCopy={item.info} />
                                    ))
                                }
                            </article>
                            <div className='completeBuy-account__totalContainer'>
                                <h3 className='total-cart'>Total a pagar: <span>${calculateTotal()}</span> </h3>
                            </div>
                        </aside>
                    </div>
                </section>
            </main>
        </>
    )
}

export default CompleteBuy