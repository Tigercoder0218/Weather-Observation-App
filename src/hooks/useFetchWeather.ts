export const FetchWeather = async (query: string) => {
    // const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
    const API_KEY = import.meta.env.PUBLIC_API_KEY as string
    const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`

    const URL_Params = new URLSearchParams({
        q: query,
        appid: API_KEY,
    })

    const res = await fetch(`${BASE_URL}?${URL_Params.toString()}`)
    const data = await res.json()
    // console.log(data)
    return data
}