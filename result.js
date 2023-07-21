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
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();
let symptoms = localStorage.getItem("symptoms");
var illnesses = [];

console.log(symptoms);
function start(){
    dbRef = db.ref('Illnesses');
    dbRef.on('value', function(snapshot){
        illnesses = Object.keys(snapshot.val());
        getTable();
    });
}


function getTable() {
    let tableBody = document.getElementById("tableBody");
    let rank = 1;
    let count = 0
    let rows = [];
    for(let i = 0; i<illnesses.length; i++){
    
        let dbRef = db.ref('Illnesses/'+illnesses[i]);
        dbRef.on('value', function(snapshot){
            let commonSymptoms = Object.values(snapshot.val());
            let numMatching = 0;
            let matchingSymptoms = [];
            let notMatchingSymtoms = [];
            for(let j = 0; j<commonSymptoms.length; j++){
                if(symptoms.includes(commonSymptoms[j])){
                    numMatching+=1;
                    matchingSymptoms.push(commonSymptoms[j]);
                }
                else{
                    notMatchingSymtoms.push(commonSymptoms[j])
                }
            }
            rows.push([illnesses[i], numMatching, matchingSymptoms, notMatchingSymtoms]); 
            if(i == illnesses.length-1){
                rows.sort((a, b) => b[1] - a[1]);
                for(let k = 0; k< rows.length; k++){
                    if(rows[k][1]>0){
                        let newRow = tableBody.insertRow();
                        let rankCell = newRow.insertCell(0);
                        let illnessCell = newRow.insertCell(1);
                        let numCell = newRow.insertCell(2);
                        let listCell = newRow.insertCell(3);
                        let nonlistCell = newRow.insertCell(4);

                        // Set the values for the new row
                        rankCell.innerHTML = k+1;
                        illnessCell.innerHTML = rows[k][0];
                        numCell.innerHTML = rows[k][1];
                        listCell.innerHTML = rows[k][2];  
                        nonlistCell.innerHTML = rows[k][3];    
                    }                          
                }
            }    
        });
    }  

    const submitButton = document.getElementById("appointmentBtn").addEventListener("click", function (){
        window.location.href = "booking.html";
        localStorage.removeItem("symptoms");
    })

      
}