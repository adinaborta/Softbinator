import React from "react";
import background from "../imgs/background.jpg";

export default function WashPaintBkg() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        top: "0px",
        zIndex: "-200",
      }}
    >
      <div style={styles.overlay}></div>
      <img src={background} style={styles.bkg} alt=""></img>
    </div>
  );
}

const styles = {
  bkg: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    background: "#260049",
    opacity: "20%",
    height: "100%",
    width: "100%",
  },
};
