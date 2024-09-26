import "./GoogleMap.css";
import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";

const apiKey: string | undefined = import.meta.env.VITE_API_KEY as string;

const GoogleMap2 = () => (
  <APIProvider
    apiKey={apiKey}
    onLoad={() => console.log("Maps API has loaded.")}
  >
    <Map
      defaultZoom={13}
      defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
      onCameraChanged={(ev: MapCameraChangedEvent) =>
        console.log(
          "camera changed:",
          ev.detail.center,
          "zoom:",
          ev.detail.zoom,
        )
      }
    ></Map>
  </APIProvider>
);

function GoogleMap() {
  return (
    <div className="googleMaps">
      <GoogleMap2 />
    </div>
  );
}

export default GoogleMap;
