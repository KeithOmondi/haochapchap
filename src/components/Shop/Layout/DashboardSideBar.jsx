import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer, MdMessage } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaWpforms } from "react-icons/fa";
import { PiNotebookBold } from "react-icons/pi"; // Blog icon
import { BsPlusSquare } from "react-icons/bs"; // Add blog icon

const DashboardSideBar = ({ active }) => {
  return (
    <div className="w-full h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* Dashboard */}
      <SidebarItem
        to="/dashboard"
        icon={<RxDashboard size={30} />}
        label="Dashboard"
        isActive={active === 1}
      />

      {/* Bookings */}
      <SidebarItem
        to="/dashboard-bookings"
        icon={<FiShoppingBag size={30} />}
        label="All Bookings"
        isActive={active === 2}
      />

      {/* Listings */}
      <SidebarItem
        to="/dashboard-listings"
        icon={<FaWpforms size={30} />}
        label="All Listings"
        isActive={active === 3}
      />
      <SidebarItem
        to="/dashboard-create-listing"
        icon={<AiOutlineFolderAdd size={30} />}
        label="Create Listing"
        isActive={active === 4}
      />

      {/* Events */}
      <SidebarItem
        to="/dashboard-events"
        icon={<MdOutlineLocalOffer size={30} />}
        label="All Events"
        isActive={active === 5}
      />
      <SidebarItem
        to="/dashboard-create-event"
        icon={<VscNewFile size={30} />}
        label="Create Event"
        isActive={active === 6}
      />

      {/* Blogs */}
      <SidebarItem
        to="/dashboard-blogs"
        icon={<PiNotebookBold size={30} />}
        label="All Blogs"
        isActive={active === 7}
      />
      <SidebarItem
        to="/dashboard-create-blog"
        icon={<BsPlusSquare size={30} />}
        label="Create Blog"
        isActive={active === 8}
      />

      {/* Coupons */}
      <SidebarItem
        to="/dashboard-coupouns"
        icon={<AiOutlineGift size={30} />}
        label="Discount Codes"
        isActive={active === 9}
      />

      {/* Messages */}
      <SidebarItem
        to="/dashboard-messages"
        icon={<MdMessage size={30} />}
        label="Messages"
        isActive={active === 10}
      />

      {/* Settings */}
      <SidebarItem
        to="/settings"
        icon={<CiSettings size={30} />}
        label="Settings"
        isActive={active === 11}
      />
    </div>
  );
};

// Reusable Sidebar Item component
const SidebarItem = ({ to, icon, label, isActive }) => (
  <div className="w-full flex items-center p-4">
    <Link to={to} className="w-full flex items-center">
      {React.cloneElement(icon, { color: isActive ? "crimson" : "#555" })}
      <h5
        className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
          isActive ? "text-[crimson]" : "text-[#555]"
        }`}
      >
        {label}
      </h5>
    </Link>
  </div>
);

export default DashboardSideBar;
