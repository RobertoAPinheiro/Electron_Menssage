
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

// Get a reference to the database service
var database = firebase.database();
var userId;
var userEmail;
var first_name;

var finishRegistration = document.getElementById('btn_finish_registration');

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        checkUserData();
    } else {
        document.location.href = 'login.html';
    }
});

function checkUserData() {

    userId = firebase.auth().currentUser.uid;
    userEmail = firebase.auth().currentUser.email;

    return firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
        first_name = (snapshot.val() && snapshot.val().first_name);

        if (first_name == null) {
            var show_modal = document.getElementById('modal_registration');
            show_modal.style.display = "block";

        }
    })
}

var reg_modal = new Vue({
    el: '#modal_registration',
    data: {
        exists: true,
        user_register: {
            username: '',
            first_name: '',
            last_name: '',
            birthday: '',
            phone: ''
        }
    },
    methods: {
        finishRegistration: function () {
            writeUserData(userId, userEmail, this.user_register.first_name, this.user_register.last_name, this.user_register.birthday, this.user_register.phone);
        }
    }
})

function writeUserData(userId, userEmail, first_name, last_name, birthday, phone) {
    firebase.database().ref('users/' + userId).set({
        id: userId,
        email: userEmail,
        first_name: first_name,
        last_name: last_name,
        birthday: birthday,
        phone: phone
    });

    firebase.database().ref('find_users_email/' + userEmail).set({
        id: userId
    });
}