const form = document.querySelector("#to-do-form");
const input = document.querySelector("#to-do-input");
const lists = document.querySelector(".lists");

function generateUniqueId() {
  const randomStr = Math.random().toString(36).substr(2, 9);
  const timestamp = Date.now().toString(36);
  return `${randomStr}${timestamp}`;
}

const data = JSON.parse(localStorage.getItem('todos')) || [];

data.map(item => {
  lists.innerHTML += `<div class="list ${item.completed ? 'input_done' : ''}" data-id='${item.id}'>
    <div class="content">
      <input type="text" class="text" value="${item.text}" readonly />
    </div>

    <div class="actions">
      <button class="done">
        <i class="fa-regular fa-circle-check"></i>
      </button>
      <button class="trash"><i class="fa-solid fa-trash"></i></button>
    </div>
  </div>`
})

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inpValue = input.value.trim();

  if (!inpValue) {
    alert("Zəhmət olmasa doldurun");
    return;
  }

  const id = generateUniqueId();

  data.push({
    id: id,
    text: inpValue,
    completed: false,
  })

  localStorage.setItem('todos', JSON.stringify(data))

  lists.innerHTML += `<div class="list" data-id='${id}'>
    <div class="content">
      <input type="text" class="text" value="${inpValue}" readonly />
    </div>

    <div class="actions">
      <button class="done">
        <i class="fa-regular fa-circle-check"></i>
      </button>
      <button class="trash"><i class="fa-solid fa-trash"></i></button>
    </div>
  </div>`

  input.value = "";
  checkTodo()
  deleteTodo()
});

function checkTodo() {
  const done_el = document.querySelectorAll(".done");

  done_el.forEach(item => {
    item.addEventListener('click', (e) => {
      const element = e.target.parentElement.parentElement.parentElement.getAttribute('data-id');
      const todos = JSON.parse(localStorage.getItem('todos'))

      const newArr = todos.map(todo => {
        if (todo.id == element) {
          return {
            ...todo,
            completed: !todo.completed
          }
        } else {
          return todo
        }
      })

      localStorage.setItem('todos', JSON.stringify(newArr))

      const todo = item.parentElement.parentElement;
      if (todo.classList.contains('input_done')) {
        todo.classList.remove('input_done')
      } else {
        todo.classList.add('input_done')
      }
    })
  });
}

function deleteTodo() {
  const deleteEl = document.querySelectorAll(".trash");

  deleteEl.forEach(item => {
    item.addEventListener('click', (e) => {
      const element = e.target.parentElement.parentElement.parentElement.getAttribute('data-id');
      const todos = JSON.parse(localStorage.getItem('todos'))

      const newArr = todos.filter(todo => {
        return todo.id != element;
      })

      localStorage.setItem('todos', JSON.stringify(newArr))

      const todo = item.parentElement.parentElement

      todo.remove();
    })
  })
}


checkTodo()
deleteTodo()


const clearAll = document.querySelector('.clear')

clearAll.addEventListener('click', () => {
  localStorage.setItem('todos', JSON.stringify([]))
  lists.innerHTML = ''
})