import React, { useEffect } from "react";
import { MdLocationOn, MdHomeWork } from "react-icons/md";
import { BsClipboardCheck } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { getAllBookings } from "../../redux/actions/booking";
import { getAllProductsShop } from "../../redux/actions/product";

const DashboardHero = () => {
  const dispatch = useDispatch();

  const { bookings } = useSelector((state) => state.booking);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllBookings());
      dispatch(getAllProductsShop(seller._id));
    }
  }, [dispatch, seller?._id]);

  // Table Columns
  const columns = [
    { field: "id", headerName: "Booking ID", minWidth: 150, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.8,
      cellClassName: (params) =>
        params.value === "Confirmed" ? "text-green-600" : "text-red-600",
    },
  ];

  // Format bookings for DataGrid rows
  const rows = bookings?.map((booking) => ({
    id: booking._id,
    status: booking.status || "Pending",
  })) || [];

  return (
    <div className="w-full p-8">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Overview</h3>

      <div className="flex flex-col gap-4 lg:flex-row justify-between">
        {/* Active Listings */}
        <div className="w-full lg:w-[30%] bg-white shadow rounded p-5">
          <div className="flex items-center mb-2">
            <MdHomeWork size={30} className="mr-2 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-700">
              Active Listings
            </h3>
          </div>
          <h5 className="text-2xl font-semibold text-gray-800 pl-8">
            {products?.length || 0}
          </h5>
          <Link to="/dashboard-listings">
            <p className="pt-4 pl-2 text-blue-900 hover:underline">
              View Properties
            </p>
          </Link>
        </div>

        {/* Total Bookings */}
        <div className="w-full lg:w-[30%] bg-white shadow rounded p-5">
          <div className="flex items-center mb-2">
            <BsClipboardCheck size={30} className="mr-2 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-700">
              Total Bookings
            </h3>
          </div>
          <h5 className="text-2xl font-semibold text-gray-800 pl-8">
            {bookings?.length || 0}
          </h5>
          <Link to="/dashboard-bookings">
            <p className="pt-4 pl-2 text-blue-900 hover:underline">
              View Bookings
            </p>
          </Link>
        </div>

        {/* Locations Covered */}
        <div className="w-full lg:w-[30%] bg-white shadow rounded p-5">
          <div className="flex items-center mb-2">
            <MdLocationOn size={30} className="mr-2 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-700">
              Locations Covered
            </h3>
          </div>
          <h5 className="text-2xl font-semibold text-gray-800 pl-8">
            {
              [...new Set(products?.map((p) => p.location?.toLowerCase()))]
                .length || 0
            }
          </h5>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          Recent Bookings
        </h3>

        <div className="w-full min-h-[45vh] bg-white rounded shadow p-4">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardHero;
