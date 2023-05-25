import React, { useContext } from 'react'
import './Header.css'
import { appContext } from '../context/appContext'

const Header = () => {
    const { search, setSearch, setTitle, filterSearch, resetSearch} = useContext(appContext)
    const onChangeSearch = (event) => {
        window.scrollTo( 0,0 )
        const value = event.target.value.toLowerCase()
        setSearch(value)
        filterSearch(value)
        setTitle(value === '' ? 'Catálogo' : 'Resultados de la búsqueda')
      }


    return(
        <header>
            <nav>
                <h1>Casa Mya</h1>
                <h2>articulos de limpieza - perfumería</h2>
                <form className='formSearch-header'>
                    <input onChange={onChangeSearch} type="text" placeholder='buscar fragancia' value={search} />
                    <span onClick={resetSearch} className='resetSearch'>X</span>
                </form>
            </nav>
        </header>
    )
}

export default Header