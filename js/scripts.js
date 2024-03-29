// seleção

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

let oldInput;
// funções

function saveTodo(text, done = 0, save = 1) {
  // criação da estrutura html do template de nota

  // criação da div
  const todo = document.createElement("div");
  // adição da classe todo
  todo.classList.add("todo");
  // criação do h3(titulo) da tarefa
  const h3 = document.createElement("h3");
  // inserção do text de input para o h3
  h3.innerText = text;
  // inserção do h3 na div
  todo.appendChild(h3);

  // criação dos botões
  const donebtn = document.createElement("button");
  // adição da classe
  donebtn.classList.add("finish-todo");
  // adição do icone e da classe dele
  donebtn.innerHTML = '<i class="fa-solid fa-check"></i>';

  // botão de edit

  const editbtn = document.createElement("button");
  // adição da classe
  editbtn.classList.add("edit-todo");
  // adição do icone e da classe dele
  editbtn.innerHTML = '<i class="fa-solid fa-pen"></i>';

  const removebtn = document.createElement("button");
  // adição da classe
  removebtn.classList.add("remove-todo");
  // adição do icone e da classe dele
  removebtn.innerHTML = '<i class="fa-solid fa-x"></i>';

  // adição dos btns
  todo.appendChild(donebtn);
  todo.appendChild(editbtn);
  todo.appendChild(removebtn);

  // local storage

  if (done) {
    todo.classList.add("done");
  }

  if (save) {
    saveTodoLocalStorage({ text, done });
  }

  // append de todo na div
  todoList.appendChild(todo);
  // reset do input
  todoInput.value = "";
  todoInput.focus();
}

function toggleforms() {
  // alternancia de classes
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
}

function updateTodo(text) {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3");

    if (todoTitle.innerText === oldInput) {
      todoTitle.innerText = text;

      updateTodoLocalStorage(oldInput, text);
    }
  });
}

function getSearchTodos(search) {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3").innerText.toLowerCase();

    const normalSearch = search.toLowerCase();

    todo.style.display = "flex";

    if (!todoTitle.includes(normalSearch)) {
      todo.style.display = "none";
    }
  });
}

function filterTodos(filterValue) {
  const todos = document.querySelectorAll(".todo");

  switch (filterValue) {
    case "all":
      todos.forEach((todo) => (todo.style.display = "flex"));
      break;

    case "done":
      todos.forEach((todo) =>
        todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none")
      );
      break;

    case "todo":
      todos.forEach((todo) =>
        !todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none")
      );
      break;

    default:
      break;
  }
}

// event listeners

// event listener de submit para criar tarefa que contem uma validação do valor de input e dispara a função de saveTodo() com o valor do inpuValue de adicionar tarefa

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = todoInput.value;
  if (inputValue) {
    saveTodo(inputValue);
  }
});

// event listener do documeto todo

document.addEventListener("click", (e) => {
  // valor do evento (onde foi o click)
  const tar = e.target;
  //   elemento div pai de tar
  const pai = tar.closest("div");
  // "lembrança" do titulo da nota
  let todoTitle;

  // saber se o elemento é o certo
  if (pai && pai.querySelector("h3"))
    todoTitle = pai.querySelector("h3").innerText;

  //validação para saber se onde foi o click contem a classe
  if (tar.classList.contains("finish-todo")) {
    // aternancia da classe
    pai.classList.toggle("done");
    updateTodoStatusLocalStorage(todoTitle)
  }

  if (tar.classList.contains("remove-todo")) {
    // delete da div

    pai.remove();
    removeTodoLocalStorage(todoTitle);
  }

  if (tar.classList.contains("edit-todo")) {
    // chamada da função
    toggleforms();

    editInput.value = todoTitle;
    oldInput = todoTitle;
  }
});
// escuta de eventos do btn de cancel
cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleforms();
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;

  if (editInputValue) {
    // atualização
    updateTodo(editInputValue);
  }

  toggleforms();
});

searchInput.addEventListener("keyup", (e) => {
  const search = e.target.value;

  getSearchTodos(search);
});

eraseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  searchInput.value = "";
  searchInput.dispatchEvent(new Event("keyup"));
});

filterBtn.addEventListener("change", (e) => {
  const filterValue = e.target.value;

  filterTodos(filterValue);
});

const getTodosLocalStorage = () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  return todos;
};

const loadTodos = () => {
  const todo = getTodosLocalStorage();
  todo.forEach((todo) => {
    saveTodo(todo.text, todo.done, 0);
  });
};

const saveTodoLocalStorage = (todo) => {
  const todos = getTodosLocalStorage();

  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));
};

const removeTodoLocalStorage = (todoText) => {
  const todos = getTodosLocalStorage();

  const filteredTodos = todos.filter((todo) => todo.text !== todoText);

  localStorage.setItem("todos", JSON.stringify(filteredTodos));
};

const  updateTodoStatusLocalStorage=(todoText)=> {

  const todos = getTodosLocalStorage();

 todos.map((todo) => todo.text === todoText ? todo.done = !todo.done : null);

  localStorage.setItem("todos", JSON.stringify(todos));


}


const  updateTodoLocalStorage = (todoOldText, todoNewText)=> {

  const todos = getTodosLocalStorage();

 todos.map((todo) => 
 todo.text === todoOldText ? (todo.text = todoNewText) : null);

  localStorage.setItem("todos", JSON.stringify(todos));


}

loadTodos();
