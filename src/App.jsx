import { useEffect, useState } from 'react'
import './App.css'

// componentes
import Header from './components/Header'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import Card from './components/Card'
import GoUpArrow from './components/GoUpArrow'
import CardPlaceholder from './components/CardPlaceholder'

// constantes
const URL_API = 'https://sheet.best/api/sheets/4c6e4bf6-c0ef-4341-a895-90f7a0ca8e28/tabs/Catalogo'

function App() {
  const [fragances, setFragances] = useState([])
  const [ filteredFragances, setFilteredFragances] = useState([])
  const [ search, setSearch] = useState('')
  const [ isLoading, setIsLoading] = useState(false)
  const [ error, setError] = useState('')
  const [ title, setTitle] = useState('Catálogo')
  

  const handleFamaleFragance = (event) => {
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
  }

  const handleAllFragance = (event) => {
    event.preventDefault()
    setFilteredFragances(fragances)
    setTitle('Catálogo')
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
              <button onClick={handleAllFragance} className='filter-button'>todas</button>
              <button onClick={handleMaleFragance} className='filter-button'>fragancias masculinas</button>
              <button onClick={handleFamaleFragance} className='filter-button'>fragancias femeninas</button>
            </div>
          </form>
        </section>

        <section className='content-container'>
          {error && <h2>Lo siento, ha ocurrido un error, intente nuevamente</h2> }
          <h3>{title}</h3>
          <div className='content-group'>
            {isLoading &&
              <div className='loading-container'>
                < LoadingSpinner />
                < CardPlaceholder />
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
