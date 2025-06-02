import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createevent } from "../../redux/actions/event";

const CreateEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { seller } = useSelector((state) => state.seller);
  const { success, error, isLoading } = useSelector((state) => state.events);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [images, setImages] = useState([]);

  const today = new Date().toISOString().slice(0, 10);
  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
    : today;

  const handleStartDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setStartDate(selectedDate);
    setEndDate(null); // Reset end date
  };

  const handleEndDateChange = (e) => {
    setEndDate(new Date(e.target.value));
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !startDate || !endDate || images.length === 0) {
      toast.error("Please fill in all required fields!");
      return;
    }

    if (!seller?._id) {
      toast.error("Seller info not available. Please try again.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("startDate", startDate.toISOString());
    formData.append("endDate", endDate.toISOString()); // ✅ Correct key
    formData.append("shopId", seller._id);
    images.forEach((img) => formData.append("images", img));

    dispatch(createevent(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (success) {
      toast.success("Event created successfully!");
      dispatch({ type: "clearSuccess" });
      navigate("/dashboard-events");

      // Reset form
      setName("");
      setDescription("");
      setStartDate(null);
      setEndDate(null);
      setImages([]);
    }
  }, [dispatch, error, success, navigate]);

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center mb-4">Create Event</h5>
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          value={name}
          onChange={setName}
          placeholder="Enter your event name..."
          required
        />

        <Textarea
          label="Description"
          value={description}
          onChange={setDescription}
          placeholder="Enter event description..."
          required
        />

        <DateInput
          label="Start Date"
          value={startDate}
          onChange={handleStartDateChange}
          min={today}
          required
        />

        <DateInput
          label="End Date"
          value={endDate}
          onChange={handleEndDateChange}
          min={minEndDate}
          required
        />

        <div className="mb-4">
          <label className="pb-2 block">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            id="upload"
            className="hidden"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
          <div className="flex items-center flex-wrap gap-2 mt-2">
            <label htmlFor="upload" className="cursor-pointer">
              <AiOutlinePlusCircle size={30} color="#555" />
            </label>
            {images.map((file, i) => (
              <img
                key={i}
                src={URL.createObjectURL(file)}
                alt="Uploaded"
                className="h-[120px] w-[120px] object-cover rounded"
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full h-[35px] rounded-[3px] mt-2 font-semibold ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white"
          }`}
        >
          {isLoading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
};

// Reusable Form Components

const Input = ({ label, value, onChange, type = "text", placeholder, required }) => (
  <div className="mb-4">
    <label className="block pb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full h-[35px] px-3 border rounded-[3px] border-gray-300 focus:outline-none focus:ring focus:border-blue-500 sm:text-sm"
    />
  </div>
);

const Textarea = ({ label, value, onChange, placeholder, required }) => (
  <div className="mb-4">
    <label className="block pb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      rows="6"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full px-3 py-2 border border-gray-300 rounded-[3px] focus:outline-none focus:ring focus:border-blue-500 sm:text-sm"
    />
  </div>
);

const DateInput = ({ label, value, onChange, min, required }) => (
  <div className="mb-4">
    <label className="block pb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="date"
      value={value ? value.toISOString().slice(0, 10) : ""}
      onChange={onChange}
      min={min}
      required={required}
      className="w-full h-[35px] px-3 border border-gray-300 rounded-[3px] focus:outline-none focus:ring focus:border-blue-500 sm:text-sm"
    />
  </div>
);

export default CreateEvent;
