import {countries} from '../../data/db'
import styles from './Form.module.css'
import { ChangeEvent, useState } from 'react'
import { SearchType } from '../../types'
import Alert from '../Alert/Alert'


type Props = {
    fetchWeather: (search: SearchType) => Promise<void>;
}




export default function Form({fetchWeather}: Props) {

    const [search, setSearch] = useState<SearchType>({
        city: '',
        country: ''
    })

  


    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    }   

    const [alert,setAlert] = useState<string>('')


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(Object.values(search).includes('')){
            setAlert("Todos los campos son obligatorios")
            
            return
        }
        fetchWeather(search);
    }
  return (
    <form className={
        styles.form
    }
    onSubmit={handleSubmit}
    >
        <div className={
            styles.field
        }>
            <label htmlFor="city">Ciudades: </label>
            <input type="text" 
            name="city" id="city"
            placeholder="Ej. Ciudad de México"
            defaultValue={search.city}
            onChange={handleChange} 
        
            />

            
        </div>

        <div className={
            styles.field
        }>
            <label htmlFor="country">País</label>
            <select
                defaultValue={search.country}
                name="country" id="country"
                onChange={handleChange}
            >
                <option value="" >---Seleccione un país --</option>
                {   countries.map((country, index) => (
                    <option key={index} value={country.code}>{country.name}</option>
                    
                ))}
            </select>
        </div>

        <div>

            
            <input className={
                styles.btn
            }

         
            type="submit" value="Buscar Clima" />
        </div>
        {alert && <Alert>
          {alert}
        </Alert> }
    </form>
    


    
  )
}
