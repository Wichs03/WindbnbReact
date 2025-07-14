import React from "react";
import logo from "../assets/logo.svg";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

export default function Header({ abrirModal }) {
  return (
    <div className="mb-4 z-10">
      <nav className="flex flex-row justify-between px-5 md:px-12 lg:px-22 py-6 items-center">
        <a href="/">
          <img className="w-30" src={logo} alt="logo" />
        </a>
        <div className="filterBar flex flex-row gap-5">
          <button
            onClick={abrirModal}
            className="text-gray-600 text-sm hover:cursor-pointer"
          >
            Add location
          </button>
          <button
            onClick={abrirModal}
            className="text-gray-600 text-sm hover:cursor-pointer"
          >
            Add guests
          </button>
          <MagnifyingGlassIcon className="size-6 text-[#ea5657] hover:cursor-pointer"></MagnifyingGlassIcon>
        </div>
      </nav>
    </div>
  );
}
