import { useStore } from '@nanostores/react'
import { weather } from '../../store/weatherStore'
import { useEffect, useMemo, useRef, useState } from 'react'
import { DateTime } from 'luxon';
import { MoonIcons, SunriseSVG, SunsetSVG } from '../../assets'
import * as d3 from "d3"

//Formatted Time and Date
export const TimeCard = () => {
    const [time, setTime] = useState<string>("")
    const $weather = useStore(weather)
    const isClient = typeof window !== 'undefined'; // Hydration Fix

    useEffect(() => {
        if (isClient && $weather) {
            const TimeLoop = setInterval(() => {
                const formattedTime = DateTime.now().setZone($weather?.location?.tz_id).toFormat('hh:mm:ss a');
                setTime(formattedTime);
            }, 1000);

            return () => clearInterval(TimeLoop);
        }
    }, [$weather]);

    if (isClient && $weather)
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center text-center">
                <div className="flex flex-col items-end leading-none">
                    <span className='text-[2.2em] sm:text-[3em] tracking-wider relative'>{time}</span>
                    <span className="px-1.5 tracking-widest opacity-95 capitalize">{$weather?.location?.tz_id || "undefined"}</span>
                </div>

                <div className="flex flex-col items-start sm:order-first">
                    <span className='tracking-widest opacity-95 capitalize'>Today</span>
                    <span className='text-[1.5em] sm:text-[1.8em]'>{DateTime.now().toFormat('d LLLL yyyy')}</span>
                </div>
            </div>
        )
}

