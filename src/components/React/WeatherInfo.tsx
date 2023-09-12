import { useStore } from '@nanostores/react'
import { imperialUnit, weather } from '../../store/weatherStore'
import { useEffect, useState, useMemo } from 'react'

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
            <div className="flex flex-col w-fit select-none">
                <div className="flex_center items-start leading-none min-w-[200px]">
                    <span className='text-[6em]'>
                        {parseInt(temp?.toString()) || "--"}
                    </span>
                    <span className='text-[4.5em]'>°{$imperialUnit ? "F" : "C"}</span>
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
            <div className="flex gap-8 flex-col sm:flex-row">
                <div className="flex_center flex-col p-1 rounded w-fit h-fit">
                    <span className='opacity-80'>Feels Like</span>
                    <span className='text-[1.5em]'>
                        {feelsLike + ($imperialUnit ? "°F" : "°C")}
                    </span>
                </div>
                <div className="flex_center flex-col p-1 rounded w-fit h-fit">
                    <span className='opacity-80'>Min Temp</span>
                    <span className='text-[1.5em]'>
                        {minTemp + ($imperialUnit ? "°F" : "°C")}
                    </span>
                </div>
                <div className="flex_center flex-col p-1 rounded w-fit h-fit">
                    <span className='opacity-80'>Max Temp</span>
                    <span className='text-[1.5em]'>
                        {maxTemp + ($imperialUnit ? "°F" : "°C")}
                    </span>
                </div>
            </div>
        )
}
