import React, { useEffect, useState } from "react";
import "./AdminStatistics.css";
import { db } from "../../firebase";
import { getDocs, collection } from "firebase/firestore";
import BarGraph from "../barGraph/BarGraph";
import { gender } from "../../enums/gender";
import { Scholarship } from "../../enums/scholarship";
import { Regions } from "../../enums/region";
import { Dorms } from "../../enums/dorms";
import { Marriage } from "../../enums/marriage";
import { Types } from "../../enums/types";

export const AdminStatistics = () => {
  const [data, setData] = useState();
  const [statistics, setStatistics] = useState([]);
  const [totalSearches, setTotalSearches] = useState(1);
  const titles = [
    "מגדר",
    "מלגה",
    "איזור",
    "מעונות",
    "סטטוס נישואים",
    "סוג תוכנית",
  ];
  useEffect(() => {
    const getFilters = async () => {
      const dbFilters = [];
      try {
        //getting the data from the firebase
        const querySnapshot = await getDocs(collection(db, "filters"));
        querySnapshot.forEach((doc) => {
          dbFilters.push(doc.data());
        });
      } catch (e) {
        console.log(e);
      }

      //setting the data sorted
      setData(
        dbFilters.sort((a, b) => {
          return a.searchCount > b ? 1 : -1;
        })
      );
    };

    getFilters();
  }, []);

  //calculating the statistics
  useEffect(() => {
    let totalSearches = 0;
    const genderStatistics = {};
    const scholarshipStatistics = {};
    const regionStatistics = {};
    const dormsStatistics = {};
    const marriageStatistics = {};
    const typeStatistics = {};

    data?.forEach((item) => {
      totalSearches += item.searchCount;
      handleStastistics(
        item.gender,
        genderStatistics,
        gender,
        item.searchCount
      );
      handleStastistics(
        item.scholarship,
        scholarshipStatistics,
        Scholarship,
        item.searchCount
      );
      handleStastistics(
        item.region,
        regionStatistics,
        Regions,
        item.searchCount
      );
      handleStastistics(item.dorms, dormsStatistics, Dorms, item.searchCount);
      handleStastistics(
        item.marriage,
        marriageStatistics,
        Marriage,
        item.searchCount
      );
      handleStastistics(item.type, typeStatistics, Types, item.searchCount);
    });

    setTotalSearches(totalSearches);
    setStatistics([
      genderStatistics,
      scholarshipStatistics,
      regionStatistics,
      dormsStatistics,
      marriageStatistics,
      typeStatistics,
    ]);
  }, [data]);

  //handling the statistics calculations
  const handleStastistics = (newItems, summedItems, options, amount) => {
    if (!Object.keys(summedItems)?.includes("בלי סינון")) {
      summedItems["בלי סינון"] = 0;
    }
    if (newItems?.length === 0) {
      summedItems["בלי סינון"] += amount;
    }

    //looping over the values
    Object.values(options)?.forEach((item) => {
      //adding the new item if does not exist
      if (!Object.keys(summedItems)?.includes(item)) summedItems[item] = 0;

      //adding the amount of appearances
      if (newItems.includes(item)) summedItems[item] += amount;
    });
  };

  return (
    <div className="filter-display-container">
      {statistics.map((item, index) => (
        <BarGraph
          title={titles[index]}
          totalValue={totalSearches}
          numbers={Object.values(item)}
          labels={Object.keys(item)}
        />
      ))}
    </div>
  );
};
