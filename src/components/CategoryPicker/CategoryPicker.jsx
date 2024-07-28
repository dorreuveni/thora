import React from "react";
import "./CategoryPicker.css";
import mapMarker from "../../assets/location.svg";
import star from "../../assets/start.svg";
import { Regions } from "../../enums/region";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setDorms,
  setGender,
  setMarriage,
  setRegion,
  setScholarShip,
  setType,
} from "../../redux/filters.slice";
import { gender } from "../../enums/gender";
import { Scholarship } from "../../enums/scholarship";
import { Dorms } from "../../enums/dorms";
import { Types } from "../../enums/types";
import { Marriage } from "../../enums/marriage";
import boy from "../../assets/categoryIcons/boy.svg";
import girl from "../../assets/categoryIcons/girl.svg";
import dorms from "../../assets/categoryIcons/dorms.svg";
import married from "../../assets/categoryIcons/married.svg";
import single from "../../assets/categoryIcons/single.svg";
import year from "../../assets/categoryIcons/year.svg";
import openClass from "../../assets/categoryIcons/openClass.svg";

const PickerCard = (props) => {
  const { type, title, callback, icon } = props;

  return (
    <div
      onClick={() => callback(title)}
      className={
        type === "region" ? "picker-card-region" : "picker-card-feature"
      }>
      <div
        className={`picker-card-icon ${type === "feature" && "feature-icon"}`}>
        {type === "region" ? (
          <img className="map-icon" alt="" src={mapMarker} />
        ) : (
          <img className="star-icon" alt="" src={icon ?? star} />
        )}
      </div>
      <div className="picker-card-title">{title}</div>
    </div>
  );
};

export const CategoryPicker = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * the region callback for clicking on the card
   */
  const regionCallBack = (value) => {
    dispatch(setRegion([value]));
    navigate("/results");
  };

  /**
   * the gender callback for clicking on the card
   */
  const genderCallBack = (value) => {
    dispatch(setGender([value]));
    navigate("/results");
  };

  /**
   * the gender callback for clicking on the card
   */
  const scholarshipCallBack = (value) => {
    dispatch(setScholarShip([value]));
    navigate("/results");
  };

  /**
   * the gender callback for clicking on the card
   */
  const dormsCallBack = (value) => {
    dispatch(setDorms([value]));
    navigate("/results");
  };

  /**
   * the gender callback for clicking on the card
   */
  const typesCallBack = (value) => {
    dispatch(setType([value]));
    navigate("/results");
  };

  /**
   * the gender callback for clicking on the card
   */
  const marriageCallBack = (value) => {
    dispatch(setMarriage([value]));
    navigate("/results");
  };

  return (
    <div className="category-picker-container">
      {/* searching by the Region category */}
      <div className="picker-container">
        <div className="picker-title">אזורים</div>
        <div className="sub-title">חפש לפי אזורים</div>

        <div className="mapped-locations-container">
          {Object.keys(Regions).map((item) => {
            const region = Regions[item];
            return (
              <PickerCard
                key={`region-category-picker-${item}`}
                type="region"
                title={region}
                callback={regionCallBack}
              />
            );
          })}
        </div>
      </div>

      {/* searching by the Feature category */}
      <div className="picker-container">
        <div className="picker-title">מאפיינים</div>
        <div className="sub-title">חפש לפי מאפיינים</div>

        <div className="mapped-locations-container">
          <PickerCard
            type="feature"
            title={gender.Male}
            callback={genderCallBack}
            icon={boy}
          />
          <PickerCard
            type="feature"
            title={gender.Female}
            callback={genderCallBack}
            icon={girl}
          />
          <PickerCard
            type="feature"
            title={Scholarship.scholarship}
            callback={scholarshipCallBack}
          />
          <PickerCard
            type="feature"
            title={Dorms.Dorms}
            callback={dormsCallBack}
            icon={dorms}
          />
          <PickerCard
            type="feature"
            title={Types.Open}
            callback={typesCallBack}
            icon={openClass}
          />
          <PickerCard
            type="feature"
            title={Types.Year}
            callback={typesCallBack}
            icon={year}
          />
          <PickerCard
            type="feature"
            title={Marriage.married}
            callback={marriageCallBack}
            icon={married}
          />
          <PickerCard
            type="feature"
            title={Marriage.single}
            callback={marriageCallBack}
            icon={single}
          />
        </div>
      </div>
    </div>
  );
};
