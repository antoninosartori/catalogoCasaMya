import React, { useRef, useState } from 'react'
// emailjs
import emailjs from '@emailjs/browser';
import './ContactForm.css'
import LoadingSpinner from './LoadingSpinner'
const ContactForm = () => {
    const [isDisabled, setIsDisabled] = useState(false)
    const [messageResult, setMessageResults] = useState('')
    const form = useRef();
    const sendEmail = (event) => {
        event.preventDefault();
    
        // verificar
        const name = form.current.name.value
        const email = form.current.email.value
        const message = form.current.message.value
    
        if(!name || name.length < 3){
          setMessageResults('Por favor, escribe un nombre válido')
          return
        }
    
        if(!message || message.length < 5){
          setMessageResults('Por favor, escribe un mensaje válido')
          return 
        }
    
        setMessageResults('')
        setIsDisabled(true)
        emailjs.sendForm('service_rqdt8w9', 'template_2dk062d', form.current, '1BLpRCJNGW4edyOyK')
          .then((result) => {
              console.log(result.text);
              setIsDisabled(false)
              setMessageResults('mensaje enviado correctamente')
              form.current.reset()
              setTimeout(() => setMessageResults(''), 3000)
          }, (error) => {
              console.log(error.text);
              setMessageResults('lo siento, no pudimos enviar su mensaje')
          });
      };

    return(
        <section className='contactForm-container'>
            <form ref={form} onSubmit={sendEmail} className='contactForm'>
              <h3>¡Hablémos!</h3>
              <p>Los productos publicados son originales, cerrados y con su sello de importación.</p>
              <p>¿Tenés alguna pregunta o querés encargar algún producto?</p>
              <input required className='contactForm-input' type="text" placeholder='Escribe tu nombre' name='name' />
              <input required className='contactForm-input' type="email" placeholder='Escribe tu email' name='email' />
              <textarea required className='contactForm-input' id="" cols="30" rows="10" placeholder='Escibe tu mensaje' name='message'></textarea>
              <button disabled={isDisabled} className='contactForm-sendButton'>enviar</button>
              {isDisabled && <LoadingSpinner/> }
              {messageResult && <p className='messageStatus'>{messageResult}</p>}
            </form>
      </section>
    )
}

export default ContactForm