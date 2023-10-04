import { useState, useEffect, useRef, createRef, useMemo } from 'react'
import * as d3 from "d3"
import { useStore } from '@nanostores/react';
import { weather } from '../../store/weatherStore';
import useHorizontalScroll from '../../utils/useHorizontalScroll';

const WeatherChart = () => {
    const $weather = useStore(weather)
    const [data, setData] = useState<number[]>([])
    const [todayLen, setTodayLen] = useState<number>(0)
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
        setTodayLen(todayHrs?.length || 0) //Today length counter

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
        if (!data.length || !SvgRef.current) return;

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
            if (d == 0) {
                // First index is the Current Time
                return "Now"
            } else if (i - todayLen == 12) {
                // Its Noon
                return "12 PM"
            } else if (i + hours == 24) {
                // Its Midnight
                return "00 AM"
            } else if (i - todayLen > 12) {
                // if > 12, its tommorrowr's Afternoon, converting to 12hrs format
                return i - todayLen - 12 + " PM"
            } else if (i + hours > 24) {
                // Its the new Day after 24
                // if i + hours is > than 24, reset xaxis label to start from 1 AM
                return i - todayLen + " AM"
            } else {
                // Rest of todays Afternoon, converting to 12hrs format
                return i + hours - 12 + " PM"
            }
        })
        svg.select<SVGSVGElement>('.x-axis')
            .attr("transform", `translate(0,${height - marginBottom})`)
            .call(tickLabel)
            .selectAll("text")
            .style("font-size", "1.1em")
            .style("text-anchor", "middle")

        // Temperature Labels over path
        const tempLabels = svg.selectAll<SVGTextElement, number>('.temp-label')
            .data(data);
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
        const pointDots = svg.selectAll<SVGCircleElement, number>('.point-dot')
            .data(data);
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