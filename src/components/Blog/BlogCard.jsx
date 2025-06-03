import React from "react";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { IoShareSocialSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const BlogCard = ({ author = "Realty Blogger", title, content, image, date }) => {
  const formattedDate = date || new Date().toLocaleDateString();

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col max-w-sm w-full">
      <div className="relative h-48 w-full">
        <img
          src={image || "/default-blog.jpg"}
          alt="Blog Post"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center mb-4">
          <img
            src="https://i.pravatar.cc/40?img=8"
            alt="Avatar"
            className="w-10 h-10 rounded-full mr-3 border-2 border-blue-400"
          />
          <div>
            <p className="font-semibold text-gray-800 text-sm">{author}</p>
            <p className="text-xs text-gray-500">Posted on {formattedDate}</p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-700 text-sm mb-4 flex-grow line-clamp-3">
          {content}
        </p>

        <button className="self-start mt-auto bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          Read More
        </button>

        <div className="flex space-x-5 justify-end mt-4 pt-4 border-t border-gray-100 text-gray-500 text-lg">
          <Link to="/" title="Facebook" className="hover:text-blue-600">
            <FaFacebookF />
          </Link>
          <Link to="/" title="Twitter" className="hover:text-blue-400">
            <FaTwitter />
          </Link>
          <Link to="/" title="Copy Link" className="hover:text-gray-800">
            <IoShareSocialSharp />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
