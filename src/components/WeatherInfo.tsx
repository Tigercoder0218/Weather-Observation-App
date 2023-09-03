import { useStore } from '@nanostores/react'
import { weather } from '../store/weatherStore'

const UNIT = "C"

export const WeatherMain = () => {
    const $weather = useStore(weather)

    if ($weather)
        return (
            <div className="flex flex-col self-end">
                <div className="flex leading-none">
                    <span className='text-[6em] font-lexend'>
                        {parseInt($weather?.main?.temp?.toString())}
                    </span>
                    <span className='text-[4em] font-lexend'>°{UNIT}</span>
                </div>
                <span className='text-[1.5em] font-lexend'>{$weather?.name + ", " + $weather?.sys?.country}</span>
            </div>
        )
}
