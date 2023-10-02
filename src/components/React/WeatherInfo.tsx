import { useStore } from '@nanostores/react'
import { imperialUnit, weather } from '../../store/weatherStore'
import { useEffect, useState, useMemo } from 'react'
import type { HourType } from '../../types/types'

// Main Temperature and location
export const WeatherMainInfo = () => {
    const [temp, setTemp] = useState<number>(0)
    const $weather = useStore(weather)
    const $imperialUnit = useStore(imperialUnit)

    useEffect(() => {
        if ($weather) {
            setTemp($imperialUnit ? $weather?.current?.temp_f : $weather?.current?.temp_c)
        }
    }, [$imperialUnit, $weather]);

    if ($weather) {
        return (
            <div className="flex flex-col w-fit select-none drop-shadow-lg">
                <div className="flex_center items-start leading-none min-w-[200px]">
                    <span className='text-[5em] sm:text-[6em]'>
                        {temp?.toFixed().toString() || "--"}
                    </span>
                    <span className='text-[3em] sm:text-[4.5em]'>°{$imperialUnit ? "F" : "C"}</span>
                </div>
                <div className='flex_center flex-col'>
                    <span className='text-[1.8em]'>{$weather?.location?.name}</span>
                    <p>{$weather?.location?.region + ($weather?.location?.region && " , ")} {$weather?.location?.country}</p>
                </div>
            </div>
        )
    }
}

//Temperature related Info
export const TempDetails = () => {
    const $weather = useStore(weather)
    const $imperialUnit = useStore(imperialUnit)

    const feelsLike = useMemo(() => {
        return $imperialUnit
            ? $weather?.current.feelslike_f || "--"
            : $weather?.current.feelslike_c || "--";
    }, [$imperialUnit, $weather]);

    const maxTemp = useMemo(() => {
        return $imperialUnit
            ? $weather?.forecast.forecastday[0].day.maxtemp_f || "--"
            : $weather?.forecast.forecastday[0].day.maxtemp_c || "--";
    }, [$imperialUnit, $weather]);

    const minTemp = useMemo(() => {
        return $imperialUnit
            ? $weather?.forecast.forecastday[0].day.mintemp_f || "--"
            : $weather?.forecast.forecastday[0].day.mintemp_c || "--";
    }, [$imperialUnit, $weather]);

    if ($weather)
        return (
            <div className="flex gap-8 flex-col sm:flex-row drop-shadow-lg">
                <div className="flex_center flex-col p-1 rounded w-fit h-fit">
                    <span className='opacity-95'>Feels Like</span>
                    <span className='text-[1.5em]'>
                        {feelsLike + ($imperialUnit ? "°F" : "°C")}
                    </span>
                </div>
                <div className="flex_center flex-col p-1 rounded w-fit h-fit">
                    <span className='opacity-95'>Min Temp</span>
                    <span className='text-[1.5em]'>
                        {minTemp + ($imperialUnit ? "°F" : "°C")}
                    </span>
                </div>
                <div className="flex_center flex-col p-1 rounded w-fit h-fit">
                    <span className='opacity-95'>Max Temp</span>
                    <span className='text-[1.5em]'>
                        {maxTemp + ($imperialUnit ? "°F" : "°C")}
                    </span>
                </div>
            </div>
        )
}

// Misc Details Card
export const MiscInfo = () => {
    const $weather = useStore(weather)
    const [hourlyData, setHourlyData] = useState<HourType | null>(null)

    // const hourlyData = $weather?.forecast?.forecastday[0]?.hour[currHour]
    useEffect(() => {
        const currHour = new Date($weather?.location?.localtime as string)?.getHours()
        const data = $weather?.forecast?.forecastday[0]?.hour[currHour]

        if (data) {
            setHourlyData(data)
        }
    }, [$weather])

    return (
        <div className="flex flex-col gap-4 justify-evenly w-full h-full">
            <div className="flex justify-between w-full pb-1 sm:pb-2 border-b border-white/20">
                <span>Clouds</span>
                <span>{hourlyData?.cloud}%</span>
            </div>
            <div className="flex justify-between w-full pb-1 sm:pb-2 border-b border-white/20">
                <span>Humidity</span>
                <span>{hourlyData?.humidity}%</span>
            </div>
            <div className="flex justify-between w-full pb-1 sm:pb-2 border-b border-white/20">
                <span>Chance of Rain</span>
                <span>{hourlyData?.chance_of_rain}%</span>
            </div>
            <div className="flex justify-between w-full pb-1 sm:pb-2 border-b border-white/20">
                <span>UV Index</span>
                <span>{hourlyData?.uv}</span>
            </div>
            <div className="flex justify-between w-full pb-1 sm:pb-2 border-b border-white/20">
                <span>Visibility</span>
                <span>{hourlyData?.vis_km} km</span>
            </div>
            <div className="flex justify-between w-full">
                <span>Pressure</span>
                <span>{hourlyData?.pressure_mb} mb</span>
            </div>
        </div>
    )
}
