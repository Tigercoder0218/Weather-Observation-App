import { useEffect, useRef, useState } from 'preact/hooks'
import { useStore } from '@nanostores/preact'
import { weather } from '../../store/weatherStore'
import { DateTime } from 'luxon';
import { MoonIcons, SunriseSVG, SunsetSVG } from '../../assets'
import { easeCubicInOut, interpolate, select } from 'd3';

//Formatted Time and Date
export const TimeCard = () => {
    const [time, setTime] = useState<string | null>(null)
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
            <div className="grid grid-cols-1 md:grid-cols-2 items-center text-center">
                <div className="flex flex-col items-end md:gap-1 leading-none ">
                    <span className='text-[2em] md:text-[1.6em] lg:text-[2.5em] tracking-wider relative'>{time}</span>
                    <span className="px-1.5 tracking-widest opacity-95 capitalize">{$weather?.location?.tz_id}</span>
                </div>

                <div className="flex flex-col items-start mt-[-1.5em] sm:mt-0 sm:order-first">
                    <span className='tracking-widest opacity-95 capitalize'>Today</span>
                    <span className='text-[1.25em] sm:text-[1.4em]'>{DateTime.now().toFormat('d LLLL yyyy')}</span>
                </div>
            </div>
        )
}

// Sunrise & Sunset Info
export const SunChart = () => {
    const $weather = useStore(weather)
    const svgRef = useRef<SVGSVGElement>(null);
    const isClient = typeof window !== 'undefined';

    const DotOpacityMap: { [key: number]: string } = {
        "0": "0.2",
        "1": "0.4",
        "2": "0.7",
        "3": "0.95",
        "4": "0.98",
        "5": "1",
        "6": "0.98",
        "7": "0.95",
        "8": "0.7",
        "9": "0.4",
        "10": "0.2",
    };

    const sunRiseStr = $weather?.forecast?.forecastday[0]?.astro?.sunrise
    const sunSetStr = $weather?.forecast?.forecastday[0]?.astro?.sunset
    const moonPhase = $weather?.forecast?.forecastday[0]?.astro?.moon_phase || "Waxing Crescent"

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    renderD3Chart();
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        if (svgRef.current) {
            observer.observe(svgRef.current);
        }
    }, [$weather, svgRef.current]);

    const renderD3Chart = () => {
        const currentDate = DateTime.fromFormat(`${$weather?.location?.localtime}`, 'yyyy-MM-dd h:mm')?.toFormat('yyyy-MM-dd');
        const sunRiseTime = DateTime.fromFormat(`${currentDate} ${sunRiseStr}`, 'yyyy-MM-dd hh:mm a')?.toJSDate()?.getTime();
        const sunSetTime = DateTime.fromFormat(`${currentDate} ${sunSetStr}`, 'yyyy-MM-dd hh:mm a')?.toJSDate()?.getTime();
        const currentTime = DateTime.fromFormat(`${$weather?.location?.localtime}`, 'yyyy-MM-dd h:mm')?.toMillis();

        const totalDuration = sunSetTime - sunRiseTime
        const elapsedTime = currentTime - sunRiseTime
        const progress = Math.min(Math.max(elapsedTime / totalDuration, 0), 1);

        const svg = select(svgRef.current);
        svg.selectAll('circle').remove();

        const dotOpacity = DotOpacityMap[Math.floor(progress * 10)]
        const circle = svg
            .append('circle')
            .attr('cx', 18)
            .attr('cy', 253)
            .attr('r', 25)
            .attr('fill', '#FF6B00')
            .attr('stroke', '#FFD600')
            .attr('stroke-width', 4)
            .attr('opacity', dotOpacity)

        circle
            .transition()
            .delay(500)
            .duration(1000)
            .ease(easeCubicInOut)
            .tween('pathTween', function () {
                const pathEl = svgRef.current ? svgRef.current.querySelector('path') : null
                const pathLength = pathEl ? pathEl.getTotalLength() : 0;

                const Interpolate = interpolate(0, pathLength * progress);

                return function (t: number) {
                    const distance = Interpolate(t);
                    if (!isFinite(distance)) return;
                    const point = pathEl ? pathEl?.getPointAtLength(distance) : null;

                    if (point) {
                        circle.attr('cx', point.x).attr('cy', point.y);
                    }
                };
            });
    }

    if (isClient && $weather)
        return (
            <div className="grid grid-cols-1 items-center gap-2 w-full h-full lg:min-w-[220px]">
                <div className="flex items-center flex-col h-full relative">
                    <svg
                        ref={svgRef}
                        viewBox="-50 -50 619 369"
                        preserveAspectRatio="xMidYMid meet"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full max-w-[200px]"
                    >
                        <path d="M18,253L28.829,247.706L39.31,241.747L49.494,235.294L59.387,228.403L68.985,221.106L78.278,213.425L87.254,205.377L95.902,196.975L104.207,188.235L112.155,179.169L119.733,169.792L126.928,160.118L133.728,150.161L140.122,139.94L146.119,129.481L152.092,119.006L158.212,108.618L164.496,98.328L170.962,88.151L177.633,78.107L184.535,68.221L191.703,58.526L199.179,49.067L207.017,39.907L215.289,31.136L224.088,22.896L233.537,15.414L243.787,9.082L254.958,4.605L266.871,3.003L278.851,4.062L290.225,7.995L300.769,13.823L310.59,20.812L319.825,28.56L328.586,36.842L336.959,45.517L345.007,54.494L352.779,63.712L360.313,73.126L367.638,82.703L374.779,92.418L381.757,102.251L388.588,112.187L395.284,122.213L401.86,132.32L408.494,142.388L415.391,152.277L422.531,161.992L429.917,171.523L437.549,180.857L445.428,189.983L453.557,198.887L461.938,207.555L470.574,215.969L479.471,224.106L488.636,231.94L498.084,239.429L507.842,246.51" fill="none" stroke="url(#path_gradient)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
                        <defs>
                            <linearGradient id="path_gradient" x1="267" y1="2" x2="267" y2="252" gradientUnits="userSpaceOnUse">
                                <stop stop-color="white" />
                                <stop offset="1" stop-color="white" stop-opacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <div className="flex justify-between self-end gap-2 leading-none w-full">
                        <div className="flex flex-col gap-2">
                            <img src={SunriseSVG?.src} alt="SunriseSVG" width={30} height={30} className='w-[24px] sm:w-[30px]' />
                            <span className='text-[0.8em] sm:text-[1em] opacity-95'>Sunrise</span>
                            <span className='text-[1.1em] sm:text-[1.3em]'>{sunRiseStr}</span>
                        </div>
                        <div className="flex items-end flex-col gap-2">
                            <img src={SunsetSVG?.src} alt="SunsetSVG" width={30} height={30} className='w-[24px] sm:w-[30px]' />
                            <span className='text-[0.8em] sm:text-[1em] opacity-95'>Sunset</span>
                            <span className='text-[1.1em] sm:text-[1.3em]'>{sunSetStr}</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center gap-2 w-full self-end pt-2 border-t border-white/20">
                    <img
                        src={MoonIcons[moonPhase?.replaceAll(" ", "_")]?.src}
                        alt="MoonPhase"
                        className='w-[40px] h-[40px] sm:w-[45px] sm:h-[45px]'
                    />

                    <div className="flex flex-col">
                        <span className='text-[0.8em] lg:text-[1em] opacity-95'>Moon Phase</span>
                        <span className='text-[1em] lg:text-[1.3em]'>{moonPhase}</span>
                    </div>
                </div>
            </div>
        );
};