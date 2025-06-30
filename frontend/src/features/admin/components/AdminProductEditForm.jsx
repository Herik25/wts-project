import {
  ArrowLeftIcon,
  CheckBadgeIcon,
  CheckIcon,
  HomeIcon,
  StarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  fetchProductByIdAsync,
  selectProductById,
  updateProductAsync,
  uploadProductAsync,
} from "../../products/ProductSlice";

function AdminProductEditForm() {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [isBestSeller, setIsBestSeller] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const parmas = useParams();
  const selectedProduct = useSelector(selectProductById);

  useEffect(() => {
    if (parmas.id) {
      dispatch(fetchProductByIdAsync(parmas.id));
    }
  }, [parmas.id, dispatch]);

  useEffect(() => {
    if (selectedProduct) {
      setValue("name", selectedProduct.name || "");
      setValue("brand", selectedProduct.brand || "");
      setValue("desc", selectedProduct.desc || "");
      setValue("discountPrice", selectedProduct.discountPrice || "");
      setValue("discount", selectedProduct.discount || "");
      setValue("price", selectedProduct.price || "");
      setTags(selectedProduct.tags || "");
      setValue("imgTag", selectedProduct.imgTag || "");
      setValue("rating", selectedProduct.rating || "");
      setValue("gender", selectedProduct.gender || "");
      setValue("color", selectedProduct.color || "");
      setValue("category", selectedProduct.category || "");
      setValue("fit", selectedProduct.fit || "");
      setIsBestSeller(selectedProduct.bestseller || "");
      setSelectedSizes(selectedProduct.selectedSizes || "");
      setValue("sleve", selectedProduct.sleve || "");
      setImages(selectedProduct.images || "");
    }
  }, [selectedProduct, setValue]);

  const handleSizeChange = (size) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size)
        : [...prevSizes, size]
    );
  };

  const handleImageTagChange = (e) => {
    const newValue = e.target.value.toUpperCase();
    setValue("imgTag", newValue);
  };

  const handleDelete = () => {
    const product = { ...selectedProduct };
    product.deleted = true;
    // console.log(product);
    dispatch(updateProductAsync(product));
    navigate("/admin");
  };

  const sizes = ["S", "M", "L", "XL", "2XL", "3XL"];

  return (
    <div className=" min-h-screen font-Montserrat bg-[#f5f5f5]">
      <div className=" flex justify-between items-center h-16 bg-white border-b-[2px] border-b-[#f0f0f0] ">
        <div className=" flex items-center ml-14">
          <Link
            to="/admin"
            className=" p-3 border-[2px] border-[#f0f0f0] rounded-lg shadow cursor-pointer transition ease-in duration-200 hover:shadow-none hover:text-gray-600"
          >
            <ArrowLeftIcon className=" h-5 w-5" />
          </Link>
          <div className=" flex flex-col ml-4">
            <span className=" font-bold text-xs text-[#b4b4b4]">
              Back To List
            </span>
            <span className=" font-bold mt-[2px] font-base">Edit Product</span>
          </div>
        </div>
        <Link
          to="/"
          className=" mr-14 p-3 bg-green-500 shadow-lg rounded-lg cursor-pointer"
        >
          <HomeIcon className=" h-6 w-6 text-white" />
        </Link>
      </div>
      <form
        onSubmit={handleSubmit((data) => {
          const product = {
            ...data,
            thumbnail: images[0],
            images,
            tags,
            selectedSizes,
            bestseller: isBestSeller,
            id: parmas.id,
          };
          // console.log(product);
          dispatch(updateProductAsync(product));
          setImages([]);
          setTags([]);
          setSelectedSizes([]);
          setIsBestSeller(false);
          reset();
          navigate("/admin");
        })}
        className=" grid grid-cols-[4fr_6fr] gap-6 mx-44 mt-5"
      >
        <div className=" flex flex-col bg-white overflow-hidden">
          <span className=" p-4 text-xl font-bold border-b-[1px] border-b-[#f0f0f0]">
            Product Image
          </span>
          <div className=" p-4">
            <div className=" text-[#858585] text-sm mb-4">Thumbnail</div>
            <img
              className=" w-full rounded-lg"
              src={
                images?.length > 0
                  ? images[0]
                  : "https://cdn.dribbble.com/users/34020/screenshots/3993396/otp_icon_upload.gif"
              }
              alt="please check your link"
            />
            <div className=" mt-2 overflow-y-auto flex h-20 w-full no-scrollbar rounded-md">
              {images &&
                images.map((image, index) => {
                  return (
                    <img
                      key={index}
                      className=" mr-1"
                      src={image}
                      alt="product"
                    />
                  );
                })}
            </div>
            <button
              type="button"
              className=" flex items-center mt-4 p-2 border-[#f0f0f0] border-[2px] rounded-md"
              onClick={() => setOpen(!open)}
            >
              <FiUpload className=" mr-2" /> Edit Images
            </button>
            {open && (
              <div>
                {Array.from({ length: 8 }, (_, index) => (
                  <div key={index} className="my-2">
                    <label
                      htmlFor={`image${index + 1}`}
                      className="text-[#858585] font-bold text-xs"
                    >
                      Image {index + 1}
                    </label>
                    <input
                      className="w-full border-[2px] border-[#f0f0f0] rounded-md focus:ring-0 focus:border-gray-300 focus:outline-none"
                      type="text"
                      name={`image${index + 1}`}
                      id={`image${index + 1}`}
                      value={images[index]}
                      onChange={(e) => {
                        const newImages = [...images];
                        newImages[index] = e.target.value;
                        setImages(newImages);
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className=" flex flex-col bg-white">
          <span className=" p-4 text-xl font-bold border-b-[1px] border-b-[#f0f0f0]">
            General Info
          </span>
          <div className=" w-full">
            <div className=" px-4 py-2">
              <label
                htmlFor="name"
                className=" text-[#858585] font-bold text-xs"
              >
                Product Name
              </label>
              <input
                className=" w-full border-[2px] border-[#f0f0f0] rounded-md focus:ring-0 focus:border-gray-300 focus:outline-none"
                type="text"
                {...register("name", {
                  required: "Product Name is Required",
                })}
                id="name"
              />
            </div>
            <div className=" px-4 py-2">
              <label
                htmlFor="brand"
                className=" text-[#858585] font-bold text-xs"
              >
                Product Description
              </label>
              <input
                className=" w-full border-[2px] border-[#f0f0f0] rounded-md focus:ring-0 focus:border-gray-300 focus:outline-none"
                type="text"
                {...register("desc", {
                  required: "Brand Name is Required",
                })}
                id="desc"
              />
            </div>
            <div className=" px-4 py-2">
              <label
                htmlFor="brand"
                className=" text-[#858585] font-bold text-xs"
              >
                Brand Name
              </label>
              <input
                className=" w-full border-[2px] border-[#f0f0f0] rounded-md focus:ring-0 focus:border-gray-300 focus:outline-none"
                type="text"
                {...register("brand", {
                  required: "Brand Name is Required",
                })}
                id="brand"
              />
            </div>
            <div className=" px-4 my-2 text-sm py-1 flex gap-3">
              <div className=" relative">
                <label
                  htmlFor="discountPrice"
                  className=" text-[#858585] font-bold text-xs"
                >
                  Original Price
                </label>
                <input
                  className=" pl-5 border-[2px] border-[#f0f0f0] rounded-md focus:ring-0 focus:border-gray-300 focus:outline-none"
                  type="text"
                  {...register("discountPrice", {
                    required: "Original Price is Required",
                  })}
                  id="discountPrice"
                  max="10000"
                  min="0"
                />
                <span className=" absolute top-7 left-2 font-Krala text-xl text-[#858585]">
                  ₹
                </span>
              </div>
              <div className=" relative">
                <label
                  htmlFor="discount"
                  className=" text-[#858585] font-bold text-xs"
                >
                  discount
                </label>
                <input
                  className=" pl-6 border-[2px] border-[#f0f0f0] rounded-md focus:ring-0 focus:border-gray-300 focus:outline-none"
                  type="text"
                  {...register("discount", {
                    required: "Discount is Required",
                  })}
                  id="discont"
                  max="100"
                  min="10"
                />
                <span className=" absolute top-7 left-2 font-Krala text-xl text-[#858585]">
                  %
                </span>
              </div>
              <div className=" relative">
                <label
                  htmlFor="price"
                  className=" text-[#858585] font-bold text-xs"
                >
                  Discount Price
                </label>
                <input
                  className=" pl-5 border-[2px] border-[#f0f0f0] rounded-md focus:ring-0 focus:border-gray-300 focus:outline-none"
                  type="text"
                  {...register("price", {
                    required: "Discount Price Name is Required",
                  })}
                  id="price"
                  max="10000"
                  min="10"
                />
                <span className=" absolute top-7 left-2 font-Krala text-xl text-[#858585]">
                  ₹
                </span>
              </div>
            </div>
            <div className=" flex items-center px-4 py-2">
              <div className=" relative">
                <div
                  htmlFor="tags"
                  className=" text-[#858585] font-bold text-xs"
                >
                  Tags (max 3)
                </div>
                <input
                  className=" pr-8 border-[2px] border-[#f0f0f0] rounded-md focus:ring-0 focus:border-gray-300 focus:outline-none"
                  type="text"
                  name="tags"
                  id="tags"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.target.value.trim() !== "") {
                      if (
                        tags?.length < 3 &&
                        !tags?.includes(e.target.value.trim())
                      ) {
                        const newTag = e.target.value.trim().toUpperCase();
                        setTags([...tags, newTag]);
                        e.target.value = "";
                      }
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const newTag = document.getElementById("tags").value.trim();
                    if (
                      newTag !== "" &&
                      tags?.length < 3 &&
                      !tags?.includes(newTag)
                    ) {
                      setTags([...tags, newTag.toUpperCase()]);
                      document.getElementById("tags").value = "";
                    }
                  }}
                  className="absolute right-[6px] bottom-[10px] bg-gray-400 py-1 rounded-md"
                >
                  <CheckIcon className="h-4 w-6 text-white" />
                </button>
              </div>
              <div className=" flex translate-y-[6px] items-start w-full ml-3">
                {tags &&
                  tags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center text-[#787878] font-bold text-sm p-2 border-[#f0f0f0] border-[1px] rounded-md ml-2"
                    >
                      {tag}
                      <XMarkIcon
                        className="h-4 w-4 translate-y-[1px] ml-1 cursor-pointer"
                        onClick={() => {
                          const updatedTags = [...tags];
                          updatedTags.splice(index, 1);
                          setTags(updatedTags);
                        }}
                      />
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <div className=" flex  items-center px-4 mb-2">
                <div>
                  <div
                    htmlFor="imgTag"
                    className=" text-[#858585] font-bold text-xs"
                  >
                    Image Tag (only 1)
                  </div>
                  <input
                    className=" pr-8 border-[2px] border-[#f0f0f0] rounded-md focus:ring-0 focus:border-gray-300 focus:outline-none"
                    type="text"
                    {...register("imgTag")}
                    id="imgTag"
                    onChange={handleImageTagChange}
                  />
                </div>
                <div className=" ml-2">
                  <div className=" relative">
                    <div
                      htmlFor="rating"
                      className=" text-[#858585] font-bold text-xs"
                    >
                      Rating
                    </div>
                    <input
                      className=" max-w-[150px] pl-7 border-[2px] border-[#f0f0f0] rounded-md focus:ring-0 focus:border-gray-300 focus:outline-none"
                      type="text"
                      {...register("rating")}
                      id="rating"
                      min={0}
                      max={5}
                      maxLength="3"
                    />
                    <div className=" absolute text-[#787878] font-bold bottom-[10px] left-1">
                      <StarIcon className=" h-6 w-6" />
                    </div>
                  </div>
                </div>
                <div className=" flex flex-col ml-2">
                  <label
                    htmlFor="gender"
                    className=" text-[#858585] font-bold text-xs"
                  >
                    Gender
                  </label>
                  <select
                    className=" border-[#f0f0f0] border-[2px] rounded-lg focus:ring-0 focus:border-gray-400 focus:outline-none"
                    {...register("gender", {
                      required: "Gender is Required",
                    })}
                    id="gender"
                  >
                    <option value="men">men</option>
                    <option value="women">women</option>
                  </select>
                </div>
                <div className=" flex flex-col ml-2">
                  <label
                    htmlFor="color"
                    className=" text-[#858585] font-bold text-xs"
                  >
                    Color
                  </label>
                  <select
                    className=" border-[#f0f0f0] border-[2px] rounded-lg focus:ring-0 focus:border-gray-400 focus:outline-none"
                    {...register("color", {
                      required: "Color is Required",
                    })}
                    id="color"
                  >
                    <option value="white">white</option>
                    <option value="black">black</option>
                    <option value="blue">blue</option>
                    <option value="green">green</option>
                    <option value="gray">gray</option>
                    <option value="brown">brown</option>
                    <option value="purple">purple</option>
                    <option value="red">red</option>
                    <option value="pink">pink</option>
                    <option value="orange">orange</option>
                    <option value="yellow">yellow</option>
                  </select>
                </div>
              </div>
              <div className=" flex px-2 mb-2">
                <div className=" flex flex-col ml-2">
                  <label
                    htmlFor="category"
                    className=" text-[#858585] font-bold text-xs"
                  >
                    Category
                  </label>
                  <select
                    className=" border-[#f0f0f0] border-[2px] rounded-lg focus:ring-0 focus:border-gray-400 focus:outline-none"
                    {...register("category", {
                      required: "Category is Required",
                    })}
                    id="category"
                  >
                    <option value="tshirt">T-Shirt</option>
                    <option value="top">Top</option>
                    <option value="boxer">Boxer</option>
                    <option value="vest">Vest</option>
                    <option value="shirt">Shirt</option>
                    <option value="short">Shorts</option>
                    <option value="sweatshirt">Sweatshirt</option>
                    <option value="joggers">Joggers</option>
                    <option value="hoodies">Hoodies</option>
                    <option value="pyjama">Pyjama</option>
                    <option value="jacket">Jacket</option>
                    <option value="trousers">Trousers</option>
                    <option value="trackpant">Track Pant</option>
                    <option value="sweater">Sweater</option>
                    <option value="tracksuit">Tracksuit</option>
                    <option value="casualpants">Casual Pants</option>
                    <option value="casualpants">Dress</option>
                  </select>
                </div>
                <div className=" flex flex-col ml-2">
                  <label
                    htmlFor="fit"
                    className=" text-[#858585] font-bold text-xs"
                  >
                    Fit
                  </label>
                  <select
                    className=" border-[#f0f0f0] border-[2px] rounded-lg focus:ring-0 focus:border-gray-400 focus:outline-none"
                    {...register("fit")}
                    id="fit"
                  >
                    <option value="">Select</option>
                    <option value="oversize">OVERSIZED FIT</option>
                    <option value="regular">REGULAR FIT</option>
                    <option value="superloose">SUPERLOOSE FIT</option>
                  </select>
                </div>
                <div className=" ml-3 flex items-center translate-y-1">
                  <div className="relative flex items-center justify-centers">
                    <div
                      htmlFor="isBestSeller"
                      className="text-[#858585] font-bold text-sm"
                    >
                      Bestseller:
                    </div>
                    <div className="ml-2">
                      <input
                        type="checkbox"
                        id="isBestSeller"
                        checked={isBestSeller ? true : false}
                        onChange={() => setIsBestSeller(!isBestSeller)}
                        className="hidden"
                      />
                      <label
                        htmlFor="isBestSeller"
                        className={`w-8 h-8 border border-[#f0f0f0] flex items-center justify-center rounded-md cursor-pointer ${
                          isBestSeller ? "bg-gray-300" : "bg-white"
                        }`}
                      >
                        ✓
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" flex items-center justify-between mb-2 mx-2">
                <div className=" flex">
                  <div className=" ml-2">
                    <label
                      htmlFor="availableSizes"
                      className="text-[#858585] font-bold text-xs"
                    >
                      Available Sizes
                    </label>
                    <div className="flex items-center">
                      {sizes.map((size) => (
                        <div key={size} className=" mr-2">
                          <input
                            type="checkbox"
                            id={size}
                            value={size}
                            checked={
                              selectedSizes?.includes(size) ? true : false
                            }
                            onChange={() => handleSizeChange(size)}
                            className="hidden"
                          />
                          <label
                            htmlFor={size}
                            className={`w-8 h-8 border border-[#f0f0f0] flex items-center justify-center rounded-md cursor-pointer ${
                              selectedSizes?.includes(size)
                                ? "bg-gray-300"
                                : "bg-white"
                            }`}
                          >
                            {size}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className=" flex flex-col ml-2">
                    <label
                      htmlFor="sleve"
                      className=" text-[#858585] font-bold text-xs"
                    >
                      Sleve
                    </label>
                    <select
                      className=" border-[#f0f0f0] border-[2px] rounded-lg focus:ring-0 focus:border-gray-400 focus:outline-none"
                      {...register("sleve")}
                      id="sleve"
                    >
                      <option value="">Select</option>
                      <option value="fullsleve">Fullsleve</option>
                      <option value="halfsleve">Halfsleve</option>
                    </select>
                  </div>
                </div>
                <div className=" flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleDelete()}
                    className=" p-3 bg-red-500 text-white rounded-lg shadow cursor-pointer transition ease-in duration-200 hover:text-gray-200"
                  >
                    Delete Product
                  </button>
                  <button
                    type="submit"
                    value="submit"
                    className=" p-3 border-[2px] border-[#f0f0f0] rounded-lg shadow cursor-pointer transition ease-in duration-200 hover:shadow-none hover:text-gray-600"
                  >
                    Upload Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AdminProductEditForm;
