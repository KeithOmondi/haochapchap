import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { deleteEvent, getAllEvents } from "../../redux/actions/event";

const AllEvents = () => {
  const dispatch = useDispatch();

  const { allEvents: events = [], isLoading } = useSelector((state) => state.events);
  const { seller } = useSelector((state) => state.seller);

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllEvents(seller._id));
    }
  }, [dispatch, seller]);

  const handleDelete = async (id) => {
    await dispatch(deleteEvent(id));
    dispatch(getAllEvents(seller._id)); // Refresh list after deletion
  };

  const columns = [
    { field: "id", headerName: "Event ID", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 180, flex: 1.4 },
    
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      flex: 0.4,
      minWidth: 100,
      renderCell: (params) => (
        <Button onClick={() => handleDelete(params.id)}>
          <AiOutlineDelete size={20} color="red" />
        </Button>
      ),
    },
  ];

  // ✅ Convert events into DataGrid rows
  const rows = events.map((event) => ({
    id: event._id,
    name: event.name,
    stock: event.stock,
    sold_out: event.sold_out || 0,
  }));

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full px-8 pt-6 mt-10 bg-white">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default AllEvents;
