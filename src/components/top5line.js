// import React, { useState } from "react";
// import { XAxis, YAxis } from "./axes";
// import { scaleTime, scaleLinear, scaleOrdinal, line, extent, schemeSet3 } from 'd3';

// // function Top5LineChart({ data }) {
// //   const width = 800; // 图表宽度
// //   const height = 400; // 图表高度
// //   const margin = { top: 20, right: 150, bottom: 50, left: 60 };

// //   // 创建比例尺
// //   const xScale = scaleTime()
// //     .domain(extent(data.flatMap(country => country.Years.map(y => new Date(y.year, 0, 1)))))
// //     .range([margin.left, width - margin.right]);

// //   const yMax = Math.max(...data.flatMap(country => country.Years.map(y => Math.max(y.Movies, y.TVShows))));
// //   const yScale = scaleLinear()
// //     .domain([0, yMax])
// //     .range([height - margin.bottom, margin.top]);

// //   const colorScale = scaleOrdinal(schemeSet3);

// //   // 线生成器
// //   const movieLineGenerator = line()
// //     .x(d => xScale(new Date(d.year, 0, 1)))
// //     .y(d => yScale(d.Movies));

// //   const tvShowLineGenerator = line()
// //     .x(d => xScale(new Date(d.year, 0, 1)))
// //     .y(d => yScale(d.TVShows))
// //     // .curve(d3.curveStepAfter); // 可以用来使虚线更明显


// //   return (
// //     <svg width={width} height={height}>
// //       {/* X 轴 */}
// //       <XAxis xScale={xScale} height={height - margin.bottom} />
// //       {/* Y 轴 */}
// //       <YAxis yScale={yScale} width={width - margin.left} />

// //       {/* 数据线 */}
// //       {data.map((country, idx) => (
// //         <g key={idx}>
// //           {/* 电影线 */}
// //           <path
// //             d={movieLineGenerator(country.Years)}
// //             stroke={colorScale(idx)}
// //             strokeWidth={2}
// //             fill="none"
// //             />
// //           {/* 电视剧线 */}
// //           <path
// //             d={tvShowLineGenerator(country.Years)}
// //             stroke={colorScale(idx)}
// //             strokeWidth={2}
// //             fill="none"
// //             strokeDasharray="5,5"/>
// //         </g>
// //       ))}

// //       {/* 图例 */}
// //       <g transform={`translate(${width - margin.right + 20}, ${margin.top})`}>
// //         {data.map((country, idx) => (
// //           <g key={idx} transform={`translate(0, ${idx * 20})`}>
// //             <rect width={15} height={15} fill={colorScale(idx)} />
// //             <text x={20} y={12} fontSize="12">{country.country}</text>
// //           </g>
// //         ))}
// //       </g>

// //       {/* X 轴标签 */}
// //       <text
// //         x={(width - margin.left - margin.right) / 2 + margin.left}
// //         y={height - 10}
// //         textAnchor="middle"
// //         fontSize="14"
// //       >
// //         Year
// //       </text>

// //       {/* Y 轴标签 */}
// //       <text
// //         x={0}
// //         y={margin.top - 10}
// //         textAnchor="middle"
// //         fontSize="14"
// //         transform={`translate(15, ${height / 2}) rotate(-90)`}
// //       >
// //         Quantity
// //       </text>
// //     </svg>
// //   );
// // }

// // export default Top5LineChart;

import React, { useState } from "react";
import { XAxis, YAxis } from "./axes";
import { scaleTime, scaleLinear, scaleOrdinal, line, extent, schemeSet3 } from 'd3';

function Top5LineChart({ data }) {
  const width = 800; // 图表宽度
  const height = 400; // 图表高度
  const margin = { top: 20, right: 150, bottom: 50, left: 60 };

  // 创建比例尺
  const xScale = scaleTime()
    .domain(extent(data.flatMap(country => country.Years.map(y => new Date(y.year, 0, 1)))))
    .range([margin.left, width - margin.right]);

  const yMax = Math.max(...data.flatMap(country => country.Years.map(y => Math.max(y.Movies, y.TVShows))));
  const yScale = scaleLinear()
    .domain([0, yMax])
    .range([height - margin.bottom, margin.top]);

  const colorScale = scaleOrdinal(schemeSet3);

  // 线生成器
  const movieLineGenerator = line()
    .x(d => xScale(new Date(d.year, 0, 1)))
    .y(d => yScale(d.Movies));

  const tvShowLineGenerator = line()
    .x(d => xScale(new Date(d.year, 0, 1)))
    .y(d => yScale(d.TVShows))
    // .curve(d3.curveStepAfter); // 可以用来使虚线更明显

  const [hoveredCountry, setHoveredCountry] = useState(null);

  return (
    <svg width={width} height={height}>
      {/* X 轴 */}
      <XAxis xScale={xScale} height={height - margin.bottom} />
      {/* Y 轴 */}
      <YAxis yScale={yScale} width={width - margin.left} />

      {/* 数据线 */}
      {data.map((country, idx) => (
        <g key={idx}>
          {/* 电影线 */}
          <path
            d={movieLineGenerator(country.Years)}
            stroke={colorScale(idx)}
            strokeWidth={2}
            fill="none"
            onMouseOver={() => setHoveredCountry(country)}
            onMouseOut={() => setHoveredCountry(null)}
          />
          {/* 电视剧线 */}
          <path
            d={tvShowLineGenerator(country.Years)}
            stroke={colorScale(idx)}
            strokeWidth={2}
            fill="none"
            strokeDasharray="5,5"
            onMouseOver={() => setHoveredCountry(country)}
            onMouseOut={() => setHoveredCountry(null)}
          />
        </g>
      ))}

      {/* 图例 */}
      <g transform={`translate(${width - margin.right + 20}, ${margin.top})`}>
        {data.map((country, idx) => (
          <g key={idx} transform={`translate(0, ${idx * 20})`}>
            <rect width={15} height={15} fill={colorScale(idx)} />
            <text x={20} y={12} fontSize="12">{country.country}</text>
          </g>
        ))}
      </g>

      {/* X 轴标签 */}
      <text
        x={(width - margin.left - margin.right) / 2 + margin.left}
        y={height - 10}
        textAnchor="middle"
        fontSize="14"
      >
        Year
      </text>

      {/* Y 轴标签 */}
      <text
        x={0}
        y={margin.top - 10}
        textAnchor="middle"
        fontSize="14"
        transform={`translate(15, ${height / 2}) rotate(-90)`}
      >
        Quantity
      </text>

      {/* Hovered Country Info */}
      {hoveredCountry && (
        <text
          x={width - margin.right}
          y={margin.top}
          textAnchor="end"
          fontSize="12"
          fill={colorScale(data.indexOf(hoveredCountry))}
        >
          {hoveredCountry.country}
        </text>
      )}
    </svg>
  );
}

export default Top5LineChart;
