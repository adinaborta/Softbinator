import React, { useState, useEffect } from "react";
import MyNavbar from "./MyNavbar";
import Signup from "./Signup";
import Login from "./Login";
import { motion } from "framer-motion";
import "../index.css";
import WashPaintBkg from "./WashPaintBkg";

export default function Home() {
  const [showLogInForm, setShowLogInForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const closeForms = (e) => {
    // console.log(e);
    if (showLogInForm || setShowSignUpForm) {
      if (e.target.classList.contains("exitForm")) {
        setShowSignUpForm(false);
        setShowLogInForm(false);
      }
    }
  };
  const formVariants = {
    hidden: {
      y: "-100vh",
      transition: { duration: 0.5, type: "spring", stiffness: "105" },
    },
    visible: {
      y: "0vh",
      transition: { duration: 0.5, type: "spring", stiffness: "105" },
    },
  };

  useEffect(() => {
    if (!showLogInForm && !showSignUpForm) {
      setDisabled(false);
    }
  }, [showLogInForm, showSignUpForm]);

  return (
    <>
      <div style={styles.wrapper} onClick={closeForms}>
        <MyNavbar disabled={disabled} />
        <WashPaintBkg />
        <div style={styles.logAndSign} className="logAndSign">
          {!showLogInForm && !showSignUpForm && (
            <div style={styles.wrapperIfNoForm}>
              <h1 style={styles.header}>CREATE. INSPIRE. GROW</h1>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="formOpener pageButton"
                style={{ ...styles.login }}
                onClick={() => {
                  setShowLogInForm(true);
                  setDisabled(true);
                }}
              >
                Log In
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                style={{ ...styles.signup }}
                className="formOpener pageButton"
                onClick={() => {
                  setShowSignUpForm(true);
                  setDisabled(true);
                }}
              >
                Sign Up
              </motion.button>
            </div>
          )}

          {showLogInForm && (
            <motion.div
              variants={formVariants}
              initial="hidden"
              animate="visible"
              style={{
                width: "100%",
                height: "100%",
                boxSizing: "border-box",
              }}
            >
              <Login
                setShowLogInForm={setShowLogInForm}
                setShowSignUpForm={setShowSignUpForm}
              />
            </motion.div>
          )}
          {showSignUpForm && (
            <motion.div
              variants={formVariants}
              initial="hidden"
              animate="visible"
              style={{
                width: "100%",
                height: "100%",
                boxSizing: "border-box",
              }}
            >
              <Signup
                setShowLogInForm={setShowLogInForm}
                setShowSignUpForm={setShowSignUpForm}
              />
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}

const styles = {
  wrapper: {
    width: "100vw",
    height: "100vh",
    boxSizing: "border-box",
    overflow: "hidden",
    position: "relative",
  },
  logAndSign: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    top: "0px",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  login: {
    background: "#90BEDE",
  },
  signup: {
    background: "#FFB7AD",
  },
  img: {
    position: "fixed",
    top: "0px",
    width: "100%",
    height: "auto",
    zIndex: "-200",
  },
  header: {
    color: "white",
    fontSize: "3rem",
    borderTop: "2px solid white",
    borderBottom: "2px solid white",
    padding: "5px",
    pointerEvents: "none",
    position: "relative",
    bottom: "50px",
  },
  wrapperIfNoForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
};
