import React, { useState } from 'react'
import { appContext } from './appContext'

const StateContextApp = ({children}) => {
    const [fragances, setFragances] = useState([])
    const [filteredFragances, setFilteredFragances] = useState([])
    const [search, setSearch] = useState('')
    const [title, setTitle] = useState('Catálogo')

    const filterSearch = (searchValue) => {
        const filter = fragances.filter(fragance => fragance.nombre.includes(searchValue) || fragance.marca.includes(searchValue) || fragance.genero.includes(searchValue))
        if(filter.length === 0){ setTitle(`No se han encontrado productos`) }
        setFilteredFragances(filter)
    }

    const resetSearch = () => {
        setFilteredFragances(fragances)
        setSearch('')
        setTitle('Catálogo')
    }
    return(
        <appContext.Provider
            value={{fragances, setFragances, filteredFragances, setFilteredFragances, search, setSearch, title, setTitle, filterSearch, resetSearch}}
        >
            {children}
        </appContext.Provider>
    )
}

export default StateContextApp
