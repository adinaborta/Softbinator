import React from "react";
import MyNavbar from "./MyNavbar";
// import { motion } from "framer-motion";
import { BsPersonFill } from "react-icons/bs";
import { RiEdit2Line } from "react-icons/ri";
import { useAuth } from "../firebase/AuthContext";
import WashPaintBkg from "./WashPaintBkg";
import ImageGrid from "./ImageGrid";

function MyProfile() {
  const { currentUser } = useAuth();

  const addPicture = () => {
    currentUser
      .updateProfile({
        displayName: currentUser.displayName,
        photoURL:
          "https://i.pinimg.com/474x/98/f9/b5/98f9b5986e2d5d8225d97404cf09e1cb.jpg",
      })
      .then(function () {
        console.log("Update successful.");
      })
      .catch(function (error) {
        console.log("An error happened.");
      });
  };

  return (
    <>
      <MyNavbar />
      <WashPaintBkg />
      <div style={styles.wrapper} className="wrapper">
        <div className="profileWrapper" style={styles.profileWrapper}>
          {!currentUser.photoURL ? (
            <button style={styles.profileButton}>
              <BsPersonFill style={styles.profileIcon} onClick={addPicture} />
            </button>
          ) : (
            <div style={styles.profileImgWrap}>
              <img
                src={currentUser.photoURL}
                // style={{ width: "50px", height: "50px" }}
                style={styles.profileIcon}
                onClick={addPicture}
              ></img>
            </div>
          )}

          <div style={styles.profileInfo}>
            <div></div>
            Email: {currentUser.email}
            <RiEdit2Line className="icon" style={{ width: "20px" }} />
          </div>
        </div>
        <ImageGrid />
      </div>
    </>
  );
}

const styles = {
  profileInfo: {
    width: "85%",
    padding: "0 10%",
    color: "white",
    display: "flex",
    flexDirection: "column",
  },
  profileWrapper: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    width: "100%",
    margin: "30px 0",
  },
  profileButton: {
    width: "15%",
    position: "relative",
    border: "none",
    background: "rgb(109, 123, 133)",
    borderRadius: "50%",
    padding: "1%",
  },
  profileImgWrap: {
    width: "15%",
    position: "relative",
    borderRadius: "50%",
    overflow: "hidden",
  },
  profileIcon: {
    width: "100%",
    height: "100%",
    color: "white",
  },
  wrapper: {
    width: "100%",
    overflow: "hidden",
    position: "relative",
    padding: "0 15%",
  },
  bkg: {
    position: "fixed",
    top: "0px",
    width: "100%",
    height: "auto",
    zIndex: "-200",
  },
};

export default MyProfile;
