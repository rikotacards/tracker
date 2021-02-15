import React from 'react'; 
import Chart from 'chart.js';

interface PieChartProps {
    labels: string[];
    data: number[]
}

export const PieChart: React.FC<PieChartProps> = ({labels, data}) => {
    const chartRef = React.createRef();
    React.useEffect(() => {
        // @ts-ignore
        const ctx = chartRef.current.getContext('2d')
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels|| ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    data: data || [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                // scales: {
                //     yAxes: [{
                //         ticks: {
                //             beginAtZero: true
                //         }
                //     }]
                // }
            }
        });
    

    })
    
    return(
        <canvas width="400" height="400" ref={chartRef as React.RefObject<HTMLCanvasElement>}/>
    )
}