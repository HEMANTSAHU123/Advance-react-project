
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBmDbtsucNZTxtOZRRxDJ_lhBpJm5sko_8",
  authDomain: "adavnce--react-test-project.firebaseapp.com",
  databaseURL: "https://adavnce--react-test-project-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "adavnce--react-test-project",
  storageBucket: "adavnce--react-test-project.firebasestorage.app",
  messagingSenderId: "330516823861",
  appId: "1:330516823861:web:0e0f2fcbf49e0582ca567c",
  measurementId: "G-EZS61P37HH"
};

const app = initializeApp(firebaseConfig);
export  const database=getDatabase(app);