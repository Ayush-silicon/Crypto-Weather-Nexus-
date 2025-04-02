// src/pages/index.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../redux/slices/weatherSlice";
import { fetchCryptoData } from "../redux/slices/cryptoSlice";
import { fetchNews } from "../redux/slices/newsSlice";
import WeatherCard from "../components/WeatherCard";
import CryptoCard from "../components/CryptoCard";
import NewsItem from "../components/NewsItem";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { weather, crypto, news } = useSelector((state) => ({
    weather: state.weather,
    crypto: state.crypto,
    news: state.news,
  }));

  useEffect(() => {
    // Fetch data for predefined cities and cryptos
    ["New York", "London", "Tokyo"].forEach((city) => dispatch(fetchWeather(city)));
    dispatch(fetchCryptoData());
    dispatch(fetchNews());

    // Refresh data every 60 seconds
    const interval = setInterval(() => {
      ["New York", "London", "Tokyo"].forEach((city) => dispatch(fetchWeather(city)));
      dispatch(fetchCryptoData());
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">CryptoWeather Nexus</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Weather Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Weather</h2>
          {weather.loading && <p>Loading weather...</p>}
          {weather.error && <p className="text-red-500">Error: {weather.error}</p>}
          {Object.values(weather.data).map((data) => (
            <WeatherCard key={data.name} data={data} />
          ))}
        </div>

        {/* Cryptocurrency Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Cryptocurrency</h2>
          {crypto.loading && <p>Loading crypto...</p>}
          {crypto.error && <p className="text-red-500">Error: {crypto.error}</p>}
          {crypto.data.map((coin) => (
            <CryptoCard key={coin.id} data={coin} />
          ))}
        </div>

        {/* News Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Crypto News</h2>
          {news.loading && <p>Loading news...</p>}
          {news.error && <p className="text-red-500">Error: {news.error}</p>}
          {news.data.map((article) => (
            <NewsItem key={article.title} data={article} />
          ))}
        </div>
      </div>
    </div>
  );
}