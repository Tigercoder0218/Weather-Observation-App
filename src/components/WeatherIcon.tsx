import { WeatherIcons } from '../assets'
import { weather } from '../store/weatherStore'
import { useStore } from '@nanostores/react'

const WeatherIcon = () => {
    const $weather = useStore(weather)

    return (
        <img
            src={WeatherIcons[$weather?.weather[0].icon || "default"]}
            alt="BG_Img"
            width="200px"
            height="200px"
            className="" />
    )
}

export default WeatherIcon