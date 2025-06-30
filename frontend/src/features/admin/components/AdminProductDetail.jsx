import React, { useEffect, useState } from "react";
import Navbar from "../../../navbar/Navbar";
import Footer from "../../../components/Footer";
import {
  BsArrowRight,
  BsBag,
  BsGeoAlt,
  BsGlobe,
  BsHeart,
} from "react-icons/bs";
import { FiHeart, FiMinus, FiPlus } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProductsAsync,
  fetchProductByIdAsync,
  selectAllProducts,
  selectProductById,
} from "../../products/ProductSlice";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { selectUserInfo } from "../../user/userSlice";
import { useForm } from "react-hook-form";

function AdminProductDetail() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [img, setImg] = useState("");
  const [selectedSize, setSelectedSize] = useState("S");
  const [pincode, setPincode] = useState("");

  const param = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const product = useSelector(selectProductById);
  const availableSizes = product.selectedSizes;
  const products = useSelector(selectAllProducts);
  const bestSellerProducts = products.filter(
    (product) => product.bestseller === true
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchAllProductsAsync());
    dispatch(fetchProductByIdAsync(param.id));
  }, [dispatch]);

  const sizes = [
    { size: "S" },
    { size: "M" },
    { size: "L" },
    { size: "XL" },
    { size: "2XL" },
    { size: "3XL" },
  ];

  const getOffers = [
    {
      img: "https://images.bewakoof.com/web/ic-star-offer.svg",
      name: "Offers",
      desc: "Save Extra with 1 Offers",
    },
    {
      img: "https://images.bewakoof.com/web/ic-prod-desc.svg",
      name: "Product Description",
      desc: "Manufactoror, Care and Fit",
    },
    {
      img: "	https://images.bewakoof.com/web/ic-return.svg",
      name: "15 Days Returns & Exchange",
      desc: "Know about return & exchange policy",
    },
  ];

  const renderedProducts = bestSellerProducts.map((product, index) => {
    return (
      <div key={index} className=" bg-white min-w-[236px] mx-2">
        <img
          src={product.thumbnail}
          alt={product.imageAlt}
          onDragStart={(e) => e.preventDefault()}
          className=" h-[300px] cursor-pointer"
        />
        <div className=" flex flex-col font-poppins p-1 pt-2">
          <div className=" flex items-center">
            <div className=" font-Krala text-lg text-[#333] pr-2">
              ₹<span className=" font-bold">{product.price}</span>
            </div>
            <div className=" line-through text-sm text-[#888] pr-2 font-Krala">
              ₹<span>{product.discountPrice}</span>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <Navbar />
      {product ? (
        <div className=" mt-[80px] mx-60">
          <div className=" h-screen w-full grid grid-cols-[2fr_8fr_8fr]">
            <div className=" w-[100px] mt-2">
              <div className=" h-10 w-10 text-gray-400 mx-auto">
                <ChevronUpIcon />
              </div>
              {product.images && (
                <div className=" flex flex-col overflow-y-auto no-scrollbar max-w-[100px] max-h-[480px]">
                  {product.images.map((image, index) => {
                    return (
                      <div
                        key={index}
                        className=" cursor-pointer"
                        onClick={() => setImg(image)}
                      >
                        <img src={image} className=" p-2" alt="images" />
                      </div>
                    );
                  })}
                </div>
              )}
              <div className=" h-10 w-10 text-gray-400 mx-auto">
                <ChevronDownIcon />
              </div>
            </div>
            {product.images && (
              <div>
                <img src={img || product.images[0]} alt="big image" />
              </div>
            )}
            <div className=" flex flex-col mx-6 w-full p-5 overflow-y-auto no-scrollbar">
              <div>
                <span className=" font-Montserrat font-semibold text-[18px] text-[#4f5362]">
                  {product.brand}
                </span>
              </div>
              <div className=" mt-2">
                <span className="font-Montserrat text-[#737373] text-[16px]">
                  {product.name}
                </span>
              </div>
              {product.rating && (
                <div className=" w-full mt-3">
                  <div className=" flex items-center bg-[#f7f7f7] border-[1px] border-black max-w-[50px]">
                    <img
                      className=" mx-1 h-3 w-3"
                      src="https://www.freepnglogos.com/uploads/star-png/file-featured-article-star-svg-wikimedia-commons-8.png"
                      alt="star"
                    />
                    <span className=" font-Montserrat font-bold text-[14px] shadow-sm">
                      {product.rating}
                    </span>
                  </div>
                </div>
              )}
              <div className=" mt-3 flex items-center">
                <div className=" font-Montserrat text-black text-2xl pr-1">
                  <span className=" font-Krala text-[18px]">₹</span>
                  <span className=" font-bold">{product.price}</span>
                </div>
                <div className=" font-Montserrat text-[#949494] text-sm pr-2 line-through">
                  <span className=" font-Krala text-[12px]">₹</span>
                  <span>{product.discountPrice}</span>
                </div>
                <div className=" font-Montserrat font-semibold text-[18px] text-[#00b852]">
                  {product.discount}% OFF
                </div>
              </div>
              <div className=" translate-y-[-10px]">
                <span className=" text-[#949494] font-Montserrat text-[12px]">
                  inclusive of all taxes
                </span>
              </div>
              {product.tags && (
                <div>
                  <div className=" flex items-start">
                    {product.tags.map((tag, index) => {
                      return (
                        <div key={index} className=" whitespace-nowrap">
                          {tag === "OVERSIZED FIT" && (
                            <div className=" px-2 py-[2px] bg-[#525252] font-bold text-white text-xs font-Montserrat opacity-80 mr-2">
                              {tag}
                            </div>
                          )}
                          {tag.startsWith("BUY") && (
                            <div className=" mr-2 px-2 py-[2px] bg-green-500 font-bold text-white text-xs font-Montserrat opacity-80">
                              {tag}
                            </div>
                          )}
                          {tag !== "OVERSIZED FIT" &&
                            tag.startsWith("BUY") === false && (
                              <div className=" mr-2 px-2 py-[2px] bg-white border-[1px]  border-black font-bold text-black text-xs font-Montserrat opacity-80">
                                {tag}
                              </div>
                            )}
                        </div>
                      );
                    })}
                  </div>
                  <div className=" h-[2px] w-full mt-4 mb-2 bg-[#eee]"></div>
                </div>
              )}
              <div>
                <div className=" text-[#333] font-semibold font-Montserrat text-[12px]">
                  TriBe members get an extra discount of{" "}
                  <span className=" font-Krala">₹</span>
                  <span className=" font-Krala text-[15px]">110</span> and FREE
                  shipping.
                  <a className=" text-[#007aff]" href="#">
                    Learn more
                  </a>
                </div>
                <div className=" h-[2px] w-full mt-3 mb-4 bg-[#eee]"></div>
              </div>
              <div>
                <div className=" flex w-full justify-between">
                  <div className=" font-karala font-bold text-[12px]">
                    SELECT SIZE
                  </div>
                  <div className=" font-Montserrat text-[#42a2a2] font-semibold text-[12px]">
                    Size Guide
                  </div>
                </div>
                <span className=" flex my-2">
                  {sizes.map((size, index) => {
                    const isSizeAvailable = availableSizes?.includes(size.size);

                    return (
                      <div
                        key={index}
                        onClick={() => {
                          if (product.selectedSizes.includes(size.size)) {
                            setSelectedSize(size.size);
                          }
                        }}
                        className={`border-[1px] rounded-md border-black text-black${
                          selectedSize === size.size
                            ? " bg-black text-white"
                            : "border-[#cecece] text-black  hover:border-green-600"
                        } font-Montserrat text-[14px] ${
                          size.size.length > 2 ? "px-2" : "px-4"
                        } py-3 mr-3 ${
                          isSizeAvailable
                            ? "cursor-pointer"
                            : "cursor-no-drop opacity-20"
                        }`}
                      >
                        {size.size}
                      </div>
                    );
                  })}
                </span>
              </div>
              <div>
                <div className=" mt-8">
                  <div className=" flex gap-3 w-full">
                    <button
                      onClick={() => (window.location.href = "/login")}
                      className=" flex items-center justify-center bg-[#ffd24d] text-[#333] font-Montserrat text-sm font-semibold rounded-md w-full py-3"
                    >
                      {" "}
                      <BsBag className=" mr-2 text-[16px]" />
                      ADD TO BAG
                    </button>
                    <button className=" flex items-center justify-center border-[1px] border-[#cecece] rounded-md font-Montserrat text-[#949494] text-sm font-bold w-full">
                      {" "}
                      <BsHeart className=" mr-2 text-[16px] text-[#4f5362] font-bold translate-y-[1px]" />
                      WHISHLIST
                    </button>
                  </div>
                </div>
                <div className=" h-[2px] w-full mt-4 mb-4 bg-[#eee]"></div>
              </div>
              <div>
                <div className=" flex flex-col">
                  <div className=" flex items-center justify-start">
                    <BsGeoAlt className=" text-[20px] font-bold mr-1" />
                    <span className=" text-[12px] text-[#2d2d2d] font-bold font-Montserrat">
                      CHECK FOR DELIVERY DETAILS
                    </span>
                  </div>
                  <div>
                    <span className=" mt-2 flex text-[12px] text-black font-Montserrat font-bold opacity-90">
                      Delivering in{" "}
                      <span className=" ml-[2px] text-[#007aff]">India</span>
                      <img
                        className=" h-4 w-4 rounded-full ml-1"
                        src="https://th.bing.com/th/id/R.607b9f69862d76af04b474113c0c7ff5?rik=lfnOsbv7mhDNbQ&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2fb%2fbc%2fFlag_of_India.png&ehk=Pk5lH0C%2fhstFahWfb15vLjtrJb3DslIU4%2fAQneo9IIM%3d&risl=&pid=ImgRaw&r=0"
                        alt="india flag"
                      />
                    </span>
                  </div>
                  <div className=" mt-2">
                    <form
                      onSubmit={handleSubmit(async (data) => {
                        try {
                          const res = await fetch(
                            `https://api.postalpincode.in/pincode/${data.pincode}`
                          );

                          if (!res.ok) {
                            throw new Error(
                              `HTTP error! Status: ${res.status}`
                            );
                          }

                          const post = await res.json();
                          const array = post[0]?.PostOffice[0];
                          const cityName = array.Block;
                          setPincode(cityName);
                        } catch (error) {
                          console.error("Error fetching data:", error.message);
                          setPincode("none");
                        }
                      })}
                      className=" relative"
                    >
                      <input
                        type="text"
                        {...register("pincode")}
                        id="pincode"
                        placeholder="Enter Pincode"
                        maxLength="6"
                        className="w-full border-[1px] border-black rounded-md font-Montserrat text-[12px] text-[#949494] font-bold px-2 py-1"
                      />
                      <button
                        className=" absolute right-4 bottom-2 font-Montserrat font-bold text-[#007aff] text-[12px]"
                        type="submit"
                        value="submit"
                      >
                        CHECK
                      </button>
                    </form>
                  </div>
                  {pincode && (
                    <div>
                      {pincode === "none" ? (
                        <div className=" font-Montserrat text-sm text-red-500 py-2">
                          Invalid Pincode
                        </div>
                      ) : (
                        <div className=" font-Montserrat text-sm py-2">
                          Delivery is available for <b>{pincode}</b>
                        </div>
                      )}
                    </div>
                  )}
                  <div className=" flex items-center justify-start text-[#007aff] mt-2">
                    <BsGlobe className=" mr-1 text-[18px]" />
                    <span className=" mr-1 font-Montserrat">
                      Check For Global Delivery
                    </span>
                    <BsArrowRight className=" text-[20px] translate-y-[2px]" />
                  </div>
                </div>
                <div className=" h-[2px] w-full mt-4 mb-1 bg-[#eee]"></div>
              </div>
              <div>
                {getOffers.map((offer, index) => {
                  const [isOfferSelected, setOffer] = useState(false);

                  return (
                    <div
                      key={index}
                      onClick={() => setOffer(!isOfferSelected)}
                      className="border-b-[1px] border-[#ddd]"
                    >
                      <button className="flex w-full items-center justify-between bg-white px-2 py-3 font-Montserrat hover:text-gray-700">
                        <div className="flex items-center">
                          <div className="mr-2">
                            <img src={offer.img} alt="icon" />
                          </div>
                          <div className="flex flex-col items-start">
                            <span className="text-[16px] text-black font-Montserrat font-bold">
                              {offer.name}
                            </span>
                            <span className=" text-xs text-[#878787] font-Montserrat">
                              {offer.desc}
                            </span>
                          </div>
                        </div>

                        <span className="ml-6 flex items-center">
                          {isOfferSelected ? (
                            <FiMinus className="h-4 w-4" aria-hidden="true" />
                          ) : (
                            <FiPlus className="h-4 w-4" aria-hidden="true" />
                          )}
                        </span>
                      </button>
                      {offer.name === "Offers" && isOfferSelected && (
                        <div className="flex items-center px-2 mb-4">
                          <div className="mr-2">
                            <img
                              className=" h-6 w-10"
                              src="https://images.bewakoof.com/web/discount-1-2x-1625212811.png"
                              alt="offer"
                            />
                          </div>
                          <div className="flex flex-col items-start">
                            <span className=" text-xs text-[#606060] opacity-80 font-Montserrat font-bold">
                              Get Rs.200 instant discount on your First Purchase
                              above Rs.999. Coupon code -{" "}
                              <span className=" font-bold text-black opacity-100">
                                NEW200
                              </span>
                            </span>
                            <span className="text-xs text-[#42a2a2] font-Montserrat font-bold">
                              Tap to Copy
                            </span>
                          </div>
                        </div>
                      )}
                      {offer.name === "15 Days Returns & Exchange" &&
                        isOfferSelected && (
                          <div className="flex items-center px-2 mb-4">
                            <div className="flex flex-col items-start">
                              <span className=" text-xs text-[#606060] opacity-80 font-Montserrat">
                                Easy returns upto 15 days of delivery. Exchange
                                available on select pincodes
                              </span>
                            </div>
                          </div>
                        )}
                      {offer.name === "Product Description" &&
                        isOfferSelected && (
                          <div className="flex items-center px-2 mb-4">
                            <div className="flex flex-col items-start">
                              <span className=" text-xs text-[#606060] opacity-80 font-Montserrat mb-2">
                                {product?.desc ? product?.desc : product.name}
                              </span>
                              <span className=" text-xs text-[#606060] opacity-80 font-Montserrat mb-2">
                                <span className=" font-bold">
                                  Country of Origin -{" "}
                                </span>
                                India
                              </span>
                              <span className=" text-xs text-[#606060] opacity-80 font-Montserrat mb-2">
                                <span className=" font-bold">
                                  Manufactured By -{" "}
                                </span>
                                Bewakoof Brands Pvt Ltd, Sairaj logistic hub
                                #A5,BMC pipeline road, Opposite all saints high
                                school, Amane, Bhiwandi, Thane, Maharashtra
                                421302
                              </span>
                              <span className=" text-xs text-[#606060] opacity-80 font-Montserrat mb-2">
                                <span className=" font-bold">Packed By - </span>
                                Bewakoof Brands Pvt Ltd, Sairaj logistic hub
                                #A5,BMC pipeline road, Opposite all saints high
                                school, Amane, Bhiwandi, Thane, Maharashtra
                                421302
                              </span>
                              <span className=" text-xs text-[#606060] opacity-80 font-Montserrat mb-2">
                                <span className=" font-bold">Commodity - </span>
                                {product.category}
                              </span>
                            </div>
                          </div>
                        )}
                    </div>
                  );
                })}
              </div>
              <div>
                <div className=" my-4 w-full flex items-center justify-between px-4">
                  <div className=" flex flex-col items-center max-w-[80px]">
                    <img
                      className=" h-12 w-12"
                      src="https://images.bewakoof.com/web/trust-cart.svg"
                      alt="imgPolicies"
                    />
                    <span className=" font-Montserrat text-[8px] text-center mt-1 text-[#878787]">
                      100% SECURE PAYMENTS
                    </span>
                  </div>
                  <div className=" flex flex-col items-center max-w-[80px]">
                    <img
                      className=" h-12 w-12"
                      src="https://images.bewakoof.com/web/Easy-Returns.svg"
                      alt="imgPolicies"
                    />
                    <span className=" font-Montserrat text-[8px] text-center mt-1 text-[#878787]">
                      EASY RETURNS & INSTANT REFUNDS
                    </span>
                  </div>
                  <div className=" flex flex-col items-center max-w-[80px]">
                    <img
                      className=" h-12 w-12"
                      src="https://images.bewakoof.com/web/Globe.svg"
                      alt="imgPolicies"
                    />
                    <span className=" font-Montserrat text-[8px] text-center mt-1 text-[#878787]">
                      SHIPPING GLOBALLY
                    </span>
                  </div>
                </div>
                <div className=" h-[2px] w-full mt-2 mb-4 bg-[#eee]"></div>
              </div>
              <div>Reviews</div>
            </div>
          </div>
        </div>
      ) : (
        <div className=" h-screen w-full mt-20">Loading</div>
      )}
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default AdminProductDetail;
