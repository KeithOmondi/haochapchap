import React from "react";
import {
  FaShieldAlt,
  FaHandsHelping,
  FaThumbsUp,
  FaRocket,
} from "react-icons/fa";

const reasons = [
  {
    icon: <FaShieldAlt size={40} className="text-blue-600" />,
    title: "Trusted & Reliable",
    description:
      "We prioritize your safety and satisfaction by offering only verified and quality properties.",
  },
  {
    icon: <FaHandsHelping size={40} className="text-green-600" />,
    title: "Excellent Customer Support",
    description:
      "Our dedicated support team is available 24/7 to assist you with any questions or concerns.",
  },
  {
    icon: <FaThumbsUp size={40} className="text-yellow-500" />,
    title: "Best Value Deals",
    description:
      "We offer competitive prices and exclusive discounts, ensuring you get the best value for your money.",
  },
  {
    icon: <FaRocket size={40} className="text-purple-600" />,
    title: "Fast & Easy Process",
    description:
      "From browsing to buying, our streamlined process makes property acquisition smooth and hassle-free.",
  },
];

const WhyUs = () => {
  return (
    <div className="bg-white py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold mb-4">Why Choose Us?</h1>
        <p className="text-gray-600 max-w-3xl mx-auto mb-12">
          Discover the advantages that set us apart from the rest. We’re
          committed to providing you with the best real estate experience.
        </p>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon, title, description }, idx) => (
            <div
              key={idx}
              className="p-6 border rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4 flex justify-center">{icon}</div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-700">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
