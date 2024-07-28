import React, { useEffect, useState } from "react";
import "./About.css";
import placeholder from "../../assets/placeholder.png";
import person from "../../assets/person-placeholder.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setCurrent } from "../../redux/place.slice";

export const About = () => {
  const { current } = useSelector((state) => state.places);
  const [image, setImage] = useState(current?.image);
  const [logo, setLogo] = useState(current?.logo);

  const dispatch = useDispatch();

  useEffect(() => {
    if (current)
      window.sessionStorage.setItem("current", JSON.stringify(current));
  }, []);

  //there currently isn't an active place
  if (!current) {
    const fromSession = window.sessionStorage.getItem("current");
    if (fromSession) {
      console.log("Loading current from session storage");
      dispatch(setCurrent(JSON.parse(fromSession)));
    } else {
      console.log("No current data available");
      return null;
    }
  }

  const openSite = () => {
    window.open(current.link);
  };

  return (
    <div className="about-page-container">
      {/* the top */}
      <div className="about-top-bar">
        <img
          className="about-main-image"
          alt=""
          src={image}
          onError={() => setImage(placeholder)}
        />

        {/* the name and avatar */}
        <div className="about-name-and-avatar">
          <div className="about-avatar">
            <img alt="" src={logo} onError={() => setLogo(person)} />
          </div>

          <div className="about-name-and-location">
            <div className="about-name">{current?.name}</div>
            <div className="about-location">{current?.city}</div>
          </div>
        </div>
      </div>

      {/* the description */}
      <div className="description">
        <div className="description-title">תיאור</div>
        <div className="description-body">{current?.description}</div>
      </div>

      {/* link to the site */}
      <div className="link-button">
        <button onClick={openSite}>קישור לאתר התוכנית</button>
      </div>
    </div>
  );
};
