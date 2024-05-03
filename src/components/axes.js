import React from "react";

export { XAxis, YAxis };

function YAxis(props) {
    const { yScale, height, offsetX } = props;

    return (
        <g className="axis axis--y">
            <line x1={0} x2={0} y1={0} y2={height} stroke="red" strokeWidth="2" />
            {yScale.ticks().map(tickValue => (
                <g key={tickValue} transform={`translate(0, ${yScale(tickValue)})`}>
                    <line x1={-5} x2={0} stroke="red" strokeWidth="2" />
                    <text
                        x={-10 - offsetX}
                        y={0}
                        dy=".32em"
                        style={{ textAnchor: "end", fontSize: "12px", fill: "red" }}
                    >
                        {tickValue}
                    </text>
                </g>
            ))}
        </g>
    );
}

function XAxis(props) {
    const { xScale, width, height } = props;

    return (
        <g className="axis axis--x" transform={`translate(0, ${height})`}>
            <line x1={0} x2={width} stroke="blue" strokeWidth="2" />
            {xScale.ticks(5).map(tickValue => (
                <g key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
                    <line y1={0} y2={10} stroke="blue" strokeWidth="2" />
                    <text
                        x={0}
                        y={20}
                        dy=".71em"
                        style={{ textAnchor: "middle", fontSize: "12px", fill: "blue" }}
                    >
                        {tickValue}
                    </text>
                </g>
            ))}
        </g>
    );
}
