import { useContext } from 'react'
import './GridCards.css'
import CardItemPlaceholder from '../components/CardItemPlaceholder'
import LoadingSpinner from '../components/LoadingSpinner'
import { appContext } from '../context/appContext'
import Card from './Card'

const GridCards = ({ cardsToMap }) => {
  const {  isLoading } = useContext(appContext)

    return(
        <div className='content-group'>
        {isLoading &&
          <div className='loading-container'>
            < LoadingSpinner />
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
        {cardsToMap &&
          cardsToMap?.map(fragance => (
            < Card key={fragance.id} id={fragance.id} marca={fragance.marca} nombre={fragance.nombre} foto={fragance.foto} capacidad={fragance.capacidad} precio={fragance.precio} estado={fragance.estado} precioSinDesc={fragance.precioSinDesc} desc={fragance.desc} genero={fragance.genero} />
          ))
        }
      </div>
    )
}

export default GridCards