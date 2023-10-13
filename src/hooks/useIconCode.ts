import { imageCode } from "../store/weatherStore";
import { weather } from "../store/weatherStore";

interface IconMappingType {
    [key: string]: string
}
1240
const IconMapping: IconMappingType = {
    "1000": "113",
    "1003": "116",
    "1006": "119",
    "1009": "122",
    "1030": "143",
    "1135": "143",
    "1147": "143",
    "1063": "176",
    "1180": "176",
    "1186": "176",
    "1150": "176",
    "1153": "176",
    "1240": "176",
    "1066": "179",
    "1210": "179",
    "1216": "179",
    "1255": "179",
    "1213": "179",
    "1219": "179",
    "1069": "182",
    "1249": "182",
    "1072": "185",
    "1168": "185",
    "1087": "200",
    "1273": "200",
    "1114": "227",
    "1117": "230",
    "1171": "284",
    "1198": "284",
    "1201": "284",
    "1183": "296",
    "1189": "296",
    "1192": "305",
    "1195": "305",
    "1243": "305",
    "1204": "317",
    "1207": "317",
    "1222": "335",
    "1258": "335",
    "1225": "335",
    "1237": "350",
    "1261": "350",
    "1246": "359",
    "1252": "365",
    "1264": "377",
    "1276": "389",
    "1279": "392",
    "1282": "392",
};

export const useIconCode = async () => {
    const $weather = weather.get()

    if ($weather) {
        // const IconCode = IconMapping[1282]
        const IconCode = IconMapping[$weather?.current?.condition?.code]
        const isDay = $weather?.current?.is_day ? "d" : "n"
        // console.log(IconCode + isDay)
        // imageCode.set(IconCode + "n")
        imageCode.set(IconCode + isDay)
    } else {
        imageCode.set(null)
    }
}

export const getIconCode = (code: number) => {
    if (!code) return

    const IconCode = IconMapping[code]
    return IconCode + "d"
}