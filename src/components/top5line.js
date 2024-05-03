// import React, { useState } from "react";
// import { XAxis, YAxis } from "./axes";
// import { scaleLinear, scaleOrdinal, line, extent, schemeCategory10 } from 'd3';

// function Top5LineChart({ data }) {
//   const width = 600; // 设置图表宽度
//   const height = 400; // 设置图表高度

//   // 计算电影和电视节目的最大数量，以便确定纵坐标范围
//   const maxMovieCount = Math.max(...data.flatMap(d => d.Years.map(y => y.Movies)));
//   const maxTVShowCount = Math.max(...data.flatMap(d => d.Years.map(y => y.TVShows)));

//   // 创建比例尺
//   const xScale = scaleLinear()
//     .domain(extent(data.flatMap(d => d.Years.map(y => y.year))))
//     .range([0, width]);

//   const yScale = scaleLinear()
//     .domain([0, Math.max(maxMovieCount, maxTVShowCount)])
//     .range([height, 0]);

//   const colorScale = scaleOrdinal(schemeCategory10);

//   const lineGenerator = line()
//     .x(d => xScale(d.year))
//     .y(d => yScale(d.value));

//   // 用于显示和隐藏国家标签的状态
//   const [tooltipContent, setTooltipContent] = useState(null);
//   const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

//   // 处理鼠标移动事件
//   const handleMouseMove = (event, country) => {
//     const mouseX = event.nativeEvent.offsetX;
//     const mouseY = event.nativeEvent.offsetY;
//     setTooltipContent(country);
//     setTooltipPosition({ x: mouseX, y: mouseY });
//   };

//   // 处理鼠标移出事件
//   const handleMouseOut = () => {
//     setTooltipContent(null);
//   };

//   return (
//     // <svg width={width} height={height}>
//     //   {/* 添加横坐标标签 */}
//     //   <text x={width / 2} y={height + 40} textAnchor="middle" fill="black">
//     //     year
//     //   </text>
//     //   {/* 添加纵坐标标签 */}
//     //   <text x={-height / 2} y={-50} transform={`rotate(-90)`} textAnchor="middle" fill="black">
//     //     count
//     //   </text>
//     //   {/* 渲染横纵坐标 */}
//     //   <XAxis xScale={xScale} width={width} height={height} />
//     //   <YAxis yScale={yScale} height={height} offsetX={50} />

//         <svg width={width} height={height}>
//       {/* 添加横坐标标签 */}
//       <text x={width / 2} y={height + 40} textAnchor="middle" fill="black">
//         Year
//       </text>
//       {/* 添加纵坐标标签 */}
//       <text
//         x={-height / 2} y={-50}
//         transform="rotate(-90)"
//         transform-origin="center"
//         textAnchor="middle"
//         fill="black"
//       >
//         Count
//       </text>
//       {/* 渲染横纵坐标 */}
//       <XAxis xScale={xScale} width={width} height={height} />
//       <YAxis yScale={yScale} height={height} offsetX={50} />

//       {/* 渲染电影和电视节目的线条和标签 */}
//       {data.map((countryData, idx) => (
//         <g key={idx}>
//           {/* 渲染电影的线条 */}
//           <path d={lineGenerator(countryData.Years.map(y => ({ year: y.year, value: y.Movies })))}
//                stroke={colorScale(idx)} strokeWidth={2} fill="none"
//                onMouseMove={(event) => handleMouseMove(event, `${countryData.country} (Movies)`)}
//                onMouseOut={handleMouseOut} />
//           {/* 渲染电视节目的线条 */}
//           <path d={lineGenerator(countryData.Years.map(y => ({ year: y.year, value: y.TVShows })))}
//                stroke={colorScale(idx)} strokeWidth={2} fill="none" strokeDasharray="5,5"
//                onMouseMove={(event) => handleMouseMove(event, `${countryData.country} (TV Shows)`)}
//                onMouseOut={handleMouseOut} />
//         </g>
//       ))}
//       {/* 渲染国家标签 */}
//       {tooltipContent && (
//         <g transform={`translate(${tooltipPosition.x}, ${tooltipPosition.y})`}>
//           <rect x={5} y={-20} width={tooltipContent.length * 8} height={20} fill="white" stroke="black" strokeWidth="1" />
//           <text x={10} y={-5} fill="black">{tooltipContent}</text>
//         </g>
//       )}
//       {/* 添加图例 */}
//       <g transform={`translate(${width - 150}, 30)`}>
//         {data.map((countryData, idx) => (
//           <g key={idx} transform={`translate(0, ${idx * 20})`}>
//             <rect width="15" height="15" fill={colorScale(idx)} />
//             <text x="20" y="12" fill="black">{countryData.country}</text>
//           </g>
//         ))}
//         <g transform={`translate(0, ${data.length * 20 + 10})`}>
//           <line x1="0" x2="15" y1="10" y2="10" stroke="black" strokeWidth="2" />
//           <text x="20" y="12" fill="black">Movies</text>
//         </g>
//         <g transform={`translate(0, ${data.length * 20 + 30})`}>
//           <line x1="0" x2="15" y1="10" y2="10" stroke="black" strokeWidth="2" strokeDasharray="5,5" />
//           <text x="20" y="12" fill="black">TV Shows</text>
//         </g>
//       </g>
//     </svg>
//   );
// }

