import type { ImageMetadata } from "astro";
type WeatherImages = {
    [key: string]: ImageMetadata;
};

// Misc Icons
export { default as CLogo } from "./misc/CLogo.webp"
export { default as VortexSVG } from "./misc/vortex.svg"
export { default as SunriseSVG } from "./misc/sunrise.svg"
export { default as SunsetSVG } from "./misc/sunset.svg"
export { default as ArrowSVG } from "./misc/arrow.svg"
export { default as CompassSVG } from "./misc/compass.svg"
export { default as WindSVG } from "./misc/wind.svg"

// Moon Phase Icons
import FullMoonSVG from "./misc/fullmoon.svg"
import NewMoonSVG from "./misc/newmoon.svg"
import FirstQuarterSVG from "./misc/first-quarter.svg"
import LastQuarterSVG from "./misc/last-quarter.svg"
import WanCrescentSVG from "./misc/waning-crescent.svg"
import WanGibbousSVG from "./misc/waning-gibbous.svg"
import WaxCrescentSVG from "./misc/waxing-crescent.svg"
import WaxGibbousSVG from "./misc/waxing-gibbous.svg"

export const MoonIcons: WeatherImages = {
    "Full_Moon": FullMoonSVG,
    "New_Moon": NewMoonSVG,
    "First_Quarter": FirstQuarterSVG,
    "Last_Quarter": LastQuarterSVG,
    "Waning_Crescent": WanCrescentSVG,
    "Waning_Gibbous": WanGibbousSVG,
    "Waxing_Crescent": WaxCrescentSVG,
    "Waxing_Gibbous": WaxGibbousSVG,
}