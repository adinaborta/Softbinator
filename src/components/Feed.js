import React from "react";
import WashPaintBkg from "./WashPaintBkg";
import MyNavbar from "./MyNavbar";
import { useFirestoreAll } from "../firebase/useFirestore";
import { IoArrowRedoOutline } from "react-icons/io5";
import UploadForm from "./UploadForm";
import "../index.css";
export default function Feed() {
  const { images } = useFirestoreAll("users");
  console.log(images);
  return (
    <div>
      <WashPaintBkg />
      <MyNavbar />
      <div className="feed-container">
        {images &&
          images.map((image) => (
            <div style={{ position: "relative" }}>
              <div className="img-info">
                <UploadForm>
                  <IoArrowRedoOutline className="icon" />
                </UploadForm>
              </div>
              <div className="feed-img-container" key={image.uid}>
                <img src={image.url} alt="Unavailable picture"></img>
              </div>
            </div>
          ))}
      </div>{" "}
    </div>
  );
}
