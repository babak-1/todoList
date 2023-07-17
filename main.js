const form =document.getElementById('to-do-form');
const input = document.getElementById('to-do-input');
const lists = document.querySelector('.lists');


let todos = JSON.parse(localStorage.getItem('todos'))||[];

// 1ci render
renderTodos();


form.addEventListener('submit',(e)=>{
    e.preventDefault();

    saveTodo();
    renderTodos();
    localStorage.setItem('todos',JSON.stringify(todos))
})

//! save todo

function saveTodo(){
const todoValue = input.value;

// input-u bos saxlamamaq
const empty = todoValue==='';

// eyni inputu ikinci defe girmeye iceza verme

// toLowerCase ve yaxud toUppercase yazanda boyuk ve ya kiciye gore muqayise etmeyecek
const duplicate = todos.some((todo)=>todo.value.toLowerCase()===todoValue.toLowerCase());

if(empty){
    alert('Zehmet olmasa doldurun');
}else if(duplicate){
    alert('Bunu onsuz da yazmisan')
}
else{
    const todo ={
        value:todoValue,
        checked:false
    }
    
        todos.push(todo);
    // push etdikden sonra input yerin temizleyirem
        input.value ='';
    }
}

//! render todo

function renderTodos(){
    // renderden evvel kohhne elementleri silirem
    lists.innerHTML=''; 
    // render todos
     todos.forEach((el,index)=>{
        lists.innerHTML += 
        `<div class="list" id=${index}>
        <input type="text" class="text ${el.checked ? 'input_done' : ''}" value=${el.value} data-action="check">
          <i class="bi ${el.checked ? 'bi-check-circle-fill' : 'bi-circle'} done" data-action="check"></i>
          <i class="fa-solid fa-trash trash"data-action="delete"></i>
      </div>`;
     });
}

// eventlistener yaratmaq

lists.addEventListener('click',(e)=>{
     const target = e.target;
     const parentElement = target.parentNode; 
     if(parentElement.className !=='list') return;

    //  list id
     const list = parentElement;
     const listId = Number(list.id);

    //  target action
    const action = target.dataset.action;

    action ==="check" && checkTodo(listId);
    action === "delete" && deleteTodo(listId);

     console.log(listId,action);
})


// check todo
function checkTodo(listId){
    todos = todos.map((el,index)=>({
            ...el,
            checked:index === listId ? !el.checked:el.checked
        }));
    renderTodos();
    localStorage.setItem('todos',JSON.stringify(todos))
}



// delete 
function deleteTodo(listId){
  todos=todos.filter((el,index)=>index!==listId);
//   yeniden render edende
    renderTodos(); 
    localStorage.setItem('todos',JSON.stringify(todos))
}



// clear all
const clearAll = document.querySelector('.clear')

clearAll.addEventListener('click', () => {
  localStorage.setItem('todos', JSON.stringify([]))
  lists.innerHTML = ''
  location.reload();
})

