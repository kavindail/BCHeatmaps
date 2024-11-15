import "./StarLocation.css";

function toastify() {
  //TODO: When this is clicked a react toastify should replace this with the results of whether the favorite was added or not
  alert("Added favorite");
}

function triggerButonClickEffect() {
  //TODO: This should trigger some sort of animation in the star either fill it in or add some sort of animation
}

function addFavorite() {
  //TODO: Make an api call to add a favorite for the latitude, longitude, and zoom level
}

//TODO: Take these as props in the component
//This component should just be a star that when pressed adds a favorite for the current location on
const StarLocation = () => {
  return (
    <div className="starLocation">
      <button onClick={addFavorite}>★</button>
    </div>
  );
};
export default StarLocation;
