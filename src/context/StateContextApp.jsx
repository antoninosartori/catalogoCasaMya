import React, { useState } from 'react'
import { appContext } from './appContext'

const StateContextApp = ({children}) => {
    const [fragances, setFragances] = useState([])
    const [filteredFragances, setFilteredFragances] = useState([])
    const [search, setSearch] = useState('')
    const [title, setTitle] = useState('Catálogo')
    const [cart, setCart ] = useState([])
    const [ openCart, setOpenCart] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const filterSearch = (searchValue) => {
        /* if(searchValue === '') {
            setFilteredFragances(fragances.filter(prod => !prod.esEncargable))
        } */
        const filter = fragances.filter(fragance => fragance.nombre.includes(searchValue) || fragance.marca.includes(searchValue) || fragance.genero.includes(searchValue))
        if(filter.length === 0){ 
            setTitle(`No se han encontrado productos`) 
        }
        setFilteredFragances(filter)
    }

    const resetSearch = (event) => {
        event.preventDefault()
        setFilteredFragances(fragances.filter(prod => !prod.esEncargable))
        setSearch('')
        setTitle('Catálogo')
    }

    const calculateTotal = () => {
        const totalPrice = cart.reduce((total, item) => total + Number(item.precio), 0);
        /* return totalPrice.toFixed(2) */ // Redondear a 2 decimales si es necesario
        return totalPrice
      };

    return(
        <appContext.Provider
            value={{
                fragances, 
                setFragances, 
                filteredFragances, 
                setFilteredFragances, 
                search, 
                setSearch, 
                title, 
                setTitle, 
                filterSearch, 
                resetSearch, 
                cart, 
                setCart, 
                openCart, 
                setOpenCart, 
                isLoading, 
                setIsLoading, 
                error, 
                setError, 
                calculateTotal}}
        >
            {children}
        </appContext.Provider>
    )
}

export default StateContextApp
