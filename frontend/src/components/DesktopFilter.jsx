import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, Squares2X2Icon } from "@heroicons/react/20/solid";

function DesktopFilter({ filters, filterArray, handleFilter, filterSection }) {
  return (
    <div className="sticky top-0">
      {/* Filters */}
      <form className="hidden lg:block">
        <h1 className=" text-[#434242] font-bold text-[16px]">Filters</h1>
        <h3 className="sr-only">Categories</h3>

        {filters.map((section) => (
          <Disclosure
            as="div"
            key={section.id}
            className="border-b border-gray-200 py-6"
          >
            {({ open }) => (
              <>
                <h3 className="-my-3 flow-root">
                  <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span className=" flex items-center text-[#374151] font-Montserrat text-[16px]">
                      {section.name}
                      {filterSection?.includes(section.name) && (
                        <div className=" h-2 w-2 translate-y-[1px] ml-1 bg-[#3d9999] rounded-full"></div>
                      )}
                    </span>
                    <span className="ml-6 flex items-center">
                      {open ? (
                        <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <ChevronDownIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel className="pt-6">
                  <div className="space-y-4">
                    {section.options.map((option, optionIdx) => (
                      <div
                        key={option.value}
                        onClick={(e) => handleFilter(e, section, option)}
                        className="flex items-center rounded p-1 cursor-pointer hover:bg-gray-100"
                      >
                        {section.name === "Color" && (
                          <div
                            className="h-6 w-6 rounded-sm border border-gray-300"
                            style={{ backgroundColor: option.value }}
                          ></div>
                        )}
                        <input
                          id={`filter-mobile-${section.id}-${optionIdx}`}
                          name={`${section.id}[]`}
                          defaultValue={option.value}
                          type="checkbox"
                          defaultChecked={option.checked}
                          //onchange handlefilter
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 hidden"
                        />
                        <label
                          htmlFor={`filter-${section.id}-${optionIdx}`}
                          className={`ml-3 text-bold && ${
                            filterArray.find((opt) => opt === option.value)
                              ? "font-bold text-[#42a2a2]"
                              : " text-gray-600"
                          } cursor-pointer`}
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </form>
    </div>
  );
}

export default DesktopFilter;
