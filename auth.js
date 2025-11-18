// Firebase Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut }
from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import { getFirestore, doc, getDoc }
from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Config dari Firebase kamu
const firebaseConfig = {
    apiKey: "AIzaSyBZ_7yMUsfTM-ldDdFal4KU-bLH5QydHwo",
    authDomain: "royalty-ca9fe.firebaseapp.com",
    projectId: "royalty-ca9fe",
    storageBucket: "royalty-ca9fe.firebasestorage.app",
    messagingSenderId: "458176607676",
    appId: "1:458176607676:web:59e789a591b69e6582a7b9"
};

// Start Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function LOGIN
window.login = function () {
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;
    let err = document.getElementById("error");

    signInWithEmailAndPassword(auth, email, pass)
    .then(() => {
        location.href = "dashboard.html";
    })
    .catch((e) => {
        err.innerHTML = "Error: " + e.message;
    });
}

// AUTO LOGIN CHECK
onAuthStateChanged(auth, async (user) => {
    if (user) {
        if (location.pathname.includes("dashboard.html")) {
            // Ambil data royalti dari Firestore
            const docRef = doc(db, "royalties", user.uid);
            const snap = await getDoc(docRef);

            if (snap.exists()) {
                document.getElementById("userEmail").innerHTML = user.email;
                document.getElementById("royaltyAmount").innerHTML = snap.data().amount;
            } else {
                document.getElementById("royaltyAmount").innerHTML = "$0.00";
            }
        }
    } else {
        if (location.pathname.includes("dashboard.html")) {
            location.href = "index.html";
        }
    }
});

// LOGOUT
window.logout = function () {
    signOut(auth).then(() => {
        location.href = "index.html";
    });
}
