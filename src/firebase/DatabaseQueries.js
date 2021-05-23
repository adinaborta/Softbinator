import React from "react";
import { projectFireStore } from "./firebase";

function addUserToDatabase(user) {
  projectFireStore
    .collection("users")
    .doc(user.uid)
    .set({
      uid: user.uid,
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
}

function updateUserImages(user, imgUrls) {
  projectFireStore
    .collection("users")
    .doc(user.uid)
    .set(
      {
        imgUrls: imgUrls && imgUrls,
      },
      { merge: true }
    )
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
}

// function updateUserFollowers(followedUserId, followingUserId) {
//   projectFireStore
//     .collection("users")
//     .doc(followedUserId.uid)
//     .set({}, { merge: true })
//     .then(() => {
//       console.log("Document successfully written!");
//     })
//     .catch((error) => {
//       console.error("Error writing document: ", error);
//     });
// }

export default function DatabaseQueries() {
  return <div></div>;
}

export { updateUserImages, addUserToDatabase };
