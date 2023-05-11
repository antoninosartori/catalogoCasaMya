import { useEffect, useState } from 'react'
import './App.css'

// componentes
import Header from './components/Header'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import Card from './components/Card'
import GoUpArrow from './components/GoUpArrow'
import CardPlaceholder from './components/CardPlaceholder'
import CardItemPlaceholder from './components/CardItemPlaceholder'

// constantes
const URL_API = 'https://sheet.best/api/sheets/4c6e4bf6-c0ef-4341-a895-90f7a0ca8e28/tabs/Catalogo'
const brandsImages = [
  {
    name: 'Antonio Banderas',
    imagePath: 'https://sarantisgroup.com/media/4e3daqne/ab-logo.png'
  },
  {
    name: 'Soul Essences',
    imagePath: 'https://drive.google.com/uc?export=view&id=1odCQ3XjTyFttz2aCK_PlkaapXR9ipNTc&rl'
  },
  {
    name: 'Ciel',
    imagePath: 'https://drive.google.com/uc?export=view&id=1GVyaR5xaFfQsoE1CVyQWMlUmI1PzXlTE&rl'
  },
  {
    name: 'Paula Cahen',
    imagePath: 'https://drive.google.com/uc?export=view&id=1M0r-PE6kmgWLrPh28jKgb5iGFkXkie25&rl'
  },
  {
    name: 'Kevin',
    imagePath: 'https://cdn.batitienda.com/baticloud/images/brand_ce813ec668d64eb49efb95306d6b8b2a_637437997968733165_0_m.webp'
  },
]

function App() {
  const [fragances, setFragances] = useState([])
  const [ filteredFragances, setFilteredFragances] = useState([])
  const [ search, setSearch] = useState('')
  const [ isLoading, setIsLoading] = useState(false)
  const [ error, setError] = useState('')
  const [ title, setTitle] = useState('Catálogo')
  

/*   const handleFamaleFragance = (event) => {
    event.preventDefault()
    const filter = fragances.filter(fragance => !fragance.esMasculino)
    setFilteredFragances(filter)
    setTitle('Fragancias femeninas')
  }

  const handleMaleFragance = (event) => {
    event.preventDefault()
    const filter = fragances.filter(fragance => fragance.esMasculino)
    setFilteredFragances(filter)
    setTitle('Fragancias masculinas')
  } */

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

  const onChangeSearch = (event) => {
    const value = event.target.value.toLowerCase()
    setSearch(value)
    filterSearch(value)
    setTitle(value === '' ? 'Catálogo' : 'Resultados de la búsqueda')
  }

  const filterSearch = (searchValue) => {
    const filter = fragances.filter(fragance => fragance.nombre.includes(searchValue) || fragance.marca.includes(searchValue))
    setFilteredFragances(filter)
  }

  const chooseBrand = (event) => {
    
    const value = event.target.alt
    setTitle(value === '' ? 'Catálogo' : `Fragancias de ${value}`)
    const valueToLowerCase = value.toLowerCase()
    setSearch(valueToLowerCase)
    filterSearch(valueToLowerCase)
  }

  const resetSearch = () => {
    setFilteredFragances(fragances)
    setSearch('')
    setTitle('Catálogo')
  }

  useEffect(() => {
    // fetch
    setIsLoading(true)
    fetch(URL_API)
      .then((response) => response.json())
      .then((data) => {
        setFilteredFragances(data);
        setFragances(data);
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
            <input onChange={onChangeSearch} type="text" placeholder='buscar fragancia' value={search}/>
            <span onClick={resetSearch} className='resetSearch'>X</span>
            <div className='filters-container'>
              <button onClick={handleAllFragance}  className='filter-button'>todas</button>
              <button onClick={handleChangeFragance} value='hombre' className='filter-button'>fragancias masculinas</button>
              <button onClick={handleChangeFragance}value='mujer' className='filter-button'>fragancias femeninas</button>
            </div>
          </form>
        </section>

        <section className='content-container'>
          {error && <h2>Lo siento, ha ocurrido un error, intente nuevamente</h2> }
          <div className='brands-container'>
            { brandsImages.map(brand => (
              <img onClick={chooseBrand} className='brand-image' key={brand.name} src={brand.imagePath} alt={brand.name} value={brand.name} />
            )) }
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
                < Card key={fragance.id} id={fragance.id} marca={fragance.marca} nombre={fragance.nombre} foto={fragance.foto} capacidad={fragance.capacidad} precio={fragance.precio} encargado={fragance.encargado} />
              ))
            }
          </div>

          < GoUpArrow />

        </section>
      </main>

      < Footer />
    </>
  )
}

export default App
