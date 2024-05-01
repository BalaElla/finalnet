import React, { useEffect, useState } from "react";
import { forceSimulation, forceX, forceY, forceCollide, scaleLinear } from "d3";

const Bubble = ({ width, height, data }) => {
    const [nodes, setNodes] = useState([]);

    useEffect(() => {
        console.log("Data received in Bubble component:", data); // Log the data for debugging

        if (!data || data.length === 0) {
            return; // If no data is provided, do nothing
        }

        // Assume 'data' is already in the form expected and includes TotalCount
        const processedData = data;

        // Mark the top five countries based on TotalCount
        processedData.forEach((d, index) => d.isTop = index < 5);

        // Set up a scale for the bubble radii
        const radiusScale = scaleLinear()
            .domain([0, processedData[0]?.TotalCount || 0]) // Safely access TotalCount
            .range([10, width * 0.15]); // Define the range of the circle sizes

        // Setup the simulation with forces
        const simulationInstance = forceSimulation(processedData)
            .force("x", forceX(width / 2).strength(0.1))
            .force("y", forceY(height / 2).strength(0.1))
            .force("collide", forceCollide(d => radiusScale(d.TotalCount) + 2))
            .on("tick", () => {
                setNodes(processedData.map(node => ({
                    ...node,
                    radius: radiusScale(node.TotalCount)
                })));
            });

        // Cleanup function to stop the simulation when the component unmounts
        return () => simulationInstance.stop();
    }, [data, width, height]); // Depend on data, width, and height

    // Render nothing if there are no nodes
    if (!nodes.length) return null;

    // Render the SVG with circles for each node
    return (
        <svg width={width} height={height}>
            {nodes.map((node, idx) => (
                <circle
                    key={idx}
                    cx={node.x}
                    cy={node.y}
                    r={node.radius}
                    fill={node.isTop ? "#ff4747" : "#2a5599"} // Use red for top countries, blue for others
                    stroke={node.isTop ? "gold" : "black"} // Gold stroke for top countries
                    strokeWidth="2"
                />
            ))}
        </svg>
    );
}

export default Bubble;




