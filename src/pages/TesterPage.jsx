import React from 'react'
import '../App.css'
import './TesterPage.css'
//assets
import testerImg from '../assets/tester.jpg'
import { NavLink } from 'react-router-dom'
const TesterPage = () => {
    return(
        <main>
            <section className='tester-container'>
                <div className='tester-header'>
                    <h3>¿Que es un perfume tester?</h3>
                    <NavLink className='tester-backButton' to='/'>Volver al inicio</NavLink>
                </div>
                <div className='parragraphImg-group'>
                    <div className='parragraph-items'>
                        <p>Los perfumes <strong>tester</strong> son aquellos que sirven para que los clientes puedan probar el perfume</p>
                        <p><strong>La única diferencia</strong> entre los perfumes tester y los de uso regular es a <strong>nivel de packaging</strong>, ya que son una versión más simple a la habitual, sin <em>papel celofán</em> ni <em>precintos de seguridad</em>, lo cual los hace mucho <strong>más baratos</strong></p>
                        <p>Más allá de eso <em>no hay ninguna diferencia</em>, ya que el perfume viene en su <strong>envase original y el contenido es 100% auténtico y fiable</strong></p>
                    </div>
                    <img src={testerImg} alt="foto de un perfume en su formato tester" />
                </div>
                <NavLink className='tester-backButton' to='/'>Ver catálogo</NavLink>
            </section>
        </main>
    )
}

export default TesterPage