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
  if (snapshot.exists()) {
    let endorsementsArray = Object.entries(snapshot.val());

    clearEndorsementsEl();

    for (let i = 0; i < endorsementsArray.length; i++) {
      let currentEndorsement = endorsementsArray[i];
      let currentEndorsementID = currentEndorsement[0];
      let currentEndorsementValue = currentEndorsement[1];

      appendEndorsementsList(currentEndorsement);
    }
  } else {
    endorsementsListsEL.innerHTML = `<li>No endorsements yet</li>`;
  }
});

function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function clearEndorsementsEl() {
  endorsementsListsEL.innerHTML = "";
}

function appendEndorsementsList(endorsement) {
  let currentEndorsementID = endorsement[0];
  let currentEndorsementValue = endorsement[1];

  let endorsementEl = document.createElement("li");
  endorsementEl.textContent = currentEndorsementValue;

  let endorsementsListsEL = document.getElementById("comments"); // replace 'your-ul-id' with the actual ID of your ul element
  endorsementsListsEL.appendChild(endorsementEl);

  endorsementEl.addEventListener("click", function () {
    let exactLoactionInDB = ref(db, `Endorsements/${currentEndorsementID}`);
    remove(exactLoactionInDB);
  });
}
