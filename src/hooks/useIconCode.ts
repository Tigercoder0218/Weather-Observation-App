import { imageCode } from "../store/weatherStore";
import { weather } from "../store/weatherStore";

interface IconMappingType {
    [key: string]: string
}

export const weatherIconCode = async () => {
    const $weather = weather.get()

    const IconMapping: IconMappingType = {
        "1000": "01",
        "1003": "02",
        "1006": "03",
        "1009": "04",
        "1030": "50",
        "1063": "09",
        "1066": "13",
        "1069": "13",
        "1072": "13",
        "1087": "11",
        "1114": "13",
        "1117": "13",
        "1135": "03",
        "1147": "03",
        "1150": "09",
        "1153": "09",
        "1168": "13",
        "1171": "13",
        "1180": "09",
        "1183": "09",
        "1186": "09",
        "1189": "09",
        "1192": "09",
        "1195": "09",
        "1198": "11",
        "1201": "11",
        "1204": "13",
        "1207": "13",
        "1210": "13",
        "1213": "13",
        "1216": "13",
        "1219": "13",
        "1222": "13",
        "1225": "13",
        "1237": "13",
        "1240": "09",
        "1243": "09",
        "1246": "09",
        "1249": "13",
        "1252": "13",
        "1255": "13",
        "1258": "13",
        "1261": "13",
        "1264": "13",
        "1273": "09",
        "1276": "09",
        "1279": "13",
        "1282": "13",
    };

    if ($weather) {
        const IconCode = IconMapping[$weather?.current?.condition?.code]
        const isDay = $weather?.current?.is_day ? "d" : "n"
        // console.log(IconCode + isDay)
        imageCode.set(IconCode + isDay)
    } else {
        imageCode.set(null)
    }
}