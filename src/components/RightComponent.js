import React, { useRef, useEffect } from "react";

const RightComponent = ({ images }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (images) {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw images
      Object.values(images).forEach((imageArray) => {
        imageArray.forEach((image) => {
          const img = new Image();
          img.src = image.src;
          img.onload = () => {
            ctx.drawImage(img, image.x, image.y);
          };
        });
      });
    }
  }, [images]);

  return (
    <div
      style={{
        width: "74%",
        backgroundColor: "lightpink",
        float: "left",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "80%",
          maxWidth: "30vw",
          maxHeight: "80vh",
          position: "relative",
        }}
      >
        <canvas
          ref={canvasRef}
          id="canvas"
          style={{
            backgroundColor: "lightblue",
            width: "270px",
            height: "480px",
          }}
          width={270}
          height={480}
        />
      </div>
    </div>
  );
};

export default RightComponent;
