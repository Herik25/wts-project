import React from "react";
import { FiEdit, FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";

function AdminProductGrid({ products }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <Link to={`/productdetail/${product.id}`}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-90 lg:h-[400px]">
                  <img
                    src={product.thumbnail}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full transform transition-transform hover:scale-110"
                  />
                  {product.imgTag && (
                    <div
                      className={`absolute top-0 left-0 text-[8px] ${
                        product.imgTag.startsWith("BUY")
                          ? "bg-[#00b852]"
                          : "bg-[#525252]"
                      } p-1 px-2 text-white font-Montserrat leading-[10px] font-semibold`}
                    >
                      {product.imgTag}
                    </div>
                  )}

                  {product.rating && (
                    <div className=" absolute top-80 left-0 bg-white flex items-center opacity-90 text-[12px] font-Krala px-1">
                      <img
                        src="https://www.freepnglogos.com/uploads/star-png/file-featured-article-star-svg-wikimedia-commons-8.png"
                        alt="star"
                        className=" h-[12px] w-[12px] mr-1"
                      />{" "}
                      {product.rating}
                    </div>
                  )}
                </div>
                <div className=" flex justify-between">
                  <div className=" font-Montserrat font-bold text-[12px] text-[#707070] pt-[8px] pb-[4px]">
                    {product.brand}
                  </div>
                  <div className=" pr-2 text-lg text-[#333] pt-[8px]">
                    <FiHeart />
                  </div>
                </div>
                <div className=" font-Montserrat text-[10px] text-[#6e6e6e] font-bold max-w-[250px] whitespace-nowrap overflow-hidden text-ellipsis pb-[2px]">
                  {product.name}
                </div>
                <div className=" flex items-center">
                  <div className=" font-Krala text-lg text-[#333] pr-2">
                    ₹<span className=" font-bold">{product.price}</span>
                  </div>
                  <div className=" line-through text-sm text-[#888] pr-2 font-Krala">
                    ₹<span>{product.discountPrice}</span>
                  </div>
                  {/* <div className=" text-green-400 text-sm font-bold">
                              {product.discount}% OFF
                            </div> */}
                </div>
                <div className=" flex items-center justify-between">
                  {product.tags && (
                    <span className=" border-[1px] border-gray-500 text-[10px] p-1 px-2 font-Montserrat font-bold text-[#777]">
                      {product.tags[0]}
                    </span>
                  )}
                  {product.deleted && (
                    <div className=" text-[10px] text-[#f0f0f0] bg-rose-600 py-1 px-2 rounded-md mr-2">
                      Product Deleted
                    </div>
                  )}
                </div>
              </Link>
              <Link
                to={`/admin/product-form/edit/${product.id}`}
                className="absolute right-0 bottom-7 z-50 text-sm text-[#888] pr-2 font-Krala cursor-pointer"
              >
                <span>
                  <FiEdit className=" h-4 w-4 hover:text-gray-600" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminProductGrid;
