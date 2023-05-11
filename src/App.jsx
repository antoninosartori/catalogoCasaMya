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
    imagePath: 'https://soulessences.com.ar/wp-content/uploads/2020/09/200.png'
  },
  {
    name: 'Ciel',
    imagePath: 'https://cdn.shopify.com/s/files/1/0492/2041/9746/files/Ciel_logo_-_thicker-01_033cb0ac-1315-4b82-83b3-583d214e1f09_x71@2x.png?v=1633463238'
  },
  {
    name: 'Paula Cahen',
    imagePath: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPwAAACGCAMAAADOzBfyAAAAMFBMVEX///8nJSWMi4thX1/FxcXx8PA1NDTi4uJEQkJ9fHypqKjU09NSUVGamZm3trZvbm6xkKv7AAAE3UlEQVR4nO2a65bbKgyFDYiL8e393/YgJIztpJOeH41X3f2tdmZiG6ItcTGCYQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwFLNbmu224CT9YY+zdVtwEmdmUf9PddtwCmQrdbcct/NPi41L6/GLj3XbcxGbMeLcNX8YTaVMvf0x6Ked/ofmTqz19XmJ2Qlzmeik8ftqzZieZK87fbd4fhbXP1m5X4W5zwTz8lSeWxi19exq78nHlK54d8+ShfzlM61E6v9l2wTzz3WPXV3Am9Q/a/XtT98+e+Zxx/cOL+CEdbz+OD+KD2b5v09coo1yfzV7Ex2cP99mYnr14EV+Gw/UOq75EGdL6iGd5ej+KTybcYdTXGA9ibVq9J9c/P3uwL6Ev73G8lqn/fZznaYj6MYZnv+MM3K+LXv65ENlQX+9ocRxyvz16uKtkfZG9rG1cCfrqnx35zVo7loDLKjb5Rda3/KLvrJ2f3ecXjbiq1pU88VDAPHmm45TN/GYtH+Tis+POrC8pjJ0nL+kq0sCDs1kTeZ5osbq6ffZ4N/Br3Ly82aQhm47L3Yey/nJ7ip493AEAAAAAgD9PtEymlk2f+sm4cv3wK1tL53KvazC/2vHw1OEZktL6iysT3tzrJQp6dqEUoPbHfozlZN+qpW29T63+do1pr9U+FyurSGr5JK18M/u2Qvnr8MudNxQ4EXV9SV8kI7Fvso99naYH7tq5O9cWsXov+OF6Jq9lutwkBeRePKz6NeUvtWRj5qGul9OhsJQ6fRgmsTJMIt5xKiH4Vnmz4SfxdWF6yT2sdalqxIqh5uj3Mh/E8y7VL8SLYU18vdqDw/6XWrw4etu/5yzeVY01wKkY6MoPJ+JL0aR3aqn0WXw2Byu6P6w4duqGik/fiO9N3Eoe41W8Lf0oiI9VvCQDenBM8s2+uiGgLqjbIb0qeULrj7WQr9dE/DCLNaVyjl3+KL44a7tsrJF6rfU+fmavy9b8pHVd/FjHmu6k+E589bLr4nOtsgeHn1H7aoPXxs+F0z6myBN+6+0gbAupyaVNBA1R5jR689oP4olTzeacfFgu/aDUtTWHHE7inJq903sbn1V5K95rl7atyU6upTlLmfJ5VfuGIPfy6eu6l0wbgKTRmjT1AS+sWvlC7akfxHMbo3ROtmYj+8uRKLYCFHp3Ss5xV2viZz6HZfUeFfXhrXg+x3L0eSLbg+OoFjOtgGtdkcfQetDrJF6nsahJM1/F85TgtXJh1DJehsCr+NieOx4lmPaxqX5LPNX1oc/TqTMP5xL9S7ZTCPmO7fGd+re99nmiNqpl54p5a2IrqZXVyjkgqoL7Na2bup67KemhQY3jZW+Nw7nSqN4fW11tBLqIX7iy6nMWLzndi/iRMte2N68o8Ux7cFwdrJqAmg1fW+GZmrXSdtsuaPki3h+c+dGj+Kh2O0ki7znml26qA/p47uVRNx5qYa+e2U6qX6Y6auJrDN9OdePx0jj0JlZtmfZmX/dD0qWw28VHDYOf9dbsT+Kbc7JWkqsv09Li2qprY+q0z2SCr6fLUlZLNnV0+C3xPr0TH9xhWGmT6CwdS6Qtu4DY3XcWL33fOqlLrDTjxzT51M7G/i6R/oYzlNP/VAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4Af+AyaEGmaVDg69AAAAAElFTkSuQmCC'
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
