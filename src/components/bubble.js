// import React, { useEffect, useState } from "react";
// import { forceSimulation, forceX, forceY, forceCollide, scaleLinear } from "d3";

// const Bubble = ({ width, height, data }) => {
//     const [nodes, setNodes] = useState([]);

//     useEffect(() => {
//         console.log("Data received in Bubble component:", data); // Log the data for debugging

//         if (!data || data.length === 0) {
//             return; // If no data is provided, do nothing
//         }

//         // Assume 'data' is already in the form expected and includes TotalCount
//         const processedData = data;

//         // Mark the top five countries based on TotalCount
//         processedData.forEach((d, index) => d.isTop = index < 5);

//         // Set up a scale for the bubble radii
//         const radiusScale = scaleLinear()
//             .domain([0, processedData[0]?.TotalCount || 0]) // Safely access TotalCount
//             .range([10, width * 0.15]); // Define the range of the circle sizes

//         // Setup the simulation with forces
//         const simulationInstance = forceSimulation(processedData)
//             .force("x", forceX(width / 2).strength(0.1))
//             .force("y", forceY(height / 2).strength(0.1))
//             .force("collide", forceCollide(d => radiusScale(d.TotalCount) + 2))
//             .on("tick", () => {
//                 setNodes(processedData.map(node => ({
//                     ...node,
//                     radius: radiusScale(node.TotalCount)
//                 })));
//             });

//         // Cleanup function to stop the simulation when the component unmounts
//         return () => simulationInstance.stop();
//     }, [data, width, height]); // Depend on data, width, and height

//     // Render nothing if there are no nodes
//     if (!nodes.length) return null;

//     // Render the SVG with circles for each node
//     return (
//         <svg width={width} height={height}>
//             {nodes.map((node, idx) => (
//                 <circle
//                     key={idx}
//                     cx={node.x}
//                     cy={node.y}
//                     r={node.radius}
//                     fill={node.isTop ? "#ff4747" : "#2a5599"} // Use red for top countries, blue for others
//                     stroke={node.isTop ? "gold" : "black"} // Gold stroke for top countries
//                     strokeWidth="2"
//                 />
//             ))}
//         </svg>
//     );
// }

// export default Bubble;

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3"; // 导入 D3 库
import { forceSimulation, forceX, forceY, forceCollide, scaleLinear } from "d3";

const Bubble = ({ width, height, data }) => {
    const [nodes, setNodes] = useState([]);
    const [tooltipContent, setTooltipContent] = useState(""); // State for tooltip content
    const [tooltipVisible, setTooltipVisible] = useState(false); // State for tooltip visibility

    const d3Container = useRef(null); // Create a ref for the SVG container

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
                d3Container.current.innerHTML = ""; // Clear the SVG container
                const svg = d3.select(d3Container.current); // Select the SVG container
                // Render circles for each node
                svg.selectAll("circle")
                    .data(processedData)
                    .enter()
                    .append("circle")
                    .attr("cx", d => d.x)
                    .attr("cy", d => d.y)
                    .attr("r", d => radiusScale(d.TotalCount))
                    .attr("fill", d => d.isTop ? "#FFA07A" : "#AEC8EB")
                    .attr("stroke", d => d.isTop ? "#FFA07A" : "#AEC8EB")
                    .attr("stroke-width", "2")
                    // Add mouseover event listener to show tooltip
                    .on("mouseover", (event, d) => {
                        setTooltipContent(`Country: ${d.Country}<br/>Movies: ${d.MovieCount}<br/>TV Shows: ${d.TvCount}`);
                        setTooltipVisible(true);
                    })
                    // Add mouseout event listener to hide tooltip
                    .on("mouseout", () => {
                        setTooltipVisible(false);
                    });
            });

        // Cleanup function to stop the simulation when the component unmounts
        return () => simulationInstance.stop();
    }, [data, width, height]); // Depend on data, width, and height

    // Render the SVG container
    return (
        <div style={{ position: "relative", width: width, height: height }}>
            {tooltipVisible && (
                <div
                    style={{
                        position: "absolute",
                        left: "0px",
                        top: "0px",
                        background: "white",
                        border: "1px solid black",
                        padding: "5px",
                        zIndex: 999
                    }}
                    dangerouslySetInnerHTML={{ __html: tooltipContent }}
                />
            )}
            <svg
                className="d3-component"
                width={width}
                height={height}
                ref={d3Container}
            />
        </div>
    );
}

export default Bubble;




