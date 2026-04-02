/**
 * Sidebar filter component
 * Contains manufacturer and price filters for product filtering
 * 
 * @param selectedManufacturers - Currently selected manufacturer names
 * @param setSelectedManufacturers - Function to update selected manufacturers
 * @param price - Current price range [min, max]
 * @param setPrice - Function to update price range
 * @param minPrice - Minimum allowed price
 * @param maxPrice - Maximum allowed price
 */
"use client";
import React from "react";
import ManufacturersFilter from "./sidebarcomponents/ManufacturersFilter";
import PriceFilter from "./sidebarcomponents/PriceFilter";

type SidebarProps = {
  selectedManufacturers: string[];
  setSelectedManufacturers: (manufacturers: string[]) => void;
  price: [number, number];
  setPrice: (price: [number, number]) => void;
  minPrice: number;
  maxPrice: number;
};

const Sidebar: React.FC<SidebarProps> = ({
  selectedManufacturers,
  setSelectedManufacturers,
  setPrice,
  minPrice,
  maxPrice,
}) => (
  <aside className="w-72 min-h-screen bg-white dark:bg-neutral-800 border-r border-gray-200">
    <PriceFilter
      min={minPrice}
      max={maxPrice}
      onChange={(min, max) => setPrice([min, max])}
    />
    <ManufacturersFilter
      selected={selectedManufacturers}
      onChange={setSelectedManufacturers}
    />
  </aside>
);

export default Sidebar;
