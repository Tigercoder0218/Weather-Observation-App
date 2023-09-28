import { imageCode } from "../../store/weatherStore";
import { DesktopImg, MobileImg } from "../../assets";
import { useStore } from "@nanostores/react"

type Props = {
    background?: boolean
}

const CoverImage = ({ background = false }: Props) => {
    const $imageCode = useStore(imageCode)
    const isClient = typeof window !== 'undefined';

    if (isClient && $imageCode !== null)
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