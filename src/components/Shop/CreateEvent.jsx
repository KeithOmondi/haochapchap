import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import { createevent } from "../../redux/actions/event";

const CreateEvent = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.events);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (e) => {
    const newStart = new Date(e.target.value);
    setStartDate(newStart);
    setEndDate(null);
  };

  const handleEndDateChange = (e) => {
    const newEnd = new Date(e.target.value);
    setEndDate(newEnd);
  };

  const today = new Date().toISOString().slice(0, 10);
  const minEndDate = startDate
    ? new Date(startDate.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
    : "";

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Event created successfully!");
      navigate("/dashboard-events");
      window.location.reload();
    }
  }, [error, success]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name,
      description,
      category,
      images,
      shopId: seller._id,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
    };

    dispatch(createevent(data));
  };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Event</h5>
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 block w-full px-3 h-[35px] border rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter event name..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">Description <span className="text-red-500">*</span></label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="6"
            className="mt-2 block w-full px-3 border rounded-[3px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter event description..."
          ></textarea>
        </div>
        <br />
        <div>
          <label className="pb-2">Category <span className="text-red-500">*</span></label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mt-2 border h-[35px] rounded-[5px]"
          >
            <option value="">Choose a category</option>
            {categoriesData.map((i) => (
              <option value={i.title} key={i.title}>
                {i.title}
              </option>
            ))}
          </select>
        </div>
        <br />
        <div>
          <label className="pb-2">Event Start Date <span className="text-red-500">*</span></label>
          <input
            type="date"
            value={startDate ? startDate.toISOString().slice(0, 10) : ""}
            onChange={handleStartDateChange}
            min={today}
            className="mt-2 block w-full px-3 h-[35px] border rounded-[3px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">Event End Date <span className="text-red-500">*</span></label>
          <input
            type="date"
            value={endDate ? endDate.toISOString().slice(0, 10) : ""}
            onChange={handleEndDateChange}
            min={minEndDate}
            className="mt-2 block w-full px-3 h-[35px] border rounded-[3px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">Upload Images <span className="text-red-500">*</span></label>
          <input
            type="file"
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images.map((i, idx) => (
              <img
                src={i}
                key={idx}
                alt="event"
                className="h-[120px] w-[120px] object-cover m-2"
              />
            ))}
          </div>
        </div>
        <br />
        <div>
          <input
            type="submit"
            value="Create"
            className="mt-2 cursor-pointer block w-full px-3 h-[35px] border rounded-[3px] bg-[#475ad2] text-white font-semibold"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
