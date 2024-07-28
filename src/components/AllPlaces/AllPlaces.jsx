import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Spinner from "../Spinner/Spinner";
import "./AllPlaces.css";
import { PlaceCard } from "../PlaceCard/PlaceCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/**
 * the left arrow
 */
const LeftArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} custom-arrow left-arrow`}
    style={{ ...style, display: "block" }}
    onClick={onClick}>
    <span>&lt;</span>
  </div>
);

/**
 * the right arrow
 */
const RightArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} custom-arrow right-arrow`}
    style={{ ...style, display: "block" }}
    onClick={onClick}>
    <span>&gt;</span>
  </div>
);

export const AllPlaces = () => {
  const { places, loading } = useSelector((state) => state.places);
  const sliderRef = useRef(null);

  //sorting the places by the name
  const sortByName = (a, b) => {
    return a.name > b.name ? 1 : -1;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    slidesPerRow: 1,
    rows: 1,
    nextArrow: <RightArrow />,
    prevArrow: <LeftArrow />,
  };

  return (
    <div className="all-places-container">
      <div className="all-places-title">כל המקומות</div>
      {loading ? (
        <Spinner />
      ) : (
        <Slider
          ref={sliderRef}
          {...settings}
          className="all-places-card-container">
          {[...places].sort(sortByName).map((place, index) => (
            <div key={`slider-${index}`} className="place-card-wrapper">
              <PlaceCard place={place} />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};
