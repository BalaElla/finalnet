import React, { useEffect, useRef, useState } from "react";
import groupByCountry from './utils'; // Make sure to correctly import the function from utils.js
import { forceSimulation, forceX, forceY, forceCollide, scaleLinear, min, max } from "d3";

const Bubble = ({ width, height, data }) => {
    const [nodes, setNodes] = useState([]);

    useEffect(() => {
        if (!data || !data.length) return;

        const processedData = groupByCountry(data);
        let radiusScale = scaleLinear()
            .range([2, width * 0.15])
            .domain([min(processedData, d => d.Count), max(processedData, d => d.Count)]);

        const simulationInstance = forceSimulation(processedData)
            .force("x", forceX(width / 2).strength(0.02))
            .force("y", forceY(height / 2).strength(0.02))
            .force("collide", forceCollide(d => radiusScale(d.Count)))
            .velocityDecay(0.2)
            .on("tick", () => {
                // Update nodes state on each tick
                setNodes([...simulationInstance.nodes()]);
            });

        return () => {
            simulationInstance.stop();
        };
    }, [data, width, height]);

    if (!nodes.length) return null;

    return (
        <svg width={width} height={height}>
            {nodes.map((node, idx) => (
                <circle
                    key={idx}
                    cx={node.x}
                    cy={node.y}
                    r={radiusScale(node.Count)}
                    fill="#2a5599"
                    stroke="black"
                    strokeWidth="2"
                />
            ))}
        </svg>
    );
}

export default Bubble
