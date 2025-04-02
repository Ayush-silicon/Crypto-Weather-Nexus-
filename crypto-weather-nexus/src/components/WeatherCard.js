// src/components/WeatherCard.js
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../redux/slices/favoritesSlice";

export default function WeatherCard({ data }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.cities);

  const isFavorite = favorites.includes(data.name);

  const handleFavorite = () => {
    dispatch(addFavorite({ type: "city", id: data.name }));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition">
      <div className="flex justify-between items-center">
        <Link href={`/city/${data.name}`}>
          <h3 className="text-lg font-semibold text-blue-600 hover:underline cursor-pointer">
            {data.name}
          </h3>
        </Link>
        <button
          onClick={handleFavorite}
          className={`text-2xl ${isFavorite ? "text-red-500" : "text-gray-400"}`}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>
      <p className="text-gray-700">Temperature: {data.main.temp}°C</p>
      <p className="text-gray-700">Humidity: {data.main.humidity}%</p>
      <p className="text-gray-700">Conditions: {data.weather[0].description}</p>
    </div>
  );
}