import React from "react";
import { XAxis, YAxis } from "./axes";
import { scaleLinear, scaleOrdinal, line, extent, schemeCategory10 } from 'd3';
import { useD3 } from './hooks/useD3';

function Top5LineChart({ data }) {
  const xScale = scaleLinear()
    .domain(extent(data.flatMap(d => d.Years.map(y => y.year))))
    .range([0, 800]);

  const yScale = scaleLinear()
    .domain([0, Math.max(...data.flatMap(d => d.Years.map(y => Math.max(y.Movies, y.TVShows))))])
    .range([600, 0]);

  const colorScale = scaleOrdinal(schemeCategory10);

  const lineGenerator = line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.value));

  return (
    <svg width={800} height={600}>
      <XAxis xScale={xScale} width={800} height={600} />
      <YAxis yScale={yScale} height={600} offsetX={50} />
      {data.map((countryData, idx) => (
        <g key={idx}>
          <path d={lineGenerator(countryData.Years.map(y => ({ year: y.year, value: y.Movies })))}
               stroke={colorScale(idx)} strokeWidth={2} fill="none" />
          <path d={lineGenerator(countryData.Years.map(y => ({ year: y.year, value: y.TVShows })))}
               stroke={colorScale(idx)} strokeWidth={2} fill="none" strokeDasharray="5,5" />
        </g>
      ))}
    </svg>
  );
}

export default Top5LineChart;
