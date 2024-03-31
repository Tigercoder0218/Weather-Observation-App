import { toastData } from "../store/weatherStore"

interface LocationType {
    latitude: string,
    longitude: string,
}

const API_KEY = import.meta.env.PUBLIC_API_KEY as string
const BASE_URL = `https://api.weatherapi.com/v1/forecast.json`

export const FetchWeatherQuery = async (query: string) => {
    const URL_Params = new URLSearchParams({
        key: API_KEY,
        q: query,
        days: "3",
        aqi: "yes",
        alerts: "no"
    })

    try {
        const res = await fetch(`${BASE_URL}?${URL_Params.toString()}`)
        const data = await res.json()
        // console.log("Fetch:", data)

        if (!data.error) {
            return data
        } else {
            toastData.set({
                status: "error",
                message: "Invalid City name!"
            })
            throw new Error("Invalid City name!");
        }
    } catch (err) {
        console.log("ERROR:", err)
    }
}

export const FetchWeatherPosition = async (pos: LocationType) => {
    const URL_Params = new URLSearchParams({
        key: API_KEY,
        q: `${pos.latitude},${pos.longitude}`,
        days: "3",
        aqi: "yes",
        alerts: "no"
    })

    try {
        const res = await fetch(`${BASE_URL}?${URL_Params.toString()}`)
        const data = await res.json()
        // console.log("GEO:", data)

        if (!data.error) {
            return data
        } else {
            toastData.set({
                status: "error",
                message: "Invalid Position coordinates!"
            })
            throw new Error("Invalid Position coordinates!");
        }
    } catch (err) {
        console.log("ERROR:", err)
    }
}