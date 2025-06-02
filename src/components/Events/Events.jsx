import React, { useState } from "react";

// Dummy event data
const eventData = {
  Blogs: [
    {
      id: 1,
      title: "How to Stay Productive",
      summary: "Boost your focus and energy with these simple habits.",
    },
    {
      id: 2,
      title: "Designing for Accessibility",
      summary: "Why accessibility matters and how to implement it.",
    },
  ],
  "Upcoming Events": [
    {
      id: 3,
      title: "React Conference 2025",
      date: "July 10, 2025",
      location: "San Francisco, CA",
    },
    {
      id: 4,
      title: "Tech Expo Europe",
      date: "August 22, 2025",
      location: "Berlin, Germany",
    },
  ],
  Workshops: [
    {
      id: 5,
      title: "Intro to TypeScript",
      level: "Beginner",
      date: "June 20, 2025",
    },
    {
      id: 6,
      title: "Building with Next.js",
      level: "Intermediate",
      date: "July 5, 2025",
    },
  ],
};

const Events = () => {
  const [activeTab, setActiveTab] = useState("Blogs");

  const renderContent = () => {
    const data = eventData[activeTab];
    if (!data || data.length === 0) {
      return <p>No {activeTab.toLowerCase()} available.</p>;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {data.map((item) => (
          <div key={item.id} className="p-5 border rounded shadow hover:shadow-lg transition">
            <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
            {activeTab === "Blogs" && <p>{item.summary}</p>}
            {activeTab === "Upcoming Events" && (
              <>
                <p>Date: {item.date}</p>
                <p>Location: {item.location}</p>
              </>
            )}
            {activeTab === "Workshops" && (
              <>
                <p>Level: {item.level}</p>
                <p>Date: {item.date}</p>
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Explore Our Events</h1>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-6">
        {Object.keys(eventData).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {renderContent()}
    </div>
  );
};

export default Events;
