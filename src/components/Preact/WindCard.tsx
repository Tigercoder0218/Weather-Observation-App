import { Fragment } from 'preact'
import { useMemo } from 'preact/hooks'
import { useStore } from '@nanostores/preact'
import { imperialUnit, weather } from '../../store/weatherStore'
import { ArrowSVG, CompassSVG, WindSVG } from '../../assets'

const WindCard = () => {
    const $weather = useStore(weather) || null
    const $imperialUnit = useStore(imperialUnit)
    const isClient = typeof window !== 'undefined';

    const windSpeed = useMemo(() => {
        if (!isClient) return;

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
        NNE: "North #(North-East)",
        NNW: "North #(North-West)",
        SSE: "South #(South-East)",
        SSW: "South #(South-West)",
        ENE: "East #(North-East)",
        ESE: "East #(South-East)",
        WNW: "West #(North-West)",
        WSW: "West #(South-West)",
    } // "#" is just used as a split() identifier

    if (isClient && $weather)
        return (
            <div className="flex_center flex-col justify-between gap-4 h-full max-w-[120px] sm:min-w-[150px]">
                <div className="relative flex_center sm:p-1">
                    <img src={CompassSVG?.src} alt="Compass_Icon" width="100%" height="100%" draggable={false} />
                    <img
                        src={ArrowSVG?.src}
                        alt="Arrow_Icon"
                        className='absolute animate-wind w-[18px] sm:w-[22px]'
                        draggable={false}
                        style={{ rotate: $weather?.current?.wind_degree?.toString() + "deg" }}
                    />
                </div>

                <div className="flex flex-col gap-4 w-full">
                    <div className="flex_center gap-2">
                        <img src={WindSVG?.src} alt="WindSVG" width={30} height={30} />
                        <div className='flex_center gap-1'>
                            <span className='sm:text-[1.5em]'>{windSpeed?.toFixed()}</span>
                            <span className='text-[0.8em] sm:text-[1em] opacity-95'>{$imperialUnit ? " mph" : " km/h"}</span>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-[0.8em] sm:text-[1em] opacity-95'>Wind direction :</span>
                        <span className='text-[1em] sm:text-[1.3em]'>
                            {windDir[$weather?.current?.wind_dir || "N"].split("#")?.map((dir, index) => (
                                // If Wind direction has 2 words, break it into next line for mobile view
                                <Fragment key={index}>
                                    {index > 0 && <br />}
                                    {dir}
                                </Fragment>
                            ))}
                        </span>
                        {/* <span className='hidden sm:block text-[1em] sm:text-[1.3em]'>
                            {windDir[$weather?.current?.wind_dir || "N"].replace("#", "")}
                        </span> */}
                    </div>
                </div>
            </div>
        )
}

export default WindCard