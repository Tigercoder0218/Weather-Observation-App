import { useState, useEffect, useRef, createRef } from 'react'
import * as d3 from "d3"
import { useStore } from '@nanostores/react';
import { weather } from '../../store/weatherStore';
import useHorizontalScroll from '../../utils/useHorizontalScroll';

const WeatherChart = () => {
    const $weather = useStore(weather)
    const [data, setData] = useState<number[]>([])
    const SvgRef = useRef<SVGSVGElement | null>(null)
    const ChartContainerRef = useHorizontalScroll(createRef());

    useEffect(() => {
        const tempData = $weather?.forecast?.forecastday[0]?.hour.map(curr => (curr?.temp_c))
        // console.log(tempData)
        if (tempData !== undefined) {
            setData(tempData);
        }
    }, [$weather])

    useEffect(() => {
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
            .delay(2000)
            .duration(2000)
            .ease(d3.easeCubicInOut)
            .attrTween('stroke-dasharray', function () {
                const length: number = this.getTotalLength();
                return function (t) {
                    return (d3.interpolate('0,' + length, length + ',' + length))(t);
                };
            });

        svg.select<SVGSVGElement>('.x-axis')
            .attr("transform", `translate(0,${height - marginBottom})`)
            .call(d3.axisBottom(xScale).ticks(24))
            .selectAll("text")
            .style("font-size", "1em")
            .style("text-anchor", "middle")

        const tempLabels = svg.selectAll<SVGTextElement, number>('.temp-label')
            .data(data);

        tempLabels.enter()
            .append('text')
            .attr('class', 'temp-label')
            .merge(tempLabels)
            .attr('x', (d, i) => xScale(i))
            .attr('y', (d, i) => yScale(d) - 20)
            .text(d => `${d}°C`)
            .style('text-anchor', 'middle')
            .style('font-size', '0.8em')
            .style('fill', 'white');
    }, [data, SvgRef?.current])

    return (
        <div className='relative'>
            <p className="text-center text-[1em] opacity-85">24 Hours Forecast</p>

            <div className="overflow-x-auto cursor-grab active:cursor-grabbing" ref={ChartContainerRef}>
                <svg ref={SvgRef} className='w-[400%] lg:w-[150%] h-fit select-none'>
                    <g className="x-axis" />
                </svg>
            </div>
        </div>
    )
}

export default WeatherChart