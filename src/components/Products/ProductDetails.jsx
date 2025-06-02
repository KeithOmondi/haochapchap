import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Ratings from "./Ratings";
import { getAllProductsShop } from "../../redux/actions/product";
import { server } from "../../server";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const ProductDetails = ({ data }) => {
  const [select, setSelect] = useState(0);
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  useEffect(() => {
    if (data?.shop?._id) {
      dispatch(getAllProductsShop(data.shop._id));
    }
  }, [data?.shop?._id, dispatch]);

  const totalReviewsLength = data?.reviews?.length || 0;
  const totalRatings =
    data?.reviews?.reduce((acc, review) => acc + review.rating, 0) || 0;
  const averageRating = (totalRatings / totalReviewsLength || 0).toFixed(2);

  const Ratings = ({ rating }) => (
  <div className="flex gap-1 text-yellow-400">
    {[1, 2, 3, 4, 5].map((star) => (
      <span key={star}>{star <= rating ? "★" : "☆"}</span>
    ))}
  </div>
);

  return (
    <div className="bg-white">
      {data && (
        <div className="max-w-[1200px] w-[90%] md:w-[80%] mx-auto py-5">
          {/* Image and Description Stack */}
          <div className="flex flex-col gap-6">
            {/* Main Image and Thumbnails */}
            <div>
              {/* Safe check for images */}
              {data.images && data.images.length > 0 ? (
                <>
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
                </>
              ) : (
                <p className="text-gray-600">No images available.</p>
              )}
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
                  src={data.shop?.avatar?.url || "/default-shop-avatar.png"}
                  alt="Shop"
                  className="w-[50px] h-[50px] rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">{data.shop?.name || "Shop"}</h3>
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

const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [newName, setNewName] = useState("");
  const [publicReviews, setPublicReviews] = useState([]);
  const [votedReviews, setVotedReviews] = useState({}); // track votes per review id

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${server}/public-review/get-all-reviews`);
        setPublicReviews(res.data.reviews || []);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        toast.error("Failed to load reviews");
      }
    };

    fetchReviews();
  }, []);

  const submitReview = async () => {
    try {
      if (!newName || !newRating || !newComment) {
        toast.warning("All fields are required.");
        return;
      }
      await axios.post(`${server}/public-review/public`, {
        name: newName,
        rating: newRating,
        comment: newComment,
      });

      toast.success("Review submitted!");
      setShowForm(false);
      setNewRating(0);
      setNewComment("");
      setNewName("");

      // Refresh reviews
      const updated = await axios.get(`${server}/public-review/get-all-reviews`);
      setPublicReviews(updated.data.reviews || []);
    } catch (err) {
      console.error("Review submission error:", err);
      toast.error(
        err.response?.data?.message || err.message || "Error submitting review"
      );
    }
  };

  const handleVote = async (reviewId, type) => {
    if (votedReviews[reviewId]) {
      toast.info("You already voted on this review.");
      return;
    }
    try {
      await axios.post(`${server}/public-review/vote-helpful`, {
        reviewId,
        vote: type, // "up" or "down"
      });

      setPublicReviews((prev) =>
        prev.map((r) => {
          if (r._id === reviewId) {
            if (type === "up") r.helpfulUp = (r.helpfulUp || 0) + 1;
            else r.helpfulDown = (r.helpfulDown || 0) + 1;
          }
          return r;
        })
      );

      setVotedReviews((prev) => ({ ...prev, [reviewId]: type }));
      toast.success("Thanks for your feedback!");
    } catch (error) {
      console.error("Vote error:", error);
      toast.error("Failed to record your vote.");
    }
  };

  const handleShare = (review) => {
    const shareText = `Review by ${review.name}:\n"${review.comment}"\nCheck it out!`;

    if (navigator.share) {
      navigator
        .share({
          title: "Review Share",
          text: shareText,
          url: window.location.href,
        })
        .catch(() => toast.error("Sharing cancelled"));
    } else {
      navigator.clipboard.writeText(shareText);
      toast.success("Review copied to clipboard!");
    }
  };

  const StarRatingInput = ({ rating, setRating }) => {
    const [hover, setHover] = useState(0);
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            aria-label={`${star} Star${star > 1 ? "s" : ""}`}
            className="text-3xl focus:outline-none"
          >
            <span
              className={star <= (hover || rating) ? "text-yellow-400" : "text-gray-300"}
            >
              ★
            </span>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-100 mt-10 p-6 rounded relative">
      <ToastContainer />

      {/* Tabs */}
      <div className="flex justify-between border-b pb-3 mb-5">
        {["Details", "Reviews", "Agent Information"].map((tab, idx) => (
          <div key={idx} className="relative">
            <button
              onClick={() => setActive(idx + 1)}
              className={`text-md font-semibold ${
                active === idx + 1 ? "text-black" : "text-gray-500"
              }`}
            >
              {tab}
            </button>
            {active === idx + 1 && <div className="h-1 bg-black w-full mt-1" />}
          </div>
        ))}
      </div>

      {/* Tab 1: Details */}
      {active === 1 && (
        <p className="text-gray-800 leading-7 whitespace-pre-line">{data.description}</p>
      )}

      {/* Tab 2: Reviews */}
      {active === 2 && (
        <div className="space-y-5">
          <button
            onClick={() => setShowForm(true)}
            className="text-blue-400 px-4 py-2 cursor-pointer mb-4 hover:opacity-90"
          >
            Leave a Review
          </button>

          {publicReviews.length > 0 ? (
            publicReviews.map((review) => (
              <div key={review._id} className="flex gap-3 bg-white p-4 rounded shadow-sm">
                <img
                  src="/default-avatar.png"
                  alt="Reviewer"
                  className="w-[50px] h-[50px] rounded-full object-cover"
                />
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{review.name}</h4>
                    <Ratings rating={review.rating} />
                  </div>
                  <p className="text-gray-700 mt-1">{review.comment}</p>

                  <div className="flex items-center gap-6 mt-3">
                    <button
                      onClick={() => handleVote(review._id, "up")}
                      disabled={!!votedReviews[review._id]}
                      className={`flex items-center gap-1 text-green-600 cursor-pointer hover:text-green-800 disabled:opacity-50`}
                      aria-label="Mark review as helpful"
                      type="button"
                    >
                      👍 <span>{review.helpfulUp || 0}</span>
                    </button>

                    <button
                      onClick={() => handleVote(review._id, "down")}
                      disabled={!!votedReviews[review._id]}
                      className={`flex items-center gap-1 text-red-600 cursor-pointer hover:text-red-800 disabled:opacity-50`}
                      aria-label="Mark review as not helpful"
                      type="button"
                    >
                      👎 <span>{review.helpfulDown || 0}</span>
                    </button>

                    <button
                      onClick={() => handleShare(review)}
                      className="text-blue-600 hover:text-blue-800"
                      aria-label="Share review"
                      type="button"
                    >
                      🔗 Share
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No reviews yet.</p>
          )}

          {/* Review Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded w-full max-w-md relative shadow-lg">
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute top-2 right-2 text-xl text-gray-700 hover:text-gray-900"
                  aria-label="Close review form"
                >
                  &times;
                </button>
                <h3 className="text-xl font-bold mb-4">Write a Review</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitReview();
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block mb-1">Your Name</label>
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Rating</label>
                    <StarRatingInput rating={newRating} setRating={setNewRating} />
                  </div>

                  <div>
                    <label className="block mb-1">Comment</label>
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full p-2 border rounded"
                      rows={4}
                      placeholder="Write your review"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded hover:opacity-90"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Agent Info */}
      {active === 3 && (
        <div className="block md:flex justify-between">
          {/* Add Agent Info content here if needed */}
        </div>
      )}
    </div>
  );
};



export default ProductDetails;
