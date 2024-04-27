import axios from 'axios';
import { z} from 'zod';
import  { SearchType } from '../types';
import { useMemo, useState } from 'react';





const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_min: z.number(),
        temp_max: z.number(),
    }),


})
export type Weather = z.infer <typeof Weather>;


const initialWeather: Weather = {
    name: '',
    main: {
        temp: 0,
        temp_min: 0,
        temp_max: 0
    }
}


export default function useWeather() {

    const [weather, setWeather] = useState<Weather>(initialWeather)    
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

     const fetchWeather = async(search:SearchType) => {
        const Key = import.meta.env.VITE_API_KEY;
        setLoading(true)
        setWeather(initialWeather)



        try{
            const url = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${Key}`
            
            const {data}= await axios(url)

            if(!data[0] || !data[0].lat || !data[0].lon ){
                setError('City not found')
                return
            }
            const lat = data[0].lat
            const lon = data[0].lon



            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Key}`
            

            //Type guard
            if(!Key) throw new Error('API Key not found')
            const {data: weatherResult} = await axios(weatherUrl)
            const result = Weather.safeParse(weatherResult);
            if(!result.success){
                throw new Error('Error fetching weather')
            }
           
            
            setWeather(result.data)

            
        }
        catch(error){
            console.error(error)
        } finally {
            setTimeout(() => {
            setLoading(false)
        }), 10000}
        
        

    
    }
    const hasData = useMemo(() => weather.name, [weather])

    return { weather,loading, hasData, error,
        fetchWeather }
}




