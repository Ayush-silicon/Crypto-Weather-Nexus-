// src/pages/city/[id].js
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../../redux/slices/weatherSlice";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function CityDetail() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather.data[id]);

  useEffect(() => {
    if (id) {
      dispatch(fetchWeather(id));
    }
  }, [id, dispatch]);

  if (!weather) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  // Mock historical data for the chart
  const chartData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
    datasets: [
      {
        label: "Temperature (°C)",
        data: [weather.main.temp, 20, 22, 19, 21], // Mocked data
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{id} Weather Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <p className="text-gray-700">Temperature: {weather.main.temp}°C</p>
        <p className="text-gray-700">Humidity: {weather.main.humidity}%</p>
        <p className="text-gray-700">Conditions: {weather.weather[0].description}</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Temperature History</h2>
        <Line data={chartData} />
      </div>
    </div>
  );
}