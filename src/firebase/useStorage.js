import { useState, useEffect } from "react";
import { projectStorage, projectFireStore, timestamp } from "./firebase";
import { useAuth } from "../firebase/AuthContext";
import { updateUserImages } from "./DatabaseQueries";
import { v4 as uuidv4 } from "uuid";
export default function useStorage(file) {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const storageRef = projectStorage.ref(file.name);
    const collectionRef = projectFireStore.collection(currentUser.uid);
    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        let date = new Date();
        const createdAt = {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
          hour: date.getHours(),
          minute: date.getMinutes(),
          second: date.getSeconds(),
        };
        projectFireStore
          .collection("users")
          .where("uid", "==", currentUser.uid)
          .get()
          .then((querySnapshot) => {
            let userData = {};
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              userData = doc.data();
            });
            console.log(userData);
            const currImgs = userData.imgUrls ? userData.imgUrls : [];

            currImgs.push({
              url: url,
              createdAt: `${createdAt.year} ${createdAt.month} ${createdAt.day} ${createdAt.hour} ${createdAt.minute} ${createdAt.second}`,
              uid: uuidv4(),
            });
            updateUserImages(userData, currImgs);
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
        setUrl(url);
      }
    );
  }, [file]);

  return { progress, url, error };
}
