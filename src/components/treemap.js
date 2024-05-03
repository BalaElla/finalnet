// treemap.js
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const Treemap = ({ data, width, height }) => {
  const ref = useRef();

  useEffect(() => {
    if (!data || Object.keys(data).length === 0) return;  // 检查数据是否有效

    // 选择SVG元素
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();  // 清除之前的绘图

    // 创建树状图布局
    const root = d3.hierarchy({ children: Object.values(data) }).sum(d => d.value);

    d3.treemap()
      .size([width, height])
      .padding(1)(root);

    // 绘制每个节点
    svg.selectAll('rect')
      .data(root.leaves())
      .enter()
      .append('rect')
        .attr('x', d => d.x0)
        .attr('y', d => d.y0)
        .attr('width', d => d.x1 - d.x0)
        .attr('height', d => d.y1 - d.y0)
        .style('fill', 'steelblue');

    // 添加标签
    svg.selectAll('text')
      .data(root.leaves())
      .enter()
      .append('text')
        .attr('x', d => d.x0 + 5)
        .attr('y', d => d.y0 + 20)
        .text(d => d.data.name)
        .attr('font-size', '15px')
        .attr('fill', 'white');
  }, [data]);

  return <svg ref={ref} width={width} height={height}></svg>;
};

export default Treemap;
