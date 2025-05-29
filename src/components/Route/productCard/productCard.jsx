import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../productDetailsCard/productDetailsCard";
import Ratings from "../../Products/Ratings";


const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, data]);

  

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
      <div className="relative w-full h-[170px] flex items-center justify-center">
        <Link to={`/product/${data._id}`} className="block w-full h-full">
          <img
            src={data.images && data.images[0]?.url}
            alt={data.name}
            className="object-cover w-full h-full rounded-md"
          />
        </Link>
      </div>

      <div className="p-4">
        <div>
          <h5 className="text-gray-500 text-sm font-semibold mb-1">
            {data.shop.name}
          </h5>
        </div>
        
        <Link to={`/product/${data._id}`}>
          <h4 className="text-gray-800 font-semibold mb-2 line-clamp-2">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>

          <div className="flex">
          <Ratings rating={data?.ratings} />
          </div>

          <div className="flex items-center space-x-2 mb-2">
            <h5 className="text-primary-600 font-bold text-lg">
              Ksh. {data.discountPrice}
            </h5>
            {data.price && (
              <h4 className="text-gray-500 line-through text-sm">
                Ksh{data.OriginalPrice}
              </h4>
            )}
          </div>

          
        </Link>
      </div>

      {/* Wishlist, Quick view, Add to cart icons */}
      
    </div>
  );
};

export default ProductCard;
