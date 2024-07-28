import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./AdminPlaces.css";
import { AdminPlace } from "./AdminPlace";

export const AdminPlaces = () => {
  const { places } = useSelector((state) => state.places);

  const [sortBy, setSortBy] = useState("name");

  const [displayPlaces, setDisplayPlaces] = useState([]);

  const [filterInput, setFilterInput] = useState("");

  //sorting the places by the name
  const sortByName = (a, b) => {
    return a.name > b.name ? 1 : -1;
  };

  //sorting the places by the view amount
  const sortByviews = (a, b) => {
    return a.views > b.views ? -1 : 1;
  };

  useEffect(() => {
    setDisplayPlaces(
      [...places]
        ?.sort(sortBy === "name" ? sortByName : sortByviews)
        .filter((place) =>
          place.name?.toLowerCase()?.includes(filterInput.toLowerCase().trim())
        )
    );
  }, [places, filterInput, sortBy]);

  const handleInputChange = (e) => {
    e.preventDefault();
    setFilterInput(e.target.value);
  };

  return (
    <div className="admin-places-container">
      <input
        className="admin-places-search"
        placeholder="חפש מקום..."
        type="text"
        onChange={handleInputChange}
      />
      <div className="admin-places-header">
        <div
          className="admin-places-header-item"
          onClick={() => setSortBy("name")}>
          שם
        </div>
        <div
          className="admin-places-header-item"
          onClick={() => setSortBy("views")}>
          צפיות
        </div>
      </div>
      {displayPlaces.map((place) => (
        <AdminPlace place={place} />
      ))}
    </div>
  );
};
