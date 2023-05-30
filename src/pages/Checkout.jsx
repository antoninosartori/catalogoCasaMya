import React, { useContext } from 'react'
import './Checkout.css'
import { appContext } from '../context/appContext'
import { Link, Navigate } from 'react-router-dom'
import Card from '../components/Card'
import Header from '../components/Header'

const Checkout = () => {
    const { cart, setCart, calculateTotal } = useContext(appContext)
    if (cart.length === 0) {
        return <Navigate to={"/"} />
    }
    return (
        <>
            < Header checkoutHeader />
            
            <main>
                <section className='checkout-container'>
                    <h2>Revisá tu pedido</h2>
                    <div className='checkout-section'>
                        <div className='cart-cards checkout-cart'>
                            {cart && cart.map(product => (
                                < Card isInCart key={product.id} id={product.id} marca={product.marca} nombre={product.nombre} foto={product.foto} capacidad={product.capacidad} precio={product.precio} estado={product.estado} precioSinDesc={product.precioSinDesc} desc={product.desc} />
                            ))}
                        </div>
                        <aside className='checkout-payment'>
                            <div className='payment-footsprings'>
                                <div className='footspring-group'>
                                    <span className='footspring-number'>1</span>
                                    <p className='footspring-text'>Comprobá que los productos sean los que querés</p>
                                </div>
                                <div className='footspring-group'>
                                    <span className='footspring-number'>2</span>
                                    <p className='footspring-text'>Una vez que hayas decidido, hacé <em>click</em> en el botón <em>continuar</em></p>
                                </div>
                                <div className='footspring-group'>
                                    <span className='footspring-number'>3</span>
                                    <p className='footspring-text'>Llená el formulario con tus datos</p>
                                </div>
                                <div className='footspring-group'>
                                    <span className='footspring-number'>4</span>
                                    <p className='footspring-text'>Vas a encontrar los <em>datos de la cuenta</em> a la cual deberás <em>depositar el dinero</em></p>
                                </div>
                                <div className='footspring-group'>
                                    <span className='footspring-number'>5</span>
                                    <p className='footspring-text'>Realizá el deposito, <em>enviá</em> el comprobante al <em>teléfono o email</em>, o ponete en contacto vía <em>Whatsapp</em></p>
                                </div>
                            </div>
                            <div className='checkout-payment__footer'>
                                <h3 className='total-cart'>Total a pagar: <span>${calculateTotal()}</span> </h3>
                                <div className='payment-buttons'>
                                    <Link to='/' className='contactForm-sendButton goBackCart'>volver atras</Link>
                                    <Link to='/buy' className='contactForm-sendButton '>continuar</Link>
                                </div>
                            </div>
                        </aside>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Checkout