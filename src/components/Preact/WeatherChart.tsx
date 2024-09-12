import { createRef } from 'preact'
import { useState, useEffect, useRef, useMemo } from 'preact/hooks'
import { useStore } from '@nanostores/preact';
import { imperialUnit, weather } from '../../store/weatherStore';
import useHorizontalScroll from '../../utils/useHorizontalScroll';
import { scaleLinear, max, line, curveMonotoneX, select, easeCubicInOut, interpolate, axisBottom, min } from "d3"

const WeatherChart = () => {
    const $weather = useStore(weather)
    const $imperialUnit = useStore(imperialUnit)
    const [data, setData] = useState<number[]>([])
    const [iconData, setIconData] = useState<string[]>([])
    const SvgRef = useRef<SVGSVGElement | null>(null)
    const ChartContainerRef = useHorizontalScroll(createRef());
    const hours = new Date($weather?.location?.localtime as string).getHours()

    useMemo(() => {
        // Processing Temperature values from API
        const todayHrs = $weather?.forecast?.forecastday[0]?.hour.map(curr => {
            const currHour = new Date(curr?.time).getHours()
            if (currHour >= hours) {
                return $imperialUnit ? curr?.temp_f : curr?.temp_c
            } else return null
        }).filter(temp => temp !== null)

        const tommorowHrs = $weather?.forecast?.forecastday[1]?.hour.map((curr, index) => {
            if (todayHrs && index < 24 - todayHrs?.length) {
                return $imperialUnit ? curr?.temp_f : curr?.temp_c
            } else return null
        }).filter(temp => temp !== null)

        if (todayHrs && tommorowHrs) {
            // Merging data from today's remaining hours + tommorows hours
            // adding upto total of 24Hrs of temperature data
            const mergedData = [...todayHrs, ...tommorowHrs].filter((temp) => temp !== null) as number[];
            // console.log(mergedData)
            setData(mergedData);
        }
    }, [$weather, $imperialUnit])

    useMemo(() => {
        // Processing Icons from API
        const todayIcons = $weather?.forecast?.forecastday[0]?.hour.map(curr => {
            const currHour = new Date(curr?.time).getHours()
            if (currHour >= hours) {
                return curr?.condition?.icon
            } else return null
        }).filter(temp => temp !== null)

        const tommorowIcons = $weather?.forecast?.forecastday[1]?.hour.map((curr, index) => {
            if (todayIcons && index < 24 - todayIcons?.length) {
                return curr?.condition?.icon
            } else return null
        }).filter(temp => temp !== null)

        if (todayIcons && tommorowIcons) {
            const mergedIconData = [...todayIcons, ...tommorowIcons].filter((temp) => temp !== null) as string[];
            // console.log(mergedIconData)
            setIconData(mergedIconData);
        }
    }, [$weather])

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2,
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    renderD3Chart();
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        if (SvgRef.current) {
            observer.observe(SvgRef.current);
        }
    }, [data, SvgRef?.current])

    const renderD3Chart = () => {
        if (!data.length || !iconData.length || !SvgRef.current) return;

        const marginTop = $imperialUnit ? 30 : 20;
        const marginRight = 20;
        const marginBottom = 30;
        const marginLeft = 20;
        const width = SvgRef?.current?.clientWidth || 800;
        const height = SvgRef?.current?.clientHeight || 300

        const xScale = scaleLinear()
            .domain([0, data.length - 1])
            .range([marginLeft, width - marginRight]);

        const minValue = min(data) || 0;
        const maxValue = max(data) || 100

        const yScale = scaleLinear()
            .domain([Math.min(minValue, 0) - 10, maxValue + 5])
            .range([height - marginBottom, marginTop])

        // Generate a path line
        const pathLine = line<number>()
            .x((_, i) => xScale(i))
            .y((d) => yScale(Math.round(d)))
            .curve(curveMonotoneX);

        // Init SVG element
        const svg = select(SvgRef.current);

        // Clear previous path before redraw
        svg.selectAll("path").remove();

        // Creating the path element
        svg
            .append('path')
            .datum(data)
            .attr('d', pathLine)
            .attr('fill', 'none')
            .attr('stroke', '#fff')
            .attr('stroke-width', 3)
            .transition()
            .duration(2000)
            .ease(easeCubicInOut)
            .attrTween('stroke-dasharray', function () {
                const length: number = this.getTotalLength();
                return function (t) {
                    return (interpolate('0,' + length, length + ',' + length))(t);
                };
            });

        // Adding X-axis label on bottom
        const hours = new Date($weather?.location?.localtime as string).getHours() // Current Hour
        const tickLabel = axisBottom(xScale).ticks(24).tickFormat((d, i) => {
            let time = i + hours
            if (d == 0) {
                return "Now"
            } else if (time == 24) {
                // if i+ hour is > than 24, rest xaxis label to start from 1
                return "0 AM"
            } else if (time > 24) {
                // Its a new Day after 24, Tommorrows Time Cacl
                // if time is > than 24, reset xaxis label to start from 1
                let newTime = time - 24
                return newTime == 12 ? `${newTime} PM` :
                    newTime > 12 ?
                        `${newTime - 12} PM` : `${newTime} AM`
            } else {
                // Today's Time calc
                return time > 12 ? `${time - 12} PM` : `${time} AM`
            }
        })

        svg.select<SVGSVGElement>('.x-axis')
            .attr("transform", `translate(0,${height - marginBottom})`)
            .call(tickLabel)
            .selectAll("text")
            .style("font-size", "1.1em")
            .style("text-anchor", "middle")

        // Temperature Labels over path
        const tempLabels = svg.selectAll<SVGTextElement, number>('.temp-label').data(data);
        tempLabels.enter()
            .append('text')
            .attr('class', 'temp-label')
            .merge(tempLabels)
            .attr('x', (_, i) => xScale(i))
            .attr('y', (d) => yScale(d) - 20)
            .text(d => `${Math.round(d)}°`)
            .style('text-anchor', 'middle')
            .style('font-size', '0.85em')
            .style('fill', 'white')
            .style('opacity', 0)
            .transition()
            .delay(600)
            .duration(1000)
            .ease(easeCubicInOut)
            .style('opacity', 1)


        // Cicle dots showing x-y intersection
        svg.selectAll(".point-dot").remove();
        const pointDots = svg.selectAll<SVGCircleElement, number>('.point-dot').data(data);
        pointDots.enter()
            .append('circle')
            .attr('class', 'point-dot')
            .merge(pointDots)
            .attr('cx', (_, i) => xScale(i))
            .attr('cy', (d) => yScale(d))
            .attr('r', 0)
            .attr('fill', (_, i) => {
                return i === 0 ? '#FF6B00' : 'white';
            })
            .attr('stroke', 'white')
            .attr('stroke-width', 2)
            .transition()
            .delay(600)
            .duration(1000)
            .ease(easeCubicInOut)
            .attr('r', (_, i) => {
                return i === 0 ? 7 : 5;
            })

        // Weather Icon Image at every hour
        svg.selectAll(".point-icon").remove();
        const pointIcons = svg.selectAll<SVGImageElement, number>('.point-icon').data(iconData);
        pointIcons.enter()
            .append('image')
            .attr('class', 'point-icon')
            .merge(pointIcons)
            .attr('x', (_, i) => xScale(i) - 14)
            .attr('y', height - 65)
            .attr('width', 30)
            .attr('height', 30)
            .attr('xlink:href', (d) => d)
            .style('opacity', 0)
            .transition()
            .delay(600)
            .duration(1000)
            .ease(easeCubicInOut)
            .style('opacity', 1)
    }

    return (
        <div className='relative'>
            <div className="flex items-center gap-2 text-[1em] sm:text-[1.4em] tracking-wider opacity-85">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 sm:w-7 sm:h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                <span>24 Hours Forecast</span>
            </div>

            <div className="overflow-x-auto cursor-grab active:cursor-grabbing" ref={ChartContainerRef}>
                <svg ref={SvgRef} className='w-[400%] md:w-[250%] lg:w-[150%] min-h-max select-none'>
                    <g className="x-axis" />
                </svg>
            </div>
        </div>
    )
}

export default WeatherChart