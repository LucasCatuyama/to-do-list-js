const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos")) || [];

// Adiciona todos os itens salvos no localStorage ao carregar a página
if (todos.length > 0) {
  todos.forEach((todo) => addTodoItem(todo));
}

// Adiciona um evento ao formulário para adicionar um novo item quando submetido
form.addEventListener("submit", function (event) {
  event.preventDefault();
  addTodoItem();
});

function addTodoItem(todo) {
  let todoText = todo ? todo.text : input.value;

  if (todoText) {
    const li = createTodoElement(todoText, todo && todo.completed);
    ul.appendChild(li);
    input.value = "";
    saveTodos();
  }
}

function createTodoElement(text, completed = false) {
  const li = document.createElement("li");
  li.innerText = text;
  li.classList.add("listItem");

  // Adiciona eventos de clique e menu de contexto ao item da lista
  li.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    li.remove();
    saveTodos();
  });

  li.addEventListener("click", function () {
    li.classList.toggle("textDecoration");
    saveTodos();
  });

  if (completed) {
    li.classList.add("textDecoration");
  }

  return li;
}

function saveTodos() {
  const listItems = document.querySelectorAll("li");
  const todos = Array.from(listItems).map((listItem) => ({
    text: listItem.innerText,
    completed: listItem.classList.contains("textDecoration"),
  }));

  localStorage.setItem("todos", JSON.stringify(todos));
}
