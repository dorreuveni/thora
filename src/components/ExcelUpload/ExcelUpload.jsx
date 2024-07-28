import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { db } from "../../firebase";
import { getCoordinates } from "../../utils/coordinates";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { setPlaces } from "../../redux/place.slice";
import { Spinner } from "../Spinner/Spinner";
import "./ExcelUpload.css";

const ExcelUpload = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { places } = useSelector((state) => state.places);
  const dispatch = useDispatch();

  //uploading the data to firebase
  useEffect(() => {
    const add = async () => {
      //if there is no new data skip
      if (data.length === 0) return;

      setLoading(true);
      const uploadedPlaces = [];
      //adding the data for each row
      for (let place in data) {
        const res = await addData(data[place]);
        uploadedPlaces.push(res);
      }

      //getting the ids of the uploaded places
      const uploadedIds = uploadedPlaces.map((place) => place.id);

      //adding the place to the redux store and adding the firebase reference id
      dispatch(
        setPlaces([
          ...places?.filter((place) => uploadedIds.includes(place.id)),
          ...uploadedPlaces,
        ])
      );

      setLoading(false);
      alert("data has uploaded");
      setData([]);
    };

    add();
  }, [data]);

  const addData = async (place) => {
    let coordinates = null;

    //if the coordinate are in the excel file
    if (Object.keys(place)?.includes("5")) {
      const latLonArray = place[5]?.split(", ");
      const lat = parseFloat(latLonArray[0]);
      const lon = parseFloat(latLonArray[1]);
      coordinates = { lat, lon };
    } else coordinates = await getCoordinates(place[3]);

    try {
      const docToUpload = {
        id: place[0], //the id of the place
        name: place[1], // the name
        city: place[2], // the city
        region: place[3], // the region
        address: place[4], // the exact address
        academies: place[6]?.split(", "), // the related academys
        gender: place[7], // the gender
        scholarship: place[8], // the scholarship
        min_hour: place[9], // the minimun hours
        max_hour: place[10], // the maximum hours
        single_or_married: place[11], // the marital status
        dorms: place[12], // the dorm status
        type: place[13], // the type of program
        member: place[14], //if the place has a membership to the union
        logo: place[15], //the link to the logo
        image: place[16], //the link to the place image
        description: place[17], //a short description of the place
        link: place[18], // a link to the places site
        coordinates: coordinates,
      };

      //getting the doc
      const docRef = doc(db, "places", place[0]?.toString());
      const placeDoc = await getDoc(docRef);
      let views = 0;

      //if the doc does not exist create it
      if (!placeDoc.exists()) {
        await setDoc(docRef, { ...docToUpload, views: 0 });
      }
      // updating the current data
      else {
        views = placeDoc.data().views;
        // If the variation exists, increment the search count
        await updateDoc(docRef, docToUpload);
      }

      console.log("Document written with ID: ", place[0]);

      return { ...docToUpload, views };
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  /***
   * handles getting the data from an uploaded execl file
   */
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const arrayBuffer = event.target.result;
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setData(jsonData.slice(1));
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="excel-container">
      {loading ? (
        <Spinner />
      ) : (
        <label className="add-button">
          <input
            className="file-input"
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
          />
          העלה מקומות
        </label>
      )}
    </div>
  );
};

export default ExcelUpload;
