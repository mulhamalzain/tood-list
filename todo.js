const title = document.querySelector('.title');
//title.innerHTML = '<span>Todo</span>'; you can inject html by js and that is not recommended 
// so we use textContent 
let todos = JSON.parse(localStorage.getItem("todos")) || [];

const container = document.querySelector(".container");
console.log("container:", container);
const ul = document.createElement("ul");
container.appendChild(ul);
title.textContent = 'Todo List';
console.log('title:', title);

const counter = document.getElementById("todo-count");
const searchInput = document.getElementById("search");


function renderTodos(filter = "") {
  ul.innerHTML = "";
  todos
    .filter(todo => todo.text.toLowerCase().includes(filter.toLowerCase()))
    .forEach((todo) => {
      const newTodo = document.createElement("li");
      newTodo.classList.add("todo-item");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.completed;

      checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;
        localStorage.setItem("todos", JSON.stringify(todos));
      });

      const label = document.createElement("label");
      label.textContent = todo.text;

      const deleting = document.createElement("button");
      deleting.textContent = "Delete";
      deleting.classList.add("delete-btn");
      deleting.addEventListener("click", () => {
        const index = todos.findIndex(t => t.text === label.textContent);
        if (index !== -1) {
          todos.splice(index, 1);
          localStorage.setItem("todos", JSON.stringify(todos));
          renderTodos(searchInput.value);
        }
      });

      const editing = document.createElement("button");
      editing.textContent = "Edit";
      editing.classList.add("edit-btn");
      editing.addEventListener("click", () => {
        const newText = prompt("Edit todo:", label.textContent);
        if (newText) {
          const index = todos.findIndex(t => t.text === label.textContent);
          if (index !== -1) {
            todos[index].text = newText;
            localStorage.setItem("todos", JSON.stringify(todos));
            renderTodos(searchInput.value);
          }
        }
      });

      
      const buttonsContainer = document.createElement("div");
      buttonsContainer.appendChild(deleting);
      buttonsContainer.appendChild(editing);

      newTodo.appendChild(checkbox);
      newTodo.appendChild(label);
      newTodo.appendChild(document.createElement("br"));
      newTodo.appendChild(buttonsContainer);
      ul.appendChild(newTodo);
    });

  counter.textContent = todos.length;
}

const form = document.querySelector(".todo-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.querySelector(".todo-input");
  const text = input.value.trim();
  if (text) {
    todos.push({ text: text, completed: false });
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos(searchInput.value);
    input.value = "";
  }
});

searchInput.addEventListener("input", () => {
  renderTodos(searchInput.value);
});

renderTodos();
