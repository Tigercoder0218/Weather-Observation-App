import { useStore } from "@nanostores/preact";
import { WeatherIcons } from "../../assets/icons";
import { imageCode, imperialUnit, weather } from "../../store/weatherStore";

const WeatherIcon = () => {
    const $imageCode = useStore(imageCode) || null
    const $weather = useStore(weather)
    const $imperialUnit = useStore(imperialUnit)
    const isClient = typeof window !== 'undefined';

    if (isClient && $weather)
        return (
            <div className="self-start">
                <div className="flex flex-col leading-tight">
                    <img
                        src={WeatherIcons[$imageCode || "default"]?.src}
                        width={WeatherIcons[$imageCode || "default"]?.width}
                        height={WeatherIcons[$imageCode || "default"]?.height}
                        alt="Weather_Icon" />

                    <span className="text-[1.6em] capitalize drop-shadow-lg max-w-[250px]">{$weather?.current?.condition?.text?.replaceAll("possible", "")}</span>
                </div>

                <button type='button' className="absolute top-[0.5em] right-[0.5em] w-[50px] px-1 text-[1.6em] aspect-square border border-white/10 bg-black/30 rounded-lg" onClick={() => imperialUnit.set(!$imperialUnit)}>
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