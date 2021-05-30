import React from 'react';
import { ResponsivePie } from '@nivo/pie'


const PieChart = (props) => {

    const {radius, innerText, colors, data} = props

    console.log("ThisIsData:", data)

    const innerRadius = (radius) ? radius: 0;

    const total = () => {
        var result = 0;

        for (let d of data) {
            result += d.value
        }

        return result
    }

    const format = v => `${Math.round((v/total())*100)}%`

    // const colors = { 'java': 'red', 'python': 'blue', 'php': 'green' }
    
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
                // indexBy="id"
                // valueFormat={format}
                
                // colors={['#97e3d5', '#61cdbb', '#f47560', '#e25c3b']}
                colors={(!colors) ? ['#002D73', '#A9CCE3'] : getColor}
                // borderColor="#000000"
                arcLabelsTextColor="white"
                innerRadius={innerRadius}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={2}
                margin={{ top: 15, right: 15, bottom: 15, left: 15 }}
                layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', (innerText ? CenteredMetric : null)]}
                // legends={[
                //     {
                //         anchor: 'right',
                //         direction: 'column',
                //         translateY: 0,
                //         // translateX: 100,
                //         itemWidth: 100,
                //         itemHeight: 18,
                //         itemTextColor: '#999',
                //         symbolSize: 18,
                //         symbolShape: 'circle'
                //     }
                // ]}
                // margin={{bottom: 25,}}
                enableArcLabels={false}
                // arcLabel={d => `${Math.round((d.value/total())*10000)/100}%`}
                arcLabel={d => `${format(d.value)}`}
                enableArcLinkLabels={false}
            />
        </div>
    );
}

export default PieChart;
