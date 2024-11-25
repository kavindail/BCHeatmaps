import "./Favorites.css";
import axios from "axios";
import { useState, useEffect } from "react";
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
        console.log("Response Data:", responseData);
        const favoritesArray = responseData.favorites || responseData;
        setFavorites(favoritesArray);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchFavorites();
  }, []);

  return (
    <div className="favorites">
      <div className="favorites-page">
        {favorites && favorites.length > 0 ? (
          <div className="favorites-container">
            {favorites.map((favorite, index) => (
              <div key={index} className="favorite-item">
                <p className="favorite-title">Favorite {index + 1}</p>
                <p className="favorite-detail">Latitude: {favorite.latitude}</p>
                <p className="favorite-detail">
                  Longitude: {favorite.longitude}
                </p>
                <p className="favorite-detail">
                  Zoom Level: {favorite.zoomLevel}
                </p>
                <button className="favorite-button">View Favorite</button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-favorites">No favorites found</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
