import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import BlogCard from "../components/Blog/BlogCard";
import { getAllBlogs } from "../redux/actions/blog";

const BlogPage = () => {
  const dispatch = useDispatch();
  const { blogs, isLoading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  return (
    <>
      <Header activeHeading={5} />

      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800">
          Our Latest <span className="text-blue-600">Real Estate Insights</span>
        </h1>

        {isLoading ? (
          <p className="text-center text-gray-500">Loading blogs...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {Array.isArray(blogs) && blogs.length > 0 ? (
              blogs.map((post) => (
                <BlogCard
                  key={post._id || post.id}
                  author={post.author}
                  title={post.title}
                  content={post.content}
                  image={post.image}
                  date={post.date}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">No blogs found.</p>
            )}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default BlogPage;
