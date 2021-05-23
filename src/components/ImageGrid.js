import React from "react";
import { useAuth } from "../firebase/AuthContext";
import { useFirestore } from "../firebase/useFirestore";
import "../index.css";

export default function ImageGrid() {
  const { currentUser } = useAuth();
  const { images } = useFirestore("users", currentUser.uid);
  return (
    <div className="img-grid-container">
      {images &&
        images.map((image) => (
          <div className="img-grid" key={image.uid}>
            <img src={image.url} alt="Unavailable"></img>
          </div>
        ))}
    </div>
  );
}
