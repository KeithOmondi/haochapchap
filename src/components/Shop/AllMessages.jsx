// src/pages/AllMessages.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { getAllMessages } from '../../redux/actions/message';

const AllMessages = () => {
  const dispatch = useDispatch();
  const { messages, isLoading, error } = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(getAllMessages());
  }, [dispatch]);

  const columns = [
    { field: 'id', headerName: 'Message ID', minWidth: 150, flex: 0.7 },
    { field: 'name', headerName: 'Name', minWidth: 150, flex: 1 },
    { field: 'email', headerName: 'Email', minWidth: 200, flex: 1 },
    { field: 'subject', headerName: 'Subject', minWidth: 200, flex: 1.5 },
    { field: 'message', headerName: 'Message', minWidth: 300, flex: 2 },
    {
      field: 'createdAt',
      headerName: 'Received At',
      minWidth: 180,
      flex: 1,
      valueFormatter: ({ value }) => new Date(value).toLocaleString(),
    },
  ];

  const rows = messages.map((msg) => ({
    id: msg._id,
    name: msg.name,
    email: msg.email,
    subject: msg.subject,
    message: msg.message,
    createdAt: msg.createdAt,
  }));

  if (isLoading) return <div>Loading messages...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
};

export default AllMessages;
