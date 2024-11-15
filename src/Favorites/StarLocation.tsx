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

//TODO: Take these as props in the component
//This component should just be a star that when pressed adds a favorite for the current location on
const StarLocation = () => {
  const [buttonClicked, setButtonClicked] = useState(false);

  function addFavorite() {
    setButtonClicked(true);

    try {
      //TODO: Change this to the api call to add favorites
      const response = axios.post(
        apiUrl + "/auth/verifyToken",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
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
