import "./StarLocation.css";
import React, { useState, useEffect } from "react";
const apiUrl: string | undefined = import.meta.env.VITE_API_URL as string;
import axios from "axios";

function toastify() {
  //TODO: When this is clicked a react toastify should replace this with the results of whether the favorite was added or not
  alert("Added favorite");
}

function triggerButonClickEffect() {
  //TODO: This should trigger some sort of animation in the star either fill it in or add some sort of animation
}

interface StarLocationProps {
  zoomLevel: number;
  latitude: number;
  longitude: number;
}

const StarLocation: React.FC<StarLocationProps> = ({
  zoomLevel,
  latitude,
  longitude,
}) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  console.log("Zoom Level in Star Location: ", zoomLevel);
  console.log("Latitude in Star Location: ", latitude);
  console.log("Longitude in Star Location: ", longitude);

  async function addFavorite() {
    setButtonClicked(true);

    try {
      const response = await axios.post(
        apiUrl + "/favorite",
        { latitude: latitude, longitude: longitude, zoomLevel: zoomLevel },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      console.log("Added favorite, response: ", response);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    //TODO: Use this to trigger the button effect
    //Call the button effect function
  }, [buttonClicked]);

  return (
    <div className="starLocation">
      <button onClick={addFavorite}>★</button>
    </div>
  );
};

export default StarLocation;
