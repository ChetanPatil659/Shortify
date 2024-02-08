import React from 'react'
import { Pie } from 'react-chartjs-2'

function PieChart({ chartData, count }) {

    return (
        <div className=''>
            <h3>Pie chart</h3>
            <h3>Total Views {count}</h3>
            <Pie
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

export default PieChart



