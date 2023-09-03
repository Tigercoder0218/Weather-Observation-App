import { toast } from "react-hot-toast"

interface LocationType {
    latitude: string,
    longitude: string,
}

const API_KEY = import.meta.env.PUBLIC_API_KEY as string
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`

export const FetchWeatherQuery = async (query: string) => {
    const URL_Params = new URLSearchParams({
        q: query,
        units: "metric",
        appid: API_KEY,
    })

    try {
        const res = await fetch(`${BASE_URL}?${URL_Params.toString()}`)
        const data = await res.json()
        console.log(data)
        if (data?.cod == 200) {
            const lat = data?.coord?.lat
            const lon = data?.coord?.lon
            FetchForecast(lat, lon)

            return data
        } else {
            toast.error("Invalid City name!")
            throw new Error("Invalid City name!");
        }
    } catch (err) {
        console.log("ERROR:", err)
    }
}

export const FetchWeatherPosition = async (pos: LocationType) => {
    const URL_Params = new URLSearchParams({
        lat: pos.latitude,
        lon: pos.longitude,
        units: "metric",
        appid: API_KEY,
    })

    try {
        const res = await fetch(`${BASE_URL}?${URL_Params.toString()}`)
        const data = await res.json()

        if (data?.cod == 200) {
            const lat = data?.coord?.lat
            const lon = data?.coord?.lon
            console.log("POS:", data)
            FetchForecast(lat, lon)

            return data
        } else {
            toast.error("Invalid Position coordinates!")
            throw new Error("Invalid Position coordinates!");
        }
    } catch (err) {
        console.log("ERROR:", err)
    }
}

const FetchForecast = async (lat: string, lon: string) => {
    const BASE_URL = `https://api.openweathermap.org/data/2.5/forecast`

    const URL_Params = new URLSearchParams({
        lat: lat,
        lon: lon,
        units: "metric",
        appid: API_KEY,
    })

    try {
        const res = await fetch(`${BASE_URL}?${URL_Params.toString()}`)
        const data = await res.json()

        console.log("Forecast:", data)
        if (data?.cod == 200) {
            return data
        } else {
            toast.error("Invalid Forecast coordinates!")
            throw new Error("Invalid Forecast coordinates!");
        }
    } catch (err) {
        console.log("ERROR:", err)
    }
}