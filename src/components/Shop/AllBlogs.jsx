import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { getAllBlogs } from "../../redux/actions/blog";

const AllBlogs = () => {
  const dispatch = useDispatch();
  const { blogs = [], isLoading } = useSelector((state) => state.blog || {});

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Blog ID", minWidth: 150, flex: 0.7 },
    { field: "title", headerName: "Title", minWidth: 200, flex: 1.5 },
    { field: "author", headerName: "Author", minWidth: 150, flex: 1 },
    {
      field: "date",
      headerName: "Published On",
      minWidth: 180,
      flex: 1,
      valueFormatter: (params) => {
        const value = params?.value;
        if (!value) return "N/A";
        const date = new Date(value);
        return isNaN(date)
          ? "Invalid Date"
          : date.toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
      },
    },
    {
      field: "excerpt",
      headerName: "Excerpt",
      minWidth: 250,
      flex: 2,
      renderCell: (params) => (
        <span className="line-clamp-2 text-sm text-gray-700">{params.row.excerpt}</span>
      ),
    },
  ];

  const rows = blogs.map((blog) => ({
    id: blog._id,
    title: blog.title,
    author: blog.author || "Unknown",
    date: blog.date || blog.createdAt,
    excerpt: blog.content?.substring(0, 100) + "...",
  }));

  return (
    <div className="w-full px-8 pt-1 mt-10 bg-white" style={{ minWidth: 650 }}>
      {isLoading ? (
        <div className="text-center py-10 text-gray-600">Loading blogs...</div>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          autoHeight
          disableSelectionOnClick
        />
      )}
    </div>
  );
};

export default AllBlogs;
