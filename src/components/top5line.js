// import React, { useState } from "react";
// import { XAxis, YAxis } from "./axes";
// import { scaleTime, scaleLinear, scaleOrdinal, line, extent, schemeSet3 } from 'd3';

// function Top5LineChart({ data }) {
//   const width = 700; // 图表宽度
//   const height = 400; // 图表高度
//   const margin = { top: 20, right: 150, bottom: 50, left: 60 };

//   // 创建比例尺
//   const xScale = scaleTime()
//     .domain(extent(data.flatMap(country => country.Years.map(y => new Date(y.year, 0, 1)))))
//     .range([margin.left, width - margin.right]);

//   const yMax = Math.max(...data.flatMap(country => country.Years.map(y => Math.max(y.Movies, y.TVShows))));
//   const yScale = scaleLinear()
//     .domain([0, yMax])
//     .range([height - margin.bottom, margin.top]);

//   const colorScale = scaleOrdinal(schemeSet3);

//   // 线生成器
//   const movieLineGenerator = line()
//     .x(d => xScale(new Date(d.year, 0, 1)))
//     .y(d => yScale(d.Movies));

//   const tvShowLineGenerator = line()
//     .x(d => xScale(new Date(d.year, 0, 1)))
//     .y(d => yScale(d.TVShows));
  
//   // 用于显示和隐藏国家标签的状态
//   const [tooltipContent, setTooltipContent] = useState(null);
//   const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

//   // 处理鼠标移动事件
//   const handleMouseMove = (event, country, type) => {
//     const mouseX = event.nativeEvent.offsetX;
//     const mouseY = event.nativeEvent.offsetY;
//     setTooltipContent(`${country} (${type})`);
//     setTooltipPosition({ x: mouseX, y: mouseY });
//   };

//   // 处理鼠标移出事件
//   const handleMouseOut = () => {
//     setTooltipContent(null);
//   };

//   return (
//     <svg width={width} height={height}>
//       {/* X 轴 */}
//       <XAxis xScale={xScale} height={height - margin.bottom} />
    
//       {/* Y 轴 */}
//       <YAxis yScale={yScale} width={width - margin.left - margin.right} />
      

//       {/* 数据线 */}
//       {data.map((country, idx) => (
//         <g key={idx}>
//           {/* 电影线 */}
//           <path
//             d={movieLineGenerator(country.Years)}
//             stroke={colorScale(idx)}
//             strokeWidth={2}
//             fill="none"
//             onMouseMove={(event) => handleMouseMove(event, country.country, "Movies")}
//             onMouseOut={handleMouseOut}
//           />
//           {/* 电视剧线 */}
//           <path
//             d={tvShowLineGenerator(country.Years)}
//             stroke={colorScale(idx)}
//             strokeWidth={2}
//             fill="none"
//             strokeDasharray="5,5"
//             onMouseMove={(event) => handleMouseMove(event, country.country, "TV Shows")}
//             onMouseOut={handleMouseOut}
//           />
//         </g>
//       ))}

//       {/* 图例 */}
//       <g transform={`translate(${width - margin.right + 20}, ${margin.top})`}>
//         {data.map((country, idx) => (
//           <g key={idx} transform={`translate(0, ${idx * 20})`}>
//             <rect width={15} height={15} fill={colorScale(idx)} />
//             <text x={20} y={12} fontSize="12">{country.country}</text>
//           </g>
//         ))}
//       </g>

//       {/* Tooltip */}
//       {tooltipContent && (
//         <g transform={`translate(${tooltipPosition.x}, ${tooltipPosition.y})`}>
//           <rect width="100" height="40" fill="white" stroke="black" strokeWidth="1" />
//           <text x="5" y="20">{tooltipContent}</text>
//         </g>
//       )}

//       {/* X 轴标签 */}
//       <text
//         x={(width - margin.left - margin.right) / 2 + margin.left}
//         y={height - 10}
//         textAnchor="middle"
//         fontSize="14"
//       >
//         Year
//       </text>

//       {/* Y 轴标签 */}
//       <text
//         x={0}
//         y={margin.top -10}
//         textAnchor="middle"
//         fontSize="14"
//         transform={`translate(35, ${height / 8}) rotate(-90)`}
//       >
//         Quantity
//       </text>
//     </svg>
//   );
// }

// export default Top5LineChart;

import React from "react";
import { XAxis, YAxis } from "./axes";
import { scaleTime, scaleLinear, scaleOrdinal, line, extent, schemePaired } from 'd3';

function Top5LineChart({ data }) {
  const width = 700;
  const height = 500;
  const margin = { top: 10, right: 150, bottom: 100, left: 10 };

  const xScale = scaleTime()
    .domain(extent(data.flatMap(country => country.Years.map(y => new Date(y.year, 0, 1)))))
    .range([margin.left, width - margin.right]);

  const yMax = Math.max(...data.flatMap(country => country.Years.map(y => Math.max(y.Movies, y.TVShows))));
  const yScale = scaleLinear()
    .domain([0, yMax])
    .range([height - margin.bottom, margin.top]);

  const colorScale = scaleOrdinal(schemePaired);

  const movieLineGenerator = line()
    .x(d => xScale(new Date(d.year, 0, 1)))
    .y(d => yScale(d.Movies));

  const tvShowLineGenerator = line()
    .x(d => xScale(new Date(d.year, 0, 1)))
    .y(d => yScale(d.TVShows));


  return (
    <svg width={width} height={height}>
      <XAxis xScale={xScale} height={height - margin.bottom} />
      <YAxis yScale={yScale} left={margin.left} /> 

      {data.map((country, idx) => (
        <g key={idx}>
          <path
            d={movieLineGenerator(country.Years)}
            stroke={colorScale(idx)}
            strokeWidth={2}
            fill="none"
            
          />
          <path
            d={tvShowLineGenerator(country.Years)}
            stroke={colorScale(idx)}
            strokeWidth={2}
            fill="none"
            strokeDasharray="5,5"
        
          />
        </g>
      ))}
      {/* 添加图例 */}
      <g transform={`translate(${width - margin.right + 20}, ${margin.top})`}>
        {data.map((country, idx) => (
          <g key={idx} transform={`translate(0, ${idx * 20})`}>
            <rect width={15} height={15} fill={colorScale(idx)} />
            <text x={20} y={12} fontSize="12">{country.country}</text>
          </g>
        ))}
        {/* 线条类型图例 */}
        <g transform="translate(0, 120)">
          <text x={20} y={12} fontSize="12">Movies</text>
          <line x1={0} x2={15} y1={10} y2={10} stroke="black" strokeWidth="2"/>
        </g>
        <g transform="translate(0, 140)">
          <text x={20} y={12} fontSize="12">TV Shows</text>
          <line x1={0} x2={15} y1={10} y2={10} stroke="black" strokeWidth="2" strokeDasharray="5,5"/>
        </g>
      </g>
    </svg>
  );
}

export default Top5LineChart;

