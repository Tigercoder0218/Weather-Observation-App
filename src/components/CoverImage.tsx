import { DesktopImg, MobileImg } from '../assets'
import { weather } from '../store/weatherStore'
import { useStore } from '@nanostores/react'

const CoverImage = () => {
    const $weather = useStore(weather)

    return (
        <>
            <img
                src={DesktopImg[$weather?.weather[0].icon || "default"]}
                alt="BG_Img"
                width="100%"
                height="100%"
                className="hidden sm:block absolute top-0 w-full h-screen z-[-1] object-cover" />
            <img
                src={MobileImg[$weather?.weather[0].icon || "default"]}
                alt="BG_Img"
                width="100%"
                height="100%"
                className="sm:hidden absolute top-0 w-full h-screen z-[-1] object-fill" />
        </>
    )
}

export default CoverImage