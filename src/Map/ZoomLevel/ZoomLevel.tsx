import "./ZoomLevel.css";

const ZoomLevels: React.FC<{ setZoomLevel: (zoom: number) => void }> = ({
  setZoomLevel,
}) => {
  function handleZoomChange(e: any, zoomLevel: number) {
    e.preventDefault();
    setZoomLevel(zoomLevel);
  }
  return (
    <div id="zoomLevels">
      <div id="selections">
        <div className="selectionBox">
          <button
            onClick={(e) => handleZoomChange(e, Number(e.currentTarget.value))}
            value={5}
          >
            0.5x
          </button>
        </div>
        <div className="selectionBox">
          <button
            onClick={(e) => handleZoomChange(e, Number(e.currentTarget.value))}
            value={6}
          >
            2x
          </button>
        </div>
        <div className="selectionBox">
          <button
            onClick={(e) => handleZoomChange(e, Number(e.currentTarget.value))}
            value={7}
          >
            4x
          </button>
        </div>
        <div className="selectionBox">
          <button
            onClick={(e) => handleZoomChange(e, Number(e.currentTarget.value))}
            value={10}
          >
            8x
          </button>
        </div>

        <div className="selectionBox">
          <button
            onClick={(e) => handleZoomChange(e, Number(e.currentTarget.value))}
            value={12}
          >
            16x
          </button>
        </div>

        <div className="selectionBox">
          <button
            onClick={(e) => handleZoomChange(e, Number(e.currentTarget.value))}
            value={18}
          >
            32x
          </button>
        </div>

        <div className="selectionBox">
          <button
            onClick={(e) => handleZoomChange(e, Number(e.currentTarget.value))}
            value={27}
          >
            64x
          </button>
        </div>
      </div>
    </div>
  );
};

export default ZoomLevels;
