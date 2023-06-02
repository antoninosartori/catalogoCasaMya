import React, { useContext, useRef, useState } from 'react'
import './CompleteBuy.css'
import emailjs from '@emailjs/browser';
import Header from '../components/Header'
import LoadingSpinner from '../components/LoadingSpinner'
import { appContext } from '../context/appContext'
import { Link, Navigate } from 'react-router-dom'
// assets
import car from '../assets/car.svg'
import fragance4 from '../assets/fragance4.svg'
import smile from '../assets/smile.svg'
import { mercadoPagoInfo } from '../consts/const'
import TextToClipBoard from '../components/TextToClipBoard'



const CompleteBuy = () => {
    window.scrollTo(0,0)
    const { cart, calculateTotal} = useContext(appContext)
    const form = useRef();
    const [ error, setError ] = useState(false)
    const [ isSuccess, setIsSuccess] = useState(false)
    const [ isLoading, setIsLoading] = useState(false)

    if (cart.length === 0) {
        return <Navigate to={"/"} />
    }

    if(isSuccess) {
        return < Navigate to={'/successfully'} />
    }

    const sendBuy = (event) => {
        event.preventDefault();
    
        // verificar
        const name = form.current.name.value
        const lastname = form.current.lastname.value
        const email = form.current.email.value
        const cellphone = form.current.cellphone.value
        const city = form.current.city.value
        const adress = form.current.adress.value
        const province = form.current.province.value
        const postalCode = form.current.postalCode.value
        
        if( !name ){
            setError('por favor, escribe tu nombre')
            return 
        }
        if( !lastname ){
            setError('por favor, escribe tu apellido')
            return 
        }
        if( !email ){
            setError('por favor, escribe tu email')
            return 
        }
        if( !cellphone ){
            setError('por favor, escribe tu celular')
            return 
        }
        if( !city ){
            setError('por favor, escribe de que ciudad sos')
            return 
        }
        if( !province ){
            setError('por favor, escribe tu provincia')
            return 
        }
        if( !postalCode ){
            setError('por favor, escribe tu código postal')
            return 
        }
        if( !adress) {
            setError('por favor, escribe tu domicilio')
            return
        }
        setIsLoading(true)
        emailjs.sendForm('service_rqdt8w9', 'template_eadd28u', form.current, '1BLpRCJNGW4edyOyK')
          .then((result) => {
              console.log(result.text);
              setIsLoading(false)
              setIsSuccess(true)
              
          }, (error) => {
                setIsLoading(false)
              console.log(error.text);
              console.log('lo siento, no pudimos enviar su mensaje')
          });
      };

      const cartToEmail = cart.map(product => {return `${product.marca.toUpperCase()} - ${product.nombre} ${product.capacidad} - ${product.genero} => $${product.precio}` })

    return (
        <>
            <Header checkoutHeader />
            <main>
                <section className='completeBuy-container'>
                    <h2>Finalizar compra</h2>
                    <form ref={form} onSubmit={sendBuy} className='completeBuy-section'>
                        <div className='completeBuy-form'>
                            <h3>completá tus datos</h3>
                            <div className='completeBuy-form__container'>
                                <div className='input-group'>
                                    <input name='name' type="text" placeholder='Nombre' className='completeBuy-input' />
                                    <input name='lastname' type="text" placeholder='Apellido' className='completeBuy-input' />
                                </div>
                                <div className='input-group'>
                                    <input name='email' type="email" placeholder='Email' className='completeBuy-input' />
                                    <input name='cellphone' type="number" placeholder='Celular' className='completeBuy-input' />
                                </div>
                                <div className='input-group'>
                                    <input name='city' type="text" placeholder='Ciudad' className='completeBuy-input' />
                                    <input name='adress' type="text" placeholder='Domicilio' className='completeBuy-input' />
                                </div>
                                <div className='input-group'>
                                    <input name='province' type="text" placeholder='Provincia' className='completeBuy-input' />
                                    <input name='postalCode' type="number" placeholder='CP' className='completeBuy-input' />
                                </div>
                                    <input readOnly className='inactive' name='total' type="text" value={calculateTotal()} />
                                    <textarea readOnly className='inactive' name='cart' type="text"  value={cartToEmail} />
                            </div>
                            {
                                error && 
                                    <p className='messageStatus'>{error}</p>
                            }
                            <div className='delivery-container'>
                                <img src={car} alt="Foto de auto que representa el envio a domicilio" />
                                <p>Envíos a todo el país</p>
                            </div>
                            <div className='delivery-container'>
                                <img src={fragance4} alt="Foto de auto que representa el envio a domicilio" />
                                <p>Al hacer click en <em>COMPRAR</em> te guardamos el producto por 24 horas.</p>
                            </div>
                            <div className='delivery-container'>
                                <img src={smile} alt="Foto de auto que representa el envio a domicilio" />
                                <p>Nos comprometemos a guardarte tu producto, asi que esperamos lo mismo de vos con la responsabilidad del pago.</p>
                            </div>
                        </div>
                        <aside className='completeBuy-account'>
                            <h3>nuestros datos</h3>
                            <article className='mercadoPago-container'>
                                {
                                    mercadoPagoInfo.map(item => (
                                        < TextToClipBoard key={item.title} textToTitle={item.title} textToCopy={item.info} isCopiable={item.isCopiable} />
                                    ))
                                }
                            </article>
                            <div className='completeBuy-account__totalContainer'>
                                <h3 className='total-cart'>Total a pagar: <span name='total' >${calculateTotal()}</span> </h3>
                            </div>
                            <div className='completeBuy-button__container'>
                                <Link className='contactForm-sendButton goBackCart' to='/checkout'> volver atras </Link>
                                <button disabled={isLoading} className='completeBuy-button contactForm-sendButton'>{ isLoading ? < LoadingSpinner withoutText /> : 'comprar' }</button>
                            </div>
                        </aside>
                    </form>
                </section>
            </main>
        </>
    )
}

export default CompleteBuy