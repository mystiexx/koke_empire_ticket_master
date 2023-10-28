import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpNVkbKeZoNc6qM_FdO-LiT85OmwljP1w",
  authDomain: "koke-d0aa2.firebaseapp.com",
  projectId: "koke-d0aa2",
  storageBucket: "koke-d0aa2.appspot.com",
  messagingSenderId: "1095972559690",
  appId: "1:1095972559690:web:24f204bb8388eca3857fb3",
  measurementId: "G-X1DYWD2040",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
