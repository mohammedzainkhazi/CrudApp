var pname,pemail,pphone,prelation,user;
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCbVx5-zG6YVM5ta1od1RneGViglj7vZJ0",
    authDomain: "crudapp-2021.firebaseapp.com",
    databaseURL: "https://crudapp-2021-default-rtdb.firebaseio.com",
    projectId: "crudapp-2021",
    storageBucket: "crudapp-2021.appspot.com",
    messagingSenderId: "492735827121",
    appId: "1:492735827121:web:33427ade40fb34d6d02690",
    measurementId: "G-YJJMSMHQSJ"
  };
    firebase.initializeApp(firebaseConfig);
// Initialize Firebase
  function getReady(){
    user = firebase.auth().currentUser.uid;
    pname = document.getElementById('pname').value;
    pemail = document.getElementById('pemail').value;
    pphone = document.getElementById('pphone').value;
    prelation = document.getElementById('prelation').value;
  }

function checkAuth(){
  user = firebase.auth().currentUser;
  if (user) {
    showDiv('operations');
  }
}



function showDiv(div){
    if(div == 'main'){
        document.getElementById('fullNav').style.display = 'block';
    }
    document.getElementById('home').style.display = 'none';
    data = document.getElementById(div).innerHTML;
    document.getElementById('main').innerHTML = data;
}

function showOperation(div){
    document.getElementById('create').style.display = 'none';
    data = document.getElementById(div).innerHTML;
    document.getElementById('showOperation').innerHTML = data;
    selectData();
}

  function login(){
    document.getElementById('loginButton').disabled = true;
    var userEmail = document.getElementById("loginEmail").value;
    var userPass = document.getElementById("loginPass").value;
  
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        alert('Signed In as '+user.displayName);
        showDiv('operations');
        document.getElementById('fullNav').style.display = 'block';
        document.getElementById('logoutBtn').style.display = 'block';
        selectData();
        // ...
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        document.getElementById('loginButton').disabled = false;
    });
  }

  function logout(){
    firebase.auth().signOut();
    document.getElementById('fullNav').style.display='none';
    document.getElementById('logoutBtn').style.display='none';
    showDiv('home');
  }


function checkAndCreate(){
    username = document.getElementById('uname').value;
    email = document.getElementById('signEmail').value;
    pass = document.getElementById('signPass').value;
    pass2 = document.getElementById('signPass2').value;
    if(pass == pass2){
        signUp(email, pass, username);
        return true;
    }
    else{
        alert('Passwords not Matching !');
        return false;
    }
}

function signUp(email,password,username) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;

    user.updateProfile({
      displayName: username,
    }).then(() => {
        alert('Signed In As '+user.displayName);
        showDiv('operations');
        document.getElementById('logoutBtn').style.display = 'block';
        document.getElementById('fullNav').style.display = 'block';
        selectData();
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });  
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
    // ..
  });
}

function reset(){
    resetEmail = document.getElementById('forgotEmail').value;
    firebase.auth().sendPasswordResetEmail(resetEmail)
  .then(() => {
    // Password reset email sent!
    alert('Check your Mail to reset Password');
    // ..
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
    alert(errorMessage);
  });
}

function selectData(){
    user = firebase.auth().currentUser.uid;
        document.getElementById('displayPeopleView').innerHTML = '';
        firebase.database().ref('users/'+user).once('value',
         function(allData){
            allData.forEach(
            function(phone){
                var html = "";
                html +="<tr>";
                html +='<td class="px-4 py-3">'; html +=phone.val().name+'</td>' ;
                html +='<td class="px-4 py-3">'; html +=phone.val().phone+'</td>' ;
                html +='<td class="px-4 py-3">'; html +=phone.val().email+'</td>' ;
                html +='<td class="px-4 py-3">'; html +=phone.val().relation+'</td>' ;
                html +="</tr>";
                document.getElementById("displayPeopleView").innerHTML += html;
            });
      });
 }


   function createPeople(){
    getReady();
    var user = firebase.auth().currentUser.uid;
    //var message = document.getElementById("message").value;
    var ref = firebase.database().ref('users/'+user+'/'+pphone).set({
      name:pname,
      email:pemail,
      phone:pphone,
      relation:prelation
    });
    alert('Data Added');
    selectData();
  }

function getPeople(){
  var updphone = document.getElementById('uphone').value;
   user = firebase.auth().currentUser.uid;
        firebase.database().ref('users/'+user+'/'+updphone).on('value',function(snapshot){
        document.getElementById('upname').value = snapshot.val().name;
        document.getElementById('upemail').value = snapshot.val().email;
        document.getElementById('uprelation').value = snapshot.val().relation;
        console.log('Getting Data!');
  });
}


function updatePeople(){
    var updphone = document.getElementById('uphone').value;
    var user = firebase.auth().currentUser.uid;
    var pname = document.getElementById('upname').value;
    var pemail = document.getElementById('upemail').value;
    var prelation = document.getElementById('uprelation').value;
    var ref = firebase.database().ref('users/'+user+'/'+updphone).update({
      name:pname,
      email:pemail,
      relation:prelation
    });
    alert('Data Updated');
    selectData();
  }

function deletePeople(){
    var phone = document.getElementById('delphone').value;
    user = firebase.auth().currentUser.uid;
    firebase.database().ref('users/'+user+'/'+phone).remove();
    alert('Data Deleted !');
    selectData();
}



function contact(){
  var name = document.getElementById('cname').value;
  var email = document.getElementById('cemail').value;
  var msg = document.getElementById('cmessage').value;
  var user = firebase.auth().currentUser.uid;
  var ref = firebase.database().ref('users/messages/'+user+'/').set({
    name:name,
    email:email,
    message:msg
  });
  alert('SUBMITTED !');
  selectData();
}

