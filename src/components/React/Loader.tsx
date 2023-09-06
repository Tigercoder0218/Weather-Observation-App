import { useStore } from '@nanostores/react'
import { useEffect, useRef } from 'react'
import { weather } from '../../store/weatherStore'
import CloudSVG from '../SVG/CloudSVG'
import Logo from '../SVG/Logo'

const Loader = () => {
    const $weather = useStore(weather)
    const LoaderRef = useRef(null)

    useEffect(() => {
        if ($weather?.cod == 200 && LoaderRef.current) {
            const loaderElement = LoaderRef.current as HTMLElement;

            loaderElement.style.display = "none";
            document.body.style.overflow = "visible"
        }
    }, [$weather])

    return (
        <div ref={LoaderRef} className='absolute inset-0 w-screen h-screen bg-gradient-to-br from-blue-500 to-indigo-500 flex_center gap-[5em] z-10 flex-col'>
            <div className="relative flex_center">
                <CloudSVG className='absolute mr-[3em] mb-[3em]' />
                <Logo width='120px' height='120px' />
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

