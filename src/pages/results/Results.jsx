import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Results.css";
import { PlaceCard } from "../../components/PlaceCard/PlaceCard";
import { SearchBox } from "../../components/SearchBox/SearchBox";
import { Map } from "../../components/map/Map";
import { Spinner } from "../../components/Spinner/Spinner";
import { getPlaces } from "../../utils/getPlaces";
import { setPlaces, setLoading } from "../../redux/place.slice";
import { Scholarship } from "../../enums/scholarship";
import { Types } from "../../enums/types";
import { Dorms } from "../../enums/dorms";
import { sortByName } from "../../utils/sorting";

export const Results = () => {
  const { places, loading } = useSelector((state) => state.places);
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  const [filtered, setFiltered] = useState(places);

  //in the case where there a no places get them
  useEffect(() => {
    if (places.length === 0) {
      dispatch(setLoading(true));

      //getting the places
      const getPlacesCaller = async () => {
        const res = await getPlaces();
        dispatch(setPlaces(res));
        dispatch(setLoading(false));
      };

      //getting the places
      getPlacesCaller();
    }
  }, [places]);

  /**
   * checking the region filter
   */
  const checkRegion = (region) => {
    //if there are no filters for the region
    if (filters?.region?.length === 0) return true;

    //the filtering
    return filters?.region?.includes(region) ? true : false;
  };

  /**
   * checking the gender filter
   */
  const checkGender = (gender) => {
    //if there are no filters for the gender
    if (filters?.gender?.length === 0) return true;

    //the filtering
    return filters?.gender?.includes(gender) ? true : false;
  };

  /**
   * checking the scholarship filter
   */
  const checkScholarShip = (scholarship) => {
    //if there are no filters
    if (filters?.scholarship?.length === 0) return true;

    const scholarshipMap =
      scholarship === "כן" ? Scholarship.scholarship : Scholarship.no;

    //the filtering
    return filters?.scholarship?.includes(scholarshipMap) ? true : false;
  };

  /**
   * checking the dorms filter
   */
  const checkDorms = (dorm) => {
    //if there are no filters
    if (filters?.dorms?.length === 0) return true;

    const dorms = dorm === "כן" ? Dorms.Dorms : Dorms.no;

    //the filtering
    return filters?.dorms?.includes(dorms) ? true : false;
  };

  /**
   * checking the type filter
   */
  const checkType = (type) => {
    //if there are no filters
    if (filters?.type?.length === 0) return true;

    const typeMap = type === "שיעורים פתוחים" ? Types.Open : type;

    //the filtering
    return filters?.type?.includes(typeMap) ? true : false;
  };

  /**
   * checking the marriage filter
   */
  const checkMarriage = (marriage) => {
    //if there are no filters for the gender
    if (filters?.marriage?.length === 0) return true;

    //the filtering
    return filters?.marriage?.includes(marriage) ? true : false;
  };

  const checkAcademy = (academies) => {
    //if there is no filter
    if (filters.academy?.trim() === "") return true;
    //the filtering
    return academies?.includes(filters.academy) ? true : false;
  };

  /**
   * when the filters are updated update the filtered array
   */
  useEffect(() => {
    setFiltered(
      [...places]
        .filter((place) => {
          //getting the filters
          const region = checkRegion(place.region);
          const gender = checkGender(place.gender);
          const scholarship = checkScholarShip(place.scholarship);
          const dorms = checkDorms(place.dorms);
          const type = checkType(place.type);
          const marriage = checkMarriage(place.single_or_married);
          const academy = checkAcademy(place.academies);

          // the comparison
          return (
            region &&
            gender &&
            scholarship &&
            dorms &&
            type &&
            marriage &&
            academy
          );
        })
        .sort(sortByName)
    );
  }, [filters, places]);

  return (
    <div className="results-page-container">
      {/* the search */}
      <div className="search-side">
        <div className="result-search-title">חיפוש מסלול</div>
        <SearchBox isFromResults={true} />
      </div>

      {/* the results */}
      <div className="results-container">
        <div className="result-amount">
          {!loading && `${filtered.length} תוצאות`}
        </div>

        {/* displaying the result cards */}
        <div className={`results ${loading && "loading-results"}`}>
          {loading ? (
            <Spinner />
          ) : (
            places.map((place, index) => {
              const isVisible = filtered.includes(place);
              return (
                <div
                  key={`result-place-${index}`}
                  className={`${isVisible ? "" : "hidden"}`}>
                  <PlaceCard place={place} />
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* the map */}
      <div className="results-map">
        <Map locations={filtered} />
      </div>
    </div>
  );
};
