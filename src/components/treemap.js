// // treemap.js
// import React, { useRef, useEffect } from 'react';
// import * as d3 from 'd3';

// const Treemap = ({ data, width, height }) => {
//   const ref = useRef();

//   useEffect(() => {
//     if (!data || Object.keys(data).length === 0) return;  // 检查数据是否有效

//     // 选择SVG元素
//     const svg = d3.select(ref.current);
//     svg.selectAll("*").remove();  // 清除之前的绘图

//     // 创建树状图布局
//     const root = d3.hierarchy({ children: Object.values(data) }).sum(d => d.value);

//     d3.treemap()
//       .size([width, height])
//       .padding(1)(root);

//     // 绘制每个节点
//     svg.selectAll('rect')
//       .data(root.leaves())
//       .enter()
//       .append('rect')
//         .attr('x', d => d.x0)
//         .attr('y', d => d.y0)
//         .attr('width', d => d.x1 - d.x0)
//         .attr('height', d => d.y1 - d.y0)
//         .style('fill', 'steelblue');

//     // 添加标签
//     svg.selectAll('text')
//       .data(root.leaves())
//       .enter()
//       .append('text')
//         .attr('x', d => d.x0 + 5)
//         .attr('y', d => d.y0 + 20)
//         .text(d => d.data.name)
//         .attr('font-size', '15px')
//         .attr('fill', 'white');
//   }, [data]);

//   return <svg ref={ref} width={width} height={height}></svg>;
// };

// export default Treemap;

// treemap.js
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const Treemap = ({ data, width, height }) => {
  const ref = useRef();
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10); // 使用 D3 的颜色方案

  useEffect(() => {
    if (!data || data.length === 0) return; // 检查数据是否有效

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove(); // 清除之前的绘图

    const root = d3.hierarchy({ children: data }).sum(d => d.value);

    d3.treemap().size([width, height]).padding(2)(root);

    const cell = svg.selectAll("g")
      .data(root.leaves())
      .enter().append("g")
        .attr("transform", d => `translate(${d.x0},${d.y0})`);

    cell.append('rect')
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .attr('fill', d => colorScale(d.parent.data.name)) // 根据 parent name 着色
      .on("mouseover", (event, d) => {
        // 在鼠标悬停时显示提示
        tooltip.text(d.data.name + ": " + d.value);
        tooltip.style("visibility", "visible");
      })
      .on("mousemove", (event) => {
        tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });

    cell.append('text')
      .attr('dx', 4)
      .attr('dy', 14)
      .text(d => d.data.name);

    // 添加用于显示提示的元素
    const tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .text("a simple tooltip");

  }, [data, colorScale]);

  return <svg ref={ref} width={width} height={height}></svg>;
};

export default Treemap;
