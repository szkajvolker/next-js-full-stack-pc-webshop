/**
 * Price range filter component with collapsible interface
 * Allows users to filter products by price range using a Material-UI slider
 * 
 * @param min - Minimum price value
 * @param max - Maximum price value  
 * @param onChange - Callback function when price range changes
 */
"use client";
import { Box, Slider } from "@mui/material";
import React, { useState } from "react";

import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";

type PriceFilterProps = {
  min: number;
  max: number;
  onChange?: (min: number, max: number) => void;
};

export default function PriceFilter({ min, max, onChange }: PriceFilterProps) {
  const [value, setValue] = React.useState<number[]>([min, max]);
  const [collapsed, setCollapsed] = useState(false);

  const handleChange = (
    _: Event | React.SyntheticEvent | undefined,
    newValue: number | number[],
  ) => {
    const val = newValue as number[];
    setValue(val);
    onChange?.(val[0], val[1]);
  };

  React.useEffect(() => {
    setValue([min, max]);
  }, [min, max]);

  const handleCollapse = () => {
    if (collapsed) {
      setCollapsed(false);
    } else {
      setCollapsed(true);
    }
  };

  return (
    <div className="pl-5 border-b border-gray-200 p-4 w-full">
      <Box sx={{ width: "100%" }}>
        <div className="flex flex-row justify-between mb-2">
          <h3 className="font-bold text-lg">Price</h3>
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
          <div className="duration-200 transform-view">
            <Slider
              getAriaLabel={() => "PriceRange"}
              value={value}
              min={min}
              max={max}
              onChange={handleChange}
              valueLabelDisplay="auto"
            />
            <div className="flex items-center mt-2">
              <input
                type="number"
                value={value[0]}
                min={min}
                max={value[1]}
                onChange={(e) =>
                  handleChange(undefined, [Number(e.target.value), value[1]])
                }
                className="border rounded-sm p-1.5 text-center text-xs w-16 text-neutral-600 border-neutral-400"
              />
              <span className="text-xs ml-2">Ft</span>
              <span className="flex-1 flex justify-center text-xs"> - </span>
              <input
                type="number"
                value={value[1]}
                min={value[0]}
                max={max}
                onChange={(e) =>
                  handleChange(undefined, [value[0], Number(e.target.value)])
                }
                className="border rounded-sm p-1.5 text-center text-xs w-16 text-neutral-600 border-neutral-400"
              />
              <span className="text-xs ml-2">Ft</span>
            </div>
          </div>
        )}
      </Box>
    </div>
  );
}
