import "./GoogleMap.css";
import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";
import { useState } from "react";
import GoogleHeatmap from "../Heatmap/Heatmap.tsx";
const apiKey: string | undefined = import.meta.env.VITE_API_KEY as string;

const GoogleMap2 = () => {
  const [ready, setReady] = useState(false);
  const [getRad, setRad] = useState(0);

  return (
    <APIProvider apiKey={apiKey} onLoad={() => setReady(true)}>
      <Map
        mapId={"7a9e2ebecd32a903"}
        defaultZoom={5.135233869186244}
        defaultCenter={{ lat: 52.05520693312365, lng: -89.07466897397208 }}
        disableDefaultUI={true}
        onCameraChanged={(ev: MapCameraChangedEvent) => {
          const zoomRanges = [
            { zoom: 10.5, rad: 870 },
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
          if (matchingRange) {
            setRad(matchingRange.rad);
          }
        }}
      >
        <GoogleHeatmap loaded={ready} radius={getRad} />
      </Map>
    </APIProvider>
  );
};

function GoogleMap() {
  return (
    <div className="googleMaps">
      <GoogleMap2 />
    </div>
  );
}

export default GoogleMap;
