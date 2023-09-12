import { useStore } from '@nanostores/react'
import { weather } from '../../store/weatherStore'
import { useEffect, useMemo, useRef, useState } from 'react'
import moment from "moment-timezone"
import { MoonIcons, SunriseSVG, SunsetSVG } from '../../assets'

//Formatted Time and Date
export const TimeCard = () => {
    const [time, setTime] = useState<string>("")
    const $weather = useStore(weather)

    useEffect(() => {
        if ($weather) {
            const TimeLoop = setInterval(() => {
                const formattedTime = moment().tz($weather?.location?.tz_id).format("LTS");
                setTime(formattedTime);
            }, 1000);

            return () => clearInterval(TimeLoop);
        }
    }, [$weather]);

    if ($weather)
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center text-center">
                <div className="flex flex-col items-end leading-none">
                    <span className='text-[3em] tracking-wider relative'>{time}</span>
                    <span className="px-1.5 tracking-widest opacity-80 capitalize">{$weather?.location?.tz_id || "undefined"}</span>
                </div>

                <div className="flex flex-col items-start sm:order-first">
                    <span className='tracking-widest opacity-80 capitalize'>Today</span>
                    <span className='text-[1.8em]'>{moment().format("Do MMMM YYYY")}</span>
                </div>
            </div>
        )
}

// Sunrise & Sunset Info
export const SunDetails = () => {
    const $weather = useStore(weather)
    const SunDotRef = useRef<SVGCircleElement>(null)
    const [coords, setCoords] = useState<{ x: number, y: number }>({ x: 3, y: 112.5 })

    // FadeOut opacity of SunDot based on time
    const DotOpacityMap: { [key: number]: string } = {
        "0": "0.3",
        "1": "0.6",
        "2": "0.9",
        "3": "0.95",
        "4": "1",
        "5": "1",
        "6": "1",
        "7": "0.95",
        "8": "0.9",
        "9": "0.6",
        "10": "0.3",
    }

    const xCoordinates = useMemo(() => [
        3, 25.331214904785156, 44.23980712890625, 59.11635971069336, 72.91927337646484,
        89.41255187988281, 112.00544738769531, 135.19920349121094, 152.93292236328125,
        168.25047302246094, 183.41954040527344, 201.2275848388672
    ], [])

    const yCoordinates = useMemo(() => [
        112.5, 98.53053283691406, 80.16215515136719, 58.3986701965332, 35.897098541259766,
        15.323532104492188, 3.0013437271118164, 14.195354461669922, 33.715152740478516,
        55.215415954589844, 76.81292724609375, 96.28021240234375
    ], [])

    const sunRiseStr = $weather?.forecast?.forecastday[0]?.astro?.sunrise
    const sunSetStr = $weather?.forecast?.forecastday[0]?.astro?.sunset
    const moonPhase = $weather?.forecast?.forecastday[0]?.astro?.moon_phase || "Waxing Crescent"

    useMemo(() => {
        const currentDate = moment().format("YYYY-MM-DD");
        const sunRiseTime = moment(`${currentDate} ${sunRiseStr}`, "YYYY-MM-DD hh:mm A").toDate().getTime();
        const sunSetTime = moment(`${currentDate} ${sunSetStr}`, "YYYY-MM-DD hh:mm A").toDate().getTime();
        const currentTime = moment($weather?.location?.localtime).toDate().getTime()

        const totalDuration = sunSetTime - sunRiseTime
        const elapsedTime = currentTime - sunRiseTime
        const progress = Math.min(Math.max(elapsedTime / totalDuration, 0), 1);

        const x = interpolate(progress, xCoordinates);
        const y = interpolate(progress, yCoordinates);

        if (SunDotRef?.current) {
            const dotOpacity = DotOpacityMap[Math.floor(progress * 10)]
            SunDotRef?.current?.setAttribute("opacity", dotOpacity.toString());
            setCoords({ x, y })
        }
    }, [$weather?.location])

    function interpolate(progress: number, values: number[]) {
        const segment = (values.length - 1) * progress;
        const index = Math.floor(segment);
        const value = values[index];
        const nextValue = values[index + 1];

        if (nextValue !== undefined) {
            return value + (segment - index) * (nextValue - value);
        } else {
            return value;
        }
    }

    if ($weather)
        return (
            <div className="grid grid-cols-1 justify-center items-center gap-2 w-full h-full">
                <svg viewBox="0 0 223 114" fill="none" xmlns="http://www.w3.org/2000/svg" className='w-full max-w-[200px] px-6 mx-auto'>
                    <path d="M2 111.5C2 111.5 35.716 97.5728 57.5 58.5C89 2 106 2 111.5 2C117 2 134 2 171 60C195.516 97.4192 221 111.5 221 111.5" stroke="url(#paint0_linear_658_2)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    <defs>
                        <linearGradient id="paint0_linear_658_2" x1="111.5" y1="2" x2="111.5" y2="111.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="white" />
                            <stop offset="1" stopColor="white" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <circle
                        ref={SunDotRef}
                        cx={coords.x}
                        cy={coords.y}
                        fill='#FF6B00'
                        stroke='#FFD600'
                        strokeWidth={3}
                        r="7"
                    />
                </svg>

                <div className="flex justify-between gap-2 leading-none w-full relative">
                    <div className="flex justify-between absolute -top-2 sm:-top-6 w-full">
                        <img src={SunriseSVG.src} alt="SunriseSVG" width={30} height={30} className='w-[24px] sm:w-[30px]' />
                        <img src={SunsetSVG.src} alt="SunsetSVG" width={30} height={30} className='w-[24px] sm:w-[30px]' />
                    </div>

                    <div className="flex flex-col gap-2 mt-6">
                        <span className='text-[0.8em] sm:text-[1em] opacity-80'>Sunrise</span>
                        <span className='text-[1.1em] sm:text-[1.3em]'>{sunRiseStr}</span>
                    </div>
                    <div className="flex items-end flex-col gap-2 mt-6">
                        <span className='text-[0.8em] sm:text-[1em] opacity-80'>Sunset</span>
                        <span className='text-[1.1em] sm:text-[1.3em]'>{sunSetStr}</span>
                    </div>
                </div>

                <div className="flex justify-between items-center gap-2 w-full self-end">
                    <img
                        src={MoonIcons[moonPhase.replaceAll(" ", "_")].src}
                        alt="MoonPhase"
                        className='w-[40px] h-[40px] sm:w-[45px] sm:h-[45px]'
                    />

                    <div className="flex flex-col">
                        <span className='text-[0.8em] sm:text-[1em] opacity-80'>Moon Phase</span>
                        <span className='text-[1em] sm:text-[1.3em]'>{moonPhase}</span>
                    </div>
                </div>
            </div>
        )
}