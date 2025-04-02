// src/components/NewsItem.js
export default function NewsItem({ data }) {
    return (
      <div className="bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition">
        <a href={data.link} target="_blank" rel="noopener noreferrer">
          <h3 className="text-lg font-semibold text-blue-600 hover:underline">
            {data.title}
          </h3>
        </a>
        <p className="text-gray-600 text-sm">{data.description}</p>
      </div>
    );
  }