// export default Top5LineChart;

import React, { useState } from "react";
import { XAxis, YAxis } from "./axes";
import { scaleLinear, scaleOrdinal, line, extent, schemeCategory10 } from 'd3';

function Top5LineChart({ data }) {
  const width = 600; // 设置图表宽度
  const height = 400; // 设置图表高度

  // 计算电影和电视节目的最大数量，以便确定纵坐标范围
  const maxMovieCount = Math.max(...data.flatMap(d => d.Years.map(y => y.Movies)));
  const maxTVShowCount = Math.max(...data.flatMap(d => d.Years.map(y => y.TVShows)));

  // 创建比例尺
  const xScale = scaleLinear()
    .domain(extent(data.flatMap(d => d.Years.map(y => y.year))))
    .range([0, width]);

  const yScale = scaleLinear()
    .domain([0, Math.max(maxMovieCount, maxTVShowCount)])
    .range([height, 0]);

  const colorScale = scaleOrdinal(schemeCategory10);

  const lineGenerator = line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.value));

  // 用于显示和隐藏国家标签的状态
  const [tooltipContent, setTooltipContent] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // 处理鼠标移动事件
  const handleMouseMove = (event, country) => {
    const mouseX = event.nativeEvent.offsetX;
    const mouseY = event.nativeEvent.offsetY;
    setTooltipContent(country);
    setTooltipPosition({ x: mouseX, y: mouseY });
  };

  // 处理鼠标移出事件
  const handleMouseOut = () => {
    setTooltipContent(null);
  };

  return (
    <svg width={width} height={height}>
      {/* 添加横坐标标签 */}
      <g transform={`translate(${width / 2}, ${height + 40})`}>
        <text textAnchor="middle" fill="black">
          Year
        </text>
      </g>
      {/* 添加纵坐标标签 */}
      <g transform={`translate(${-height / 2}, ${-50}) rotate(-90)`}>
        <text textAnchor="middle" fill="black">
          Count
        </text>
      </g>
      {/* 渲染横纵坐标 */}
      <XAxis xScale={xScale} height={height} width={width} axisLabel={"Year"} />
      <YAxis yScale={yScale} height={height} offsetX={50} axisLabel={"Count"} />

      {/* 渲染电影和电视节目的线条和标签 */}
      {data.map((countryData, idx) => (
        <g key={idx}>
          {/* 渲染电影的线条 */}
          <path d={lineGenerator(countryData.Years.map(y => ({ year: y.year, value: y.Movies })))}
               stroke={colorScale(idx)} strokeWidth={2} fill="none"
               onMouseMove={(event) => handleMouseMove(event, `${countryData.country} (Movies)`)}
               onMouseOut={handleMouseOut} />
          {/* 渲染电视节目的线条 */}
          <path d={lineGenerator(countryData.Years.map(y => ({ year: y.year, value: y.TVShows })))}
               stroke={colorScale(idx)} strokeWidth={2} fill="none" strokeDasharray="5,5"
               onMouseMove={(event) => handleMouseMove(event, `${countryData.country} (TV Shows)`)}
               onMouseOut={handleMouseOut} />
        </g>
      ))}
      {/* 渲染国家标签 */}
      {tooltipContent && (
        <g transform={`translate(${tooltipPosition.x}, ${tooltipPosition.y})`}>
          <rect x={5} y={-20} width={tooltipContent.length * 8} height={20} fill="white" stroke="black" strokeWidth="1" />
          <text x={10} y={-5} fill="black">{tooltipContent}</text>
        </g>
      )}
      {/* 添加图例 */}
      <g transform={`translate(${width - 100}, 30)`}>
        {data.map((countryData, idx) => (
          <g key={idx} transform={`translate(0, ${idx * 20})`}>
            <rect width="10" height="10" fill={colorScale(idx)} />
            <text x="15" y="8" fill="black" fontSize="10">{countryData.country}</text>
          </g>
        ))}
        <g transform={`translate(0, ${data.length * 20 + 10})`}>
          <line x1="0" x2="15" y1="5" y2="5" stroke="black" strokeWidth="2" />
          <text x="20" y="8" fill="black" fontSize="10">Movies</text>
        </g>
        <g transform={`translate(0, ${data.length * 20 + 25})`}>
          <line x1="0" x2="15" y1="5" y2="5" stroke="black" strokeWidth="2" strokeDasharray="5,5" />
          <text x="20" y="8" fill="black" fontSize="10">TV Shows</text>
        </g>
      </g>
    </svg>
  );
}

export default Top5LineChart;