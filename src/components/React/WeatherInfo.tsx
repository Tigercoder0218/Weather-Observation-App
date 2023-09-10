import { useStore } from '@nanostores/react'
import { imperialUnit, weather } from '../../store/weatherStore'
import { useEffect, useState } from 'react'
import moment from "moment-timezone"

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
                <div className="flex_center items-start leading-none">
                    <span className='text-[6em]'>
                        {parseInt(temp?.toString()) || "undefined"}
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

    return (
        <div className="flex gap-8 flex-col sm:flex-row">
            <div className="flex_center flex-col p-1 rounded w-fit h-fit">
                <span className='opacity-80'>Feels Like</span>
                <span className='text-[1.5em]'>
                    {$imperialUnit ?
                        ($weather?.current.feelslike_f + "°F")
                        : ($weather?.current.feelslike_c + "°C")
                    }
                </span>
            </div>
            <div className="flex_center flex-col p-1 rounded w-fit h-fit">
                <span className='opacity-80'>Max Temp</span>
                <span className='text-[1.5em]'>
                    {$imperialUnit ?
                        ($weather?.forecast.forecastday[0].day.maxtemp_f + "°F")
                        : ($weather?.forecast.forecastday[0].day.maxtemp_c + "°C")
                    }
                </span>
            </div>
            <div className="flex_center flex-col p-1 rounded w-fit h-fit">
                <span className='opacity-80'>Min Temp</span>
                <span className='text-[1.5em]'>
                    {$imperialUnit ?
                        ($weather?.forecast.forecastday[0].day.mintemp_f + "°F")
                        : ($weather?.forecast.forecastday[0].day.mintemp_c + "°C")
                    }
                </span>
            </div>
        </div>
    )
}

//Formatted Time and Date
export const TimeInfo = () => {
    const [time, setTime] = useState<string>("")
    const $weather = useStore(weather)

    useEffect(() => {
        if ($weather) {
            const TimeLoop = setInterval(() => {
                const formattedTime = moment().tz($weather?.location?.tz_id).format("LTS");
                setTime(formattedTime);
            }, 1000);

            return () => clearInterval(TimeLoop);
        }
    }, [$weather]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center text-center">
            <div className="flex flex-col items-start">
                <span className='tracking-widest opacity-80 capitalize'>Today</span>
                <span className='text-[1.8em]'>{moment().format("Do MMMM YYYY")}</span>
            </div>

            <div className="flex flex-col items-end leading-none">
                <span className='text-[3em] tracking-wider relative'>{time}</span>
                <span className="px-1.5 tracking-widest opacity-80 capitalize">{$weather?.location?.tz_id || "undefined"}</span>
            </div>
        </div>
    )
}