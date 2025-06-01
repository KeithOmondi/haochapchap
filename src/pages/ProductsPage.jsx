import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import ProductCard from "../components/Route/productCard/productCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/product";
import { categoriesData } from "../static/data";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { allProducts, isLoading, error } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allProducts.length) {
      dispatch(getAllProducts());
    }
  }, [allProducts.length, dispatch]);

  const filterByCategory = (product) =>
    !selectedCategory ||
    product.category.toLowerCase() === selectedCategory.toLowerCase();

  const filterByLocation = (product) =>
    !selectedLocation ||
    product.location?.toLowerCase() === selectedLocation.toLowerCase();

  const sortProducts = (products, sortType) => {
    const sorted = [...products];
    switch (sortType) {
      case "price-low-high":
        return sorted.sort((a, b) => a.discount_price - b.discount_price);
      case "price-high-low":
        return sorted.sort((a, b) => b.discount_price - a.discount_price);
      case "a-z":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "z-a":
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return products;
    }
  };

  const filteredAndSortedProducts = sortProducts(
    allProducts.filter(
      (product) => filterByCategory(product) && filterByLocation(product)
    ),
    selectedSort
  );

  return (
    <div>
      <Header />
      <br />
      <br />
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Listings &gt;&gt; All Listings
        </h2>

        {/* Filter Bar */}
        <div className="bg-white shadow rounded-md p-4 flex flex-wrap gap-4 mb-8">
          {/* Category Filter */}
          <select
            className="border rounded px-4 py-2 text-gray-700"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categoriesData.map((category) => (
              <option key={category.id} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>

          {/* Location Filter */}
          <select
            className="border rounded px-4 py-2 text-gray-700"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            {/* Replace with your actual locations */}
            <option value="Nairobi">Nairobi</option>
            <option value="Kisumu">Kisumu</option>
            <option value="Mombasa">Mombasa</option>
          </select>

          {/* Price Sort */}
          <select
            className="border rounded px-4 py-2 text-gray-700"
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
          >
            <option value="">Sort by Price</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
          </select>

          {/* Name Sort */}
          <select
            className="border rounded px-4 py-2 text-gray-700"
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
          >
            <option value="">Sort by Name</option>
            <option value="a-z">Name: A to Z</option>
            <option value="z-a">Name: Z to A</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <h2 className="text-center col-span-full">Loading products...</h2>
          ) : error ? (
            <h2 className="text-center text-red-500 col-span-full">
              Error loading products: {error}
            </h2>
          ) : filteredAndSortedProducts.length > 0 ? (
            filteredAndSortedProducts.map((item, index) => (
              <ProductCard key={item._id || index} data={item} />
            ))
          ) : (
            <h1 className="text-center w-full pb-[100px] text-[20px] col-span-full">
              No listings found matching your criteria.
            </h1>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
