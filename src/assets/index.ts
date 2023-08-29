type WeatherImages = {
    [key: string]: string;
};

// Weather Logo Images
import Day from "./icons/01d.svg"
import Night from "./icons/01n.svg"
import FewCloud from "./icons/02d.svg"
import FewCloudNight from "./icons/02n.svg"
import ScatterdCloud from "./icons/03d.svg"
import ScatterdCloudNight from "./icons/03n.svg"
import BrokenCloud from "./icons/04d.svg"
import BrokenCloudNight from "./icons/04n.svg"
import ShowerRain from "./icons/09d.svg"
import ShowerRainNight from "./icons/09n.svg"
import Rain from "./icons/10d.svg"
import RainNight from "./icons/10n.svg"
import ThunderDay from "./icons/11d.svg"
import ThunderNight from "./icons/11n.svg"
import SnowDay from "./icons/13d.svg"
import SnowNight from "./icons/13n.svg"
import MistyDay from "./icons/50d.svg"
import MistyNight from "./icons/50n.svg"
import Unknown from "./icons/unknown.svg"

export const WeatherIcons: WeatherImages = {
    "01d": Day,
    "01n": Night,
    "02d": FewCloud,
    "02n": FewCloudNight,
    "03d": ScatterdCloud,
    "03n": ScatterdCloudNight,
    "04d": BrokenCloud,
    "04n": BrokenCloudNight,
    "09d": ShowerRain,
    "09n": ShowerRainNight,
    "10d": Rain,
    "10n": RainNight,
    "11d": ThunderDay,
    "11n": ThunderNight,
    "13d": SnowDay,
    "13n": SnowNight,
    "50d": MistyDay,
    "50n": MistyNight,
    "default": Unknown,
}

// Desktop Weather Images
import D_Day from "./desktop/01d.webp"
import D_Night from "./desktop/01n.webp"
import D_FewCloud from "./desktop/02d.webp"
import D_FewCloudNight from "./desktop/02n.webp"
import D_ScatterdCloud from "./desktop/03d.webp"
import D_ScatterdCloudNight from "./desktop/03n.webp"
import D_BrokenCloud from "./desktop/04d.webp"
import D_BrokenCloudNight from "./desktop/04n.webp"
import D_ShowerRain from "./desktop/09d.webp"
import D_ShowerRainNight from "./desktop/09n.webp"
import D_Rain from "./desktop/10d.webp"
import D_RainNight from "./desktop/10n.webp"
import D_ThunderDay from "./desktop/11d.webp"
import D_ThunderNight from "./desktop/11n.webp"
import D_SnowDay from "./desktop/13d.webp"
import D_SnowNight from "./desktop/13n.webp"
import D_MistyDay from "./desktop/50d.webp"
import D_MistyNight from "./desktop/50n.webp"
import D_Unknown from "./desktop/unknown.webp"

export const DesktopImg: WeatherImages = {
    "01d": D_Day,
    "01n": D_Night,
    "02d": D_FewCloud,
    "02n": D_FewCloudNight,
    "03d": D_ScatterdCloud,
    "03n": D_ScatterdCloudNight,
    "04d": D_BrokenCloud,
    "04n": D_BrokenCloudNight,
    "09d": D_ShowerRain,
    "09n": D_ShowerRainNight,
    "10d": D_Rain,
    "10n": D_RainNight,
    "11d": D_ThunderDay,
    "11n": D_ThunderNight,
    "13d": D_SnowDay,
    "13n": D_SnowNight,
    "50d": D_MistyDay,
    "50n": D_MistyNight,
    "default": D_Unknown,
}

// Mobile Weather Images
import M_Day from "./mobile/01d.webp"
import M_Night from "./mobile/01n.webp"
import M_FewCloud from "./mobile/02d.webp"
import M_FewCloudNight from "./mobile/02n.webp"
import M_ScatterdCloud from "./mobile/03d.webp"
import M_ScatterdCloudNight from "./mobile/03n.webp"
import M_BrokenCloud from "./mobile/04d.webp"
import M_BrokenCloudNight from "./mobile/04n.webp"
import M_ShowerRain from "./mobile/09d.webp"
import M_ShowerRainNight from "./mobile/09n.webp"
import M_Rain from "./mobile/10d.webp"
import M_RainNight from "./mobile/10n.webp"
import M_ThunderDay from "./mobile/11d.webp"
import M_ThunderNight from "./mobile/11n.webp"
import M_SnowDay from "./mobile/13d.webp"
import M_SnowNight from "./mobile/13n.webp"
import M_MistyDay from "./mobile/50d.webp"
import M_MistyNight from "./mobile/50n.webp"
import M_Unknown from "./mobile/unknown.webp"

export const MobileImg: WeatherImages = {
    "01d": M_Day,
    "01n": M_Night,
    "02d": M_FewCloud,
    "02n": M_FewCloudNight,
    "03d": M_ScatterdCloud,
    "03n": M_ScatterdCloudNight,
    "04d": M_BrokenCloud,
    "04n": M_BrokenCloudNight,
    "09d": M_ShowerRain,
    "09n": M_ShowerRainNight,
    "10d": M_Rain,
    "10n": M_RainNight,
    "11d": M_ThunderDay,
    "11n": M_ThunderNight,
    "13d": M_SnowDay,
    "13n": M_SnowNight,
    "50d": M_MistyDay,
    "50n": M_MistyNight,
    "default": M_Unknown,
}