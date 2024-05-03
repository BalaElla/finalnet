// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// function XAxis({ xScale, height }) {
//     const ref = useRef();

//     useEffect(() => {
//         const xAxis = d3.axisBottom(xScale)
//                         .tickPadding(10);       // 刻度与文本之间的间距
//         d3.select(ref.current).call(xAxis);

//         // 添加轴线标签
//         d3.select(ref.current)
//           .selectAll('.tick text')
//           .attr('font-size', '12px'); // 设置标签字体大小
//     }, [xScale, height]);

//     return <g ref={ref} className="axis axis--x" transform={`translate(0,${height})`} />;
// }

// function YAxis({ yScale, width }) {
//     const ref = useRef();

//     useEffect(() => {
//         const yAxis = d3.axisLeft(yScale)
//                         .tickPadding(10);        // 刻度与文本之间的间距
//         d3.select(ref.current).call(yAxis);

//         // 添加轴线标签
//         d3.select(ref.current)
//           .selectAll('.tick text')
//           .attr('font-size', '12px'); // 设置标签字体大小
//     }, [yScale, width]);

//     return <g ref={ref} className="axis axis--y" />;
// }

// export { XAxis, YAxis };



import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function XAxis({ xScale, height }) {
    const ref = useRef();

    useEffect(() => {
        const xAxis = d3.axisBottom(xScale)
                        .tickPadding(10)
                        .tickSizeInner(-6) // Optional: inner tick size
                        .tickSizeOuter(0); // Optional: outer tick size
        d3.select(ref.current).call(xAxis)
          .selectAll('.tick text')
          .attr('font-size', '8px');
    }, [xScale, height]);

    return <g ref={ref} className="axis axis--x" transform={`translate(0,${height})`} />;
}

function YAxis({ yScale, left }) {
    const ref = useRef();

    useEffect(() => {
        const yAxis = d3.axisLeft(yScale)
                        .tickPadding(10)
                        .tickSizeInner(-6) // Optional: inner tick size
                        .tickSizeOuter(0); // Optional: outer tick size;
        d3.select(ref.current).call(yAxis);

        d3.select(ref.current)
          .selectAll('.tick text')
          .attr('font-size', '12px');
    }, [yScale, left]);

    return <g ref={ref} className="axis axis--y"/>;
}

export { XAxis, YAxis };
