import React from "react";
import "./FilterDisplay.css";

export const FilterDisplay = (props) => {
  const { filter, index } = props;
  return (
    <div className="filter-display-card">
      <div className="filter-display-header">סינון במקום {index + 1}</div>
      <div className="filter-display-part">
        <div className="filter-display-title">אקדמיה:</div>
        <div className="filter-display-info">
          {filter.academy.join(", ") || "בלי סינון"}{" "}
        </div>
      </div>
      <div className="filter-display-part">
        <div className="filter-display-title">מגדר:</div>
        <div className="filter-display-info">
          {filter.gender.join(", ") || "בלי סינון"}
        </div>
      </div>
      <div className="filter-display-part">
        <div className="filter-display-title">סטטוס נישואים:</div>
        <div className="filter-display-info">
          {filter.marriage.join(", ") || "בלי סינון"}
        </div>
      </div>
      <div className="filter-display-part">
        <div className="filter-display-title">מלגה:</div>
        <div className="filter-display-info">
          {filter.scholarship.join(", ") || "בלי סינון"}{" "}
        </div>
      </div>
      <div className="filter-display-part">
        <div className="filter-display-title">סוג תוכנית:</div>
        <div className="filter-display-info">
          {filter.type.join(", ") || "בלי סינון"}
        </div>
      </div>
      <div className="filter-display-part">
        <div className="filter-display-title">אקדמיה:</div>
        <div className="filter-display-info">
          {filter.region.join(", ") || "בלי סינון"}
        </div>
      </div>
      <div className="filter-display-part">
        <div className="filter-display-title">מגורים:</div>
        <div className="filter-display-info">
          {filter.dorms.join(", ") || "בלי סינון"}
        </div>
      </div>
      <div className="serach-amount-filter">
        <div className="serach-amount-title-filter">כמות חיפושים:</div>
        <div className="serach-amount-amount-filter">{filter.searchCount}</div>
      </div>
    </div>
  );
};
