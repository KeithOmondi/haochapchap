import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/actions/product";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([""]);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [location, setLocation] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");
  // For storing base64 preview only (optional)
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  // Final arrays of uploaded {public_id, url}
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (error) toast.error(error);
    if (success) {
      toast.success("Product created successfully!");
      navigate("/dashboard");
      resetForm();
    }
  }, [error, success, navigate]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setFeatures([""]);
    setCategory("");
    setTags("");
    setLocation("");
    setOriginalPrice("");
    setDiscountPrice("");
    setStock("");
    setImageFiles([]);
    setVideoFiles([]);
    setImages([]);
    setVideos([]);
  };

  const onDrop = (acceptedFiles) => {
    const newImages = [];
    const newVideos = [];

    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (file.type.startsWith("image/")) {
          newImages.push({ file, preview: reader.result });
          setImageFiles((prev) => [...prev, { file, preview: reader.result }]);
        } else if (file.type.startsWith("video/")) {
          newVideos.push({ file, preview: reader.result });
          setVideoFiles((prev) => [...prev, { file, preview: reader.result }]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [], "video/*": [] },
    onDrop,
  });

  // IMPORTANT: Here you must upload images/videos to your server or cloud storage (e.g. Cloudinary)
  // and get back the {public_id, url} for each file.
  // For this example, let's simulate that upload with dummy IDs and URLs,
  // but in real use you must implement upload logic before dispatching createProduct.

  const uploadFilesMock = async () => {
    // Simulate upload delay and return dummy data
    const uploadedImages = imageFiles.map((img, idx) => ({
      public_id: `img_${Date.now()}_${idx}`,
      url: img.preview, // in real, use cloud url after upload
    }));

    const uploadedVideos = videoFiles.map((vid, idx) => ({
      public_id: `vid_${Date.now()}_${idx}`,
      url: vid.preview,
    }));

    return { uploadedImages, uploadedVideos };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !description ||
      !category ||
      !discountPrice ||
      !stock ||
      !location ||
      (imageFiles.length === 0 && videoFiles.length === 0)
    ) {
      toast.error("Please fill all required fields and upload at least one image or video.");
      return;
    }

    try {
      // Upload images/videos first and get their {public_id, url}
      const { uploadedImages, uploadedVideos } = await uploadFilesMock();

      // Set the final arrays
      setImages(uploadedImages);
      setVideos(uploadedVideos);

      // Prepare product data payload
      const productData = {
        name,
        description,
        details: features.filter((f) => f.trim() !== ""),
        category,
        tags,
        location,
        originalPrice: parseFloat(originalPrice) || 0,
        discountPrice: parseFloat(discountPrice),
        stock: parseInt(stock),
        shopId: seller?._id,
        images: uploadedImages,
        videos: uploadedVideos,
      };

      // Dispatch the create product action
      dispatch(createProduct(productData));
    } catch (error) {
      toast.error("Failed to upload files. Please try again.");
    }
  };

  return (
    <div className="w-[95%] max-w-[600px] mx-auto mt-10 p-8 bg-white rounded-2xl shadow-md">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create New Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormField label="Product Name" required>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            placeholder="Enter product name"
          />
        </FormField>

        <FormField label="Description" required>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-input resize-none"
            placeholder="Enter product description"
          />
        </FormField>

        <FormField label="More Details">
          {features.map((detail, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={detail}
                onChange={(e) => {
                  const updated = [...features];
                  updated[index] = e.target.value;
                  setFeatures(updated);
                }}
                className="form-input flex-1"
                placeholder={`Detail ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => setFeatures(features.filter((_, i) => i !== index))}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setFeatures([...features, ""])}
            className="text-blue-600 hover:underline"
          >
            + Add Detail
          </button>
        </FormField>

        <FormField label="Category" required>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-input"
          >
            <option value="">Select a category</option>
            {categoriesData.map((item, index) => (
              <option value={item.title} key={index}>
                {item.title}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Tags">
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="form-input"
            placeholder="Enter tags separated by commas"
          />
        </FormField>

        <FormField label="Location" required>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="form-input"
            placeholder="e.g., Nairobi, Kisumu"
          />
        </FormField>

        <div className="flex gap-4">
          <FormField label="Original Price">
            <input
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              className="form-input"
              placeholder="Original price"
              min="0"
            />
          </FormField>
          <FormField label="Discounted Price" required>
            <input
              type="number"
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              className="form-input"
              placeholder="Discounted price"
              min="0"
            />
          </FormField>
        </div>

        <FormField label="Stock" required>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="form-input"
            placeholder="Available stock"
            min="0"
          />
        </FormField>

        <FormField label="Upload Images & Videos" required>
          <div
            {...getRootProps()}
            className="cursor-pointer border-dashed border-2 border-gray-400 p-4 rounded-md text-center hover:border-blue-500 transition"
          >
            <input {...getInputProps()} />
            <p>Drag & drop or click to upload images and videos</p>
          </div>

          <div className="flex flex-wrap gap-3 mt-3">
            {imageFiles.map((img, idx) => (
              <img
                key={idx}
                src={img.preview}
                alt={`uploaded-img-${idx}`}
                className="w-[100px] h-[100px] object-cover rounded-md border"
              />
            ))}
            {videoFiles.map((vid, idx) => (
              <video
                key={idx}
                controls
                src={vid.preview}
                className="w-[150px] h-[100px] object-cover rounded-md border"
              />
            ))}
          </div>
        </FormField>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

const FormField = ({ label, required, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

export default CreateProduct;
