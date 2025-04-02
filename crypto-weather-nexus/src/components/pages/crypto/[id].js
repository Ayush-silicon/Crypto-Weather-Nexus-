// src/pages/crypto/[id].js
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCryptoData } from "../../redux/slices/cryptoSlice";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function CryptoDetail() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const cryptoData = useSelector((state) => state.crypto.data.find((coin) => coin.id === id));

  useEffect(() => {
    if (id) {
      dispatch(fetchCryptoData());
    }
  }, [id, dispatch]);

  if (!cryptoData) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  // Mock historical pricing data for the chart
  const chartData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
    datasets: [
      {
        label: "Price (USD)",
        data: [cryptoData.current_price, 60000, 62000, 61000, 63000], // Mocked data
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{cryptoData.name} Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <p className="text-gray-700">Price: ${cryptoData.current_price.toLocaleString()}</p>
        <p className={`text-gray-700 ${cryptoData.price_change_percentage_24h < 0 ? "text-red-500" : "text-green-500"}`}>
          24h Change: {cryptoData.price_change_percentage_24h.toFixed(2)}%
        </p>
        <p className="text-gray-700">Market Cap: ${cryptoData.market_cap.toLocaleString()}</p>
        <p className="text-gray-700">Total Volume: ${cryptoData.total_volume.toLocaleString()}</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Price History</h2>
        <Line data={chartData} />
      </div>
    </div>
  );
}