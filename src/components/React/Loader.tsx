import { useStore } from '@nanostores/react'
import { useEffect, useState } from 'react'
import { imageCode } from '../../store/weatherStore'
import CloudSVG from '../SVG/CloudSVG'
import LogoSVG from '../SVG/LogoSVG'
import { DesktopImg } from "../../assets/desktop";
import { MobileImg } from "../../assets/mobile";

type ColorType = {
    [key: string]: string
}

const Loader = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const $imageCode = useStore(imageCode)

    const D_Colors: ColorType = {
        "113d": "#0875f6",
        "113n": "#072b63",
        "116d": "#027cf5",
        "116n": "#061643",
        "119d": "#0953e9",
        "119n": "#08194c",
        "122d": "#0442ae",
        "122n": "#041448",
        "176d": "#2a3e52",
        "176n": "#091423",
        "296d": "#c9dcdc",
        "296n": "#0d223b",
        "200d": "#0c1b41",
        "200n": "#172450",
        "179d": "#7ea1c7",
        "179n": "#1a2236",
        "143d": "#24a7f1",
        "143n": "#113749",
        "default": "#5488EE",
    }

    const M_Colors: ColorType = {
        "113d": "#0253f0",
        "113n": "#031649",
        "116d": "#0146e9",
        "116n": "#041538",
        "119d": "#0650b0",
        "119n": "#0c0e3d",
        "122d": "#103785",
        "122n": "#020b44",
        "176d": "#2a3e5e",
        "176n": "#021933",
        "296d": "#aaaeb4",
        "296n": "#051728",
        "200d": "#1c2b5f",
        "200n": "#112552",
        "179d": "#87a6c8",
        "179n": "#11335c",
        "143d": "#3492e0",
        "143n": "#0d2e41",
        "default": "#5488EE",
    }

    useEffect(() => {
        if (isLoading && $imageCode !== null) {
            setTimeout(() => {
                setIsLoading(false)
                document.body.style.overflowY = "visible"
            }, 1000)
        }

        if (!isLoading && document?.documentElement?.clientWidth <= 640) {
            // Mobile Image Colors Avg
            setTimeout(() => {
                document.documentElement.style.setProperty("--baseClr", M_Colors[$imageCode || "default"])
                document.querySelector("meta[name='theme-color']")?.setAttribute("content", M_Colors[$imageCode || "default"]);
            }, 1000)
        } else {
            // Desktop Image Colors Avg
            setTimeout(() => {
                document.documentElement.style.setProperty("--baseClr", D_Colors[$imageCode || "default"])
                document.querySelector("meta[name='theme-color']")?.setAttribute("content", D_Colors[$imageCode || "default"]);
            }, 1000)
        }
    }, [$imageCode, isLoading])

    return (
        <div
            style={isLoading ? { display: "flex" } : { display: "none" }}
            className='fixed inset-0 w-screen h-screen bg-gradient-to-br from-blue-400 to-indigo-400 flex_center gap-[5em] z-10 flex-col'>
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

