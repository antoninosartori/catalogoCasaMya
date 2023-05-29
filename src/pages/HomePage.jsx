import { useContext, useState } from 'react'
import '../App.css'
// componentes
import ContactForm from '../components/ContactForm'
import LoadingSpinner from '../components/LoadingSpinner'
import Card from '../components/Card'
import GoUpArrow from '../components/GoUpArrow'
// import CardPlaceholder from './components/CardPlaceholder'
import CardItemPlaceholder from '../components/CardItemPlaceholder'
import BrandPlaceholder from '../components/BrandPlaceholder'
// constantes
import { brandsImages } from '../consts/const'
// assets
import fragance from '../assets/fragance.svg'
import fragance2 from '../assets/fragance2.svg'
import fragance3 from '../assets/fragance3.svg'
import fragance4 from '../assets/fragance4.svg'
import { appContext } from '../context/appContext'

function HomePage() {
  const { fragances, filteredFragances, setFilteredFragances, setSearch, title, setTitle, filterSearch, resetSearch, isLoading,error } = useContext(appContext)

  
  const [isBrandImageLoaded, setIsBrandImageLoaded] = useState(false)
  const classNameBrandImage = isBrandImageLoaded ? 'brand-image' : 'inactive';

  const handleAllFragance = (event) => {
    event.preventDefault()
    setFilteredFragances(fragances)
    setTitle('Catálogo')
  }

  const handleChangeFragance = (event) => {
    event.preventDefault()
    const genre = event.target.value
    const filter = fragances.filter(fragance => fragance.genero === genre)
    setFilteredFragances(filter)
    setTitle(`Fragancias de ${genre}`)
  }

  const chooseBrand = (event) => {
    const value = event.target.alt
    setTitle(value === '' ? 'Catálogo' : `Fragancias de ${value}`)
    const valueToLowerCase = value.toLowerCase()
    setSearch(valueToLowerCase)
    filterSearch(valueToLowerCase)
  }

    return(
      <main>
      <section className='formSearch-container'>
        <form>
          <div className='filters-container'>
            <button onClick={handleAllFragance} className='filter-button'>todas</button>
            <button onClick={handleChangeFragance} value='hombre' className='filter-button'>fragancias masculinas</button>
            <button onClick={handleChangeFragance} value='mujer' className='filter-button'>fragancias femeninas</button>
          </div>
        </form>
      </section>

      <section className='content-container'>
        {error && <h2>Lo siento, ha ocurrido un error, intente nuevamente</h2>}
        <div className='brands-container'>
          { !isBrandImageLoaded && < BrandPlaceholder /> }
          <div onClick={resetSearch} className='allBrandsHTML-container'>
            <p>todas las marcas</p>
          </div>
          {brandsImages.map(brand => (
            <img onLoad={() => { setIsBrandImageLoaded(true) }} onClick={chooseBrand} className={classNameBrandImage} key={brand.name} src={brand.imagePath} alt={brand.name} value={brand.name} />
          ))}
        </div>
        <h3>{title}</h3>
        <div className='content-group'>
          {isLoading &&
            <div className='loading-container'>
              < LoadingSpinner />
              {/* < CardPlaceholder /> */}
              <div className='loading-cardsGroup'>
                < CardItemPlaceholder />
                < CardItemPlaceholder />
                < CardItemPlaceholder />
                < CardItemPlaceholder />
                < CardItemPlaceholder />
                < CardItemPlaceholder />
              </div>
            </div>
          }
          {filteredFragances &&
            filteredFragances.map(fragance => (
              < Card key={fragance.id} id={fragance.id} marca={fragance.marca} nombre={fragance.nombre} foto={fragance.foto} capacidad={fragance.capacidad} precio={fragance.precio} estado={fragance.estado} precioSinDesc={fragance.precioSinDesc} desc={fragance.desc} />
            ))
          }
        </div>

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
    )
}

export default HomePage