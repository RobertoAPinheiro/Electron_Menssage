// Initialize Firebase
var config = {
    apiKey: "AIzaSyDjDujXGnErtbxRHW6m-vbAo3GG4np9vAo",
    authDomain: "electron-teste.firebaseapp.com",
    databaseURL: "https://electron-teste.firebaseio.com",
    projectId: "electron-teste",
    storageBucket: "electron-teste.appspot.com",
    messagingSenderId: "906011641914"
};
firebase.initializeApp(config);

var signUpBtn = document.getElementById('sign_up_btn');
var signInBtn = document.getElementById('sign_in_btn');

signUpBtn.addEventListener('click', function () {
    var emailField = document.getElementById('email_imput').value;
    var passwordField = document.getElementById('password_imput').value;

    firebase.auth().createUserWithEmailAndPassword(emailField, passwordField).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        if (error != null) {
            alert(errorMessage);
            return;
        }
    });
});

signInBtn.addEventListener('click', function () {
    var emailField = document.getElementById('email_imput').value;
    var passwordField = document.getElementById('password_imput').value;

    firebase.auth().signInWithEmailAndPassword(emailField, passwordField).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        if (error != null) {
            alert(errorMessage);
            return;
        }
    });
});

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log('User In');
        document.location.href = 'index.html';
    } else {
        // No user is signed in.
    }
});
