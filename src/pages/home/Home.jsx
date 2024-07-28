import React, { useEffect } from "react";
import "./Home.css";
import { SearchBox } from "../../components/SearchBox/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { setCurrent, setLoading, setPlaces } from "../../redux/place.slice";
import { resetFilters } from "../../redux/filters.slice";
import { AllPlaces } from "../../components/AllPlaces/AllPlaces";
import { CategoryPicker } from "../../components/CategoryPicker/CategoryPicker";
import { getPlaces } from "../../utils/getPlaces";

export const Home = () => {
  const { places } = useSelector((state) => state.places);
  const dispatch = useDispatch();

  //setting the location into the redux
  useEffect(() => {
    dispatch(setCurrent(null));
    dispatch(resetFilters());

    //calling all of the places
    const getPlacesCaller = async () => {
      //setting the loading
      dispatch(setLoading(true));

      const res = await getPlaces();

      // setting the places and loading in the redux
      dispatch(setPlaces(res));
      dispatch(setLoading(false));
    };

    if (places.length === 0) {
      getPlacesCaller();
    }
  }, []);

  return (
    <div className="home-container">
      {/* the search container */}
      <div className="home-search-container">
        <div className="home-question">מה המסלול שלך?</div>

        <SearchBox />
      </div>

      {/* all of the places */}
      <div className="home-places-container">
        <AllPlaces />
      </div>

      {/* the categories */}
      <div className="home-category-chooser">
        <CategoryPicker />
      </div>
    </div>
  );
};
