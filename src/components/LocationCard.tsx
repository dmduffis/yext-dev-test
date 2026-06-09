// src/components/LocationCard.tsx

import { CardComponent, CardProps } from "@yext/search-ui-react";
import Location, { Coordinate } from "../types/locations";
import { RiDirectionFill } from "react-icons/ri";

const LocationCard: CardComponent<Location> = ({
  result,
}: CardProps<Location>): JSX.Element => {
  const location = result.rawData;
  const coordinate =
    location.yextDisplayCoordinate ?? location.geocodedCoordinate;
  const displayName =
    location.neighborhood ?? location.name ?? "Turtlehead Tacos";
  const address = location.address;

  const getGoogleMapsLink = (coord: Coordinate): string => {
    return `https://www.google.com/maps/dir/?api=1&destination=${coord.latitude},${coord.longitude}`;
  };

  return (
    <div className="flex justify-between border-y p-4">
      <div className="flex">
        <div>
          <a
            target={"_blank"}
            href={location.slug ? `/${location.slug}` : "#"}
            className="font-semibold text-orange"
            rel="noreferrer"
          >
            {displayName}
          </a>
          {address?.line1 && <p className="text-sm">{address.line1}</p>}
          {address && (
            <p className="text-sm">{`${address.city ?? ""}, ${address.region ?? ""} ${address.postalCode ?? ""}`}</p>
          )}
        </div>
      </div>
      <div className="flex items-center">
        {coordinate && (
          <a
            target={"_blank"}
            className="flex flex-col items-center text-sm text-orange"
            href={getGoogleMapsLink(coordinate)}
            rel="noreferrer"
          >
            <RiDirectionFill size={24} />
            <p>Directions</p>
          </a>
        )}
      </div>
    </div>
  );
};

export default LocationCard;
