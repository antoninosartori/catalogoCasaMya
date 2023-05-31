import React, { useContext } from 'react'
import './Order.css'
import { appContext } from '../context/appContext'
import Header from '../components/Header'
import GridCards from '../components/GridCards'
import GoUpArrow from '../components/GoUpArrow'
import ContactForm from '../components/ContactForm'
//assets
import smile from '../assets/smile.svg'
import whatsapp from '../assets/whatsapp.svg'
import truck from '../assets/truck.svg'
import dollarup from '../assets/dollarup.svg'
import wallet from '../assets/wallet.svg'
import world from '../assets/world.svg'

const orderText = [
    {
        text:'Estos productos no los tenemos en el momento, son para encargar.',
        img: smile,
    },
    {
        text:'Las fragancias son importadas, originales. Vienen en su caja cerrada y sellada por la AFIP',
        img: world,
    },
    {
        text:'Al momento de encargar, tenés que pagar el 50% del producto. Luego para retirarlo pagás el restante',
        img: wallet,
    },
    {
        text:'Los productos suelen tardar una semana en llegar a nuestro local',
        img: truck,
    },
    {
        text:'Recomendamos que te pongas en contacto con nosotros antes o luego de encargar un producto',
        img: whatsapp,
    },
    {
        text:'Los precios son estimativos, ya que estan sujetos al precio del dólar',
        img: dollarup,
    },
]

const Order = () => {
    window.scrollTo(0,0)
    const { fragances, error } = useContext(appContext)
    const filter = fragances.filter(prod => prod.esEncargable)

    return (
        <>
            < Header />

            <main>
                
                <section className='orderText-container'>
                    <article className='orderText-article'>
                        {
                            orderText.map(txt => (
                                <div className='order-textContainer' key={txt.text}>
                                    <img className='order-img' src={txt.img} alt="imagen ilustrativa" />
                                    <p className='order-text'>{txt.text}</p>
                                </div>
                            ))
                        }
                        {/* <p className='order-text'>Aquí podrás ver los productos que traemos.</p>
                        <p className='order-text'>Las fragancias son importadas, originales. Vienen en su caja cerrada y sellada por la AFIP</p>
                        <p className='order-text'>Al momento de encargar, tenés que pagar el 50% del producto. Luego para retirarlo pagás el restante</p>
                        <p className='order-text'>Los productos suelen tardar una semana en llegar a nuestro local</p>
                        <p className='order-text'>Recomendamos que te pongas en contacto con nosotros antes o luego de encargar un producto</p>
                        <p className='order-text'>Los precios son estimativos, ya que estan sujetos al precio del dólar</p> */}

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