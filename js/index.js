const inputBox = document.getElementById("entrada");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

console.log(inputBox.value);

inputBox.onkeyup = () => {
  let userData = inputBox.value; //Pega o valor da entrada do usuário
  if(userData.trim() != 0) { // se os valores do usuários não forem apenas espaços
    addBtn.classList.add('active');
  }else{
    addBtn.classList.remove('active');
  }
}

showTasks() //chamando a função showTasks

// se o usuário clicar no botão de adicionar
addBtn.onclick = () => {
  let userData = inputBox.value; //Pega o valor da entrada do usuário
  let getLocalStorage = localStorage.getItem("New Todo"); //Pegando o armazenamento local
  if(getLocalStorage == null) { //se o armazenamento local for nulo
    listArr = []; // vamos criar um array em branco
  }else{
    listArr = JSON.parse(getLocalStorage)
  }
  listArr.push(userData); //empurrando ou adicionando dados do usuário
  localStorage.setItem("New Todo", JSON.stringify(listArr)); //transformando um objeto js em uma fragmento json
  showTasks() //chamando a função showTasks
}

// função para adicionar tarefas dentro da lista
function showTasks() {
  let getLocalStorage = localStorage.getItem("New Todo"); //Pegando o armazenamento local
  if(getLocalStorage == null) { //se o armazenamento local for nulo
    listArr = []; // vamos criar um array em branco
  }else{
    listArr = JSON.parse(getLocalStorage)
  }
  const pendingNum = document.querySelector('.pendingNum');
  pendingNum.textContent = listArr.length; // passando o valor do tamanho do array para o pendingNum
  if (listArr.length > 0) { //se o tamanho do array for maior que 0
    deleteAllBtn.classList.add('active'); //ativa a classe
  }else{
    deleteAllBtn.classList.remove('active'); //desativa a classe
  }
  let newLiTag = '';
  addBtn.classList.remove('active');
  listArr.forEach((element, index) => {
    newLiTag += `<li>${element}<span onclick="deleteTask(${index})" ><i class="fa-solid fa-trash-can"></i></span></li>`; 
  });
  todoList.innerHTML = newLiTag; //adicionando uma nova li dentro da nossa lista
  inputBox.value = ''; // uma vez adicionada a tarefa deixe o campo de entrada em branco
}

// função para deletar tarefas
function deleteTask(index) {
  let getLocalStorage = localStorage.getItem("New Todo"); //Pegando o armazenamento local
  listArr = JSON.parse(getLocalStorage)
   listArr.splice(index, 1 ); //exclui ou remove um determinado item indexado
   //depois de remover o item autalize novamente o armazenamento local
  localStorage.setItem("New Todo", JSON.stringify(listArr)); //transformando um objeto js em uma fragmento json
  showTasks() //chamando a função showTasks
}

// deleta todas as tarefas

deleteAllBtn.onclick = () => {
  listArr = [];// array vazio
  //após deletar todas as tarefas atualizar novamente o armazenamento local
  localStorage.setItem("New Todo", JSON.stringify(listArr)); //transformando um objeto js em uma fragmento json
  showTasks() //chamando a função showTasks
}