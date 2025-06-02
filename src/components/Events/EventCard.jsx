import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const EventCard = ({ data }) => {
  if (!data || !data.images || !data.images[0]) {
    return <div>Loading...</div>;
  }

  const formattedDate = dayjs(data.createdAt).format("MMM D, YYYY");

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-md mb-10 p-6 transition-all duration-300 hover:shadow-xl">
      <div className="mb-4">
        <img
          src={data.images[0]?.url}
          alt={data.title}
          className="w-full h-[250px] object-cover rounded-lg"
        />
      </div>

      <div className="flex-grow">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {data.title}
        </h2>
        <p className="text-gray-600 text-base mb-4">{data.description}</p>
        <p className="text-sm text-gray-500">
          Listed by {data.agent?.name || "Agent"} • {formattedDate}
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-green-600">
            {data.price} Ksh
          </span>
          <span className="text-sm text-gray-500">{data.location}</span>
        </div>

        <div className="mt-6">
          <Link
            to={`/property/${data._id}`}
            className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
