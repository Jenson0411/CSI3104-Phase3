const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set, onValue } = require("firebase/database");
const firebaseConfig = {
  apiKey: "AIzaSyDlxm5uR-LQkJEJVNxE8yLHqJCDgYJeZI8",
  authDomain: "csi3104.firebaseapp.com",
  databaseURL: "https://csi3104-default-rtdb.firebaseio.com",
  projectId: "csi3104",
  storageBucket: "csi3104.appspot.com",
  messagingSenderId: "584071960033",
  appId: "1:584071960033:web:15bd866289828250ddaea0",
  measurementId: "G-22LQCR8318"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);


let symtoms = ["Cough", "Fatigue", "Headaches"];
let illness = ["Covid-19"];

//Get the data
var dbRef;

let symptoms = ["Cough", "Fatigue", "Headaches", "Discharge running out of ear"];
let illnesses = ["Covid-19", "Flu", "Ear Infection", "Stroke", "Concusssion"];


for (let j = 0; j < illnesses.length; j++) {
  let dbRef = ref(db, 'Ilnesses/' + illnesses[j]);
  onValue(dbRef, (snapshot) => {
    let commonSymptoms = Object.values(snapshot.val());
    let numMatching = 0;
    
    for (let i = 0; i < symptoms.length; i++) {
      if (commonSymptoms.includes(symptoms[i])) {
        numMatching += 1;
      }
    }
    console.log(`Common symptoms for ${illnesses[j]}: ${count}`);
  }, {
    onlyOnce: true,
  });  
}

