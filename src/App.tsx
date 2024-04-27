
import styles from './App.module.css'
import './spinner.css'
import useWeather from './Hooks/useWeather'
import Form from './components/Form/Form'
import { SearchType } from './types'
import Weather from './components/Weather/Weather'

function App() {
 
 const {fetchWeather, weather, loading, hasData, error} = useWeather()
 
  return (
    <>
      <h1 className={
        styles.title
      }>Clima</h1>

      <div className={
        styles.container
      }>
        <Form
          fetchWeather={fetchWeather as (search: SearchType) => Promise<void>}
        />

        {loading && <div className="sk-circle">
                      <div className="sk-circle1 sk-child"></div>
                      <div className="sk-circle2 sk-child"></div>
                      <div className="sk-circle3 sk-child"></div>
                      <div className="sk-circle4 sk-child"></div>
                      <div className="sk-circle5 sk-child"></div>
                      <div className="sk-circle6 sk-child"></div>
                      <div className="sk-circle7 sk-child"></div>
                      <div className="sk-circle8 sk-child"></div>
                      <div className="sk-circle9 sk-child"></div>
                      <div className="sk-circle10 sk-child"></div>
                      <div className="sk-circle11 sk-child"></div>
                      <div className="sk-circle12 sk-child"></div>
                    </div>}

        {error && <p className={
          styles.errors
        }>{error}</p>}
        {hasData && <Weather weather={weather} />}

        
        
      </div>
      

    </>
  )
}

export default App
