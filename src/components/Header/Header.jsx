import React, { useEffect } from "react";
import logo from "../../assets/logo.png";
import { OpenSearch } from "../OpenSearch/OpenSearch";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { resetFilters } from "../../redux/filters.slice";
import { useDispatch, useSelector } from "react-redux";
import { setPlaces, setLoading, setAcademies } from "../../redux/place.slice";
import { getPlaces } from "../../utils/getPlaces";
import { setGotUsers, setUsers } from "../../redux/users.slice";
import { getUsers } from "../../utils/getUsers";

export const Header = () => {
  const { places } = useSelector((state) => state.places);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //getting the places and users
  useEffect(() => {
    //the places caller
    const getPlacesCaller = async () => {
      dispatch(setLoading(true));

      //getting the places
      const dbPlaces = await getPlaces();
      dispatch(setPlaces(dbPlaces));

      //getting the academies
      const academies = dbPlaces.flatMap((place) => place.academies).sort();
      dispatch(setAcademies([...new Set(academies)]));
      dispatch(setLoading(false));
    };

    //checking if there are places
    if (!places || places?.length === 0) {
      getPlacesCaller();
    }

    //getting the users
    const getUsersCaller = async () => {
      dispatch(setUsers(await getUsers()));
      dispatch(setGotUsers(true));
    };
    getUsersCaller();
  }, []);

  /**
   * navigating to the home page
   */
  const navigateHome = () => {
    dispatch(resetFilters());
    navigate("/");
  };

  return (
    <div className="header-container">
      {/* the logo */}
      <div onClick={navigateHome} className="header-logo-container">
        <img className="header-logo" alt="" src={logo} />
        <div className="header-logo-name">תורה באקדמיה</div>
      </div>

      {/* the open search bar */}
      <OpenSearch />
    </div>
  );
};
