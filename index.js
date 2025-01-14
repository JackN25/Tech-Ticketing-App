import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDkugsCGa9NYv3L3mPsPVSu6hKQFZc4Ygk",
    authDomain: "tech-ticketing-app-72e5d.firebaseapp.com",
    databaseURL: "https://tech-ticketing-app-72e5d-default-rtdb.firebaseio.com",
    projectId: "tech-ticketing-app-72e5d",
    storageBucket: "tech-ticketing-app-72e5d.firebasestorage.app",
    messagingSenderId: "483982959396",
    appId: "1:483982959396:web:4b36e808c9d4286f52c9b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

// Variables
const signOutButtonEl = document.getElementById("sign-out-btn")
const viewLoggedOut = document.getElementById("logged-out-view")
const viewLoggedIn = document.getElementById("logged-in-view")

/* === Login Functions === */
onAuthStateChanged(auth, (user) => {
    if (user) {
        showLoggedInView()
        showProfilePicture(userProfilePictureEl, user)
        showUserGreeting(userGreetingEl, user)
    } else {
        showLoggedOutView()
    }
})

function showProfilePicture(imgElement, user) {
    if (user != null) {
        if (user.photoURL != null) {
            imgElement.src = user.photoURL
        } else {
            imgElement.src = "assets/images/defaultPic.jpg"
        }
    }
}

function showUserGreeting(element, user) {
    if (user != null) {
        if (user.display != null) {
            element.textContent = "Hi " + user.display
        } else {
            element.textContent = "Hey friend, how are you?"
        }
    }
}

/* === Authentication Functions === */
function authSignInWithEmail() {
    console.log("Sign in with email and password")
    let email = emailInputEl.value
    let password = passwordInputEl.value

    signInWithEmailAndPassword(auth, email, password)
        .then((success) => {
            showLoggedInView()
        })
        .catch((error) => {
            console.error(error.message)
        })
}

function authCreateAccountWithEmail() {
    console.log("Sign up with email and password")
    let email = emailInputEl.value
    console.log(email)
    let password = passwordInputEl.value

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showLoggedInView()
        })
        .catch((error) => {
            console.error(error.message)
        })
}

function authSignOut() {
    signOut(auth).then(() => {
        showLoggedOutView()
    }).catch((error) => {
        console.error(error.message)
    })
}


/* == Functions - UI Functions == */

function showLoggedOutView() {
    hideView(viewLoggedIn)
    showView(viewLoggedOut)
}

function showLoggedInView() {
    hideView(viewLoggedOut)
    showView(viewLoggedIn)
}

function showView(view) {
    view.style.display = "flex"
}

function hideView(view) {
    view.style.display = "none"
}