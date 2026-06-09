import * as ReactDOM from "react-dom/server";
import { PinComponent, PinComponentProps } from "@yext/search-ui-react";
import mapboxgl from "mapbox-gl";
import Location, { Coordinate } from "../types/locations";
import { useCallback, useEffect, useRef, useState } from "react";
import { GiTacos } from "react-icons/gi";

const transformToMapboxCoord = (
  coordinate: Coordinate,
): mapboxgl.LngLatLike | undefined => {
  if (!coordinate.latitude || !coordinate.longitude) return;
  return {
    lng: coordinate.longitude,
    lat: coordinate.latitude,
  };
};

const getLocationHTML = (location: Location) => {
  const address = location.address;
  const html = (
    <div>
      <p className="font-bold">{location.neighborhood || "unknown location"}</p>
      <p>{location.address.line1}</p>
      <p>{`${address.city}, ${address.region}, ${address.postalCode}`}</p>
    </div>
  );
  return ReactDOM.renderToString(html);
};

const MapPin: PinComponent<Location> = ({
  mapbox,
  result,
}: PinComponentProps<Location>) => {
  const location = result.rawData;
  const coordinate =
    location.yextDisplayCoordinate ?? location.geocodedCoordinate;
  const [active, setActive] = useState(false);
  const popupRef = useRef(
    new mapboxgl.Popup({ offset: 15 }).on("close", () => setActive(false)),
  );

  useEffect(() => {
    if (active && coordinate) {
      const mapboxCoordinate = transformToMapboxCoord(coordinate);
      const nativeMap = mapbox.getNativeInstance();
      if (mapboxCoordinate && nativeMap instanceof mapboxgl.Map) {
        popupRef.current
          .setLngLat(mapboxCoordinate)
          .setHTML(getLocationHTML(location))
          .addTo(nativeMap);
      }
    }
  }, [active, coordinate, location, mapbox]);

  const handleClick = useCallback(() => {
    setActive(true);
  }, []);

  return (
    <button onClick={handleClick}>
      <GiTacos className="text-orange" size={30} />
    </button>
  );
};

export default MapPin;
