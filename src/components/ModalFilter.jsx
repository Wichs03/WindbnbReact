import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { MapPinIcon } from "@heroicons/react/16/solid";
import axios from "axios";

export default function ModalFilter({ cerrarModal, setFiltros }) {
  const [locationInput, setLocationInput] = useState("");
  const [cities, setCities] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [guestsInput, setGuestsInput] = useState("");

  useEffect(() => {
    axios
      .get("/stays.json")
      .then((res) => {
        const uniqueCities = [...new Set(res.data.map((stay) => stay.city))];
        setCities(uniqueCities);
      })
      .catch((err) => console.error("Error al cargar ciudades:", err));
  }, []);

  useEffect(() => {
    if (locationInput.trim() === "") {
      setSuggestions([]);
    } else {
      const filtradas = cities.filter((city) =>
        city.toLowerCase().includes(locationInput.toLowerCase())
      );
      setSuggestions(filtradas);
    }
  }, [locationInput, cities]);

  return (
    <div className="w-[100vw] h-[100vh]">
      <div
        onClick={cerrarModal}
        className="overlay fixed top-0 w-full h-full bg-black/50 z-20"
      ></div>
      <div className="fixed top-0 w-full h-[50vh] bg-white z-20 flex flex-row py-10 justify-between px-20">
        <div className="flex flex-row">
          {/* input location  */}
          <div className=" relative rounded-2xl px-4 py-2 w-[50%] h-14 border border-transparent focus-within:border-gray-800 transition">
            <p className="text-xs text-gray-800">LOCATION</p>
            <input
              className="outline-none"
              type="text"
              placeholder="Add location"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-40 w-[100%] bg-white  mt-3 px-0 ml-0">
                {suggestions.map((city, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setLocationInput(city);
                      setSuggestions([]);
                    }}
                    className="flex flex-row items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <MapPinIcon className="size-4"></MapPinIcon>
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* input guests */}
          <div className="rounded-2xl px-4 py-2 w-[50%] h-14 border border-transparent focus-within:border-gray-800 transition">
            <p className="text-xs text-gray-800">GUESTS</p>
            <input
              type="number"
              min="1"
              placeholder="Add guests"
              className="w-full outline-none"
              value={guestsInput}
              onChange={(e) => setGuestsInput(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={() => {
            setFiltros({
              location: locationInput.trim(),
              guests: parseInt(guestsInput) || 0,
            });
            cerrarModal();
          }}
          className="flex flex-row bg-[#ea5657] gap-2 px-4 py-2 rounded-2xl h-10 w-35 items-center mt-1 hover:cursor-pointer"
        >
          <MagnifyingGlassIcon className="size-6 text-white" />
          <p className="text-white">search</p>
        </button>
      </div>
    </div>
  );
}
