import React, { useContext } from 'react'
import './Checkout.css'
import { appContext } from '../context/appContext'
import { Link, Navigate } from 'react-router-dom'
import Card from '../components/Card'

const Checkout = () => {
    const { cart, setCart, calculateTotal } = useContext(appContext)
    if (cart.length === 0) {
        return <Navigate to={"/"} />
    }
    return(
        <main>
            <section className='checkout-container'>
                <h2>Finalizar compra</h2>
                <div className='checkout-section'>
                    <div className='cart-cards checkout-cart'>
                    {cart && cart.map(product => (
                        < Card isInCart key={product.id} id={product.id} marca={product.marca} nombre={product.nombre} foto={product.foto} capacidad={product.capacidad} precio={product.precio} estado={product.estado} precioSinDesc={product.precioSinDesc} desc={product.desc} />
                    ))}
                    </div>
                    <aside className='checkout-payment'>
                        <div className='payment-footsprings'>
                            <div className='footspring-group'>
                                <span  className='footspring-number'>1</span>
                                <p className='footspring-text'>Comproba que los productos sean los que queres</p>
                            </div>
                            <div className='footspring-group'>
                                <span  className='footspring-number'>2</span>
                                <p className='footspring-text'>Una vez que hayas decidido, hace <em>click</em> en el boton <em>finalizar compra</em></p>
                            </div>
                            <div className='footspring-group'>
                                <span  className='footspring-number'>3</span>
                                <p className='footspring-text'>Vas a encontrar los <em>datos de la cuenta</em> a la cual deberas <em>depositar el dinero</em></p>
                            </div>
                            <div className='footspring-group'>
                                <span  className='footspring-number'>4</span>
                                <p className='footspring-text'>Una vez transferido, tendras que <em>enviar</em> el comprobante al <em>telefono o correo electronico</em>, o ponerte en contacto via <em>Whatsapp</em></p>
                            </div>
                        </div>
                        <div className='checkout-payment__footer'>
                            <h3 className='total-cart'>Total a pagar: ${calculateTotal()}</h3>
                            <div className='payment-buttons'>
                                <Link to='/' className='contactForm-sendButton goBackCart'>volver atras</Link>
                                <Link to='/' className='contactForm-sendButton '>finalizar compra</Link>

                            </div>
                        </div>
                    </aside>
                </div>
               
            </section>
        </main>
    )
}

export default Checkout