import React from 'react'
import { Bar } from 'react-chartjs-2'

function BarChart({chartData, count}) {
    return (
        <div>
            <h3>Bar chart</h3>
            <h3>Total Views {count}</h3>
            <Bar
                style={{
                    width: '30vw',
                    minWidth: 300
                }}
                
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Shortified URL Viewss"
                        },
                        legend: {
                            display: false
                        }
                    }
                }}
            />
        </div>
    )
}

export default BarChart
