import { useEffect, useState } from "preact/hooks"
import { useStore } from '@nanostores/preact'
import { weather } from '../../store/weatherStore'

const AirQuality = () => {
    const $weather = useStore(weather)
    const [aqi, setAqi] = useState<number>(0)

    const getColorCode = (value: number) => {
        if (value <= 50) {
            return "#00E400" //green
        } else if (value <= 100) {
            return "#FFFF00" //yellow
        } else if (value <= 150) {
            return "#FF7E00" //orange
        } else if (value <= 200) {
            return "#FF0000" //red
        } else if (value <= 300) {
            return "#8B008B" //purple
        } else {
            return "#800000" //maroon
        }
    }

    const getAirQuality = (value: number) => {
        if (value <= 50) {
            return "Good"
        } else if (value <= 100) {
            return "Moderate"
        } else if (value <= 150) {
            return "Caution"
        } else if (value <= 200) {
            return "Unhealthy"
        } else if (value <= 300) {
            return "Very unhealthy"
        } else {
            return "Hazardous"
        }
    }

    const getAirQualityMessage = (value: number) => {
        if (value <= 50) {
            return "Perfect  day for a Walk.";
        } else if (value <= 100) {
            return "Enjoy the outdoors!";
        } else if (value <= 150) {
            return "Consider limiting outdoor time.";
        } else if (value <= 200) {
            return "Avoid strenuous work.";
        } else if (value <= 300) {
            return "Stay indoors, close windows";
        } else {
            return "Stay indoors, use purifiers.";
        }
    }

    useEffect(() => {
        if (!$weather) return

        const pollutants = Object.entries($weather?.current?.air_quality).map(obj => {
            if (obj[0] == "co") {
                // this API gives co values in 3 digit number so reducing to 2 digit
                return obj[1] / 10
            } else {
                return obj[1]
            }
        })
        const HighestPollutant = pollutants.reduce((acc, curr) => {
            return Math.max(acc, curr)
        }, 0)

        setAqi(HighestPollutant)
    }, [$weather])

    return (
        <div className="sm:h-full" >
            <div className="flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    fill="#fff"
                    stroke="#fff"
                    strokeWidth="0"
                    viewBox="0 0 16 16"
                >
                    <path d="M15.802 2.102C14.072.791 11.409.008 8.678.008c-3.377 0-6.129 1.179-7.549 3.235C.462 4.208.093 5.352.032 6.641c-.054 1.148.139 2.418.573 3.784C2.087 5.981 6.227 2.502 11 2.502c0 0-4.466 1.175-7.274 4.816A10.535 10.535 0 002.2 10.037 15.387 15.387 0 001 16.002h2s-.304-1.91.224-4.106a17.71 17.71 0 002.357.177c1.839 0 3.146-.398 4.115-1.252.868-.765 1.347-1.794 1.854-2.882.774-1.663 1.651-3.547 4.198-5.002a.5.5 0 00.054-.833z"></path>
                </svg>
                Air Quality Index
            </div>

            <div className="flex flex-col lg:flex-row md:gap-4 sm:gap-12">
                <div className="flex items-center gap-2">
                    <span style={{ color: getColorCode(aqi) }} className='text-[2.5em]'>{aqi.toFixed()}</span>

                    <div className="flex flex-col sm:whitespace-nowrap w-full">
                        <span style={{ color: getColorCode(aqi) }} className='text-[1.2em] xl:text-[1.4em]'>{getAirQuality(aqi)}</span>
                        <p className='text-[0.75em] xl:text-[0.9em]'>{getAirQualityMessage(aqi)}</p>
                    </div>
                </div>

                <div className="flex justify-around gap-2 sm:w-full pt-1 sm:pt-0 border-t border-white/20 sm:border-none">
                    <div className="flex_center flex-col">
                        <span style={{ color: getColorCode($weather?.current?.air_quality?.pm2_5 || 0) }} className='text-[1.1em] xl:text-[1.5em]'>
                            {$weather?.current?.air_quality?.pm2_5}
                        </span>
                        <span className='text-[0.7em] sm:text-[0.9em]'>PM2.5</span>
                    </div>

                    <div className="flex_center flex-col">
                        <span style={{ color: getColorCode($weather?.current?.air_quality?.pm10 || 0) }} className='text-[1.1em] xl:text-[1.5em]'>
                            {$weather?.current?.air_quality?.pm10}
                        </span>
                        <span className='text-[0.7em] sm:text-[0.9em]'>PM10</span>
                    </div>
                    <div className="flex_center flex-col">
                        <span style={{ color: getColorCode($weather?.current?.air_quality?.so2 || 0) }} className='text-[1.1em] xl:text-[1.5em]'>
                            {$weather?.current?.air_quality?.so2}
                        </span>
                        <span className='text-[0.7em] sm:text-[0.9em]'>SO2</span>
                    </div>
                    <div className="flex_center flex-col">
                        <span style={{ color: getColorCode($weather?.current?.air_quality?.no2 || 0) }} className='text-[1.1em] xl:text-[1.5em]'>
                            {$weather?.current?.air_quality?.no2}
                        </span>
                        <span className='text-[0.7em] sm:text-[0.9em]'>NO2</span>
                    </div>
                    <div className="flex_center flex-col">
                        <span style={{ color: getColorCode($weather?.current?.air_quality?.o3 || 0) }} className='text-[1.1em] xl:text-[1.5em]'>
                            {$weather?.current?.air_quality?.o3}
                        </span>
                        <span className='text-[0.7em] sm:text-[0.9em]'>O3</span>
                    </div>
                    <div className="flex_center flex-col">
                        <span style={{ color: getColorCode(($weather?.current?.air_quality?.co || 0) / 10) }} className='text-[1.1em] xl:text-[1.5em]'>
                            {($weather?.current?.air_quality?.co ? ($weather?.current?.air_quality?.co / 10).toFixed() : '0')}
                        </span>
                        <span className='text-[0.7em] sm:text-[0.9em]'>CO</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AirQuality