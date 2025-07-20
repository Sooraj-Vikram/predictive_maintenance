const firebaseConfig = {
    apiKey: "AIzaSyCZdPNeOyjsW9qjKrDLabWSCwFBg-b5NxA",
    authDomain: "predictive-maintenance-ee697.firebaseapp.com",
    databaseURL: "https://predictive-maintenance-ee697-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "predictive-maintenance-ee697",
    storageBucket: "predictive-maintenance-ee697.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdefghijklm",
  };
  
  // 🔹 Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const database = firebase.getDatabase(app);