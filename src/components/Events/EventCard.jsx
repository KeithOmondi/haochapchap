import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const EventCard = ({ data }) => {
  const { cart } = useSelector((state) => state.cart);

  if (!data || !data.images || !data.images[0]) {
    return <div>Loading...</div>;
  }

  const formattedDate = dayjs(data.createdAt).format("MMM D, YYYY h:mm A");

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-md mb-10 p-6 transition-all duration-300 hover:shadow-xl">
      <div className="flex-shrink-0 mb-6">
        <img
          src={data.images[0]?.url}
          alt={data.name}
          className="w-full h-[250px] object-cover rounded-lg"
        />
      </div>

      <div className="flex flex-col justify-between flex-grow">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {data.name}
        </h2>
        <p className="text-gray-600 text-lg mb-4">{data.description}</p>
        <p className="text-sm text-gray-500 mt-2">
          Posted by {data?.creator?.name || "Agent"} • {formattedDate}
        </p>

        <div className="flex justify-between items-center my-4">
          <div className="flex items-center">
            <span className="text-lg font-medium text-red-500 line-through mr-4">
              {data.originalPrice} Ksh
            </span>
            <span className="text-xl font-bold text-gray-800">
              {data.discountPrice} Ksh
            </span>
          </div>
          <span className="text-sm text-green-500">{data.stock} Available</span>
        </div>

        <div className="flex mt-6">
          <Link
            to={`/product/${data._id}?isEvent=true`}
            className="inline-block bg-gray-800 text-white px-6 py-2 rounded-md text-center mr-4 hover:bg-gray-700"
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
