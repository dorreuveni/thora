import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBox.css";
import { Regions } from "../../enums/region";
import { gender } from "../../enums/gender";
import { Scholarship } from "../../enums/scholarship";
import { Dorms } from "../../enums/dorms";
import { Types } from "../../enums/types";
import { Marriage } from "../../enums/marriage";
import { useDispatch, useSelector } from "react-redux";
import { resetFilters, setFiltersState } from "../../redux/filters.slice";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../firebase";
import ReactSelect from "react-select";
import { components } from "react-select";
import { ClipLoader } from "react-spinners";

export const SearchBox = (props) => {
  const { isFromResults } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const filters = useSelector((state) => state.filters);
  const { academies } = useSelector((state) => state.places);

  //the form data for the filters
  const [formData, setFormData] = useState(filters);

  const LoadingIndicator = (props) => (
    <components.LoadingMessage {...props}>
      <ClipLoader size={20} color="blue" />
    </components.LoadingMessage>
  );

  useEffect(() => {
    setFormData(filters);
  }, [filters]);

  /**
   * handling a checkbox click
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => {
      //checking if it exists in the array and removing or addind as needed
      const newValues = prevState[name].includes(value)
        ? prevState[name].filter((item) => item !== value)
        : [...prevState[name], value];

      return {
        ...prevState,
        [name]: newValues.sort(),
      };
    });
  };

  /***
   * creatiing a check box list
   */
  const createCheckBoxList = (options, name) => {
    return (
      <div className="check-box-container">
        {Object.keys(options).map((item) => {
          const option = options[item];
          return (
            <div key={`check-box-${item}`} className="check-box-option">
              <label>{option}</label>
              <input
                name={name}
                type="checkbox"
                checked={formData[name].includes(option)}
                value={option}
                onChange={handleChange}
              />
            </div>
          );
        })}
      </div>
    );
  };

  /**
   * resseting the form
   */
  const handleReset = () => {
    dispatch(resetFilters());
    // Clear local state as well
    setFormData({
      region: [],
      gender: [],
      scholarship: [],
      dorms: [],
      type: [],
      marriage: [],
      academy: [],
    });
  };

  /**
   * submitting the form
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    uploadVariation(formData);
    dispatch(setFiltersState(formData));
    navigate("/results");
  };

  /**
   * uploading a variation of the object
   */
  const uploadVariation = async (variation) => {
    try {
      //creating a id based on the variation
      const variationId = JSON.stringify(variation);

      //getting the doc
      const variationRef = doc(db, "filters", variationId);
      const variationDoc = await getDoc(variationRef);

      //if the doc does not exist create it
      if (!variationDoc.exists()) {
        await setDoc(variationRef, { ...variation, searchCount: 1 });
      }
      // increasing the count by one
      else {
        // If the variation exists, increment the search count
        await updateDoc(variationRef, {
          searchCount: increment(1),
        });
      }

      console.log("Variation uploaded/updated successfully");
    } catch (error) {
      console.error("Error uploading/updating variation: ", error);
    }
  };

  /**
   * handling the academy select
   */
  const handleAcademyChange = (selected) => {
    setFormData((prev) => {
      return {
        ...prev,
        academy: selected.value,
      };
    });
  };

  return (
    <div className={isFromResults ? "results-search-form" : "search-form"}>
      {/* the region part of the form */}
      <div className="checkbox-form">
        <label>מחפש באזור מסוים בארץ?</label>

        {/* the check boxes */}
        {createCheckBoxList(Regions, "region")}
      </div>

      {/* the gender part of the form */}
      <div className="checkbox-form">
        <label>מחפש תכניות לבנים או לבנות?</label>

        {/* the checkboxes */}
        {createCheckBoxList(gender, "gender")}
      </div>

      {/* the scholarship part of the form */}
      <div className="checkbox-form">
        <label>רוצה רק תכניות עם מילגה?</label>

        {/* the checkboxes */}
        {createCheckBoxList(Scholarship, "scholarship")}
      </div>

      {/* the dorms part of the form */}
      <div className="checkbox-form">
        <label>רוצה תכנית שכוללת גם מגורים?</label>

        {/* the checkboxes */}
        {createCheckBoxList(Dorms, "dorms")}
      </div>

      {/* the type part of the form */}
      <div className="checkbox-form">
        <label>
          {" "}
          מחפש גם שיעור שבועי בקמפוס או תכנית מלאה עם ליווי ומחויבות למסגרת?
        </label>

        {/* the checkboxes */}
        {createCheckBoxList(Types, "type")}
      </div>

      {/* the marriage part of the form */}
      <div className="checkbox-form">
        <label>תכנית רק לרווקים או גם לנשואים?</label>

        {/* the checkboxes */}
        {createCheckBoxList(Marriage, "marriage")}
      </div>

      <div className="checkbox-form">
        <label>באיזה מוסד אקדמי תלמד?</label>
        <ReactSelect
          options={
            academies?.map((academy) => ({ label: academy, value: academy })) ??
            []
          }
          className="academy-select"
          onChange={handleAcademyChange}
          isSearchable
          components={{ LoadingMessage: LoadingIndicator }}
          placeholder="חפש ובחר אקדמיה...."
        />
      </div>

      {/* the buttons */}
      <div className="search-buttons">
        <button className="form-submit-button" onClick={handleSubmit}>
          חפש
        </button>
        {isFromResults && (
          <button className="form-clear-button" onClick={() => handleReset()}>
            נקה
          </button>
        )}
      </div>
    </div>
  );
};
