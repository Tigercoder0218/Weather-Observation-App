import { useStore } from "@nanostores/react";
import { WeatherIcons } from "../assets";
import { imageCode } from "../store/weatherStore";

type Props = {
    size?: string;
}

const WeatherIcon = ({ size = "125" }: Props) => {
    const $imageCode = useStore(imageCode)
    return (
        <img
            src={WeatherIcons[$imageCode].src}
            width={size}
            height={size}
            alt="Weather_Icon" />
    )
}

export default WeatherIcon