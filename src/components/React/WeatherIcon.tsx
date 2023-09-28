import { useStore } from "@nanostores/react";
import { WeatherIcons } from "../../assets";
import { imageCode, imperialUnit, weather } from "../../store/weatherStore";

type Props = {
    size?: string
}

const WeatherIcon = ({ size = "125" }: Props) => {
    const $imageCode = useStore(imageCode)
    const $weather = useStore(weather)
    const $imperialUnit = useStore(imperialUnit)
    const isClient = typeof window !== 'undefined';

    if (isClient && $weather)
        return (
            <div className="self-start">
                <div className="flex_center flex-col leading-tight">
                    <img
                        src={WeatherIcons[$imageCode || "default"]?.src}
                        width={size}
                        height={size}
                        alt="Weather_Icon" />

                    <span className="text-[1.6em] capitalize">{$weather?.current?.condition?.text}</span>
                </div>

                <button type='button' className="absolute top-[0.5em] right-[0.5em] w-[50px] px-1 text-[1.6em] aspect-square bg-black/30 rounded-lg" onClick={() => imperialUnit.set(!$imperialUnit)}>
                    {$imperialUnit ?
                        <span>°F</span>
                        :
                        <span>°C</span>
                    }
                </button>
            </div>
        )
}

export default WeatherIcon