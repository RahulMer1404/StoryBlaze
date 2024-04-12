import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

const URLImage = ({ image, draggable, onDragStart, onDragEnd }) => {
  const [img] = useImage(image.src);
  return (
    <Image
      image={img}
      x={image.x}
      y={image.y}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
    />
  );
};

const App = () => {
  const stageRef = useRef();
  const [images, setImages] = useState({});

  useEffect(() => {
    const savedPositions = JSON.parse(localStorage.getItem("imagePositions"));
    if (savedPositions) {
      setImages(savedPositions);
    }
  }, []);

  const handleDragStart = (e) => {
    if (e.dataTransfer) {
      e.dataTransfer.setData("src", e.target.src);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    stageRef.current.setPointersPositions(e);
    const src = e.dataTransfer.getData("src");
    const newImage = {
      ...stageRef.current.getPointerPosition(),
      src: src,
    };

    const updatedImages = { ...images };
    if (!updatedImages[src]) {
      updatedImages[src] = [newImage];
    } else {
      updatedImages[src] = [...updatedImages[src], newImage];
    }

    setImages(updatedImages);

    localStorage.setItem("imagePositions", JSON.stringify(updatedImages));
  };

  const handleDragEnd = (src, index, e) => {
    const updatedImages = { ...images };
    updatedImages[src][index] = {
      ...updatedImages[src][index],
      x: e.target.x(),
      y: e.target.y(),
    };
    setImages(updatedImages);

    localStorage.setItem("imagePositions", JSON.stringify(updatedImages));
  };

  return (
    <>
      <Navbar className="bg-body-tertiary" style={{borderBottom: "1px solid rgb(212, 212, 212)"}}>
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="./short-logo.webp"
              width="48"
              height="48"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">{"<"} Back To Dashboard</Nav.Link>
            <Nav.Link href="#home">My Story</Nav.Link>
          </Nav>
          <Button variant="secondary">Export</Button>
        </Container>
      </Navbar>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
        <div class="container">
          <div class="left">
            <ul>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  class="icon"
                >
                  <path d="M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6zM7.5 6h.008v.008H7.5V6zm2.25 0h.008v.008H9.75V6z"></path>
                </svg>
                Templates
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  class="icon"
                >
                  <path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path>
                </svg>
                Media
              </li>
              <li>
                <h4>T</h4>
                Texts
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  class="icon"
                >
                  <path d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"></path>
                </svg>
                Elements
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  class="icon"
                >
                  <path d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"></path>
                </svg>
                AddOns
              </li>
            </ul>
          </div>
          <div class="right">
            <div>
              Drag and Drop your image to Story
              <br />
              <img
                alt="lion"
                src="https://konvajs.org/assets/lion.png"
                draggable="true"
                onDragStart={handleDragStart}
              />
              <img
                alt="tiger"
                src="./sample1.png"
                draggable="true"
                onDragStart={handleDragStart}
                width={100}
                height={100}
              />
              <img
                alt="elephant"
                src="./sample2.png"
                draggable="true"
                onDragStart={handleDragStart}
                width={100}
                height={100}
              />
              <img
                alt="bird"
                src="./sample3.jpg"
                draggable="true"
                onDragStart={handleDragStart}
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            gridColumn: "span 2",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
            <Stage
              width={400}
              height={window.innerHeight}
              style={{ border: "1px solid grey" }}
              ref={stageRef}
            >
              <Layer>
                {Object.keys(images).map(
                  (src) =>
                    Array.isArray(images[src]) &&
                    images[src].map((image, index) => (
                      <URLImage
                        key={`${src}-${index}`}
                        image={image}
                        draggable
                        onDragStart={handleDragStart}
                        onDragEnd={(e) => handleDragEnd(src, index, e)}
                      />
                    ))
                )}
              </Layer>
            </Stage>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
