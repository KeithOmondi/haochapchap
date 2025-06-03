import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { getAllBookings } from "../../redux/actions/booking";

const AllBookings = () => {
  const dispatch = useDispatch();
  const { bookings = [], isLoading } = useSelector((state) => state.booking || {});

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Booking ID", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 150, flex: 1 },
    { field: "email", headerName: "Email", minWidth: 200, flex: 1 },
    { field: "phone", headerName: "Phone", minWidth: 150, flex: 1 },
    {
      field: "bookingDateTime",
      headerName: "Date & Time",
      minWidth: 220,
      flex: 1.2,
      valueFormatter: (params) => {
        const value = params?.value;
        if (!value) return "N/A";
        const date = new Date(value);
        return isNaN(date)
          ? "Invalid Date"
          : date.toLocaleString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });
      },
    },
  ];

  const rows = bookings.map((booking) => ({
    id: booking._id,
    name: booking.name,
    email: booking.email,
    phone: booking.phone,
    bookingDateTime: booking.bookingDateTime,
  }));

  return (
    <div className="w-full px-8 pt-1 mt-10 bg-white" style={{ minWidth: 650 }}>
      {isLoading ? (
        <div className="text-center py-10 text-gray-600">Loading bookings...</div>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      )}
    </div>
  );
};

export default AllBookings;
