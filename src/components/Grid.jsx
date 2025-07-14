import { useState, useEffect } from "react";
import axios from "axios";
import { StarIcon } from "@heroicons/react/16/solid";

export default function Grid({ filtros, setFilteredCount }) {
  const [stays, setStays] = useState([]);

  useEffect(() => {
    axios
      .get("/stays.json")
      .then((res) => {
        setStays(res.data);
      })
      .catch((error) => {
        console.error(
          "Error al cargar los stays. No eres tú, somos nosotros. Intenta nuevamente en unos minutos.",
          error
        );
      });
  }, []);

  const staysFiltrados = stays.filter((stay) => {
    const coincideCiudad =
      filtros.location === "" || stay.city === filtros.location;
    const cumpleHuespedes =
      filtros.guests === 0 || stay.maxGuests >= filtros.guests;
    return coincideCiudad && cumpleHuespedes;
  });

  useEffect(() => {
    setFilteredCount(staysFiltrados.length);
  }, [staysFiltrados, setFilteredCount]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full px-5 md:px-12 lg:px-22 gap-6 md:gap-8 lg:gap-16 z-10">
      {staysFiltrados.map((stay, index) => (
        <div className="card" key={index}>
          <img
            className="rounded-3xl aspect-[16/12] object-cover"
            src={stay.photo}
            alt={stay.title}
          />
          <div className="flex flex-row justify-between px-1 mt-2">
            <div className="flex flex-row gap-4">
              {stay.superHost && (
                <h3 className="border rounded-2xl px-2 text-gray-800">
                  SUPERHOST
                </h3>
              )}
              <p className="text-gray-600">{stay.type}</p>
              {stay.beds && (
                <p className="text-gray-600"> - {stay.beds} beds</p>
              )}
            </div>
            <div className="flex flex-row items-center gap-1">
              <StarIcon className="size-5 text-[#ea5657]"></StarIcon>
              <p>{stay.rating}</p>
            </div>
          </div>
          <h2 className="font-semibold"> {stay.title}</h2>
        </div>
      ))}
    </div>
  );
}
