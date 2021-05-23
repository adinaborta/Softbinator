import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import ProgressBar from "./ProgressBar";
import "../index.css";

export default function UploadForm(props) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const types = ["image/png", "image/jpeg"];

  const changeHandler = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select a valid image file (png/jpeg)");
    }
  };

  return (
    <>
      <div className="message">
        {error && <Alert variant="danger">{error}</Alert>}
        {/* {file && <div className="message">{file.name}</div>} */}
      </div>
      {file && <ProgressBar file={file} setFile={setFile} />}
      <form>
        <label style={{ margin: "0" }}>
          <input
            type="file"
            onChange={changeHandler}
            style={{ display: "none" }}
          />
          {props.children}
        </label>
      </form>
    </>
  );
}
