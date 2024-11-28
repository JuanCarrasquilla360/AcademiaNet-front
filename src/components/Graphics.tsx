// import { Box } from "@mui/material";
// import {
//     CategoryScale,
//     Chart as ChartJS,
//     Filler,
//     Legend,
//     LinearScale,
//     LineElement,
//     PointElement,
//     Title,
//     Tooltip
// } from "chart.js";
// import { FC } from "react";
// import { Line } from "react-chartjs-2";

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// interface LineChartProps {
//   data: number[];
//   labels: string[];
//   title: string;
//   borderColor?: string;
//   backgroundColor?: string;
// }

// const LineChart: FC<LineChartProps> = ({ 
//   data, 
//   labels, 
//   title, 
//   borderColor = "rgba(75,192,192,1)",  
//   backgroundColor = "rgba(75,192,192,0.2)" 
// }) => {

//   const chartData = {
//     labels: labels,
//     datasets: [
//       {
//         label: title,
//         data: data,
//         borderColor: borderColor,
//         backgroundColor: backgroundColor,
//         fill: true,
//         tension: 0.4,
//         pointRadius: 5,
//         pointHoverRadius: 8,
//         pointBorderColor: "#fff",
//         pointBackgroundColor: borderColor,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: true,
//         position: "top" as const,
//         labels: {
//           color: "#333",
//         },
//       },
//       title: {
//         display: true,
//         text: title,
//         color: "#333",
//         font: {
//           size: 20,
//         },
//       },
//       tooltip: {
//         enabled: true,
//         backgroundColor: "rgba(0,0,0,0.8)",
//         bodyColor: "#fff",
//         borderColor: "#ccc",
//         borderWidth: 1,
//         padding: 10,
//         callbacks: {
//           label: function (tooltipItem: any) {
//             return `Valor: ${tooltipItem.raw}`;
//           },
//         },
//       },
//     },
//     scales: {
//       x: {
//         grid: {
//           display: false,
//         },
//         ticks: {
//           color: "#666",
//           font: {
//             size: 14,
//           },
//         },
//       },
//       y: {
//         grid: {
//           color: "rgba(200, 200, 200, 0.3)",
//         },
//         ticks: {
//           color: "#666",
//           font: {
//             size: 14,
//           },
//           beginAtZero: true,
//         },
//       },
//     },
//   };

//   return (
//     <Box 
//       sx={{ 
//         width: "100%", 
//         height: "400px", 
//         margin: "auto", 
//         padding: 2, 
//         backgroundColor: "var(--color-background-100)",
//         borderRadius: "8px", 
//         boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
//         transition: "background-color 0.3s ease, box-shadow 0.3s ease",
//       }}
//     >
//       <Line data={chartData} options={options} />
//     </Box>
//   );
// };

// export default LineChart;
