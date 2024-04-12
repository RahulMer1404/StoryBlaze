import React, { useState, useEffect } from "react";

const LeftComponent = ({ setImages }) => {
  const [images, setLocalImages] = useState({});

  useEffect(() => {
    const savedPositions = JSON.parse(localStorage.getItem("imagePositions"));
    if (savedPositions) {
      setLocalImages(savedPositions);
    }
  }, []);

  const handleDragStart = (e) => {
    if (e.dataTransfer) {
      e.dataTransfer.setData("src", e.target.src);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const src = e.dataTransfer.getData("src");
    const newImage = {
      x: e.clientX,
      y: e.clientY,
      src: src,
    };

    const updatedImages = { ...images };
    if (!updatedImages[src]) {
      updatedImages[src] = [newImage];
    } else {
      updatedImages[src] = [...updatedImages[src], newImage];
    }

    setLocalImages(updatedImages);
    setImages(updatedImages); // Update parent component's images state

    localStorage.setItem("imagePositions", JSON.stringify(updatedImages));
  };

  return (
    <div
      style={{
        display: "flex",
        width: "26%",
        backgroundColor: "lightgreen",
        float: "left",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "20%",
          backgroundColor: "lightblue",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            borderBottom: "1px solid black",
            textAlign: "center",
            lineHeight: "35px",
            cursor: "pointer",
          }}
        >
          Tab 1
        </div>
        <div
          style={{
            borderBottom: "1px solid black",
            textAlign: "center",
            lineHeight: "35px",
            cursor: "pointer",
          }}
        >
          Tab 2
        </div>
        <div
          style={{
            borderBottom: "1px solid black",
            textAlign: "center",
            lineHeight: "35px",
            cursor: "pointer",
          }}
        >
          Tab 3
        </div>
        <div
          style={{
            borderBottom: "1px solid black",
            textAlign: "center",
            lineHeight: "35px",
            cursor: "pointer",
          }}
        >
          Tab 4
        </div>
        <div
          style={{
            borderBottom: "1px solid black",
            textAlign: "center",
            lineHeight: "35px",
            cursor: "pointer",
          }}
        >
          Tab 5
        </div>
        <div
          style={{
            textAlign: "center",
            lineHeight: "35px",
            cursor: "pointer",
          }}
        >
          Tab 6
        </div>
      </div>
      <div
        style={{
          width: "80%",
          backgroundColor: "lightcoral",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridGap: "10px",
          padding: "10px",
        }}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {[...Array(6)].map((_, index) => (
          <img
            key={index}
            src={`https://via.placeholder.com/150?text=Image${index + 1}`}
            alt={`Image ${index + 1}`}
            draggable="true"
            onDragStart={handleDragStart}
            style={{ width: "100%", height: "auto" }}
          />
        ))}
      </div>
    </div>
  );
};

export default LeftComponent;
