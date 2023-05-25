import { useContext, useEffect, useState } from 'react'
import './App.css'
// componentes
import Header from './components/Header'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import Card from './components/Card'
import GoUpArrow from './components/GoUpArrow'
// import CardPlaceholder from './components/CardPlaceholder'
import CardItemPlaceholder from './components/CardItemPlaceholder'
import BrandPlaceholder from './components/BrandPlaceholder'
// constantes
import { URL_API, brandsImages } from './consts/const'
// assets
import fragance from './assets/fragance.svg'
import fragance2 from './assets/fragance2.svg'
import fragance3 from './assets/fragance3.svg'
import fragance4 from './assets/fragance4.svg'
import { appContext } from './context/appContext'

function App() {
  //const [fragances, setFragances] = useState([])
  const { fragances, setFragances, filteredFragances, setFilteredFragances, setSearch, title, setTitle, filterSearch, resetSearch } = useContext(appContext)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
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

/*   const onChangeSearch = (event) => {
    const value = event.target.value.toLowerCase()
    setSearch(value)
    filterSearch(value)
    setTitle(value === '' ? 'Catálogo' : 'Resultados de la búsqueda')
  } */

/*   const filterSearch = (searchValue) => {
    const filter = fragances.filter(fragance => fragance.nombre.includes(searchValue) || fragance.marca.includes(searchValue) || fragance.genero.includes(searchValue))
    if(filter.length === 0){ setTitle(`No se han encontrado productos`) }
    setFilteredFragances(filter)
  } */

  const chooseBrand = (event) => {

    const value = event.target.alt
    setTitle(value === '' ? 'Catálogo' : `Fragancias de ${value}`)
    const valueToLowerCase = value.toLowerCase()
    setSearch(valueToLowerCase)
    filterSearch(valueToLowerCase)
  }

/*   const resetSearch = () => {
    setFilteredFragances(fragances)
    setSearch('')
    setTitle('Catálogo')
  } */

  useEffect(() => {
    // fetch
    setIsLoading(true)
    fetch(URL_API)
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort((a,b) => b.precio - a.precio)
        setFilteredFragances(sortedData);
        setFragances(sortedData);
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        setError(true)
        console.error(error);
      });
  }, [])

  return (
    <>
      < Header />

      <main>
        <section className='formSearch-container'>
          <form>
            {/* <input onChange={onChangeSearch} type="text" placeholder='buscar fragancia' value={search} />
            <span onClick={resetSearch} className='resetSearch'>X</span> */}
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

      < Footer />
    </>
  )
}

export default App
