import "./GoogleMap.css";
import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";
import { useState } from "react";
import GoogleHeatmap from "../Heatmap/Heatmap.tsx";
const apiKey: string | undefined = import.meta.env.VITE_API_KEY as string;
import { useAuthProvider } from "../AuthProvider/AuthProviderWrapper.tsx";
import ZoomLevels from "./ZoomLevel/ZoomLevel.tsx";
import StarLocation from "../Favorites/StarLocation.tsx";

const GoogleMap2: React.FC<{
  latitude: number;
  longitude: number;
  zoomLevel: number;
  setLatitude: (lat: number) => void;
  setLongitude: (lng: number) => void;
  setZoomLevel: (zoom: number) => void;
}> = ({
  latitude,
  longitude,
  zoomLevel,
  setLatitude,
  setLongitude,
  setZoomLevel,
}) => {
  const [ready, setReady] = useState(false);
  const [getRad, setRad] = useState(0);
  const { isAuthenticated } = useAuthProvider();

  console.log("IsAuthenticatedInMap: ", isAuthenticated);

  return (
    <APIProvider apiKey={apiKey} onLoad={() => setReady(true)}>
      <Map
        mapId={"7a9e2ebecd32a903"}
        zoom={zoomLevel}
        defaultCenter={{ lat: 52.05520693312365, lng: -89.07466897397208 }}
        disableDefaultUI={true}
        onCameraChanged={(ev: MapCameraChangedEvent) => {
          const zoomRanges = [
            { zoom: 13.5, rad: 600 },
            { zoom: 12.5, rad: 600 },
            { zoom: 11.5, rad: 1000 },
            { zoom: 10.5, rad: 880 },
            { zoom: 10, rad: 570 },
            { zoom: 9.5, rad: 540 },
            { zoom: 9, rad: 330 },
            { zoom: 8.5, rad: 325 },
            { zoom: 7.9, rad: 195 },
            { zoom: 7.4, rad: 170 },
            { zoom: 7, rad: 135 },
            { zoom: 6.5, rad: 115 },
            { zoom: 6, rad: 85 },
            { zoom: 5.5, rad: 55 },
            { zoom: 5, rad: 25 },
            { zoom: 3, rad: 25 },
          ];

          const matchingRange = zoomRanges.find(
            (range) => ev.detail.zoom > range.zoom,
          );

          console.log(zoomLevel);
          if (matchingRange) {
            setRad(matchingRange.rad);
            setZoomLevel(ev.detail.zoom);
            setLongitude(ev.detail.center.lng);
            setLatitude(ev.detail.center.lat);
          }
        }}
      >
        <GoogleHeatmap loaded={ready} radius={getRad} />

        <ZoomLevels setZoomLevel={setZoomLevel} />
      </Map>
    </APIProvider>
  );
};

function GoogleMap() {
  const [zoomLevel, setZoomLevel] = useState(5.135233869186244);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  return (
    <div className="googleMaps">
      <GoogleMap2
        latitude={latitude}
        longitude={longitude}
        zoomLevel={zoomLevel}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        setZoomLevel={setZoomLevel}
      />
      <div className="crosshair"></div>
      <StarLocation
        latitude={latitude}
        longitude={longitude}
        zoomLevel={zoomLevel}
      />
    </div>
  );
}

export default GoogleMap;
