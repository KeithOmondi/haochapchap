import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import { createevent } from "../../redux/actions/event";

const CreateEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { seller } = useSelector((state) => state.seller);
  const { success, error, isLoading } = useSelector((state) => state.events);

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const today = new Date().toISOString().slice(0, 10);
  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
    : "";

  const handleStartDateChange = (e) => {
    const start = new Date(e.target.value);
    const minEnd = new Date(start.getTime() + 3 * 24 * 60 * 60 * 1000);
    setStartDate(start);
    setEndDate(null);
    document.getElementById("end-date").min = minEnd.toISOString().slice(0, 10);
  };

  const handleEndDateChange = (e) => {
    const end = new Date(e.target.value);
    setEndDate(end);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !name ||
      !description ||
      !category ||
      !tags ||
      !originalPrice ||
      !discountPrice ||
      !stock ||
      !startDate ||
      !endDate ||
      images.length === 0
    ) {
      toast.error("Please fill in all required fields!");
      return;
    }

    const formData = new FormData();
    images.forEach((image) => formData.append("images", image));
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("tags", tags);
    formData.append("originalPrice", originalPrice);
    formData.append("discountPrice", discountPrice);
    formData.append("stock", stock);
    formData.append("shopId", seller._id);
    formData.append("start_Date", startDate.toISOString());
    formData.append("Finish_Date", endDate.toISOString());

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

      // Optional: Reset fields
      setName("");
      setDescription("");
      setCategory("");
      setTags("");
      setOriginalPrice("");
      setDiscountPrice("");
      setStock("");
      setStartDate(null);
      setEndDate(null);
      setImages([]);
    }
  }, [dispatch, error, success, navigate]);

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Event</h5>
      <form onSubmit={handleSubmit}>
        <Input label="Name" required value={name} onChange={setName} placeholder="Enter your event product name..." />
        <Textarea label="Description" required value={description} onChange={setDescription} placeholder="Enter your event product description..." />
        <Select label="Category" required value={category} onChange={setCategory} options={categoriesData} />
        <Input label="Tags" value={tags} onChange={setTags} placeholder="Enter your event product tags..." />
        <Input label="Original Price" value={originalPrice} onChange={setOriginalPrice} type="number" />
        <Input label="Price (With Discount)" required value={discountPrice} onChange={setDiscountPrice} type="number" />
        <Input label="Product Stock" required value={stock} onChange={setStock} type="number" />
        <DateInput label="Event Start Date" required value={startDate} onChange={handleStartDateChange} min={today} id="start-date" />
        <DateInput label="Event End Date" required value={endDate} onChange={handleEndDateChange} min={minEndDate} id="end-date" />

        <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input type="file" id="upload" className="hidden" multiple onChange={handleImageChange} />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt="Uploaded Preview"
                className="h-[120px] w-[120px] object-cover m-2"
              />
            ))}
          </div>
        </div>

        <div>
          <input
            type="submit"
            value={isLoading ? "Creating..." : "Create"}
            disabled={isLoading}
            className={`mt-2 cursor-pointer text-center block w-full px-3 h-[35px] 
            ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white"}
            border border-gray-300 rounded-[3px] sm:text-sm`}
          />
        </div>
      </form>
    </div>
  );
};

// Small reusable components for inputs
const Input = ({ label, value, onChange, type = "text", placeholder = "", required = false }) => (
  <div>
    <label className="pb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
  </div>
);

const Textarea = ({ label, value, onChange, required = false, placeholder = "" }) => (
  <div>
    <label className="pb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      rows="8"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
  </div>
);

const Select = ({ label, value, onChange, options, required = false }) => (
  <div>
    <label className="pb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      className="w-full mt-2 border h-[35px] rounded-[5px]"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
    >
      <option value="">Choose a category</option>
      {options.map((option) => (
        <option key={option.id} value={option.title}>
          {option.title}
        </option>
      ))}
    </select>
  </div>
);

const DateInput = ({ label, value, onChange, min, id, required = false }) => (
  <div>
    <label className="pb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="date"
      id={id}
      value={value ? value.toISOString().slice(0, 10) : ""}
      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      onChange={onChange}
      min={min}
      required={required}
    />
  </div>
);

export default CreateEvent;
