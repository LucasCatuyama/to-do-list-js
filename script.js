const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos")) || [];

if (todos.length > 0) {
  todos.forEach((todo) => {
    add(todo);
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  add();
});

function add(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const li = document.createElement("li");
    li.innerText = todoText;
    li.classList.add("listItem");

    li.addEventListener("contextmenu", function (event) {
      event.preventDefault();
      li.remove();
      saveData();
    });

    li.addEventListener("click", function() {
        li.classList.toggle("textDecoration");
        saveData();
    })

    if (todo && todo.completed) {
        li.classList.add("textDecoration");
    }

    ul.appendChild(li);
    input.value = "";
    saveData();
  }
}

function saveData() {
  const lists = document.querySelectorAll("li");
  let todos = [];
  lists.forEach((list) => {
    let todo = {
        text: list.innerText,
        completed: list.classList.contains("textDecoration")
    };

    todos.push(todo);
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
