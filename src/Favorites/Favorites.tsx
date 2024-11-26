import "./Favorites.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const apiUrl: string | undefined = import.meta.env.VITE_API_URL as string;

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`${apiUrl}/favorite`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        const favoritesArray = response.data.favorites || response.data;
        setFavorites(favoritesArray);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchFavorites();
  }, []);

  const handleFavoriteSubmit = (
    e: any,
    zoomLevel: number,
    latitude: number,
    longitude: number,
  ) => {
    e.preventDefault();
    navigate("/", { state: { zoomLevel, latitude, longitude } });
  };

  return (
    <div className="favorites">
      <div className="favorites-page">
        {favorites.length > 0 ? (
          <div className="favorites-container">
            {favorites.map((favorite, index) => (
              <div key={index} className="favorite-item">
                <p className="favorite-title">Favorite {index + 1}</p>
                <p className="favorite-detail">Latitude: {favorite.latitude}</p>
                <p className="favorite-detail">
                  Longitude: {favorite.longitude}
                </p>
                <button
                  className="favorite-button"
                  onClick={(e) =>
                    handleFavoriteSubmit(
                      e,
                      Number(favorite.zoomLevel),
                      Number(favorite.latitude),
                      Number(favorite.longitude),
                    )
                  }
                >
                  View Favorite
                </button>
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
