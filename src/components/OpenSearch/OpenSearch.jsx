import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { setCurrent } from "../../redux/place.slice";
import { useNavigate } from "react-router-dom";
import { components } from "react-select";
import { ClipLoader } from "react-spinners";
import "./OpenSearch.css";
import { addView } from "../../utils/increaseViews";

export const OpenSearch = () => {
  const [options, setOptions] = useState([]);
  const { places, loading } = useSelector((state) => state.places);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LoadingIndicator = (props) => (
    <components.LoadingMessage {...props}>
      <ClipLoader size={20} color="blue" />
    </components.LoadingMessage>
  );

  /**
   * mapping the places to the options for the select
   */
  useEffect(() => {
    //if there are no options return
    if (!places) return;

    // the actual mapping
    const mappedOptions = places.map((item) => {
      return {
        value: item,
        label: item?.name,
      };
    });
    setOptions(mappedOptions);
  }, [places]);

  /***
   * going to the about page and storing the place in the redux
   */
  const handleChange = (selected) => {
    //updating the redux store
    dispatch(setCurrent(selected?.value));

    //adding a view
    addView(selected.value);

    //going to the page
    navigate("/about");
  };

  return (
    <div className="select-container">
      <Select
        isLoading={loading}
        classNamePrefix="open-select"
        options={options}
        onChange={handleChange}
        isSearchable
        components={{ LoadingMessage: LoadingIndicator }}
        placeholder="חפש ובחר אקדמיה...."
      />
    </div>
  );
};
