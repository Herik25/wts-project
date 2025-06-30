import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ChevronDoubleUpIcon,
  ChevronUpIcon,
  StarIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  TotalCount,
  fetchAllProductsAsync,
  fetchProductsByFiltersAsync,
  selectAllProducts,
  selectProductListStatus,
} from "../features/products/ProductSlice";
import MobileFilter from "./MobileFilter";
import DesktopFilter from "./DesktopFilter";
import ProductGrid from "./ProductGrid";
import SkeletonLoaderProductList from "./SkeletonLoaderProductList";
import Footer from "./Footer";

const sortOptions = [
  { name: "Newest", sort: "#", current: false },
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];
const filters = [
  {
    id: "gender",
    name: "Gender",
    options: [
      { value: "men", label: "Men", checked: false },
      { value: "women", label: "Women", checked: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "tshirt", label: "T-Shirt", checked: false },
      { value: "top", label: "top", checked: false },
      { value: "boxer", label: "Boxer", checked: false },
      { value: "vest", label: "Vest", checked: false },
      { value: "jeans", label: "Jeans", checked: false },
      { value: "shirt", label: "Shirt", checked: false },
      { value: "shorts", label: "Shorts", checked: false },
      { value: "sweatshirt", label: "Sweatshirt", checked: false },
      { value: "joggers", label: "Joggers", checked: false },
      { value: "hoodies", label: "Hoodies", checked: false },
      { value: "pyjama", label: "Pyjama", checked: false },
      { value: "jacket", label: "Jacket", checked: false },
      { value: "trousers", label: "Trousers", checked: false },
      { value: "trackpant", label: "Track Pant", checked: false },
      { value: "sweater", label: "Sweater", checked: false },
      { value: "tracksuit", label: "Tracksuit", checked: false },
      { value: "casualpants", label: "Casual Pants", checked: false },
      { value: "dress", label: "Dress", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "xs", label: "XS", checked: false },
      { value: "S", label: "S", checked: false },
      { value: "M", label: "M", checked: false },
      { value: "L", label: "L", checked: false },
      { value: "XL", label: "XL", checked: false },
      { value: "2XL", label: "2XL", checked: true },
      { value: "3XL", label: "3XL", checked: true },
      { value: "4XL", label: "4XL", checked: true },
    ],
  },
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "gray", label: "Gray", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "red", label: "Red", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
      { value: "pink", label: "Pink", checked: false },
      { value: "black", label: "Black", checked: false },
      { value: "orange", label: "Orange", checked: false },
      { value: "yellow", label: "Yellow", checked: false },
    ],
  },
  {
    id: "brand",
    name: "Brand",
    options: [
      { value: "bewkoof", label: "Bewkoof", checked: false },
      { value: "bewkoofhd ", label: "Bewkoof Heavy Duty @1.0", checked: false },
    ],
  },
  {
    id: "design",
    name: "Design",
    options: [
      { value: "solid", label: "Solid", checked: false },
      { value: "graphicPrint", label: "Graphic Print", checked: false },
      { value: "typography", label: "Typography", checked: false },
      { value: "aop", label: "Aop", checked: false },
      { value: "colorBlock", label: "Color Block", checked: false },
      { value: "printed", label: "Printed", checked: false },
    ],
  },
  {
    id: "fit",
    name: "Fit",
    options: [
      { value: "oversize", label: "Oversized Fit", checked: false },
      { value: "regular", label: "Regular Fit", checked: false },
      { value: "superloose", label: "Super loose Fit", checked: false },
    ],
  },
  {
    id: "sleve",
    name: "Sleve",
    options: [
      { value: "fullsleve", label: "Fullsleve", checked: false },
      { value: "halfsleve", label: "Halfsleve", checked: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  // gender fetch
  // const selectedGender = useSelector(selectSelectedGender);
  // console.log(selectedGender);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState("");
  const [filterSection, setFilterSection] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const filterArray = Object.values(filter);
  const totalCount = useSelector(TotalCount);
  const productListStatus = useSelector(selectProductListStatus);

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProductsByFiltersAsync(filter));
  }, [filter, dispatch]);

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [products, searchQuery]);

  const handleFilter = (e, section, option) => {
    e.preventDefault();
    let newFilter = {};
    const isOptionSelected = filterArray.includes(option.value);
    if (isOptionSelected) {
      const updatedFilter = { ...filter };
      delete updatedFilter[section.id];

      setFilter(updatedFilter);

      const updatedFilterSections = filterSection.filter(
        (s) => s !== section.name
      );
      setFilterSection(updatedFilterSections);
    } else {
      const updateFilterSection = [...filterSection, section.name];
      setFilterSection(updateFilterSection);

      newFilter = { ...filter, [section.id]: option.value };
      setFilter(newFilter);
    }
  };

  const handleSort = (e, option) => {
    setSort(option.name);
    const newFilter = { ...filter, _sort: option.sort, _order: option.order };
    setFilter(newFilter);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // const cat = [...new Set(products.map(p => p.category))] //categories stored in set format

  return (
    <div className="bg-white font-Montserrat">
      <div>
        <MobileFilter
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          filters={filters}
          filterArray={filterArray}
          handleFilter={handleFilter}
          filterSection={filterSection}
        />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between pb-6 pt-20">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 pb-2">
                All Fashion{" "}
                <span className=" ml-1 text-2xl text-[#949494] font-Montserrat font-medium">
                  ({searchQuery ? filteredProducts.length : totalCount})
                </span>
              </h1>
              <div className="h-[2px] w-[100px] bg-yellow-400"></div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon
                    className="h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3d9999] focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <XMarkIcon
                      className="h-4 w-4 text-gray-400 hover:text-gray-600"
                      aria-hidden="true"
                    />
                  </button>
                )}
              </div>

              {/* Sort Menu */}
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-xs font-bold text-[#2d2d2d] hover:text-gray-900">
                    <span className=" font-bold opacity-50">
                      SORT BY &nbsp;
                    </span>{" "}
                    {sort}
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right cursor-pointer rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <p
                              onClick={(e) => handleSort(e, option)}
                              className={classNames(
                                sort === option.name
                                  ? "font-medium text-[#3d9999]"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </p>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              {/* <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button> */}
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <div className="fixed top-20 h-screen overflow-scroll no-scrollbar md:fixed lg:sticky xl:sticky">
                <DesktopFilter
                  filters={filters}
                  filterArray={filterArray}
                  handleFilter={handleFilter}
                  filterSection={filterSection}
                />
              </div>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {productListStatus === "loading" ? (
                  <SkeletonLoaderProductList />
                ) : (
                  <ProductGrid products={filteredProducts} />
                )}
              </div>
            </div>
            <div
              className="fixed bottom-8 right-8 p-4 bg-white ring-1 ring-gray-100 shadow-md rounded-full cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <img
                src="https://images.bewakoof.com/web/group-7-1585574470.png"
                alt="arrowup"
              />
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}
