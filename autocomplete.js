const resultList = document.getElementById("result-list");
const inputBox = document.getElementById("input-box");
const selectedBox = document.querySelector(".selected-box .selected");

const selectedValues = [];
const submitButton = document.getElementById("submit-btn");
const firebaseConfig = {
  apiKey: "AIzaSyDlxm5uR-LQkJEJVNxE8yLHqJCDgYJeZI8",
  authDomain: "csi3104.firebaseapp.com",
  databaseURL: "https://csi3104-default-rtdb.firebaseio.com",
  projectId: "csi3104",
  storageBucket: "csi3104.appspot.com",
  messagingSenderId: "584071960033",
  appId: "1:584071960033:web:15bd866289828250ddaea0",
  measurementId: "G-22LQCR8318",
};

var symptoms = [];
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const db = firebase.database();
dbRef = db.ref("Symptoms");
dbRef.on("value", function (snapshot) {
  symptoms = Object.keys(snapshot.val());
  displayResults(symptoms);
});

document.addEventListener("DOMContentLoaded", function () {
    const resultList = document.getElementById("result-list");
    const inputBox = document.getElementById("input-box");
    const selectedBox = document.querySelector(".selected-box .selected");

    const selectedValues = [];
    const submitButton = document.getElementById("submit-btn");

    displayResults(symptoms);

    submitButton.addEventListener("click", function () {
      // Loop through all selected symptoms and push them to the selectedValues array
      const selectedSymptoms = selectedBox.querySelectorAll("div");
      selectedSymptoms.forEach((symptomElement) => {
        const symptom = symptomElement.textContent.replace(",", "").trim();
        selectedValues.push(symptom);
      });

      // Do something with the selectedValues array
      localStorage.setItem('symptoms', selectedValues);
      window.location.href = "result.html";
    });

    inputBox.addEventListener("input", function () {
      let input = inputBox.value.toLowerCase();
      let filteredSymptoms = symptoms.filter((symptom) => {
        return symptom.toLowerCase().startsWith(input);
      });

      displayResults(filteredSymptoms);
    });
  }
);

function displayResults(results) {
  const resultList = document.getElementById("result-list");
  let listItems = "";
  console.log(results);
  if (results.length > 0) {
    listItems = results
      .map((result) => {
        return `<li>${result}</li>`;
      })
      .join("");
  } else {
    listItems = "<li>No matching results found.</li>";
  }

  resultList.innerHTML = listItems;

  const resultItems = resultList.querySelectorAll("li");
  resultItems.forEach((item) => {
    item.addEventListener("click", function () {
      const selectedSymptom = item.textContent;
      addToSelectedBox(selectedSymptom);
    });
  });
}
function addToSelectedBox(symptom) {
  const resultList = document.getElementById("result-list");
  const inputBox = document.getElementById("input-box");
  const selectedBox = document.querySelector(".selected-box .selected");

  const selectedValues = [];
  const submitButton = document.getElementById("submit-btn");

  const symptomElement = document.createElement("div");
  symptomElement.textContent = symptom;
  selectedBox.appendChild(symptomElement);

  const selectedSymptoms = selectedBox.querySelectorAll("div");
  const lastSymptom = selectedSymptoms[selectedSymptoms.length - 1];
  lastSymptom.textContent = lastSymptom.textContent + ",";
}
