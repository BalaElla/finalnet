import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const Treemap = ({ data, width, height }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove(); // 清除之前的绘图

    const tooltip = d3.select(".tooltip"); // 确保 tooltip 使用现有的 CSS 类

    const root = d3.hierarchy({ children: data }).sum(d => d.value);
    d3.treemap().size([width, height]).padding(2)(root);

    const cell = svg.selectAll("g")
      .data(root.leaves())
      .enter().append("g")
        .attr("transform", d => `translate(${d.x0},${d.y0})`);

    cell.append('rect')
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .attr('fill', d => d3.scaleOrdinal(d3.schemeCategory10)(d.data.name))
      .on("mouseover", (event, d) => {
        tooltip.style("visibility", "visible")
               .text(d.data.name + " (" + d.value + ")");
      })
      .on("mousemove", (event) => {
        tooltip.style("top", (event.pageY - 10) + "px")
               .style("left", (event.pageX + 10) + "px");
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });

    // 如果需要显示国家名称
    svg.selectAll(".title")
      .data(root.descendants().filter(d => d.depth === 1))
      .enter().append('text')
      .attr('x', d => d.x0 + 6)
      .attr('y', d => d.y0 + 20)
      .text(d => d.data.name)
      .attr('font-size', '16px')
      .attr('font-weight', 'bold')
      .attr('fill', 'white');

  }, [data]);

  return <svg ref={ref} width={width} height={height}></svg>;
};

export default Treemap;

