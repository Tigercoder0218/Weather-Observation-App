import { useState, useEffect, useRef, createRef, useMemo } from 'react'
import * as d3 from "d3"
import { useStore } from '@nanostores/react';
import { weather } from '../../store/weatherStore';
import useHorizontalScroll from '../../utils/useHorizontalScroll';

const WeatherChart = () => {
    const $weather = useStore(weather)
    const [data, setData] = useState<number[]>([])
    const [iconData, setIconData] = useState<string[]>([])
    const SvgRef = useRef<SVGSVGElement | null>(null)
    const ChartContainerRef = useHorizontalScroll(createRef());

    useMemo(() => {
        const hours = new Date($weather?.location?.localtime as string).getHours()

        const todayHrs = $weather?.forecast?.forecastday[0]?.hour.map(curr => {
            const currHour = new Date(curr?.time).getHours()
            if (currHour >= hours) {
                return curr?.temp_c
            } else return null
        }).filter(temp => temp !== null)

        const tommorowHrs = $weather?.forecast?.forecastday[1]?.hour.map((curr, index) => {
            if (todayHrs && index < 24 - todayHrs?.length) {
                return curr?.temp_c
            } else return null
        }).filter(temp => temp !== null)

        if (todayHrs && tommorowHrs) {
            // Merging data from today's remaining hours + tommorows hours
            // adding upto total of 24Hrs of temperature data
            const mergedData = [...todayHrs, ...tommorowHrs].filter((temp) => temp !== null) as number[];
            // console.log(mergedData)
            setData(mergedData);
        }

        const todayIcons = $weather?.forecast?.forecastday[0]?.hour.map(curr => {
            const currHour = new Date(curr?.time).getHours()
            if (currHour >= hours) {
                return curr?.condition?.icon
            } else return null
        }).filter(temp => temp !== null)

        const tommorowIcons = $weather?.forecast?.forecastday[1]?.hour.map((curr, index) => {
            if (todayHrs && index < 24 - todayHrs?.length) {
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

        const marginTop = 20;
        const marginRight = 20;
        const marginBottom = 30;
        const marginLeft = 20;
        const width = SvgRef?.current?.clientWidth || 800;
        const height = SvgRef?.current?.clientHeight || 500

        const xScale = d3
            .scaleLinear()
            .domain([0, data.length - 1])
            .range([marginLeft, width - marginRight]);

        const maxValue = d3.max(data) || 100
        const yScale = d3
            .scaleLinear()
            .domain([0, maxValue + 5 || 100])
            .range([height - marginBottom, marginTop]);

        // Generate a path line
        const line = d3
            .line<number>()
            .x((d, i) => xScale(i))
            .y((d) => yScale(d))
            .curve(d3.curveMonotoneX);

        // Init SVG element
        const svg = d3.select(SvgRef.current);

        // Clear previous path before redraw
        svg.selectAll("path").remove();

        // Creating the path element
        svg
            .append('path')
            .datum(data)
            .attr('d', line)
            .attr('fill', 'none')
            .attr('stroke', '#fff')
            .attr('stroke-width', 3)
            .transition()
            .duration(2000)
            .ease(d3.easeCubicInOut)
            .attrTween('stroke-dasharray', function () {
                const length: number = this.getTotalLength();
                return function (t) {
                    return (d3.interpolate('0,' + length, length + ',' + length))(t);
                };
            });

        // Adding X-axis label on bottom
        const hours = new Date($weather?.location?.localtime as string).getHours() // Current Hour
        const tickLabel = d3.axisBottom(xScale).ticks(24).tickFormat((d, i) => {
            let time = i + hours
            if (d == 0) {
                return "Now"
            } else if (time == 24) {
                // if i+ hour is > than 24, rest xaxis label to start from 1
                return "0 AM"
            } else if (time > 24) {
                // Its the new Day after 24, Tommorrows Time Cacl
                // if time is > than 24, rest xaxis label to start from 1
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
            .attr('x', (d, i) => xScale(i))
            .attr('y', (d, i) => yScale(d) - 20)
            .text(d => `${d}°`)
            .style('text-anchor', 'middle')
            .style('font-size', '0.85em')
            .style('fill', 'white')
            .style('opacity', 0)
            .transition()
            .delay(600)
            .duration(1000)
            .ease(d3.easeCubicInOut)
            .style('opacity', 1)


        // Cicle dots showing x-y intersection
        svg.selectAll(".point-dot").remove();
        const pointDots = svg.selectAll<SVGCircleElement, number>('.point-dot').data(data);
        pointDots.enter()
            .append('circle')
            .attr('class', 'point-dot')
            .merge(pointDots)
            .attr('cx', (d, i) => xScale(i))
            .attr('cy', (d, i) => yScale(d))
            .attr('r', 0)
            .attr('fill', (d, i) => {
                return i === 0 ? '#FF6B00' : 'white';
            })
            .attr('stroke', 'white')
            .attr('stroke-width', 2)
            .transition()
            .delay(600)
            .duration(1000)
            .ease(d3.easeCubicInOut)
            .attr('r', (d, i) => {
                return i === 0 ? 7 : 5;
            })

        // Weather Icon Image at every hour
        svg.selectAll(".point-icon").remove();
        const pointIcons = svg.selectAll<SVGImageElement, number>('.point-icon').data(iconData);
        pointIcons.enter()
            .append('image')
            .attr('class', 'point-icon')
            .merge(pointIcons)
            .attr('x', (d, i) => xScale(i) - 14)
            .attr('y', height - 65)
            .attr('width', 30)
            .attr('height', 30)
            .attr('xlink:href', (d, i) => d)
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
                <svg ref={SvgRef} className='w-[400%] lg:w-[150%] h-fit select-none'>
                    <g className="x-axis" />
                </svg>
            </div>
        </div>
    )
}

export default WeatherChart