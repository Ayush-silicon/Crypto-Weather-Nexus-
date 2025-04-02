// src/components/CryptoCard.js
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../redux/slices/favoritesSlice";

export default function CryptoCard({ data }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.cryptos);

  const isFavorite = favorites.includes(data.id);

  const handleFavorite = () => {
    dispatch(addFavorite({ type: "crypto", id: data.id }));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition">
      <div className="flex justify-between items-center">
        <Link href={`/crypto/${data.id}`}>
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
      <p className="text-gray-700">Price: ${data.current_price.toLocaleString()}</p>
      <p className={`text-gray-700 ${data.price_change_percentage_24h < 0 ? "text-red-500" : "text-green-500"}`}>
        24h Change: {data.price_change_percentage_24h.toFixed(2)}%
      </p>
      <p className="text-gray-700">Market Cap: ${data.market_cap.toLocaleString()}</p>
    </div>
  );
}