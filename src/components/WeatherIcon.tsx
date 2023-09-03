import { useStore } from "@nanostores/react";
import { WeatherIcons } from "../assets";
import { imageCode, imperialUnit, weather } from "../store/weatherStore";
import { useState } from "react";

type Props = {
    size?: string;
    hideText?: boolean
}

const WeatherIcon = ({ size = "125", hideText = false }: Props) => {
    const $imageCode = useStore(imageCode)
    const $weather = useStore(weather)
    const $imperialUnit = useStore(imperialUnit)

    return (
        <div className="self-start">
            <div className="flex_center flex-col">
                <img
                    src={WeatherIcons[$imageCode].src}
                    width={size}
                    height={size}
                    alt="Weather_Icon" />

                <span className="text-[1.5em]">{$weather?.weather[0]?.main}</span>
                <span className="text-[1em] capitalize">{$weather?.weather[0]?.description}</span>
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