import React, { useEffect, useState } from "react";
import ProductCard from "../productCard/productCard";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../../redux/actions/product";

const BestDeals = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const { allProducts, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    // Fetch all products initially if not available
    if (!allProducts || allProducts.length === 0) {
      dispatch(getAllProducts());
    }
  }, [dispatch, allProducts]);

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      // Assuming sold_out is a boolean, sort so available come first
      const sortedData = [...allProducts].sort((a, b) => a.sold_out - b.sold_out);
      const firstFive = sortedData.slice(0, 5);
      setData(firstFive);
    }
  }, [allProducts]);

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-4">
          Our Latest Listings
        </h2>
        <p className="text-center text-gray-600 mb-10 tracking-wide uppercase font-semibold">
          Explore our latest listings. Explore Comfort.
        </p>

        {/* Loading */}
        {isLoading && (
          <p className="text-center text-gray-500 text-lg">Loading listings...</p>
        )}

        {/* Deals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {!isLoading && data.length > 0 ? (
            data.map((item) => <ProductCard key={item._id} data={item} />)
          ) : (
            !isLoading && (
              <p className="text-center col-span-full text-gray-500 text-lg">
                No listings available.
              </p>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default BestDeals;
