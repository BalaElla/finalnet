// import React, { useRef, useEffect } from 'react';
// import * as d3 from 'd3';

// const Treemap = ({ data, width, height }) => {
//   const ref = useRef();
  
//   useEffect(() => {
//     const svg = d3.select(ref.current);
//     svg.selectAll("*").remove(); // 清除之前的绘图

//     // 创建颜色比例尺
//     const colorScale = d3.scaleOrdinal(d3.schemeSet3);

//     // 创建 tooltip
//     const tooltip = d3.select("body").append("div")
//       .attr("class", "tooltip")
//       .style("opacity", 0);

//     const root = d3.hierarchy({ children: data }).sum(d => d.value);
//     d3.treemap().size([width, height]).padding(2)(root);

//     const cell = svg.selectAll("g")
//       .data(root.leaves())
//       .enter().append("g")
//         .attr("transform", d => `translate(${d.x0},${d.y0})`);

//     cell.append('rect')
//       .attr('width', d => d.x1 - d.x0)
//       .attr('height', d => d.y1 - d.y0)
//       .attr('fill', d => colorScale(d.data.name)) // 根据 genre 名称设定颜色
//       .on("mouseover", function(event, d) {
//         tooltip.transition()
//           .duration(200)
//           .style("opacity", .9);
//         tooltip.html(d.data.name + " (" + d.value + ")")
//           .style("left", (event.pageX) + "px")
//           .style("top", (event.pageY - 28) + "px");
//       })
//       .on("mouseout", function(d) {
//         tooltip.transition()
//           .duration(500)
//           .style("opacity", 0);
//       });

//     // 添加国家名称
//     svg.selectAll(".title")
//       .data(root.descendants().filter(d => d.depth === 1))
//       .enter().append('text')
//       .attr('x', d => d.x0 + 6)
//       .attr('y', d => d.y0 + 20)
//       .text(d => d.data.name)
//       .attr('font-size', '16px')
//       .attr('font-weight', 'bold')
//       .attr('fill', 'white');

//   }, [data, width, height]);

//   return <svg ref={ref} width={width} height={height} style={{margin: '10px'}}></svg>;
// };

// export default Treemap;

import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const Treemap = ({ data }) => {
  const width = 600; // 设置图表宽度
  const height = 400; // 设置图表高度
  const ref = useRef();
  
  useEffect(() => {
    const svg = d3.select(ref.current)
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("*").remove(); // 清除之前的绘图

    // 创建颜色比例尺
    const colorScale = d3.scaleOrdinal(d3.schemeSet3);

    // 创建 tooltip
    const tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    const root = d3.hierarchy({ children: data }).sum(d => d.value);
    d3.treemap().size([width, height]).padding(2)(root);

    const cell = svg.selectAll("g")
      .data(root.leaves())
      .enter().append("g")
        .attr("transform", d => `translate(${d.x0},${d.y0})`);

    cell.append('rect')
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .attr('fill', d => colorScale(d.data.name)) // 根据 genre 名称设定颜色
      .on("mouseover", function(event, d) {
        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        tooltip.html(d.data.name + " (" + d.value + ")")
          .style("left", (event.pageX) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      });

    // 添加国家名称
    svg.selectAll(".title")
      .data(root.descendants().filter(d => d.depth === 1))
      .enter().append('text')
      .attr('x', d => d.x0 + (d.x1 - d.x0) / 2)
      .attr('y', d => d.y0 + 20)
      .text(d => d.data.name)
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .attr('fill', '#333')
      .attr('text-anchor', 'middle');

  }, [data, width, height]);

  return <svg ref={ref} style={{ display: 'block', margin: 'auto' }}></svg>;
};

export default Treemap;


