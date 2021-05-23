import React, { useState } from "react";
import { Navbar } from "react-bootstrap";
import { BiSearchAlt } from "react-icons/bi";
import { BsPersonFill } from "react-icons/bs";
import { BiNews } from "react-icons/bi";
import { motion } from "framer-motion";
import "../index.css";
import { useAuth } from "../firebase/AuthContext";
import { useHistory } from "react-router-dom";
import UploadForm from "./UploadForm";
import { MdAddToPhotos } from "react-icons/md";

export default function MyNavbar({ disabled }) {
  const [isFocused, setIfFocused] = useState(false);
  // const [error, setError] = useState("");
  // const [success, setSuccess] = useState("");
  // const [loading, setLoading] = useState(false);
  const { logout } = useAuth();
  const history = useHistory();
  const { currentUser } = useAuth();
  // console.log(currentUser);
  const styles = {
    rCreate: {
      fontFamily: "'Sacramento', cursive",
      fontSize: "3rem",
      marginLeft: "20px",
      color: "white",
    },
    searchBar: {
      transition: "0.5s ease-in-out",
      margin: "0",
      border: "none",
      borderRadius: "5px",
      padding: "5px 0 5px 30px",
      boxShadow: "0 6px 6px 0 rgba(0, 0, 0, 0.2)",
      outline: "none",
      width: "70%",
      left: "5%",
      position: "relative",
    },
    searchIcon: {
      position: "absolute",
      zIndex: "10",
      color: isFocused ? "black" : "#bebebe",
      transition: "0.5s ease-in-out",
      left: "5%",
      width: "20px",
    },
    linksWrapper: {
      position: "relative",
      width: "60%",
      display: "flex",
      right: "0",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    logOff: {
      background: "#90BEDE",
      width: "100px",
    },
    allWrapper: {
      width: "100%",
      display: "flex",
      height: "100%",
    },
  };
  async function handleLogOut() {
    try {
      await logout();
      // setError("");
      // setLoading(true);
      // setSuccess(true);
      setTimeout(() => {
        history.push("/");
      }, 2000);
    } catch (err) {
      // setError("Failed to log out");
      console.log(err);
    }
    // setLoading(false);
  }

  return (
    <>
      <Navbar
        expand="lg"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          width: "100%",
          height: "10%",
        }}
      >
        <div style={styles.allWrapper}>
          <Navbar.Brand
            id="rCreate"
            href="/"
            style={{ ...styles.rCreate, zIndex: 200 }}
          >
            rCreate
          </Navbar.Brand>
          <form
            className="d-flex justify-content-left align-items-center"
            style={{ left: "0", margin: 0, position: "relative", width: "40%" }}
          >
            <BiSearchAlt className="icon" style={styles.searchIcon} />
            <motion.input
              whileHover={{
                opacity: "0.75",
                boxShadow: "0 6px 6px 0 rgba(0, 0, 0, 0.3)",
              }}
              whileFocus={{
                originX: 0,
                scaleX: "1.3",
                opacity: "1",
                boxShadow: "0 6px 6px 0 rgba(0, 0, 0, 0.4)",
              }}
              type="text"
              className="mr-sm-2"
              style={{ opacity: "0.5", ...styles.searchBar }}
              disabled={disabled}
              onFocus={() => setIfFocused(!isFocused)}
              onBlur={() => setIfFocused(!isFocused)}
            />
          </form>
          {currentUser && (
            <div style={styles.linksWrapper}>
              <BiNews
                className="icon"
                onClick={() => {
                  history.push("/feed");
                }}
              />
              <UploadForm>
                <MdAddToPhotos className="icon" />
              </UploadForm>
              <BsPersonFill
                className="icon"
                onClick={() => {
                  history.push("/profile");
                }}
              />
              <motion.button
                className="pageButton"
                style={styles.logOff}
                whileHover={{ scale: 1.1 }}
                onClick={handleLogOut}
              >
                Log off
              </motion.button>
            </div>
          )}
        </div>
      </Navbar>
    </>
  );
}
