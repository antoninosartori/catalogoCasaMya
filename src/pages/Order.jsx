import React, { useContext, useEffect, useState } from 'react'
import './Order.css'
import Header from '../components/Header'
import SearchBrand from '../components/SearchBrand'
import { appContext } from '../context/appContext'
import GridCards from '../components/GridCards'
import GoUpArrow from '../components/GoUpArrow'
import ContactForm from '../components/ContactForm'


const Order = () => {
    const { fragances, error } = useContext(appContext)
    const filter = fragances.filter(prod => prod.esEncargable)

    return (
        <>
            < Header />

            <main>
                
                <section className='orderText-container'>
                    <article className='orderText-article'>
                        <p className='order-text'><span>😊</span> Aquí podrás ver los productos que traemos.</p>
                        <p className='order-text'><span>🌎</span> Las fragancias son importadas, originales. Vienen en su caja cerrada y sellada por la AFIP</p>
                        <p className='order-text'><span>💵</span> Al momento de encargarlas, se deberá abonar el 50% del producto</p>
                        <p className='order-text'><span>🚚</span> Los productos suelen tardar una semana en llegar a nuestro local</p>
                        <p className='order-text'><span>📞</span> Recomendamos que te pongas en contacto con nosotros antes o luego de encargar un producto</p>
                        <p className='order-text'><span>💸</span>Los precios son estimativos, ya que estan sujetos al precio del dólar</p>

                    </article>
                </section>

                <section className='content-container'>
                    {error && <h2>Lo siento, ha ocurrido un error, intente nuevamente</h2>}

                    <h3>Fragancias para encargar</h3>

                    < GridCards cardsToMap={filter} />

                    < GoUpArrow />

                </section>

                <ContactForm isToOrder/>

            </main>
        </>
    )
}

export default Order