import { useStore } from '@nanostores/react'
import { useEffect, useState } from 'react'
import { weather } from '../../store/weatherStore'
import CloudSVG from '../SVG/CloudSVG'
import LogoSVG from '../SVG/LogoSVG'

const Loader = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const $weather = useStore(weather)

    useEffect(() => {
        if ($weather !== null) {
            setIsLoading(false)
            document.body.style.overflow = "visible"
        }
    }, [$weather])

    return (
        <div
            style={isLoading ? { display: "flex" } : { display: "none" }}
            className='absolute inset-0 w-screen h-screen bg-gradient-to-br from-blue-400 to-indigo-400 flex_center gap-[5em] z-10 flex-col'>
            <div className="relative flex_center">
                <CloudSVG className='absolute mr-[3em] mb-[3em]' />
                <LogoSVG size='120px' />
                <CloudSVG width='120' className='absolute ml-[4em] mt-[7em]' />
            </div>

            <div className="flex_center flex-col">
                <h1 className='text-[1.5em] font-bold tracking-widest'>VORTEXA</h1>
                <span>Loading...</span>
            </div>
        </div>
    )
}

export default Loader

