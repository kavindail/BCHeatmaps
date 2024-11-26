import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

import React, { useContext, useMemo, useEffect, useState } from "react";
import axios from "axios";
const apiUrl: string | undefined = import.meta.env.VITE_API_URL as string;

type HeatmapProps = {
  data: google.maps.LatLng[] | google.maps.visualization.WeightedLocation[];
  radius: number;
};

export const Heatmap: React.FC<HeatmapProps> = ({ data, radius }) => {
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

function GoogleHeatmap({ loaded, radius }) {
  const [heatmapData, setHeatmapData] = useState<google.maps.LatLng[]>([]);
  const memoizedHeatmap = useMemo(() => heatmapData, [heatmapData]);
  const memoizedRadius = useMemo(() => radius, [radius]);

  useEffect(() => {
    if (loaded) {
      axios
        .get(apiUrl + "/activityPoints")
        .then((res) => {
          const jsonCoords = res.data;
          const heatmapData = jsonCoords.map(
            (coord: any) =>
              new google.maps.LatLng(coord.latitude, coord.longitude),
          );
          setHeatmapData(heatmapData);

          console.log(jsonCoords);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [loaded]);
  return (
    <div className="heatmap">
      {heatmapData.length > 0 && (
        <Heatmap data={memoizedHeatmap} radius={memoizedRadius} />
      )}
    </div>
  );
}

export default GoogleHeatmap;
