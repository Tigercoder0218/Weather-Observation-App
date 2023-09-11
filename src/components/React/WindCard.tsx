import { useStore } from '@nanostores/react'
import { imperialUnit, weather } from '../../store/weatherStore'
import { ArrowSVG, CompassSVG, WindSVG } from '../../assets'
import { useMemo } from 'react'

const WindCard = () => {
    const $weather = useStore(weather)
    const $imperialUnit = useStore(imperialUnit)

    const windSpeed = useMemo(() => {
        const minWind = $imperialUnit ? $weather?.current?.wind_mph : $weather?.current?.wind_kph
        // const maxWind = $imperialUnit ? $weather?.current?.gust_mph : $weather?.current?.gust_kph

        // return `${minWind}/${maxWind}`
        return minWind
    }, [$imperialUnit, $weather])

    const windDir: { [key: string]: string } = {
        N: "North",
        S: "South",
        E: "East",
        W: "West",
        NE: "North-East",
        NW: "North-West",
        SE: "South-East",
        SW: "South-West",
        NNE: "North/North-East",
        NNW: "North/North-West",
        SSE: "South/South-East",
        SSW: "South/South-West",
        ENE: "East/North-East",
        ESE: "East/South-East",
        WNW: "West/North-West",
        WSW: "West/South-West",
    }

    return (
        <div className="flex_center flex-col gap-4 w-[100px] sm:w-[200px]">
            <div className="relative flex_center">
                <img src={CompassSVG.src} alt="Arrow_Icon" width={100} height={100} draggable={false} />
                <img
                    src={ArrowSVG.src}
                    alt="Arrow_Icon"
                    width={15}
                    className='absolute'
                    draggable={false}
                    style={{ rotate: $weather?.current?.wind_degree.toString() + "deg" }}
                />
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                    <img src={WindSVG.src} alt="WindSVG" width={30} height={30} />
                    <div className='sm:min-w-[110px]'>
                        <span className='sm:text-[1.5em]'>{windSpeed}</span>
                        <span className='text-[0.8em] sm:text-[1em] opacity-80'>{$imperialUnit ? " mph" : " km/h"}</span>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className='text-[0.8em] sm:text-[1em] opacity-80'>Wind from</span>
                    <span className='text-[1.1em] sm:text-[1.3em] self-end'>{windDir[$weather?.current?.wind_dir || "N"]}</span>
                </div>
            </div>
        </div>
    )
}

export default WindCard