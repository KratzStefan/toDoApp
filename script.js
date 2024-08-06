/*
const datenVomUser = {
  Aufgaben: [
    { description: "Learn javaScript", done: false },
    { description: "Learn HTML", done: false },
    { description: "Learn CSS", done: false },
  ],
};
*/
// Textfeld / addButton / Localstorage

document.getElementById("addButton").addEventListener("click", function () {
  const inputValue = document.getElementById("todoInput").value;

  if (inputValue) {
    const key = localStorage.length;

    // Daten im localStorage speichern
    localStorage.setItem(key, inputValue);
  }
});

// Erledigte Aufgaben löschen
document
  .getElementById("removeDoneButton")
  .addEventListener("click", function () {
    localStorage.clear();
  });
