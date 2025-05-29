import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineClose,
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineLanguage } from "react-icons/md";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import Navbar from "./Navbar";
import { BiMenuAltLeft } from "react-icons/bi";
import { categoriesData } from "../../static/data";
import { IoIosArrowDown } from "react-icons/io";
import Cart from "../Cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { FiMenu } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import DropDown from "./DropDown";

const Header = ({ activeHeading, allProducts }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const [isSticky, setIsSticky] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 70);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchTermChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredProducts = allProducts?.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchData(filteredProducts || []);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Animation variants
  const mobileMenuVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { x: "-100%", transition: { duration: 0.2 } },
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="bg-white shadow-md p-3 hidden lg:block">
        {/* Top Bar */}
        <div className="flex justify-between items-center text-sm text-gray-700 mb-2">
          <div className="flex items-center gap-3">
            <span>+254 (0)748 934 9834</span>
            <span>|</span>
            <span>contact@haochapchap.com</span>
          </div>
          <div className="flex items-center gap-2">
            <FaLocationDot />
            <MdOutlineLanguage />
          </div>
        </div>

        {/* Sticky Navbar */}
        <div
          className={`${
            isSticky ? "shadow-sm fixed top-0 left-0 z-50" : ""
          } transition flex items-center justify-between bg-white w-full p-3 h-[80px] rounded-md`}
        >
          <Link to="/">
            <img
              src="https://res.cloudinary.com/drls2cpnu/image/upload/v1748350947/Hao_Chapchap_logo_h88a00.png"
              alt="Logo"
              className="h-12 w-50 rounded-md object-cover"
            />
          </Link>
          <div className="relative flex items-center gap-10 w-full">
            {/* Categories Dropdown */}

            {/* Main Navbar */}
            <div className="flex-grow">
              <Navbar active={activeHeading} />
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4 border rounded-md bg-blue-900 text-yellow-500 px-5 py-2 text-center justify-center">
              <Link
                to="/contact"
                className="text-[20px] uppercase font-extrabold"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Cart and Wishlist Modals */}
        <AnimatePresence>
          {openCart && <Cart setOpenCart={setOpenCart} />}
        </AnimatePresence>
        <AnimatePresence>
          {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
        </AnimatePresence>
      </header>

      {/* Mobile Header */}
      <header className="bg-white shadow-md p-3 w-full fixed top-0 left-0 z-50 lg:hidden">
        {/* Top Info */}

        {/* Logo + Menu + Cart */}
        <div className="flex justify-between items-center">
          {/* Menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-lg text-gray-800"
          >
            <FiMenu size={30} />
          </button>

          {/* Logo */}
          <Link to="/">
            <img
              src="https://res.cloudinary.com/drls2cpnu/image/upload/v1748350947/Hao_Chapchap_logo_h88a00.png"
              alt="Logo"
              className="h-10 w-25 rounded-md object-cover "
            />
          </Link>

          {/* Cart */}
          
        </div>

        {/* Cart Modal */}
        <AnimatePresence>
          {openCart && <Cart setOpenCart={setOpenCart} />}
        </AnimatePresence>

        {/* Wishlist Modal */}
        <AnimatePresence>
          {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
        </AnimatePresence>

        {/* Side Drawer Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              ref={mobileMenuRef}
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 left-0 w-3/4 h-full bg-white z-[60] shadow-md"
            >
              {/* Side Menu Header */}
              <div className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center gap-4">
                  {/* Wishlist */}
                  <div
                    className="relative cursor-pointer"
                    onClick={() => setOpenWishlist(true)}
                  >
                    <AiOutlineHeart size={30} />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white font-mono text-[12px] leading-tight text-center">
                      {wishlist.length}
                    </span>
                  </div>
                </div>
                {/* Close button */}
                <AiOutlineClose
                  size={25}
                  onClick={() => setMobileMenuOpen(false)}
                  className="cursor-pointer"
                />
              </div>

              {/* Search Bar */}
              <div className="flex items-center border rounded-md px-3 py-2 m-4">
                <input
                  type="text"
                  placeholder="Search here..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 outline-none px-2"
                />
                <AiOutlineSearch size={25} className="text-gray-600" />
              </div>

              {/* Navbar links */}
              <div className="flex flex-col p-2">
                <Navbar active={activeHeading} />
              </div>

              {/* Profile */}
              <div className="relative cursor-pointer p-4 pb-20 flex justify-center">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={user?.avatar?.url}
                      className="w-[35px] h-[35px] rounded-full object-cover"
                      alt="User Avatar"
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} />
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="pt-[50px] lg:pt-0" />
    </>
  );
};

export default Header;
