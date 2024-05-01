// components/Bubble.js

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Bubble = ({ data }) => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (data && d3Container.current) {
      const svg = d3.select(d3Container.current);
      svg.selectAll("*").remove();

      const width = 800;
      const height = 600;

      const xScale = d3.scaleLinear()
        .domain([Math.min(...data.map(d => d.date_added)), Math.max(...data.map(d => d.date_added))])
        .range([0, width]);

      const yScale = d3.scaleLinear()
        .domain([0, Math.max(...data.map(d => d.Movie + d.TV_Show))])
        .range([height, 0]);

      svg.append('g')
        .attr('transform', `translate(50, ${height - 50})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format('d')));

      svg.append('g')
        .attr('transform', 'translate(50, 50)')
        .call(d3.axisLeft(yScale));

      svg.append('g')
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
          .attr("cx", d => 50 + xScale(d.date_added))
          .attr("cy", d => yScale(d.Movie + d.TV_Show) + 50)
          .attr("r", 20)
          .style("fill", "#69b3a2")
          .style("opacity", "0.7")
          .attr("stroke", "black");

      const tooltip = d3.select('body').append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);

      svg.selectAll("circle")
        .on('mouseover', (event, d) => {
          tooltip.transition()
            .duration(200)
            .style('opacity', 1);
          tooltip.html(`Country: ${d.Country}<br/>Year: ${d.date_added}<br/>Productions: ${d.Movie + d.TV_Show}`)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 28) + 'px');
        })
        .on('mouseout', () => {
          tooltip.transition()
            .duration(500)
            .style('opacity', 0);
        });
    }
  }, [data]);

  return (
    <svg
      className="d3-component"
      width={800}
      height={600}
      ref={d3Container}
    />
  );
};

export default Bubble;
