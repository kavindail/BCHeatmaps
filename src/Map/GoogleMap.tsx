import "./GoogleMap.css";
import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import React, { useMemo, useEffect, useState } from "react";

const apiKey: string | undefined = import.meta.env.VITE_API_KEY as string;

type HeatmapProps = {
  data: google.maps.LatLng[] | google.maps.visualization.WeightedLocation[];
};

const coordinates = [
  { lat: -33.860664, lng: 151.208138 },
  { lat: -33.865835, lng: 151.209296 },
  { lat: -33.867886, lng: 151.206788 },
  { lat: -33.86064, lng: 151.208138 },
  { lat: -33.86064, lng: 151.208138 },
  { lat: -33.86064, lng: 151.208138 },
  { lat: -33.86064, lng: 151.208138 },
  { lat: -33.865835, lng: 151.209296 },
  { lat: -33.867886, lng: 151.206788 },

  { lat: -33.860664, lng: 151.208138 },
  { lat: -33.865835, lng: 151.209296 },
  { lat: -33.867886, lng: 151.206788 },
  { lat: -33.86064, lng: 151.208138 },
  { lat: -33.86064, lng: 151.208138 },
  { lat: -33.86064, lng: 151.208138 },
  { lat: -33.86064, lng: 151.208138 },
  { lat: -33.865835, lng: 151.209296 },
  { lat: -33.867886, lng: 151.206788 },
];

const Heatmap: React.FC<HeatmapProps> = ({ data }) => {
  const map = useMap();
  const visualizationLib = useMapsLibrary("visualization");

  const heatmap = useMemo(() => {
    if (!visualizationLib) return null;

    return new visualizationLib.HeatmapLayer({
      data,
      radius: 20,
      opacity: 0.6,
    });
  }, [visualizationLib, data]);

  useEffect(() => {
    if (!heatmap || !map) return;

    heatmap.setMap(map);

    return () => {
      heatmap.setMap(null);
    };
  }, [heatmap, map]);

  return null;
};

const GoogleMap2 = () => {
  const [getHeatmapData, setHeatmapData] = useState<google.maps.LatLng[]>([]);
  const handleLoad = () => {
    if (window.google) {
      const heatmapData = coordinates.map(
        (coord) => new google.maps.LatLng(coord.lat, coord.lng),
      );
      setHeatmapData(heatmapData);
    }
  };

  return (
    <APIProvider apiKey={apiKey} onLoad={() => handleLoad()}>
      <Map
        mapId={"7a9e2ebecd32a903"}
        defaultZoom={13}
        defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
        disableDefaultUI={true}
        onCameraChanged={(ev: MapCameraChangedEvent) =>
          console.log(
            "camera changed:",
            ev.detail.center,
            "zoom:",
            ev.detail.zoom,
          )
        }
      >
        {getHeatmapData.length > 0 && <Heatmap data={getHeatmapData} />}
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
