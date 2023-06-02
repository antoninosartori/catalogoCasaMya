import React, { useContext, useState } from 'react'
import './Successfully.css'
import { appContext } from '../context/appContext'
import { Link, Navigate } from 'react-router-dom'
// asessts
import smile from '../assets/smile.svg'
import whatsapp from '../assets/whatsapp.svg'
import { mercadoPagoInfo } from '../consts/const'
import TextToClipBoard from '../components/TextToClipBoard'
import Header from '../components/Header'
const Successfully = () => {
    window.scrollTo(0, 0)
    const { cart, calculateTotal, setCart } = useContext(appContext)

    if (cart.length === 0) {
        return <Navigate to={"/"} />
    }

    const whatsappMessage = 'Hola, he hecho un pedido desde el catálogo'
    return (
        <main>
            < Header checkoutHeader/>
            <section className='successfully-container'>
                <img className='smile' src={smile} alt="carita sonriente" />
                <h2>Gracias</h2>
                <h3>Hemos recibido tu pedido</h3>

                <div className='successfully-paymentContainer'>
                    <div className='successfully-payment'>
                        <p className='title-article'>Estos son los datos para que puedas depositar</p>
                        <article className='mercadoPago-container'>
                            {
                                mercadoPagoInfo.map(item => (
                                    < TextToClipBoard key={item.title} textToTitle={item.title} textToCopy={item.info} isCopiable={item.isCopiable}  />
                                ))
                            }
                        </article>
                    </div>
                    <div className='payment-footsprings'>
                        <p className='title-article'>Pasos a seguir</p>
                        <div className='footspring-group'>
                            <span className='footspring-number'>1</span>
                            <p className='footspring-text'>Realizá la transferencia.</p>
                        </div>
                        <div className='footspring-group'>
                            <span className='footspring-number'>2</span>
                            <p className='footspring-text'>Guardá el comprobante y mandalo por whatsapp o email.</p>
                        </div>
                        <div className='footspring-group'>
                            <span className='footspring-number'>3</span>
                            <p className='footspring-text'>Te vamos a contactar para coordinar la venta.</p>
                        </div>
                        <div className='footspring-group'>
                            <span className='footspring-number'>💡</span>
                            <p className='footspring-text'>Usando Mercado Pago podés pagar en cuotas.</p>
                        </div>
                        <div className='footspring-group'>
                            <span className='footspring-number'>❗</span>
                            <p className='footspring-text'>Si el producto es para <em>encargue</em> te recomendamos no depositar. Ponete en contacto con nosotros primero.</p>
                        </div>
                    </div>
                </div>

                <div className='checkout-payment__footer'>
                    <h3 className='total-cart'>Total a pagar: <span>${calculateTotal()}</span> </h3>
                </div>
                <p className='successfully-footer-text'>Recordá que te guardamos el stock por 24 horas</p>
                <p className='successfully-footer-text'>Ponete en contacto con nosótros, podes hacerlo por cualquier medio</p>
                <div className='successfully-socials'>
                    <a className='' href={`https://wa.me/543446544456?text=${whatsappMessage}`} target='_blank' rel='noreferrer'>
                        <img className='whatsapp-image' src={whatsapp} alt="Enviar mensaje de texto con ese mensaje" />
                    </a>
                </div>
                <Link className='text-center' onClick={() => setCart([])} to='/'>volver al inicio</Link>
            </section>
        </main>
    )
}

export default Successfully