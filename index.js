/* === Imports === */
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";


/* === Firebase Setup === */
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
console.log(auth)
console.log(app.options.projectId)

/* === UI === */

/* == UI - Elements == */
const userGreetingEl = document.getElementById("user-greeting")

const userProfilePictureEl = document.getElementById("user-profile-picture")

const signOutButtonEl = document.getElementById("sign-out-btn")

const viewLoggedOut = document.getElementById("logged-out-view")
const viewLoggedIn = document.getElementById("logged-in-view")

const viewCreateTicPage = document.getElementById("create-tic-page");

const emailInputEl = document.getElementById("email-input")
const passwordInputEl = document.getElementById("password-input")

const signInButtonEl = document.getElementById("sign-in-btn")
const createAccountButtonEl = document.getElementById("create-account-btn")
const createTicket = document.getElementById("create-tic")

const exitTicket = document.getElementById("exit-ticket")
/* == UI - Event Listeners == */

signOutButtonEl.addEventListener("click", authSignOut)

signInButtonEl.addEventListener("click", authSignInWithEmail)
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail)
createTicket.addEventListener("click", showTicketPage)
exitTicket.addEventListener("click", hideTicketPage)
/* === Main Code === */
onAuthStateChanged(auth, (user) => {
    if (user) {
        showLoggedInView()
    } else {
        showLoggedOutView()
    }
})
/* === Functions === */

function createTic() {
    console.log("test")
}

/* = Functions - Firebase - Authentication = */

function authSignInWithEmail() {
    console.log("Sign in with email and password")

    const email = emailInputEl.value
    const password = passwordInputEl.value
    
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    const user = userCredential.user;
    showLoggedInView()
    
    })
    .catch((error) => {
    console.error(error.message)
    });
}

function authCreateAccountWithEmail() {
    console.log("Sign up with email and password")
    
    const email = emailInputEl.value
    const password = passwordInputEl.value

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        showLoggedInView()
    })
    .catch((error) => {
        console.error(error.message)
    });

}

function authSignOut() {
    const auth = getAuth();
    signOut(auth)
    .then(() => {
        showLoggedOutView()
    })
    .catch((error) => {
        console.error(error.message)
    });
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        showLoggedInView()
        showProfilePicture(userProfilePictureEl, user)
        showUserGreeting(userGreetingEl, user)
    } else {
        showLoggedOutView()
    }
});

function showProfilePicture(imgElement, user) {
    if (user != null) {
        if (user.photoURL != null){
            imgElement.src = user.photoURL
        } else {
            imgElement.src = "defaultPic.jpg"
        }
    }

}

function showUserGreeting(element, user) {
    if (user != null) {
        if (user.display != null) { 
            element.textContent = "Hi " + user.display
        } else {
            element.textContent = "Hello, hope you are doing well"
        }
    }
}

/* == Functions - UI Functions == */

function showLoggedOutView() {
    hideView(viewLoggedIn)
    showView(viewLoggedOut)
    hideView(viewCreateTicPage)
}
 
function showLoggedInView() {
    hideView(viewLoggedOut)
    showView(viewLoggedIn)
    hideView(viewCreateTicPage)
}

function showTicketPage() {
    hideView(viewLoggedIn)
    showView(viewCreateTicPage)
}

function hideTicketPage() {
    hideView(viewCreateTicPage)
    showView(viewLoggedIn)
}
 
function showView(view) {
    view.style.display = "flex"
}
 
function hideView(view) {
    view.style.display = "none"
}

