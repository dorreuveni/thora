import React, { useState } from "react";
import person from "../../assets/person-placeholder.jpg";
import "./Marker.css";

export const CustomMarker = (props) => {
  const { place } = props;

  //the image
  const [image, setImage] = useState(place?.logo ?? person);

  return (
    <div className="custom-marker-container">
      <div className="custom-marker">
        <img
          className="custom-marker-image"
          alt=""
          src={image}
          onError={() => setImage(person)}
        />
      </div>
    </div>
  );
};
