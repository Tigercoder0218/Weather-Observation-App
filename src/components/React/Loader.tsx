import { useStore } from '@nanostores/react'
import { useEffect, useState } from 'react'
import { imageCode } from '../../store/weatherStore'
import CloudSVG from '../SVG/CloudSVG'
import LogoSVG from '../SVG/LogoSVG'
import { DesktopImg, MobileImg } from '../../assets'

const Loader = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const $imageCode = useStore(imageCode)

    // useEffect(() => {
    //     if (isLoading && $imageCode !== "default") {
    //         setTimeout(() => {
    //             setIsLoading(false)
    //             document.body.style.overflow = "visible"
    //         }, 100)
    //     }
    // }, [$imageCode])

    return (
        <div
            style={isLoading ? { display: "flex" } : { display: "none" }}
            className='absolute inset-0 w-screen h-screen bg-gradient-to-br from-blue-400 to-indigo-400 flex_center gap-[5em] z-10 flex-col'>
            <div className="absolute top-0 w-screen h-screen overflow-hidden">
                <img
                    src={MobileImg["default"]?.src}
                    alt="Loader_BG_Img"
                    draggable={false}
                    className="sm:hidden w-full h-screen fixed top-0 object-fill opacity-30" />
                <img
                    src={DesktopImg["default"]?.src}
                    alt="Loader_BG_Img"
                    draggable={false}
                    className="hidden sm:block w-full h-screen fixed top-0 object-fill opacity-30" />
            </div>

            <div className="relative flex_center z-10">
                <CloudSVG className='absolute mr-[3em] mb-[3em]' />
                <LogoSVG size='120px' />
                <CloudSVG width='120' className='absolute ml-[4em] mt-[7em]' />
            </div>

            <div className="flex_center flex-col z-10">
                <h1 className='text-[1.5em] font-bold tracking-widest'>VORTEXA</h1>
                <span>Loading...</span>
            </div>
        </div>
    )
}

export default Loader

