import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ReactImageZoom from "react-image-zoom";

const ImageZoom = ({ src }) => {
  const propsForZoom = {
    img: src,
    zoomWidth: 500,     // width of zoom window
    zoomHeight: 500,    // height of zoom window
    offset: { vertical: 0, horizontal: 20 }, // spacing between image & zoom window
    scale: 2
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* Main image with Pan & Pinch */}
      <div style={{ width: "450px" }}>
        <TransformWrapper>
          <TransformComponent>
            <img
              src={src}
              alt="zoomable"
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
            />
          </TransformComponent>
        </TransformWrapper>
      </div>

      {/* Hover zoom window */}
    <div className="hiddenZoomImg">
  <ReactImageZoom {...propsForZoom} />
</div>
    </div>
  );
};

export default ImageZoom;
