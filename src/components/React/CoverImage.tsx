import { imageCode } from "../../store/weatherStore";
import { DesktopImg, MobileImg } from "../../assets";
import { useStore } from "@nanostores/react"
import { useEffect } from "react";

type Props = {
    background?: boolean
}

type ColorType = {
    [key: string]: string
}

const CoverImage = ({ background }: Props) => {
    const $imageCode = useStore(imageCode)
    // const $imageCode = "01d"

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
        "default": "#022399",
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
        if (document.documentElement.clientWidth <= 640) {
            // Mobile Image Colors Avg
            document.documentElement.style.setProperty("--baseClr", M_Colors[$imageCode])
            document.querySelector("meta[name='theme-color']")?.setAttribute("content", M_Colors[$imageCode]);
        } else {
            // Desktop Image Colors Avg
            document.documentElement.style.setProperty("--baseClr", D_Colors[$imageCode])
            document.querySelector("meta[name='theme-color']")?.setAttribute("content", D_Colors[$imageCode]);
        }

        // Set Font color based on background contrast
        // if ($imageCode?.includes("d")) {
        //     document.documentElement.style.setProperty("--textClr", "#000")
        // } else {
        //     document.documentElement.style.setProperty("--textClr", "#fff")
        // }
    }, [$imageCode])

    if ($imageCode !== "default")
        return (
            <div className={background ?
                "absolute top-0 w-screen h-screen z-[-9] overflow-hidden"
                :
                "absolute top-0 w-full h-full z-[-1] rounded-lg overflow-hidden"}>
                <img
                    src={MobileImg[$imageCode]?.src}
                    alt="BG_Img"
                    draggable={false}
                    className={background ? "sm:hidden w-full h-screen fixed top-0 object-cover opacity-75" : "sm:hidden w-full h-full object-cover"} />
                <img
                    src={DesktopImg[$imageCode]?.src}
                    alt="BG_Img"
                    draggable={false}
                    className={background ? "hidden sm:block w-full h-screen fixed top-0 object-cover opacity-75" : "hidden sm:block w-full h-full object-cover"} />
            </div>
        )
}

export default CoverImage