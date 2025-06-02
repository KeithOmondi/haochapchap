import React from "react";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../../static/data";

const Categories = () => {
  const navigate = useNavigate();

  const handleSubmit = (category) => {
    navigate(`/listings?category=${category.title}`);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4">
      <div className="bg-white p-6 rounded-lg mb-12" id="categories">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {categoriesData.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSubmit(item)}
              className="w-full h-[120px] flex flex-col sm:flex-row items-center justify-between rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300 bg-gray-50"
            >
              <h5 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-0">
                {item.title}
              </h5>
              <img
                src={item.image_Url}
                alt={item.title}
                className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] object-cover rounded-full shadow-md hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
