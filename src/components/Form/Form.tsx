import {countries} from '../../data/db'
import styles from './Form.module.css'


export default function Form() {

  return (
    <form className={
        styles.form
    }>
        <div className={
            styles.field
        }>
            <label htmlFor="city">Ciudades: </label>
            <input type="text" name="city" id="city" />

            
        </div>

        <div className={
            styles.field
        }>
            <label htmlFor="country">País</label>
            <select>
                <option value="" disabled>-- Seleccione un país --</option>
                {   countries.map((country, index) => (
                    <option key={index} value={country.code}>{country.name}</option>
                    
                ))}
            </select>
        </div>

        <div>
            <input type="submit" value="Buscar Clima" />
        </div>
    </form>
  )
}
