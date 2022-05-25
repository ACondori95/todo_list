// getting all requires elements
const input_box = document.querySelector('.input_field input');
const add_btn = document.querySelector('.input_field button');
const todo_list = document.querySelector('.todo_list');
const delete_all_btn = document.querySelector('.footer button');

// onkeyup event
input_box.onkeyup = () => {
  let user_entered_value = input_box.value;
  if (user_entered_value.trim() != 0) {
    add_btn.classList.add('active');
  } else {
    add_btn.classList.remove('active');
  }
}

showTasks();

add_btn.onclick = () => {
  let user_entered_value = input_box.value;
  let get_local_storage_data = localStorage.getItem("New Todo");
  if (get_local_storage_data == null) {
    list_array = [];
  } else {
    list_array = JSON.parse(get_local_storage_data);
  }
  list_array.push(user_entered_value);
  localStorage.setItem("New Todo", JSON.stringify(list_array));
  showTasks();
  add_btn.classList.remove('active');
}

function showTasks() {
  let get_local_storage_data = localStorage.getItem("New Todo");
  if (get_local_storage_data == null) {
    list_array = [];
  } else {
    list_array = JSON.parse(get_local_storage_data);
  }
  const pending_tasks_numb = document.querySelector('.pending_tasks');
  pending_tasks_numb.textContent = list_array.length;
  if (list_array.length > 0) {
    delete_all_btn.classList.add('active');
  } else {
    delete_all_btn.classList.remove('active');
  }
  let new_li_tag = '';
  list_array.forEach((element, index) => {
    new_li_tag += `<li>${element}<span class='icon' onclick='deleteTask(${index})'><i class='fas fa-trash'></i></span></li>`;
  });
  todo_list.innerHTML = new_li_tag;
  input_box.value = '';
}

// delete task function
function deleteTask(index) {
  let get_local_storage_data = localStorage.getItem("New Todo");
  list_array = JSON.parse(get_local_storage_data);
  list_array.splice(index, 1);
  localStorage.setItem("New Todo", JSON.stringify(list_array));
  showTasks();
}

// delete all tasks function
delete_all_btn.onclick = () => {
  list_array = [];
  localStorage.setItem("New Todo", JSON.stringify(list_array));
  showTasks();
}