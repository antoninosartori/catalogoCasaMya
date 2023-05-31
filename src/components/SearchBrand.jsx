import { useContext, useState } from 'react'
import './SearchBrand.css'
import { Link } from 'react-router-dom'
import { appContext } from '../context/appContext'
import BrandPlaceholder from './BrandPlaceholder'
import { brandsImages } from '../consts/const'

const SearchBrand = ({ toOrderButton }) => {
    const { fragances, setFilteredFragances, setSearch, setTitle, filterSearch, resetSearch } = useContext(appContext)
    const [isBrandImageLoaded, setIsBrandImageLoaded] = useState(false)
    const classNameBrandImage = isBrandImageLoaded ? 'brand-image' : 'inactive'

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

    return (
        <section className='formSearch-container'>
            {toOrderButton &&
                <div className='order-container'>
                    <Link className='contactForm-sendButton' to='/encargar'>quiero encargar</Link>
                </div>
            }
            <form>
                <div className='filters-container'>
                    <button onClick={handleAllFragance} className='filter-button'>todas</button>
                    <button onClick={handleChangeFragance} value='hombre' className='filter-button'>fragancias masculinas</button>
                    <button onClick={handleChangeFragance} value='mujer' className='filter-button'>fragancias femeninas</button>
                </div>
            </form>
            <div className='brands-container'>
                {!isBrandImageLoaded && < BrandPlaceholder />}
                <div onClick={resetSearch} className='allBrandsHTML-container'>
                    <p>todas las marcas</p>
                </div>
                {brandsImages.map(brand => (
                    <img onLoad={() => { setIsBrandImageLoaded(true) }} onClick={chooseBrand} className={classNameBrandImage} key={brand.name} src={brand.imagePath} alt={brand.name} value={brand.name} />
                ))}
            </div>
        </section>
    )
}

export default SearchBrand