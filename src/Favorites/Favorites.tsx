import "./Favorites.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
const apiUrl: string | undefined = import.meta.env.VITE_API_URL as string;

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(apiUrl + "/favorite", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        const responseData = response.data;
        console.log("Favorite: ", responseData);
        console.log(response);
        setFavorites(responseData);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchFavorites();
  }, []);

  return (
    <div className="favorites">
      <p>{JSON.stringify(favorites)}</p>
    </div>
  );
};

export default Favorites;