// Sunrise & Sunset Info
export const SunChart = () => {
    const $weather = useStore(weather)
    const svgRef = useRef<SVGSVGElement>(null);

    const pathCoordinates = [[18, 253], [28.828962326049805, 247.70556640625], [39.309879302978516, 241.74745178222656], [49.49386215209961, 235.2943115234375], [59.38691329956055, 228.4032440185547], [68.98452758789062, 221.1062469482422], [78.27764892578125, 213.42515563964844], [87.25440216064453, 205.37660217285156], [95.9020767211914, 196.97544860839844], [104.20659637451172, 188.23497009277344], [112.15467834472656, 179.1691436767578], [119.73280334472656, 169.79185485839844], [126.92782592773438, 160.1175079345703], [133.72779846191406, 150.16148376464844], [140.12246704101562, 139.9404754638672], [146.11917114257812, 129.48065185546875], [152.09156799316406, 119.00643157958984], [158.21221923828125, 108.61819458007812], [164.4962158203125, 98.32794189453125], [170.96209716796875, 88.15106201171875], [177.63279724121094, 78.10730743408203], [184.5349884033203, 68.22126007080078], [191.7030487060547, 58.526458740234375], [199.1790008544922, 49.06726837158203], [207.01727294921875, 39.90653991699219], [215.28884887695312, 31.135791778564453], [224.08786010742188, 22.895774841308594], [233.53692626953125, 15.413567543029785], [243.78692626953125, 9.082437515258789], [254.95828247070312, 4.604620456695557], [266.8710021972656, 3.0030672550201416], [278.8511657714844, 4.0619730949401855], [290.2250671386719, 7.995087146759033], [300.7694396972656, 13.823366165161133], [310.58978271484375, 20.811613082885742], [319.8247985839844, 28.560184478759766], [328.586181640625, 36.84185028076172], [336.959228515625, 45.51668167114258], [345.0073547363281, 54.49414825439453], [352.779052734375, 63.71219253540039], [360.31280517578125, 73.1258773803711], [367.63812255859375, 82.70269012451172], [374.77947998046875, 92.41751861572266], [381.757080078125, 102.25069427490234], [388.587646484375, 112.18663024902344], [395.28436279296875, 122.2131576538086], [401.8599853515625, 132.31967163085938], [408.4936828613281, 142.3875732421875], [415.3908386230469, 152.27700805664062], [422.531494140625, 161.99224853515625], [429.9168395996094, 171.52267456054688], [437.5485534667969, 180.8570098876953], [445.42791748046875, 189.98318481445312], [453.5572814941406, 198.8873748779297], [461.9380798339844, 207.5552520751953], [470.5743713378906, 215.9685821533203], [479.47113037109375, 224.10581970214844], [488.63623046875, 231.93951416015625], [498.0843505859375, 239.4293212890625], [507.84246826171875, 246.5097198486328]]

    const DotOpacityMap: { [key: number]: string } = {
        "0": "0.1",
        "1": "0.3",
        "2": "0.6",
        "3": "0.9",
        "4": "0.95",
        "5": "1",
        "6": "0.95",
        "7": "0.9",
        "8": "0.6",
        "9": "0.3",
        "10": "0.1",
    };

    const sunRiseStr = $weather?.forecast?.forecastday[0]?.astro?.sunrise
    const sunSetStr = $weather?.forecast?.forecastday[0]?.astro?.sunset
    const moonPhase = $weather?.forecast?.forecastday[0]?.astro?.moon_phase || "Waxing Crescent"

    useEffect(() => {
        const currentDate = DateTime.fromFormat(`${$weather?.location?.localtime}`, 'yyyy-MM-dd h:mm').toFormat('yyyy-MM-dd');
        const sunRiseTime = DateTime.fromFormat(`${currentDate} ${sunRiseStr}`, 'yyyy-MM-dd hh:mm a').toJSDate().getTime();
        const sunSetTime = DateTime.fromFormat(`${currentDate} ${sunSetStr}`, 'yyyy-MM-dd hh:mm a').toJSDate().getTime();
        const currentTime = DateTime.fromFormat(`${$weather?.location?.localtime}`, 'yyyy-MM-dd h:mm').toMillis();

        const totalDuration = sunSetTime - sunRiseTime
        const elapsedTime = currentTime - sunRiseTime
        const progress = Math.min(Math.max(elapsedTime / totalDuration, 0), 1);

        const svg = d3.select(svgRef.current);
        svg.selectAll('path').remove();
        svg.selectAll('circle').remove();

        const path = svg
            .append('path')
            .datum(pathCoordinates)
            .attr('d', d3.line())
            .attr('fill', 'none')
            .attr('stroke', 'url(#path_gradient)')
            .attr('stroke-width', 4)
            .attr('stroke-linecap', 'round')
            .attr('stroke-linejoin', 'round');

        const dotOpacity = DotOpacityMap[Math.floor(progress * 10)]
        const circle = svg
            .append('circle')
            .attr('cx', 18)
            .attr('cy', 253)
            .attr('r', 25)
            .attr('fill', '#FF6B00')
            .attr('stroke', '#FFD600')
            .attr('stroke-width', 4)
            .attr('fill-opacity', dotOpacity);

        circle
            .transition()
            .delay(600)
            .duration(1000)
            .ease(d3.easeCubicInOut)
            .tween('pathTween', function () {
                const pathEl = path.node();
                const pathLength = pathEl ? pathEl.getTotalLength() : 0;

                const interpolate = d3.interpolate(0, pathLength * progress);

                return function (t: number) {
                    const distance = interpolate(t);
                    const point = pathEl ? pathEl.getPointAtLength(distance) : null;

                    if (point) {
                        circle.attr('cx', point.x).attr('cy', point.y);
                    }
                };
            });

    }, [$weather]);

    return (
        <div className="grid grid-cols-1 items-center gap-2 w-full h-full">
            <div className="flex items-center flex-col h-[165px] relative">
                <svg
                    ref={svgRef}
                    viewBox="-50 -50 619 369"
                    preserveAspectRatio="xMidYMid meet"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full max-w-[200px]"
                >
                    <defs>
                        <linearGradient id="path_gradient" x1="267" y1="2" x2="267" y2="252" gradientUnits="userSpaceOnUse">
                            <stop stopColor="white" />
                            <stop offset="1" stopColor="white" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>

                <div className="flex justify-between gap-2 leading-none w-full absolute bottom-0">
                    <div className="flex flex-col gap-2 mt-6">
                        <img src={SunriseSVG?.src} alt="SunriseSVG" width={30} height={30} className='w-[24px] sm:w-[30px]' />
                        <span className='text-[0.8em] sm:text-[1em] opacity-95'>Sunrise</span>
                        <span className='text-[1.1em] sm:text-[1.3em]'>{sunRiseStr}</span>
                    </div>
                    <div className="flex items-end flex-col gap-2 mt-6">
                        <img src={SunsetSVG?.src} alt="SunsetSVG" width={30} height={30} className='w-[24px] sm:w-[30px]' />
                        <span className='text-[0.8em] sm:text-[1em] opacity-95'>Sunset</span>
                        <span className='text-[1.1em] sm:text-[1.3em]'>{sunSetStr}</span>
                    </div>
                </div>
            </div>

            <div className="w-full h-[1px] bg-white/20"></div>

            <div className="flex justify-between items-center gap-2 w-full self-end">
                <img
                    src={MoonIcons[moonPhase?.replaceAll(" ", "_")]?.src}
                    alt="MoonPhase"
                    className='w-[40px] h-[40px] sm:w-[45px] sm:h-[45px]'
                />

                <div className="flex flex-col">
                    <span className='text-[0.8em] sm:text-[1em] opacity-95'>Moon Phase</span>
                    <span className='text-[1em] sm:text-[1.3em]'>{moonPhase}</span>
                </div>
            </div>
        </div>
    );
};