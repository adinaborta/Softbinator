import { useState, useEffect } from "react";
import { projectFireStore } from "./firebase";

export function useFirestore(collection, uid) {
  const [images, setImages] = useState([]);
  useEffect(() => {
    const unsubscribe = projectFireStore
      .collection(collection)
      .where("uid", "==", uid)
      .onSnapshot((snap) => {
        let currImgs = [];
        snap.forEach((doc) => {
          currImgs = doc.data().imgUrls;
        });
        console.log(currImgs);
        currImgs &&
          currImgs.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
        setImages(currImgs);
      });
    return () => unsubscribe();
  }, [collection]);

  return { images };
}

export function useFirestoreAll(collection) {
  const [images, setImages] = useState([]);
  useEffect(() => {
    const unsubscribe = projectFireStore
      .collection(collection)
      .onSnapshot((snap) => {
        let currImgs = [];
        snap.forEach((doc) => {
          doc.data().imgUrls &&
            currImgs.push(...doc.data().imgUrls, doc.data().uid);
        });
        // console.log(currImgs);
        currImgs &&
          currImgs.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
        setImages(currImgs);
      });
    return () => unsubscribe();
  }, [collection]);

  return { images };
}
