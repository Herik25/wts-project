import React from "react";

const skeletonLoaderProductList = () => {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      {[...Array(12)].map((_, index) => (
        <div key={index} className=" flex justify-center col-sm-6 col-md-3 mb-4">
          <div className=" h-96 w-[270px] rounded-md">
            <div className=" h-80 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-gradient"></div>
            <div className="bg-white py-4 flex items-center justify-center">
              <div className="flex-shrink-0 w-full">
                <div className="h-4 w-3/5 mb-2 bg-gray-300 animate-gradient rounded-md"></div>
                <div className="h-4 w-1/2 mb-2 bg-gray-300 animate-gradient rounded-md"></div>
                <div className="h-4 w-1/3 bg-gray-300 animate-gradient rounded-md"></div>
              </div>
              <div className="w-16 h-6 bg-gray-300 animate-gradient rounded-md"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default skeletonLoaderProductList;
