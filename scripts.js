const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-tasks')


let minhaListaDeItens = []


function adicionarNovaTarefa() {
  const data = document.querySelector('.data').value
  const newData = data.replace(/(\d*)-(\d*)-(\d*).*/, '$3/$2/$1')


  if(input.value === ''){
    alertTask()
  }
  else if(newData === ''){
    alertData()
  }
  else{
    minhaListaDeItens.push({
      tarefa: input.value,
      myDate: newData,
      concluida: false,
    })
  }

  input.value = ''

  mostrarTarefas()

  function alertTask() {
    sweetAlert("Oops...", "Insira uma tarefa", "error")
  }
  
  function alertData() {
    sweetAlert("Oops...", "Insira uma data", "error")
  }
  
}

function mostrarTarefas() {
  let novaLi = ''

  // ['comprar café', 'estudar programação']

  minhaListaDeItens.forEach((item, posicao) => {
    novaLi +=
      `
        <li class="task ${item.concluida && 'done'}">
            <img src="./img/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})">
            <p>${item.tarefa} ..........  ${item.myDate}</p>
            <img src="./img/trash.png" alt="tarefa-para-o-lixo" onclick="deletarItem(${posicao})">
        </li>
        
        `
  })

  listaCompleta.innerHTML = novaLi

  localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))
}

function concluirTarefa(posicao) {
  minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida

  mostrarTarefas()
}

function deletarItem(posicao) {
  minhaListaDeItens.splice(posicao, 1)

  mostrarTarefas()
}

function recarregarTarefas() {
  const tarefasDoLocalStorage = localStorage.getItem('lista')

  if (tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
  }

  mostrarTarefas()
}


recarregarTarefas()

button.addEventListener('click', adicionarNovaTarefa)
