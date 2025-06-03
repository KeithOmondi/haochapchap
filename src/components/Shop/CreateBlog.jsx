import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../../redux/actions/blog";

const CreateBlog = () => {
  const dispatch = useDispatch();
  const { isCreating, createError, createSuccess } = useSelector((state) => state.blogs);

  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageBase64 = "";

    if (imageFile) {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = () => {
        imageBase64 = reader.result;

        dispatch(
          createBlog({
            ...form,
            images: [imageBase64],
          })
        );
      };
    } else {
      dispatch(
        createBlog({
          ...form,
          images: [],
        })
      );
    }
  };

  return (
    <div className="max-w-1xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create a New Blog Post</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />

        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          rows={6}
          required
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border px-4 py-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={isCreating}
        >
          {isCreating ? "Creating..." : "Create Blog"}
        </button>

        {createSuccess && <p className="text-green-600">Blog created successfully!</p>}
        {createError && <p className="text-red-600">{createError}</p>}
      </form>
    </div>
  );
};

export default CreateBlog;
