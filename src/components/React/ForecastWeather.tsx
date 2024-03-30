import { useStore } from '@nanostores/preact'
import { imperialUnit, weather } from '../../store/weatherStore'
import { WeatherIcons } from '../../assets/icons'
import { getIconCode } from '../../hooks/useIconCode'
import { DateTime } from 'luxon';

const ForecastWeather = () => {
    const $forecast = useStore(weather) || null
    const isClient = typeof window !== 'undefined';
    const $imperialUnit = useStore(imperialUnit)

    if (isClient && $forecast !== null)
        return (
            <div className="">
                <div className="flex items-center gap-2 text-[1em] sm:text-[1.4em] tracking-wider opacity-85">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-7 sm:h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                    <span>2 Days Forecast</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-2">
                    {$forecast?.forecast?.forecastday?.map((obj, index) => {
                        const code = obj?.day?.condition?.code
                        const iconCode = getIconCode(code)

                        if (index !== 0)
                            return <div key={index} className="p-2 border border-white/40 rounded h-fit">
                                <div className="flex justify-between px-2">
                                    <span>{index == 1 ? "Tomorrow" : "Overmorrow"}</span>
                                    <span>{DateTime.fromFormat(`${obj.date}`, 'yyyy-MM-dd')?.toFormat('dd LLL yyyy')}</span>
                                </div>

                                <div className="flex_center gap-8 sm:gap-12 h-full">
                                    <div className="sm:min-w-[250px] h-full flex_center flex-col sm:flex-row sm:gap-4 leading-tight pt-1">
                                        <img
                                            src={WeatherIcons[iconCode || "default"]?.src}
                                            width={100}
                                            height={100}
                                            alt="Weather_Icon" />

                                        <div className='flex_center flex-col gap-1'>
                                            <span className='text-[0.8em] sm:text-[1.1em] opacity-95'>Avg Temp</span>
                                            <div className="flex_center items-start leading-none">
                                                <span className='text-[2.5em] sm:text-[3em]'>
                                                    {$imperialUnit ? obj?.day?.avgtemp_f.toFixed() : obj?.day?.avgtemp_c.toFixed()}
                                                </span>
                                                <span className='text-[1.5em] sm:text-[2.25em]'>°{$imperialUnit ? "F" : "C"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-evenly self-end gap-2 w-full h-full text-[0.8em] sm:text-[1em] sm:pt-4">
                                        <div className="flex justify-between w-full pb-1 sm:pb-2 border-b border-white/20">
                                            <span>Humidity</span>
                                            <span>{obj?.day?.avghumidity}%</span>
                                        </div>
                                        <div className="flex justify-between w-full pb-1 sm:pb-2 border-b border-white/20">
                                            <span>Chance of Rain</span>
                                            <span>{obj?.day?.daily_chance_of_rain}%</span>
                                        </div>
                                        <div className="flex justify-between w-full pb-1 sm:pb-2 border-b border-white/20">
                                            <span>Sunrise</span>
                                            <span>{obj?.astro?.sunrise}</span>
                                        </div>
                                        <div className="flex justify-between w-full">
                                            <span>Sunset</span>
                                            <span>{obj?.astro?.sunset}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                    )}
                </div>
            </div>
        )
}

export default ForecastWeather