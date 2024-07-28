import React, { useState } from "react";
import "./PlaceCard.css";
import placeHolder from "../../assets/placeholder.png";
import person from "../../assets/person-placeholder.jpg";
import { setCurrent } from "../../redux/place.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addView } from "../../utils/increaseViews";

export const PlaceCard = (props) => {
  const { place } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState(place.image);
  const [logo, setLogo] = useState(place.logo);

  //if there is no data
  if (!place) return;

  // going to the page of the place
  const onClick = () => {
    addView(place);
    dispatch(setCurrent(place));
    navigate("/about");
  };

  return (
    <div onClick={onClick} className="place-card-container">
      {/* the background image */}
      <div>
        <img
          color="white"
          className="place-card-background"
          alt=""
          src={image}
          onError={() => setImage(placeHolder)}
        />
      </div>

      {/* the info line */}
      <div className="place-card-info-line">
        <div className="place-card-avatar">
          <img
            className="place-card-avatar-img"
            alt=""
            src={logo}
            onError={() => setLogo(person)}
          />
        </div>

        {/* the place name */}
        <div className="info-line-main-title">{place.name}</div>

        {/* the location */}
        <div className="info-line-location">{place.city}</div>
      </div>
    </div>
  );
};
