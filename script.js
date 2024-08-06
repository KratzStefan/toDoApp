// Diese Zeilen initialisieren den Zustand der Anwendung und laden den gespeicherten Zustand aus dem lokalen Speicher. Danach wird die renderTodos-Funktion aufgerufen, um die Aufgaben anzuzeigen.

let state = {
  todos: [],
  filter: "all",
};

loadState();
renderTodos();

/*Diese Zeilen fügen Event-Listener für die verschiedenen Interaktionen in der Anwendung hinzu:

addButton: Wenn der Button geklickt wird, wird die addTodo-Funktion aufgerufen.
todoInput: Wenn die Eingabetaste im Eingabefeld gedrückt wird, wird ebenfalls die addTodo-Funktion aufgerufen.
Filter-Radio-Buttons: Wenn ein Radio-Button geändert wird, wird der Filter im Zustand aktualisiert und die Aufgabenliste neu gerendert.
removeDoneButton: Wenn der Button geklickt wird, werden alle erledigten Aufgaben entfernt.*/

document.getElementById("addButton").addEventListener("click", addTodo);
document.getElementById("todoInput").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTodo();
  }
});

document.getElementsByName("filter").forEach((radio) => {
  radio.addEventListener("change", (event) => {
    state.filter = event.target.value;
    saveState();
    renderTodos();
  });
});

document
  .getElementById("removeDoneButton")
  .addEventListener("click", removeDoneTodos);

/*Diese Funktion fügt eine neue Aufgabe zur Liste hinzu:

Die Beschreibung der Aufgabe wird aus dem Eingabefeld gelesen und getrimmt.
Falls die Beschreibung leer ist oder bereits eine Aufgabe mit derselben Beschreibung existiert, wird die Funktion beendet.
Eine neue Aufgabe wird erstellt und zur todos-Liste hinzugefügt.
Der Zustand wird gespeichert und die Aufgabenliste neu gerendert.
Das Eingabefeld wird geleert.*/

function addTodo() {
  const input = document.getElementById("todoInput");
  const description = input.value.trim();

  if (
    !description ||
    state.todos.some(
      (todo) => todo.description.toLowerCase() === description.toLowerCase()
    )
  ) {
    return;
  }

  const newTodo = {
    id: Date.now().toString(),
    description: description,
    done: false,
  };

  state.todos.push(newTodo);
  saveState();
  renderTodos();
  input.value = "";
}

/*Diese Funktion zeigt die Aufgaben basierend auf dem aktuellen Filter an:

Die todoList-Elemente werden geleert.
Die Aufgaben werden basierend auf dem aktuellen Filter gefiltert.
Für jede gefilterte Aufgabe wird ein Listenelement (li) erstellt:
Ein Checkbox-Element wird hinzugefügt, um den Erledigt-Status zu ändern.
Ein Text-Element wird hinzugefügt, um die Beschreibung der Aufgabe anzuzeigen.
Das Listenelement wird der todoList hinzugefügt.*/

function renderTodos() {
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";

  let filteredTodos = state.todos;
  if (state.filter === "open") {
    filteredTodos = state.todos.filter((todo) => !todo.done);
  } else if (state.filter === "done") {
    filteredTodos = state.todos.filter((todo) => todo.done);
  }

  filteredTodos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = todo.done ? "done" : "";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.addEventListener("change", () => {
      todo.done = checkbox.checked;
      saveState();
      renderTodos();
    });

    const text = document.createElement("span");
    text.textContent = todo.description;

    li.appendChild(checkbox);
    li.appendChild(text);
    todoList.appendChild(li);
  });
}

/*Diese Funktion entfernt alle erledigten Aufgaben aus der Liste:

Die todos-Liste wird gefiltert, um nur nicht erledigte Aufgaben zu behalten.
Der Zustand wird gespeichert und die Aufgabenliste neu gerendert.*/

function removeDoneTodos() {
  state.todos = state.todos.filter((todo) => !todo.done);
  saveState();
  renderTodos();
}
/* Diese Funktion speichert den aktuellen Zustand der Anwendung im lokalen Speicher:

Der Zustand wird in einen JSON-String umgewandelt und unter dem Schlüssel todoAppState im lokalen Speicher gespeichert.*/
function saveState() {
  localStorage.setItem("todoAppState", JSON.stringify(state));
}

/*Diese Funktion lädt den Zustand der Anwendung aus dem lokalen Speicher:

Der gespeicherte Zustand wird aus dem lokalen Speicher gelesen und geparst.
Falls kein gespeicherter Zustand vorhanden ist, wird eine Standardaufgabe hinzugefügt und der Zustand gespeichert.
Diese Funktionen zusammen ermöglichen die Funktionalität der Todo-App mit den beschriebenen Features und sorgen dafür, dass der Zustand der App auch nach einem Neuladen der Seite erhalten bleibt.*/

function loadState() {
  const savedState = localStorage.getItem("todoAppState");
  if (savedState) {
    state = JSON.parse(savedState);
  } else {
    state.todos.push({
      id: "1",
      description: "Default Todo",
      done: false,
    });
    saveState();
  }
}
