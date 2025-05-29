import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Ratings from "./Ratings";
import { getAllProductsShop } from "../../redux/actions/product";

const ProductDetails = ({ data }) => {
  const [select, setSelect] = useState(0);
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  useEffect(() => {
    if (data?.shop?._id) {
      dispatch(getAllProductsShop(data.shop._id));
    }
  }, [data?.shop?._id, dispatch]);

  const totalReviewsLength = data?.reviews.length || 0;
  const totalRatings =
    data?.reviews.reduce((acc, review) => acc + review.rating, 0) || 0;
  const averageRating = (totalRatings / totalReviewsLength || 0).toFixed(2);

  return (
    <div className="bg-white">
      {data && (
        <div className="max-w-[1200px] w-[90%] md:w-[80%] mx-auto py-5">
          {/* Image and Description Stack */}
          <div className="flex flex-col gap-6">
            {/* Main Image and Thumbnails */}
            <div>
              <img
                src={data.images[select]?.url}
                alt={data.name}
                className="w-full rounded-md object-cover"
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {data.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={`thumbnail-${index}`}
                    onClick={() => setSelect(index)}
                    className={`h-[100px] object-cover rounded-md cursor-pointer border ${
                      select === index ? "border-blue-500" : "border-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Product Information */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{data.name}</h1>
              <p className="text-gray-700 leading-7 mt-2">{data.description}</p>

              {data.details && data.details.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold mb-2">More Details:</h4>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    {data.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Price */}
              <div className="flex items-center gap-4 mt-5">
                <h4 className="text-xl text-red-600 font-semibold">
                  Ksh. {data.discountPrice}
                </h4>
                {data.originalPrice && (
                  <span className="line-through text-gray-500">
                    Ksh. {data.originalPrice}
                  </span>
                )}
              </div>

              {/* Shop Info */}
              <div className="flex items-center gap-4 mt-8">
                <img
                  src={data.shop?.avatar?.url}
                  alt="Shop"
                  className="w-[50px] h-[50px] rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">{data.shop.name}</h3>
                  <Ratings rating={data?.ratings} />
                  <p className="text-sm text-gray-600">
                    ({averageRating}/5) Ratings
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <ProductDetailsInfo
            data={data}
            averageRating={averageRating}
            totalReviewsLength={totalReviewsLength}
          />
        </div>
      )}
    </div>
  );
};

const ProductDetailsInfo = ({ data, averageRating, totalReviewsLength }) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-gray-100 mt-10 p-6 rounded">
      <div className="flex justify-between border-b pb-3 mb-5">
        {["Details", "Reviews", "Agent Information"].map((tab, index) => (
          <div key={index} className="relative">
            <button
              onClick={() => setActive(index + 1)}
              className={`text-md font-semibold ${
                active === index + 1 ? "text-black" : "text-gray-500"
              }`}
            >
              {tab}
            </button>
            {active === index + 1 && (
              <div className="h-1 bg-black w-full mt-1" />
            )}
          </div>
        ))}
      </div>

      {/* Tab Content */}
      {active === 1 && (
        <p className="text-gray-800 leading-7 whitespace-pre-line">
          {data.description}
        </p>
      )}

      {active === 2 && (
        <div className="space-y-5">
          {data.reviews.length > 0 ? (
            data.reviews.map((review, index) => (
              <div key={index} className="flex gap-3">
                <img
                  src={review.user?.avatar?.url}
                  alt="Reviewer"
                  className="w-[50px] h-[50px] rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{review.user.name}</h4>
                    <Ratings rating={review.rating} />
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No reviews yet for this product.</p>
          )}
        </div>
      )}

      {active === 3 && (
        <div className="block md:flex justify-between">
          <div className="flex items-start gap-3">
            <img
              src={data.shop?.avatar?.url}
              alt="Agent"
              className="w-[60px] h-[60px] rounded-full object-cover"
            />
            <div>
              <h4 className="font-semibold text-lg">{data.shop.name}</h4>
              <p className="text-sm text-gray-600">
                ({averageRating}/5) Ratings
              </p>
              <p className="pt-2 text-gray-700">{data.shop.description}</p>
            </div>
          </div>

          <div className="text-right mt-5 md:mt-0">
            <p>
              <span className="font-medium">Joined:</span>{" "}
              {data.shop.createdAt?.slice(0, 10)}
            </p>
            <p className="mt-1">
              <span className="font-medium">Total Products:</span>{" "}
              {data.shop.totalProducts}
            </p>
            <p className="mt-1">
              <span className="font-medium">Total Reviews:</span>{" "}
              {totalReviewsLength}
            </p>
            <Link to="/">
              <button className="bg-black text-white px-6 py-2 rounded mt-4 hover:opacity-90">
                Visit Shop
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
