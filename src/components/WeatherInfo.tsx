import { useStore } from '@nanostores/react'
import { imperialUnit, weather } from '../store/weatherStore'
import { useEffect, useMemo, useState } from 'react'

export const WeatherMain = () => {
    const [temp, setTemp] = useState<number>(0)
    const $weather = useStore(weather)
    const $imperialUnit = useStore(imperialUnit)

    const fahrenheitTemp = useMemo(() => {
        if ($weather) {
            return $imperialUnit ? ($weather?.main?.temp * 9 / 5) + 32 : $weather?.main?.temp;
        }
        return 0; // default temp
    }, [$imperialUnit, $weather]);

    useEffect(() => {
        setTemp(fahrenheitTemp);
    }, [fahrenheitTemp]);

    if ($weather) {
        return (
            <div className="flex flex-col self-end w-[190px]">
                <div className="flex leading-none">
                    <span className='text-[6em]'>
                        {parseInt(temp?.toString())}
                    </span>
                    <span className='text-[4em]'>°{$imperialUnit ? "F" : "C"}</span>
                </div>
                <span className='text-[1.5em]
                '>{$weather?.name + ", " + $weather?.sys?.country}</span>
            </div>
        )
    }
}
