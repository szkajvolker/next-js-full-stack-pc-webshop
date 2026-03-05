import { MANUFACTURERS } from "@/constants/data";
import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

type ManufacturerFilterProps = {
  selected: string[];
  onChange: (selected: string[]) => void;
};

const ManufacturersFilter: React.FC<ManufacturerFilterProps> = ({
  selected,
  onChange,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const handleChange = (manufacturer: string) => {
    if (selected.includes(manufacturer)) {
      onChange(selected.filter((m) => m !== manufacturer));
    } else {
      onChange([...selected, manufacturer]);
    }
  };

  const handleCollapse = () => {
    if (collapsed) {
      setCollapsed(false);
    } else {
      setCollapsed(true);
    }
  };

  const handleShowAll = () => {
    if (showAll) {
      setShowAll(false);
    } else {
      setShowAll(true);
    }
  };

  return (
    <div className="pl-5 border-b border-gray-200 p-4 w-full">
      <div className="flex flex-row w-full justify-between pb-4">
        <h3 className="font-bold text-lg">Manufacturer</h3>
        {collapsed ? (
          <button className="cursor-pointer" onClick={handleCollapse}>
            <FaAngleDown />
          </button>
        ) : (
          <button className="cursor-pointer" onClick={handleCollapse}>
            <FaAngleUp />
          </button>
        )}
      </div>
      {collapsed && (
        <div>
          {MANUFACTURERS.slice(0, !showAll ? 5 : MANUFACTURERS.length).map(
            ({ name }) => (
              <label
                htmlFor={`manufacturer-${name}`}
                className="block text-neutral-600 text-sm mb-1 mr-auto cursor-pointer"
                key={name}
              >
                <input
                  id={`manufacturer-${name}`}
                  type="checkbox"
                  checked={selected.includes(name)}
                  onChange={() => handleChange(name)}
                  className="mr-2"
                />
                {name}
              </label>
            ),
          )}
          <div className="mt-2 mx-2">
            <a
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 cursor-pointer"
              onClick={handleShowAll}
            >
              show all
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManufacturersFilter;
