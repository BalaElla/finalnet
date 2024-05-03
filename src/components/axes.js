// import React from "react";

// export { XAxis, YAxis };

// function YAxis(props) {
//     const { yScale, height, offsetX } = props;

//     return (
//         <g className="axis axis--y">
//             <line x1={0} x2={0} y1={0} y2={height} stroke="red" strokeWidth="2" />
//             {yScale.ticks().map(tickValue => (
//                 <g key={tickValue} transform={`translate(0, ${yScale(tickValue)})`}>
//                     <line x1={-5} x2={0} stroke="red" strokeWidth="2" />
//                     <text
//                         x={-10 - offsetX}
//                         y={0}
//                         dy=".32em"
//                         style={{ textAnchor: "end", fontSize: "12px", fill: "red" }}
//                     >
//                         {tickValue}
//                     </text>
//                 </g>
//             ))}
//         </g>
//     );
// }

// function XAxis(props) {
//     const { xScale, width, height } = props;

//     return (
//         <g className="axis axis--x" transform={`translate(0, ${height})`}>
//             <line x1={0} x2={width} stroke="blue" strokeWidth="2" />
//             {xScale.ticks(5).map(tickValue => (
//                 <g key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
//                     <line y1={0} y2={10} stroke="blue" strokeWidth="2" />
//                     <text
//                         x={0}
//                         y={20}
//                         dy=".71em"
//                         style={{ textAnchor: "middle", fontSize: "12px", fill: "blue" }}
//                     >
//                         {tickValue}
//                     </text>
//                 </g>
//             ))}
//         </g>
//     );
// }

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export { XAxis, YAxis };

function XAxis({ xScale, height, width, axisLabel }) {
    const axisRef = useRef();

    useEffect(() => {
        const xAxisGenerator = d3.axisBottom(xScale);
        xAxisGenerator.tickFormat(d => d.toString()).tickSizeOuter(0);
        d3.select(axisRef.current).call(xAxisGenerator);

        // Ensure axis label consistency on the client side
        if (axisLabel) {
            d3.select(axisRef.current)
                .append('text')
                .attr('x', width / 2)
                .attr('y', 35)
                .style('text-anchor', 'middle')
                .style('font-size', '15px')
                .style('fill', 'black')
                .text(axisLabel);
        }
    }, [xScale, width, axisLabel]);

    return <g ref={axisRef} transform={`translate(0,${height})`} />;
}

function YAxis({ yScale, height, offsetX, axisLabel }) {
    const axisRef = useRef();

    useEffect(() => {
        const yAxisGenerator = d3.axisLeft(yScale);
        yAxisGenerator.tickFormat(d => d.toString()).tickSizeOuter(0);
        d3.select(axisRef.current).call(yAxisGenerator);

        // Ensure axis label consistency on the client side
        if (axisLabel) {
            d3.select(axisRef.current)
                .append('text')
                .attr('transform', 'rotate(-90)')
                .attr('x', -height / 2)
                .attr('y', -30)
                .style('text-anchor', 'middle')
                .style('font-size', '15px')
                .style('fill', 'black')
                .text(axisLabel);
        }
    }, [yScale, height, axisLabel]);

    return <g ref={axisRef} className="axis axis--y" />;
}