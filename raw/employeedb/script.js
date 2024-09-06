const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let employees;
let li = $("#list");

let addEmployeesToList = () => {
  employees.forEach(
    (emp) =>
      (li.innerHTML += addEmployeeDOM(emp.firstName, emp.lastName, emp.id))
  );
};

let addEmployeeToDB = () => {
  let fn = document.querySelector(".fn").value;
  let ln = document.querySelector(".ln").value;
  let url = document.querySelector(".imageUrl").value;

  let obj = {
    id: "1011",
    firstName: fn,
    lastName: ln,
    imageUrl: url,
  };

  employees.push(obj);
  console.log(employees);

  addEmployeesToList();
};

let showDetails = (id) => {
  let Employee = employees.filter((emp) => emp.id == id);
  let curEmployee = Employee[0];
  let dummyImage =
    "https://as2.ftcdn.net/v2/jpg/02/17/34/67/1000_F_217346782_7XpCTt8bLNJqvVAaDZJwvZjm0epQmj6j.jpg";
  document.querySelector(
    "#details"
  ).innerHTML = `<img class="employee-img" src=${curEmployee.imageUrl}> <p>${curEmployee.firstName} ${curEmployee.lastName}</p>`;
};

let getData = () => {
  return fetch("./data/data.json")
    .then((res) => res.json())
    .then((r) => {
      employees = r;
      addEmployeesToList();
    });
};

let addEmployeeDOM = (firstName, lastName, id) => {
  return `<li id=${id} class="emp">
    ${firstName} ${lastName}
  </li>`;
};

getData();
li.addEventListener("click", (e) => {
  let empList = document.querySelectorAll(".emp");
  empList.forEach((emp) => {
    if (emp.classList.contains("selected")) emp.classList.remove("selected");
    if (emp.id == e.target.id) {
      emp.classList.add("selected");
      showDetails(e.target.id);
    }
  });
});

document
  .querySelector(".addEmployeeBtn")
  .addEventListener("click", addEmployeeToDB);
