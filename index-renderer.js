
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

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log('User In');
        checkUserData();
    } else {
        document.location.href = 'login.html';
    }
});

function checkUserData(){

    var userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      var username = (snapshot.val() && snapshot.val().username);
    
      if(username == null){
          console.log('null');
          var modal = document.getElementById('myModal');
          modal.style.display = "block";

      }
    })
}
