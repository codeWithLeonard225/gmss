// app/lilothers/othersdb.jsx      export const othersdb = getFirestore(schoolapp);
// app/lib/firebase.js             export { db };
// app/lilpupil/pupilLogin.jsx     export const pupilLoginFetch = getFirestore(schoolapp);


"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyCzmYnFl_Q8n7VWTWD2xdMlzJvrul_8xDo",
  authDomain: "myschoolhub-sl.firebaseapp.com",
  projectId: "myschoolhub-sl",
  storageBucket: "myschoolhub-sl.firebasestorage.app",
  messagingSenderId: "828034353905",
  appId: "1:828034353905:web:7b54db7c539786871c3750",
  measurementId: "G-8B8SSPZ1V1"
};

// ✅ Prevent duplicate initialization (VERY IMPORTANT in Next.js)
const schoolapp =
  getApps().find(app => app.name === "pupilLogin") ||
  initializeApp(firebaseConfig, "pupilLogin");

// ✅ Firestore client
export const pupilLoginFetch = getFirestore(schoolapp);
