// seleção

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#todo-form");
const editInput = document.querySelector("#todo-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

// funções

function saveTodo(text) {
// criação da estrutura html do template de nota


// criação da div
const todo = document.createElement("div")
// adição da classe todo
todo.classList.add("todo")
// criação do h3(titulo) da tarefa
const h3 = document.createElement("h3")
// inserção do text de input para o h3
h3.innerText = text
// inserção do h3 na div
todo.appendChild(h3)


// criação dos botões
const donebtn = document.createElement("button")
// adição da classe
donebtn.classList.add("finish-todo")
// adição do icone e da classe dele
donebtn.innerHTML = '<i class="fa-solid fa-check"></i>'

// botão de edit

const editbtn = document.createElement("button")
// adição da classe
editbtn.classList.add("edit-todo")
// adição do icone e da classe dele
editbtn.innerHTML = '<i class="fa-solid fa-pen"></i>'


const removebtn = document.createElement("button")
// adição da classe
removebtn.classList.add("remove-todo")
// adição do icone e da classe dele
removebtn.innerHTML = '<i class="fa-solid fa-x"></i>'

// adição dos btns
todo.appendChild(donebtn)
todo.appendChild(editbtn)
todo.appendChild(removebtn)

// append de todo na div
todoList.appendChild(todo)
// reset do input
todoInput.value = ""
todoInput.focus();

}





// event listeners



// event listener de submit para criar tarefa que contem uma validação do valor de input e dispara a função de saveTodo() com o valor do inpuValue de adicionar tarefa

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = todoInput.value
    if(inputValue){
        

        saveTodo(inputValue);


    }
});
