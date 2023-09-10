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
        "01d": "#63c3ca",
        "01n": "#1c5792",
        "02d": "#6ecbb5",
        "02n": "#304489",
        "03d": "#648cc8",
        "03n": "#27438b",
        "04d": "#7a64a4",
        "04n": "#363b84",
        "09d": "#3d4450",
        "09n": "#1f2837",
        "10d": "#4d575a",
        "10n": "#2d3d53",
        "11d": "#4e547d",
        "11n": "#2d3a68",
        "13d": "#b7b3b3",
        "13n": "#6e6c7c",
        "50d": "#75c8bb",
        "50n": "#1b4f53",
        "default": "#3283cd",
    }

    const M_Colors: ColorType = {
        "01d": "#6ac0bc",
        "01n": "#1e4786",
        "02d": "#6ab7bf",
        "02n": "#234586",
        "03d": "#5b8cb0",
        "03n": "#2e3c84",
        "04d": "#716290",
        "04n": "#243986",
        "09d": "#4c4e5d",
        "09n": "#1e3555",
        "10d": "#686565",
        "10n": "#243749",
        "11d": "#505181",
        "11n": "#2b3d6d",
        "13d": "#c4b4a7",
        "13n": "#838a9f",
        "50d": "#6bb8b1",
        "50n": "#154a4c",
        "default": "#4099dc",
    }

    useEffect(() => {
        if (document.documentElement.clientWidth <= 640) {
            // Mobile Image Colors Avg
            document.documentElement.style.setProperty("--baseClr", M_Colors[$imageCode])
        } else {
            // Desktop Image Colors Avg
            document.documentElement.style.setProperty("--baseClr", D_Colors[$imageCode])
        }

        // Set Font color based on background contrast
        // if ($imageCode?.includes("d")) {
        //     document.documentElement.style.setProperty("--textClr", "#000")
        // } else {
        //     document.documentElement.style.setProperty("--textClr", "#fff")
        // }
    }, [$imageCode])

    return (
        <div className={background ?
            "absolute top-0 w-screen h-screen z-[-9] overflow-hidden"
            :
            "absolute top-0 w-full h-full z-[-1] rounded-lg overflow-hidden"}>
            <img
                src={MobileImg[$imageCode]?.src}
                alt="BG_Img"
                className={background ? "sm:hidden w-full h-screen fixed top-0 object-cover opacity-75" : "sm:hidden w-full h-full object-cover"} />
            <img
                src={DesktopImg[$imageCode]?.src}
                alt="BG_Img"
                className={background ? "hidden sm:block w-full h-screen fixed top-0 object-cover opacity-75" : "hidden sm:block w-full h-full object-cover"} />
        </div>
    )
}

export default CoverImage