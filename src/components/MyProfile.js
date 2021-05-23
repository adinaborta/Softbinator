import React from "react";
import MyNavbar from "./MyNavbar";
// import { motion } from "framer-motion";
import { BsPersonFill } from "react-icons/bs";
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
          "https://firebasestorage.googleapis.com/v0/b/social-media-project-92d0c.appspot.com/o/IMG-20200627-WA0083.jpg?alt=media&token=a996da7b-3681-4709-801b-3e0530135bb7",
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

          <div style={styles.profileInfo}> Email: {currentUser.email}</div>
        </div>
        <ImageGrid />
      </div>
    </>
  );
}

const styles = {
  profileInfo: {
    width: "85%",
    paddingLeft: "10%",
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
    background: "rgb(255, 183, 173)",
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
