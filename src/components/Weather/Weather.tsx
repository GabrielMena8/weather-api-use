
import type {Weather } from '../../Hooks/useWeather'
import styles from './Weather.module.css'


type WeatherProps = {
    weather: Weather
}

export default function Weather({weather}: WeatherProps) {
    const toCelsius = (kelvin: number) => Math.round(kelvin - 273.15) > 0 ? Math.round(kelvin - 273.15) : 0;

  return (
    <div className={
        styles.container
    }>
        
        <h2 className={styles.name}
        >{weather.name}</h2>
        <p className={styles.temp}
        >Temp:<span> {toCelsius(weather.main.temp)} °</span></p>
        <p className={
            styles.min_temp
        }>Temp Min: <span> {toCelsius(weather.main.temp_min)}°</span></p>
        <p className={
            styles.max_temp
        }
        >Temp Max: <span>{toCelsius(weather.main.temp_max)}°</span></p>
    </div>
  )
}
