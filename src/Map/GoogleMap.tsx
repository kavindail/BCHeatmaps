import "./GoogleMap.css";
import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import React, { useMemo, useEffect, useState } from "react";
import axios from "axios";

const apiKey: string | undefined = import.meta.env.VITE_API_KEY as string;

type HeatmapProps = {
  data: google.maps.LatLng[] | google.maps.visualization.WeightedLocation[];
  radius: number;
};

const Heatmap: React.FC<HeatmapProps> = ({ data, radius }) => {
  const map = useMap();
  const visualizationLib = useMapsLibrary("visualization");

  const heatmap = useMemo(() => {
    if (!visualizationLib) return null;

    return new visualizationLib.HeatmapLayer({
      data,
      radius: radius,
      opacity: 0.3,
    });
  }, [visualizationLib, data, radius]);

  useEffect(() => {
    if (!heatmap || !map) return;

    heatmap.setMap(map);

    return () => {
      heatmap.setMap(null);
    };
  }, [heatmap, map, radius]);

  return null;
};

const GoogleMap2 = () => {
  const [getHeatmapData, setHeatmapData] = useState<google.maps.LatLng[]>([]);
  const handleLoad = () => {
    if (window.google) {
      axios
        .get(
          `http://localhost:3000/activityPoints
`,
        )
        .then((res) => {
          const jsonCoords = res.data;
          const heatmapData = jsonCoords.map(
            (coord: any) =>
              new google.maps.LatLng(coord.latitude, coord.longitude),
          );
          setHeatmapData(heatmapData);

          console.log(jsonCoords);
        });
    }
  };

  const [rad, setRad] = useState(0);
  return (
    <APIProvider apiKey={apiKey} onLoad={() => handleLoad()}>
      <Map
        mapId={"7a9e2ebecd32a903"}
        defaultZoom={5.135233869186244}
        defaultCenter={{ lat: 52.05520693312365, lng: -89.07466897397208 }}
        disableDefaultUI={true}
        onCameraChanged={(ev: MapCameraChangedEvent) => {
          console.log(
            "camera changed:",
            ev.detail.center,
            "zoom level:",
            ev.detail.zoom,
          );
          if (ev.detail.zoom > 10.5) {
            setRad(870);
          } else if (ev.detail.zoom > 10) {
            setRad(570);
          } else if (ev.detail.zoom > 9.5) {
            setRad(540);
          } else if (ev.detail.zoom > 9) {
            setRad(330);
          } else if (ev.detail.zoom > 8.5) {
            setRad(325);
          } else if (ev.detail.zoom > 7.9) {
            setRad(195);
          } else if (ev.detail.zoom > 7.4) {
            setRad(170);
          } else if (ev.detail.zoom > 7) {
            setRad(135);
          } else if (ev.detail.zoom > 6.5) {
            setRad(115);
          } else if (ev.detail.zoom > 6) {
            setRad(85);
          } else if (ev.detail.zoom > 5.5) {
            setRad(55);
          } else if (ev.detail.zoom > 5) {
            setRad(25);
          } else if (ev.detail.zoom > 3) {
            setRad(25);
          }
        }}
      >
        {getHeatmapData.length > 0 && (
          <Heatmap data={getHeatmapData} radius={rad} />
        )}
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
