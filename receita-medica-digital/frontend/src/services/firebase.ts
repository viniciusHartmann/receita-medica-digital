// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDaMKOzhZgCdQgjbHS91pMWcE5e89bRDDc",
	authDomain: "login-auth-recipe.firebaseapp.com",
	projectId: "login-auth-recipe",
	storageBucket: "login-auth-recipe.firebasestorage.app",
	messagingSenderId: "1012750809978",
	appId: "1:1012750809978:web:116b4595ec2a7fe4a474c3",
	measurementId: "G-Q7KMV5GHC7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);