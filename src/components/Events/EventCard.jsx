import React from "react";
import { useSelector } from "react-redux";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { IoShareSocialSharp } from "react-icons/io5";

const EventCard = () => {
  const { allEvents } = useSelector((state) => state.events);

  const today = new Date().toLocaleDateString();

  return (
    <div className="flex flex-row flex-wrap gap-6 p-6 bg-gray-50 overflow-x-auto">
      {/* 🏠 Properties Card */}
      <div className="min-w-[320px] max-w-sm bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center mb-4">
          <img
            src="https://i.pravatar.cc/40?img=5"
            alt="Avatar"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="font-semibold text-gray-800">Estate Expert</p>
            <p className="text-xs text-gray-500">Posted on {today}</p>
          </div>
        </div>

        {/* Image */}
        <img
          src="https://t4.ftcdn.net/jpg/07/14/26/29/240_F_714262984_mk1w5mPakiybHo4WxyFJsROLumylWgsX.jpg"
          alt="Properties"
          className="rounded-md mb-4 h-48 w-full object-cover"
        />

        {/* Content */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Hot Properties in Your Area
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          Discover beautiful homes, affordable apartments, and prime real estate across your city. Our platform helps you connect directly with sellers and agents for faster deals.
        </p>

        <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm mb-4 hover:bg-green-700">
          Read More
        </button>

        {/* Share Icons */}
       <div className="flex space-x-4 justify-between text-gray-500 text-lg">
          <a href="#" title="Facebook"><FaFacebookF /></a>
          <a href="#" title="Twitter"><FaTwitter /></a>
          <a href="#" title="Copy link"><IoShareSocialSharp /></a>
        </div>
      </div>

      {/* 📰 Blog Card */}
      <div className="min-w-[320px] max-w-sm bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center mb-4">
          <img
            src="https://i.pravatar.cc/40?img=8"
            alt="Avatar"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="font-semibold text-gray-800">Realty Blogger</p>
            <p className="text-xs text-gray-500">Posted on {today}</p>
          </div>
        </div>

        {/* Image */}
        <img
          src="https://t4.ftcdn.net/jpg/07/14/26/29/240_F_714262984_mk1w5mPakiybHo4WxyFJsROLumylWgsX.jpg"
          alt="Blog"
          className="rounded-md mb-4 h-48 w-full object-cover"
        />

        {/* Content */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          5 Tips for First-Time Home Buyers
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          Learn how to plan your purchase, avoid common mistakes, and land the home of your dreams. Our blog provides practical advice based on real-life experiences.
        </p>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm mb-4 hover:bg-blue-700">
          Read More
        </button>

        {/* Share Icons */}
        <div className="flex space-x-4 justify-between text-gray-500 text-lg">
          <a href="#" title="Facebook"><FaFacebookF /></a>
          <a href="#" title="Twitter"><FaTwitter /></a>
          <a href="#" title="Copy link"><IoShareSocialSharp /></a>
        </div>
      </div>

      {/* 📅 Events (Dynamic from Redux) */}
      {allEvents && allEvents.length > 0 ? (
        allEvents.map((event) => (
          <div
            key={event._id}
            className="min-w-[320px] max-w-sm rounded-lg shadow-md p-6 flex flex-col justify-between"
          >
            {/* Image */}
            <img
              src={event.images[0]?.url || "/default-image.jpg"}
              alt={event.name || "Event"}
              className="rounded-md mb-4 h-48 w-full object-cover"
            />

            {/* Content */}
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {event.name || "Untitled Event"}
            </h2>
            <p className="text-gray-600 text-sm mb-3">
              {event.description || "No description provided."}
            </p>

            {/* Dates */}
            <p className="text-sm text-gray-500 mb-4">
              {new Date(event.startDate).toLocaleDateString()} –{" "}
              {new Date(event.endDate).toLocaleDateString()}
            </p>

            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700">
              Learn More
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-sm">No events available.</p>
      )}
    </div>
  );
};

export default EventCard;
