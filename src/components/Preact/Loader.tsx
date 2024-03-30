import { useStore } from '@nanostores/preact'
import { useEffect, useState } from 'preact/hooks'
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
        "143d": "#24a7f1",
        "143n": "#113749",
        "176d": "#2a3e52",
        "176n": "#091423",
        "179d": "#7ea1c7",
        "179n": "#1a2236",
        "182d": "#28609d",
        "182n": "#081830",
        "185d": "#253e5d",
        "185n": "#081e32",
        "200d": "#0c1b41",
        "200n": "#172450",
        "230d": "#5e7a95",
        "230n": "#0a1b33",
        "277d": "#0d317b",
        "277n": "#012771",
        "284d": "#5e7a95",
        "284n": "#0a1b33",
        "296d": "#c9dcdc",
        "296n": "#0d223b",
        "305d": "#c5edd6",
        "305n": "#0e2745",
        "317d": "#28609d",
        "317n": "#081830",
        "335d": "#5e7a95",
        "335n": "#0a1b33",
        "350d": "#4975a8",
        "350n": "#051643",
        "359d": "#c5edd6",
        "359n": "#0e2745",
        "365d": "#253e5d",
        "365n": "#081e32",
        "377d": "#4975a8",
        "377n": "#051643",
        "389d": "#172939",
        "389n": "#101c28",
        "392d": "#2e4974",
        "392n": "#09326b",
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
        "143d": "#3492e0",
        "143n": "#0d2e41",
        "176d": "#2a3e5e",
        "176n": "#021933",
        "179d": "#87a6c8",
        "179n": "#11335c",
        "182d": "#174fa5",
        "182n": "#081736",
        "185d": "#293c55",
        "185n": "#0c182f",
        "200d": "#1c2b5f",
        "200n": "#112552",
        "230d": "#888ea0",
        "230n": "#05192b",
        "277d": "#14378d",
        "277n": "#040b22",
        "296d": "#aaaeb4",
        "296n": "#051728",
        "284d": "#2a3e5e",
        "284n": "#021933",
        "305d": "#cbdbdc",
        "305n": "#031d32",
        "317d": "#174fa5",
        "317n": "#081736",
        "335d": "#888ea0",
        "335n": "#05192b",
        "350d": "#7c9bc8",
        "350n": "#000e29",
        "359d": "#cbdbdc",
        "359n": "#031d32",
        "365d": "#293c55",
        "365n": "#0c182f",
        "377d": "#7c9bc8",
        "377n": "#000e29",
        "389d": "#030f1b",
        "389n": "#0f2035",
        "392d": "#112351",
        "392n": "#040d2a",
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

