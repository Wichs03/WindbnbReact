import React from "react";

export default function GridHeader({ totalStays }) {
  return (
    <div className="flex flex-row justify-between items-center px-5 md:px-12 lg:px-22 mb-4 z-10">
      <h2 className="text-2xl">Stays in Finland</h2>
      <p className="text-sm">{totalStays} stays</p>
    </div>
  );
}
