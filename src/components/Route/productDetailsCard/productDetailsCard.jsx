import React, { useEffect, useState } from "react";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShoppingCart,
  AiOutlineMessage,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTocart } from "../../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);

  useEffect(() => {
    setClick(wishlist?.some((item) => item.id === data?.id));
  }, [wishlist, data?.id]);

  const incrementCount = () => setCount(count + 1);
  const decrementCount = () => count > 1 && setCount(count - 1);

  const addToCartHandler = (id) => {
    const exists = cart?.some((item) => item.id === id);
    if (exists) return toast.error("Item already in cart!");

    if (data.stock < count) {
      toast.error("Product stock limited!");
    } else {
      dispatch(addTocart({ ...data, qty: count }));
      toast.success("Item added to cart successfully!");
    }
  };

  const toggleWishlist = () => {
    if (click) {
      dispatch(removeFromWishlist(data));
      toast.info("Removed from wishlist");
    } else {
      dispatch(addToWishlist(data));
      toast.success("Added to wishlist");
    }
    setClick(!click);
  };

  const handleMessageSubmit = () => {
    toast.info("Messaging feature not implemented yet.");
  };

  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center md:items-start justify-center px-4 pt-12 md:pt-24">

      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-xl shadow-lg overflow-y-auto p-5 sm:p-8">
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-600 transition"
        >
          <RxCross1 size={24} />
        </button>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image + Shop Info */}
          <div className="w-full md:w-1/2 space-y-4">
            <img
              src={data.images?.[0]?.url}
              alt={data.name}
              className="w-full aspect-square object-contain rounded-lg shadow"
            />

            <Link
              to={`/shop/preview/${data.shop._id}`}
              className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition text-sm"
            >
              <img
                src={data.images?.[0]?.url}
                alt={data.shop.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-medium">{data.shop.name}</span>
              {data.ratings && <span className="text-xs">• {data.ratings} Ratings</span>}
            </Link>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">{data.name}</h2>
              <p className="text-sm text-gray-700 mb-4">{data.description}</p>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-bold text-red-500">
                  Ksh{data.discountPrice}
                </span>
                {data.price && (
                  <span className="text-gray-500 line-through text-sm">
                    Ksh{data.OriginalPrice}
                  </span>
                )}
              </div>

              {data.total_sell > 0 && (
                <p className="text-xs text-red-500 mb-2">{data.sold_out} Sold Out</p>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-4">
              {/* Quantity + Wishlist */}
              <div className="flex items-center justify-between">
                <div className="flex items-center bg-gray-100 rounded overflow-hidden">
                  <button
                    onClick={decrementCount}
                    className="px-3 py-2 bg-gray-200 hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="px-5">{count}</span>
                  <button
                    onClick={incrementCount}
                    className="px-3 py-2 bg-gray-200 hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={toggleWishlist}
                  className="text-gray-600 hover:text-red-500"
                >
                  {click ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />}
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={() => addToCartHandler(data.id)}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition"
              >
                <AiOutlineShoppingCart size={20} />
                Add to Cart
              </button>

              {/* Send Message */}
              <button
                onClick={handleMessageSubmit}
                className="w-full flex items-center justify-center gap-2 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-md transition"
              >
                <AiOutlineMessage size={20} />
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
