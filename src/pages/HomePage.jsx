import { useContext } from 'react'
import { appContext } from '../context/appContext'
import '../App.css'
// componentes
import Header from '../components/Header'
import SearchBrand from '../components/SearchBrand'
import ContactForm from '../components/ContactForm'
import GoUpArrow from '../components/GoUpArrow'
// assets
import fragance from '../assets/fragance.svg'
import fragance2 from '../assets/fragance2.svg'
import fragance3 from '../assets/fragance3.svg'
import fragance4 from '../assets/fragance4.svg'
import GridCards from '../components/GridCards'


function HomePage() {
  window.scrollTo(0,0)
  const {filteredFragances, title, error} = useContext(appContext)
  return (
    <>
      < Header />
      
      <main>
        < SearchBrand toOrderButton />

        <section className='content-container'>
          {error && <h2>Lo siento, ha ocurrido un error, intente nuevamente</h2>}
          
          <h3>{title}</h3>
        
          < GridCards cardsToMap={filteredFragances} />

          < GoUpArrow />

        </section>

        <section className='separator'>
          <div className='separador_box-relative'>
            <img className='separador-image separador-item1' src={fragance2} alt="imagen de una fragancia" />
            <img className='separador-image separador-item4' src={fragance4} alt="imagen de una fragancia" />
            <img className='separador-image separador-item3' src={fragance3} alt="imagen de una fragancia" />
            <img className='separador-image separador-item2' src={fragance} alt="imagen de una fragancia" />
          </div>

        </section>

        < ContactForm />

      </main>
    </>
  )
}

export default HomePage