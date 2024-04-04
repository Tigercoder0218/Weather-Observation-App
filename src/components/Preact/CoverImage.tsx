import { imageCode } from "../../store/weatherStore";
import { DesktopImg } from "../../assets/desktop";
import { MobileImg } from "../../assets/mobile";
import { useStore } from "@nanostores/preact"
import { useEffect, useState } from "preact/hooks";

type Props = {
    background?: boolean
}

const CoverImage = ({ background = false }: Props) => {
    const $imageCode = useStore(imageCode)
    const isClient = typeof window !== 'undefined';
    const [isMobile, setIsMobile] = useState<boolean>(false)

    useEffect(() => {
        if (typeof document !== 'undefined')
            setIsMobile(document?.documentElement?.clientWidth <= 850)
    }, [])


    if (isClient && $imageCode !== null)
        return (
            <div className={background ?
                "absolute top-0 w-screen h-screen z-[-9] overflow-hidden"
                :
                "absolute top-0 w-full h-full z-[-1] rounded-lg overflow-hidden"}>
                {
                    isMobile ? <img
                        src={MobileImg[$imageCode]?.src}
                        alt="BG_Img"
                        draggable={false}
                        loading="eager"
                        className={background ? "lg:hidden w-full h-screen fixed top-0 object-cover opacity-75" : "lg:hidden w-full h-full object-cover"} />
                        :
                        <img
                            src={DesktopImg[$imageCode]?.src}
                            alt="BG_Img"
                            draggable={false}
                            loading="eager"
                            className={background ? "hidden lg:block w-full h-screen fixed top-0 object-cover opacity-75" : "hidden lg:block w-full h-full object-cover"} />
                }
            </div>
        )
}

export default CoverImage