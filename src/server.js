export const server =
  process.env.NODE_ENV === "production"
    ? "https://haochapchap-b.onrender.com/api/v2"
    : "http://localhost:8000/api/v2"

