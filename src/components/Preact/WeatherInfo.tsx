import { useStore } from '@nanostores/preact'
import { imperialUnit, weather } from '../../store/weatherStore'
import { useEffect, useState, useMemo } from 'preact/hooks'
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
                    <p className="max-w-[200px] text-center">{$weather?.location?.region + ($weather?.location?.region && " , ")} {$weather?.location?.country}</p>
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
            <div className="flex gap-8 flex-col lg:flex-row drop-shadow-lg">
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
    const $imperialUnit = useStore(imperialUnit)
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
                <div className="flex_center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="white"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path d="M17.5 19H9a7 7 0 116.71-9h1.79a4.5 4.5 0 110 9z"></path>
                    </svg>
                    <span>Clouds</span>
                </div>

                <span>{hourlyData?.cloud}%</span>
            </div>
            <div className="flex justify-between w-full pb-1 sm:pb-2 border-b border-white/20">
                <div className="flex_center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 384 512"
                    >
                        <path d="M192 512C86 512 0 426 0 320 0 228.8 130.2 57.7 166.6 11.7c6-7.5 14.9-11.7 24.5-11.7h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112 8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"></path>
                    </svg>
                    <span>Humidity</span>
                </div>

                <span>{hourlyData?.humidity}%</span>
            </div>
            <div className="flex justify-between w-full pb-1 sm:pb-2 border-b border-white/20">
                <div className="flex_center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                    >
                        <path d="M15.86 18l-3.153-3.153a1 1 0 00-1.414 0L8.18 17.96A8.001 8.001 0 1115.98 6.087 6 6 0 1117 18h-1.139zm-5.628.732L12 16.965l1.768 1.767a2.5 2.5 0 11-3.536 0z"></path>
                    </svg>
                    <span>Chance of Rain</span>
                </div>

                <span>{hourlyData?.chance_of_rain}%</span>
            </div>
            <div className="flex justify-between w-full pb-1 sm:pb-2 border-b border-white/20">
                <div className="flex_center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 16 16"
                    >
                        <path d="M8 12a4 4 0 100-8 4 4 0 000 8zM8 0a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2A.5.5 0 018 0zm0 13a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2A.5.5 0 018 13zm8-5a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2a.5.5 0 01.5.5zM3 8a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2A.5.5 0 013 8zm10.657-5.657a.5.5 0 010 .707l-1.414 1.415a.5.5 0 11-.707-.708l1.414-1.414a.5.5 0 01.707 0zm-9.193 9.193a.5.5 0 010 .707L3.05 13.657a.5.5 0 01-.707-.707l1.414-1.414a.5.5 0 01.707 0zm9.193 2.121a.5.5 0 01-.707 0l-1.414-1.414a.5.5 0 01.707-.707l1.414 1.414a.5.5 0 010 .707zM4.464 4.465a.5.5 0 01-.707 0L2.343 3.05a.5.5 0 11.707-.707l1.414 1.414a.5.5 0 010 .708z"></path>
                    </svg>
                    <span>UV Index</span>
                </div>

                <span>{hourlyData?.uv}</span>
            </div>
            <div className="flex justify-between w-full pb-1 sm:pb-2 border-b border-white/20">
                <div className="flex_center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 16 16"
                    >
                        <path d="M8 3C4.511 3 1.486 5.032 0 8c1.486 2.968 4.511 5 8 5s6.514-2.032 8-5c-1.486-2.968-4.511-5-8-5zm3.945 2.652c.94.6 1.737 1.403 2.335 2.348a7.594 7.594 0 01-2.335 2.348 7.326 7.326 0 01-7.889 0A7.615 7.615 0 011.721 8a7.594 7.594 0 012.52-2.462 4 4 0 107.518 0c.062.037.124.075.185.114v0zM8 6.5a1.5 1.5 0 11-3.001-.001A1.5 1.5 0 018 6.5z"></path>
                    </svg>
                    <span>Visibility</span>
                </div>

                <span>{$imperialUnit ? `${hourlyData?.vis_miles} mi` : `${hourlyData?.vis_km} km`}</span>
            </div>
            <div className="flex justify-between w-full">
                <div className="flex_center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 4C6.486 4 2 8.486 2 14a9.89 9.89 0 001.051 4.445c.17.34.516.555.895.555h16.107c.379 0 .726-.215.896-.555A9.89 9.89 0 0022 14c0-5.514-4.486-10-10-10zm5.022 5.022L13.06 15.06a1.53 1.53 0 01-2.121.44 1.53 1.53 0 010-2.561l6.038-3.962a.033.033 0 01.045.01.034.034 0 010 .035z"></path>
                    </svg>
                    <span>Pressure</span>
                </div>

                <span>{$imperialUnit ? `${hourlyData?.pressure_in} in` : `${hourlyData?.pressure_mb} mb`}</span>
            </div>
        </div>
    )
}
