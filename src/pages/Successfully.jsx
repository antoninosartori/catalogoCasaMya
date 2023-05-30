import React, { useContext, useState } from 'react'
import './Successfully.css'
import { appContext } from '../context/appContext'
import { Link, Navigate } from 'react-router-dom'
// asessts
import smile from '../assets/smile.svg'
import whatsapp from '../assets/whatsapp.svg'
import { mercadoPagoInfo } from '../consts/const'
import TextToClipBoard from '../components/TextToClipBoard'
const Successfully = () => {
    window.scrollTo(0, 0)
    const { cart, calculateTotal, setCart } = useContext(appContext)

    if (cart.length === 0) {
        return <Navigate to={"/"} />
    }

    const whatsappMessage = 'Hola, he hecho un pedido desde el catálogo'
    return (
        <main>
            <section className='successfully-container'>
                <img className='smile' src={smile} alt="carita sonriente" />
                <h2>Gracias</h2>
                <h3>Hemos recibido tu pedido</h3>
                <h3 className='total'>total: <span>${calculateTotal()}</span></h3>
                <p>Estos son los datos para que puedas depositar</p>
                <article className='mercadoPago-container'>
                    {
                        mercadoPagoInfo.map(item => (
                            < TextToClipBoard key={item.title} textToTitle={item.title} textToCopy={item.info} />
                        ))
                    }
                </article>
                <p>Recordá que te guardamos el stock por 24 horas</p>
                <p>Ponete en contacto con nosótros, podes hacerlo por cualquier medio</p>
                <div className='successfully-socials'>
                    <a className='' href={`https://wa.me/543446544456?text=${whatsappMessage}`} target='_blank' rel='noreferrer'>
                        <img className='whatsapp-image' src={whatsapp} alt="Enviar mensaje de texto con ese mensaje" />
                    </a>
                </div>
                <Link onClick={() => setCart([])} to='/'>volver al inicio</Link>
            </section>
        </main>
    )
}

export default Successfully