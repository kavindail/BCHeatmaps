import "./ZoomLevel.css";

const ZoomLevels: React.FC<{ setZoomLevel: (zoom: number) => void }> = ({
  setZoomLevel,
}) => {
  //Zoom level is going to be a little menu of zoom levels,
  //when a zoom level is updated it should change the zoom level of the actual map
  return (
    <div id="zoomLevels">
      <div id="selections">
        <div className="selectionBox">
          <button value={0.5}> 0.5x </button>
        </div>
        <div className="selectionBox">
          <button value={1}> 1x </button>
        </div>
        <div className="selectionBox">
          <button value={2}> 2x </button>
        </div>
        <div className="selectionBox">
          <button value={4}> 4x </button>
        </div>
        <div className="selectionBox">
          <button value={8}> 8x </button>
        </div>
      </div>
    </div>
  );
};

export default ZoomLevels;
