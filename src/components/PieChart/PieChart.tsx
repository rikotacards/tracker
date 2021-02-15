import React from "react";
import Chart from "chart.js";
import { formatTime } from "src/utils/formatTime";

interface PieChartProps {
  labels: string[];
  data: number[];
}

export const PieChart: React.FC<PieChartProps> = ({ labels, data }) => {
  const chartRef = React.createRef();
  React.useEffect(() => {
    // @ts-ignore
    const ctx = chartRef.current.getContext("2d");
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: labels || [
          "Red",
          "Blue",
          "Yellow",
          "Green",
          "Purple",
          "Orange"
        ],
        datasets: [
          {
            data: data || [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        tooltips: {
          callbacks: {
            label:
              //@ts-ignore
              (tooltipItem, data: Chart.ChartDarta) => {
                if (tooltipItem?.index === undefined) {
                  return "";
                }
                let label = labels[tooltipItem.index] || "";
               
                const time = formatTime(
                    (Number(data.datasets[0].data[tooltipItem.index]) as number) /
                      1000
                  )
                    const hours = time.hours;
                    const minutes = time.minutes;
                return `${label} :` + `${hours} hours, ${minutes} min`
              },
            footer: (tooltipItem, data) => {
              if (!tooltipItem.length) {
                return "No data"
              }
              if (!data?.datasets?.length) {
                return "No data";
              }
              if (!data.datasets[0]?.data?.length) {
                return "No data";
              }
              //@ts-ignore
              const sumDuration = () => {
                let sum = 0;
                //@ts-ignore
                  data.datasets[0].data.forEach(dataPoint => {
                const value = dataPoint
                sum = sum + value;
              })
            return sum
            }
            const index = tooltipItem?.[0]?.index || 0;
              const sum = sumDuration()
              //@ts-ignore
              const percentage = Math.floor((+data.datasets?.[0]?.data[index] / sum)*100)
              return`${percentage}% of logged time`
            }
          }
        }
      }
    });
  });

  return (
    <canvas
      width="400"
      height="400"
      ref={chartRef as React.RefObject<HTMLCanvasElement>}
    />
  );
};
