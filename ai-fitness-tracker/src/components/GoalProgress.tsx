import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const GoalProgress = () => {
    const data = [
        { day: 'Monday', Workout: 60, Calories: 70, Steps: 80 },
        { day: 'Tuesday', Workout: 50, Calories: 45, Steps: 60 },
        { day: 'Wednesday', Workout: 40, Calories: 60, Steps: 70 },
        { day: 'Thursday', Workout: 70, Calories: 80, Steps: 95 },
        { day: 'Friday', Workout: 60, Calories: 55, Steps: 90 },
        { day: 'Saturday', Workout: 50, Calories: 65, Steps: 85 },
        { day: 'Sunday', Workout: 65, Calories: 75, Steps: 50 },
    ];

    return (
        <div className="h-full bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-bold mb-4">Goal Progress</h2>
            <div style={{ height: '400px' }}>
                <ResponsiveBar
                    data={data}
                    keys={['Workout', 'Calories', 'Steps']}
                    indexBy="day"
                    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                    padding={0.3}
                    valueScale={{ type: 'linear' }}
                    indexScale={{ type: 'band', round: true }}
                    colors={{ scheme: 'set3' }}
                    defs={[
                        {
                            id: 'dots',
                            type: 'patternDots',
                            background: 'inherit',
                            color: '#38bcb2',
                            size: 4,
                            padding: 1,
                            stagger: true
                        },
                        {
                            id: 'lines',
                            type: 'patternLines',
                            background: 'inherit',
                            color: '#eed312',
                            rotation: -45,
                            lineWidth: 6,
                            spacing: 10
                        }
                    ]}
                    fill={[
                        {
                            match: {
                                id: 'fries'
                            },
                            id: 'dots'
                        },
                        {
                            match: {
                                id: 'sandwich'
                            },
                            id: 'lines'
                        }
                    ]}
                    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Day of the Week',
                        legendPosition: 'middle',
                        legendOffset: 32
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Goal Achievement (%)',
                        legendPosition: 'middle',
                        legendOffset: -40
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                    legends={[
                        {
                            dataFrom: 'keys',
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 120,
                            translateY: 0,
                            itemsSpacing: 2,
                            itemWidth: 100,
                            itemHeight: 20,
                            itemDirection: 'left-to-right',
                            itemOpacity: 0.85,
                            symbolSize: 20,
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                    animate={true}
                    // motionStiffness={90}
                    // motionDamping={15}
                />
            </div>
        </div>
    );
};

export default GoalProgress;
