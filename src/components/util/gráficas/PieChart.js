import React from 'react';

import { ResponsivePie } from '@nivo/pie'


const PieChart = (props) => {

    const {radius, innerText, colors, data} = props

    const innerRadius = (radius) ? radius: 0;

    const total = () => {
        var result = 0;

        for (let d of data) {
            result += d.value
        }

        return result
    }

    const format = v => `${Math.round((v/total())*100)}%`
    
    const getColor = bar => colors[bar.id]

    const CenteredMetric = ({centerX, centerY }) => {
        return (
            <text
                x={centerX}
                y={centerY}
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                    fontSize: '28px',
                    fontWeight: '600',
                }}
            >
                {innerText}
            </text>
        )
    }

    return (
        <div style={{ height: "100%" }}>
            <ResponsivePie
                data={data}
                keys={["label"]}
                colors={(!colors) ? ['#002D73', '#A9CCE3'] : getColor}
                arcLabelsTextColor="white"
                innerRadius={innerRadius}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={2}
                margin={{ top: 15, right: 15, bottom: 15, left: 15 }}
                layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', (innerText ? CenteredMetric : null)]}
                enableArcLabels={false}
                arcLabel={d => `${format(d.value)}`}
                enableArcLinkLabels={false}
            />
        </div>
    );
}

export default PieChart;
