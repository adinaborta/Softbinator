import React, { useEffect } from "react";
import useStorage from "../firebase/useStorage";

export default function ProgressBar({ file, setFile }) {
  const { url } = useStorage(file);
  //   console.log(progress, url);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return (
    <div
    // className="progress-bar" style={{ width: progress + "%" }}
    ></div>
  );
}
