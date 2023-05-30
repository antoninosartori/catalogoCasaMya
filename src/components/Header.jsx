import React, { useContext } from 'react'
import './Header.css'
import { appContext } from '../context/appContext'
import { Link } from 'react-router-dom'

// assets
import cartImg from '../assets/cart.svg'
// componentes
import Card from './Card'

const Header = ({ children, checkoutHeader }) => {
    const { search, setSearch, setTitle, filterSearch, resetSearch, cart, openCart, setOpenCart, calculateTotal } = useContext(appContext)

    const onChangeSearch = (event) => {
        setOpenCart(false)
        window.scrollTo(0, 0)
        const value = event.target.value.toLowerCase()
        setSearch(value)
        filterSearch(value)
        setTitle(value === '' ? 'Catálogo' : 'Resultados de la búsqueda')
    }

    let cartContainerClassName = openCart ? 'cart-products' : 'cart-products inactive'

    const handlCart = () => {
        if (cart.length === 0) {
            return setOpenCart(false)
        }
        setOpenCart(!openCart)
    }

    return (
        <header>
            <nav>
                <h1>
                    <Link onClick={() => { setOpenCart(false); scrollTo(0, 0) }} to='/'>Casa Mya</Link>
                </h1>
                <h2>articulos de limpieza - perfumería</h2>
                {!checkoutHeader &&
                    <div className='header-row'>
                        <form className='formSearch-header'>
                            <input onChange={onChangeSearch} type="text" placeholder='buscar fragancia' value={search} />
                            <button onClick={resetSearch} className='closeButton'>X</button>
                        </form>
                        <div className='cart-container'>
                            <img onClick={handlCart} className='cartHeader-image' src={cartImg} alt="carrito de compras" />
                            {cart.length > 0 && <div className='cart-amount' >{cart.length}</div>}
                        </div>
                    </div>
                }
            </nav>
            <aside className={cartContainerClassName}>
                <h2>Mi compra</h2>
                <div className='cart-cards'>
                    {cart && cart.map(product => (
                        < Card isInCart key={product.id} id={product.id} marca={product.marca} nombre={product.nombre} foto={product.foto} capacidad={product.capacidad} precio={product.precio} estado={product.estado} precioSinDesc={product.precioSinDesc} desc={product.desc} />
                    ))}
                    <h3 className='total-cart'>Total: ${calculateTotal()}</h3>
                    <Link onClick={() => setOpenCart(false)} to='/checkout' className='contactForm-sendButton cart-button'>iniciar compra</Link>
                    <button onClick={() => setOpenCart(false)} className='closeButton'>cerrar</button>
                </div>
            </aside>
        </header>
    )
}

export default Header