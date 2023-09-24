import { useStore } from '@nanostores/react'
import { useEffect, useState } from 'react'
import { imageCode } from '../../store/weatherStore'
import CloudSVG from '../SVG/CloudSVG'
import LogoSVG from '../SVG/LogoSVG'
import { DesktopImg, MobileImg } from '../../assets'

type ColorType = {
    [key: string]: string
}

const Loader = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const $imageCode = useStore(imageCode)

    const D_Colors: ColorType = {
        "01d": "#0875f6",
        "01n": "#072b63",
        "02d": "#027cf5",
        "02n": "#061643",
        "03d": "#0953e9",
        "03n": "#08194c",
        "04d": "#0442ae",
        "04n": "#041448",
        "09d": "#2a3e52",
        "09n": "#091423",
        "10d": "#c9dcdc",
        "10n": "#0d223b",
        "11d": "#0c1b41",
        "11n": "#172450",
        "13d": "#7ea1c7",
        "13n": "#1a2236",
        "50d": "#24a7f1",
        "50n": "#113749",
        "default": "#60a5fa",
    }

    const M_Colors: ColorType = {
        "01d": "#0253f0",
        "01n": "#031649",
        "02d": "#0146e9",
        "02n": "#041538",
        "03d": "#0650b0",
        "03n": "#0c0e3d",
        "04d": "#103785",
        "04n": "#020b44",
        "09d": "#2a3e5e",
        "09n": "#021933",
        "10d": "#aaaeb4",
        "10n": "#051728",
        "11d": "#1c2b5f",
        "11n": "#112552",
        "13d": "#87a6c8",
        "13n": "#11335c",
        "50d": "#3492e0",
        "50n": "#0d2e41",
        "default": "#60a5fa",
    }

    useEffect(() => {
        if (isLoading && $imageCode !== "default") {
            setTimeout(() => {
                setIsLoading(false)
                document.body.style.overflow = "visible"
            }, 1000)
        }

        if (!isLoading && document?.documentElement?.clientWidth <= 640) {
            // Mobile Image Colors Avg
            setTimeout(() => {
                document.documentElement.style.setProperty("--baseClr", M_Colors[$imageCode])
                document.querySelector("meta[name='theme-color']")?.setAttribute("content", M_Colors[$imageCode]);
            }, 1000)
        } else {
            // Desktop Image Colors Avg
            setTimeout(() => {
                document.documentElement.style.setProperty("--baseClr", D_Colors[$imageCode])
                document.querySelector("meta[name='theme-color']")?.setAttribute("content", D_Colors[$imageCode]);
            }, 1000)
        }
    }, [$imageCode, isLoading])

    return (
        <div
            style={isLoading ? { display: "flex" } : { display: "none" }}
            className='absolute inset-0 w-screen h-screen bg-gradient-to-br from-blue-400 to-indigo-400 flex_center gap-[5em] z-10 flex-col'>
            <div className="absolute top-0 w-screen h-screen overflow-hidden">
                <img
                    src={MobileImg["default"]?.src}
                    alt="Loader_BG_Img"
                    draggable={false}
                    className="sm:hidden w-full h-screen fixed top-0 object-cover opacity-20" />
                <img
                    src={DesktopImg["default"]?.src}
                    alt="Loader_BG_Img"
                    draggable={false}
                    className="hidden sm:block w-full h-screen fixed top-0 object-cover opacity-20" />
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

