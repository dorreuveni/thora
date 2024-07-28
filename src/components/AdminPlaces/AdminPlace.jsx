import React, { useState } from "react";
import { DeletionModal } from "../DeletionModal/DeletionModal";
import "./AdminPlaces.css";

export const AdminPlace = (props) => {
  const { place } = props;

  return (
    <div className="admin-place-container">
      <div className="admin-place-name">{place.name}</div>
      <div className="admin-place-views">{place.views} צפיות</div>
      <DeletionModal placeId={place?.id} name={place?.name} />
    </div>
  );
};
