import React, { useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { MdLocationOn, MdHomeWork } from "react-icons/md";
import { BsClipboardCheck } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";

const DashboardHero = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllOrdersOfShop(seller._id));
      dispatch(getAllProductsShop(seller._id));
    }
  }, [dispatch, seller?._id]);

  const columns = [
    { field: "id", headerName: "Booking ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) =>
        params.getValue(params.id, "status") === "Confirmed"
          ? "text-green-600"
          : "text-red-600",
    },
    {
      field: "itemsQty",
      headerName: "Units",
      type: "number",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 120,
      flex: 0.8,
    },
    {
      field: " ",
      headerName: "",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/dashboard/order/${params.id}`}>
          <Button>
            <AiOutlineArrowRight size={20} />
          </Button>
        </Link>
      ),
    },
  ];

  const rows =
    orders?.map((order) => ({
      id: order._id,
      itemsQty: order.cart.reduce((acc, item) => acc + item.qty, 0),
      total: "Ksh " + order.totalPrice,
      status: order.status,
    })) || [];

  return (
    <div className="w-full p-8">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Overview</h3>

      <div className="w-full flex flex-col gap-4 lg:flex-row justify-between">
        {/* Active Listings */}
        <div className="w-full lg:w-[30%] bg-white shadow rounded p-5">
          <div className="flex items-center">
            <MdHomeWork size={30} className="mr-2 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-700">
              Active Listings
            </h3>
          </div>
          <h5 className="pt-2 pl-9 text-2xl font-semibold text-gray-800">
            {products?.length || 0}
          </h5>
          <Link to="/dashboard-products">
            <h5 className="pt-4 pl-2 text-teal-600 hover:underline">
              View Properties
            </h5>
          </Link>
        </div>

        {/* Total Bookings */}
        <div className="w-full lg:w-[30%] bg-white shadow rounded p-5">
          <div className="flex items-center">
            <BsClipboardCheck size={30} className="mr-2 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-700">Total Bookings</h3>
          </div>
          <h5 className="pt-2 pl-9 text-2xl font-semibold text-gray-800">
            {orders?.length || 0}
          </h5>
          <Link to="/dashboard-orders">
            <h5 className="pt-4 pl-2 text-teal-600 hover:underline">
              View Bookings
            </h5>
          </Link>
        </div>

        {/* Locations Covered */}
        <div className="w-full lg:w-[30%] bg-white shadow rounded p-5">
          <div className="flex items-center">
            <MdLocationOn size={30} className="mr-2 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-700">Locations Covered</h3>
          </div>
          <h5 className="pt-2 pl-9 text-2xl font-semibold text-gray-800">
            {
              [...new Set(products?.map((p) => p.location?.toLowerCase()))].length ||
              0
            }
          </h5>
        </div>
      </div>

      <br />

      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Recent Bookings</h3>

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
  );
};

export default DashboardHero;
