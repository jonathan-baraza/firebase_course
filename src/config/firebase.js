// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmdpS1oJlolW5B8xYQUrzENL16-4R5kNo",
  authDomain: "fir-course-d9cbb.firebaseapp.com",
  projectId: "fir-course-d9cbb",
  storageBucket: "fir-course-d9cbb.appspot.com",
  messagingSenderId: "978172592872",
  appId: "1:978172592872:web:08a5e0ad3e1625582abf5d",
  measurementId: "G-7WCM07M1Q8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
