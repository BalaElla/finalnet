import React, { useEffect, useRef, useState } from "react";
import groupByCountry from './utils'; // Make sure to correctly import the function from utils.js
import { forceSimulation, forceX, forceY, forceCollide, scaleLinear, min, max } from "d3";

const Bubble = ({ width, height, data }) => {
    const [simulation, setSimulation] = useState(null); // 使用useState来更新仿真

    useEffect(() => {
        if (!data || !data.length) return; // Ensure data is loaded before creating simulation
        
        // Process the data using groupByCountry function
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
                // Ensure the simulation is updated on each tick
                setSimulation(simulationInstance);
            });

        // 当组件卸载时停止仿真
        return () => {
            simulationInstance.stop();
        };
    }, [data, width, height]); // Ensure useEffect runs whenever data, width, or height changes

    if (!simulation) return null; // Return null if simulation is not initialized

    return (
        <svg width={width} height={height}>
            {simulation.nodes().map((node, idx) => (
                <circle
                    key={idx}
                    cx={node.x}
                    cy={node.y}
                    r={node.radius} // Use radiusScale with node.Count
                    fill="#2a5599"
                    stroke={"black"}
                    strokeWidth={"2"}
                />
            ))}
        </svg>
    );
}

export default Bubble;
