const API = "http://localhost:8000/todo";

let btn = document.querySelector(".btn");
let todoList = document.querySelector(".todo-list");
let send = document.querySelector(".send");
let save = document.querySelector(".save");
let inpName = document.querySelector(".inp-name");
let inpSurname = document.querySelector(".inp-surname");
let inpPhone = document.querySelector(".inp-phone");
let mainOl = document.querySelector(".main-ol");
let mainScreen = document.querySelector(".main-screen");
let btnX = document.querySelector(".btn-x");

btnX.addEventListener("click", function () {
  todoList.style.display = "none";
  mainScreen.style.display = "block";
});

send.addEventListener("click", async function () {
  let obj = {
    name: inpName.value,
    inpSurname: inpSurname.value,
    inpPhone: inpPhone.value,
  };

  if (
    obj.name.trim() === "" ||
    obj.inpSurname.trim() === "" ||
    obj.inpPhone.trim() === ""
  ) {
    alert("Заполните поле");
    return;
  }

  await fetch(API, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  });

  todoList.style.display = "none";
  mainScreen.style.display = "block";
  inpName.value = "";
  inpSurname.value = "";
  inpPhone.value = "";
  location.reload();
  getTodoList();
});

btn.addEventListener("click", function () {
  todoList.style.display = "flex";
  mainScreen.style.display = "none";
});

let page = 1;
async function getTodoList() {
  let allTodos = await fetch(API)
    .then(res => res.json())
    .catch(err => console.log(error));
  // console.log(allTodos);

  allTodos.forEach(element => {
    let div = document.createElement("div");
    div.id = element.id;
    div.style.border = "1px solid black";
    div.style.maxWidth = "300px";
    div.style.padding = "10px";
    div.style.marginBottom = "10px";
    div.style.textTransform = "Uppercase";
    div.innerHTML = `
    <li><strong>Name:  </strong>   ${element.name}</li>
    <li><strong>First Name:  </strong>   ${element.inpFirst}</li>
    <li><strong>Phone number:  </strong>   ${element.inpPhone}</li>
    <button style="margin-top: 10px" class="btn-delete">delete</button>
    <button class="btn-edit">edit</button>
    `;
    mainOl.append(div);
  });
  getTodoList();
}

save.addEventListener("click", async function () {
  let editedTodo = {
    name: inpName.value,
    inpSurname: inpFirst.value,
    inpPhone: inpPhone.value,
  };
  let id = disabl.value;
  await fetch(`${API}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(editedTodo),
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  });

  todoList.style.display = "none";
  mainScreen.style.display = "block";
  // getTodos();
  location.reload();
});

document.addEventListener("click", async function (e) {
  if (e.target.className === "btn-delete") {
    let id = e.target.parentNode.id;
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });
    // getTodoList();
    location.reload();
  }

  if (e.target.className === "btn-edit") {
    console.log(e.target);
    todoList.style.display = "flex";
    mainScreen.style.display = "none";
    send.style.display = "none";
    save.style.display = "block";
    save.style.width = "258px";
    save.style.height = "35px";
    save.style.marginTop = "25px";
    save.style.marginBottom = "25px";
    save.style.borderRadius = "3px";
    let id = e.target.parentNode.id;
    console.log(id);

    let response = await fetch(`${API}/${id}`)
      .then(res => res.json())
      .catch(err => console.log(error));
    console.log(response);

    inpName.value = response.name;
    inpSurname.value = response.inpSurname;
    inpPhone.value = response.inpPhone;
    // disabled.value = response.id;
  }
});
