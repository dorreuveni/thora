import React from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { renderToString } from "react-dom/server";
import { CustomMarker } from "./Marker";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrent } from "../../redux/place.slice";

export const Map = (props) => {
  const { locations } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handling the marker click
  const handleMarkerClick = (place) => {
    dispatch(setCurrent(place));
    navigate("/about");
  };

  const renderCustomMarker = (place) => {
    return L.divIcon({
      className: "marker",
      html: renderToString(<CustomMarker place={place} />),
      iconSize: [80, 80],
      iconAnchor: [40, 80], // Adjust these values based on the marker dimensions
    });
  };

  return (
    <MapContainer
      className="map-container"
      center={[31.727396, 35.033878]}
      zoom={7}>
      {/* adding google map tile url  */}
      <TileLayer
        attribution="Google Maps"
        url="https://www.google.com/maps/vt?lyrs=m@189&gl=il&hl=iw&x={x}&y={y}&z={z}"
      />

      {locations.map((place) => {
        if (!place?.coordinates) return null;
        return (
          <Marker
            //   position={[31.727396, 35.033878]}
            position={[place?.coordinates?.lat, place?.coordinates?.lon]}
            icon={renderCustomMarker(place)}
            eventHandlers={{
              click: () => {
                handleMarkerClick(place);
              },
            }}
          />
        );
      })}
    </MapContainer>
  );
};
