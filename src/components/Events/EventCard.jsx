import React from "react";
import { useSelector } from "react-redux";

const EventCard = () => {
  const { allEvents } = useSelector((state) => state.events);

  return (
    <div className="flex flex-row flex-wrap gap-6 p-6 bg-gray-50 overflow-x-auto">
      {/* 📅 Events (Dynamic from Redux) */}
      {allEvents && allEvents.length > 0 ? (
        allEvents.map((event) => (
          <div
            key={event._id}
            className="min-w-[320px] max-w-sm bg-white rounded-lg shadow-md p-6 flex flex-col justify-between"
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
