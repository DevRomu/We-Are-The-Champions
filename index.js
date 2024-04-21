import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const databaseURLKey = {
  databaseURL: "https://we-are-the-champion-app-default-rtdb.firebaseio.com/",
};

const app = initializeApp(databaseURLKey);
const db = getDatabase(app);
const endorsementsListDB = ref(db, "Endorsements");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("publish");
const endorsementsListsEL = document.getElementById("comments");

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;
  push(endorsementsListDB, inputValue);

  console.log(inputValue);

  clearInputFieldEl();
});

onValue(endorsementsListDB, function (snapshot) {
  let endorsementsArray = Object.values(snapshot.val());

  //   for (let i = 0; i < endorsementsArray.length; i++) {
  //     let currentEndorsement = endorsementsArray[i];
  //     let currentEndorsementID = currentEndorsement[0];
  //     let currentEndorsementValue = currentEndorsement[1];

  //     appendEndorsementsList(currentEndorsement);
  //   }

  clearEndorsementsEl();

  for (let i = 0; i < endorsementsArray.length; i++) {
    appendEndorsementsList(endorsementsArray[i]);
  }
});

function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function clearEndorsementsEl() {
  endorsementsListsEL.innerHTML = "";
}

function appendEndorsementsList(endorsements) {
  endorsementsListsEL.innerHTML += `<li>${endorsements}</li>`;
  //   let endorsementsListID = endorsements[0];
  //   let endorsementsListValue = endorsements[1];
  //   let endorsementsListEl = document.createElement("li");
  //   endorsementsListEl.textContent = endorsementsListValue;
  //   endorsementsListEl.addEventListener("click", function () {
  //     let extractionsListElInDB = ref(db, `Endorsements/${endorsementsListID}`);
  //     remove(extractionsListElInDB);
  //   });
  //   endorsementsListsEL.appendChild(endorsementsListEl);
}
