import { useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
// componentes
import Header from './components/Header'
import Footer from './components/Footer'
// constantes
import { URL_API } from './consts/const'
// contexto
import { appContext } from './context/appContext'
// paginas
import HomePage from './pages/HomePage'
import Checkout from './pages/Checkout'
import CompleteBuy from './pages/CompleteBuy'


function App() {
  const {  setFragances, setFilteredFragances, setIsLoading, setError } = useContext(appContext)

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
      {/* < Header /> */}

      <Routes>
        < Route path='/' element={ < HomePage /> } />
        < Route path='/checkout' element={ < Checkout /> } />
        < Route path='/buy' element={ < CompleteBuy /> } />
      </Routes>

      < Footer />
    </>
  )
}

export default App
