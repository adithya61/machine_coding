// document.querySelector("");
// document.querySelectorAll("")
// igonre
(async function () {
  let data = await fetch("./data/data.json");
  const res = await data.json();

  let employees = res;

  let selectedEmployeeId = employees[0].id;
  let selectedEmployee = employees[0];

  const employeeList = document.querySelector(".employees__names--list");
  const employeeInfo = document.querySelector(".employees__information--list");

  // Update Employee logic

  const updateEmployee = document.querySelector(".updateEmployee");
  const updateEmployeeBtn = document.querySelector(".updateEmployee__btn");
  const updateForm = document.querySelector(".update__employee");
  const submitUpdate = document.querySelector(".update");

  updateEmployeeBtn.addEventListener("click", () => {
    updateEmployee.style.opacity = 1;
    updateEmployee.style.zIndex = "0";

    const fn = document.querySelector(".update_firstName");
    const ln = document.querySelector(".update_lastName");
    const url = document.querySelector(".update_url");

    fn.value = selectedEmployee.firstName;
    ln.value = selectedEmployee.lastName;
    url.value = selectedEmployee.imageUrl;
  });

  submitUpdate.addEventListener("click", () => {
    const updated_fn = document.querySelector(".update_firstName").value;
    const updated_ln = document.querySelector(".update_lastName").value;
    const updated_url = document.querySelector(".update_url").value;

    employees.map((emp) => {
      if (parseInt(emp.id) == parseInt(selectedEmployeeId)) {
        emp.firstName = updated_fn;
        emp.lastName = updated_ln;
        emp.imageUrl = updated_url;
      }
    });

    // updateForm.reset();

    renderEmployeeInfo();
    renderEmployees();

    console.log(employees);

    updateEmployee.style.opacity = 0;
    updateEmployee.style.zIndex = "-1";
  });

  updateEmployee.addEventListener("click", (e) => {
    if (e.target.className == "updateEmployee") {
      updateEmployee.style.opacity = 0;
      updateEmployee.style.zIndex = "-1";
    }
  });

  // Add employee logic

  const createEmployee = document.querySelector(".createEmployee");
  const addEmployee = document.querySelector(".addEmployee");
  const employeeForm = document.querySelector(".addEmployee__create");

  createEmployee.addEventListener("click", () => {
    addEmployee.style.opacity = 1;
    addEmployee.style.zIndex = "0";

    addEmployee.addEventListener("click", (e) => {
      if (e.target.className == "addEmployee") {
        addEmployee.style.opacity = 0;
        addEmployee.style.zIndex = "-1";
      }
    });
  });

  employeeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(employeeForm);
    const values = [...formData.entries()];

    let empData = {};
    empData["id"] = employees.length;
    values.forEach((val) => (empData[val[0]] = val[1]));

    employees.push(empData);
    renderEmployeeInfo();
    renderEmployees();
    employeeForm.reset();
    addEmployee.style.opacity = 0;
    addEmployee.style.zIndex = "-1";
  });

  // select a employee
  employeeList.addEventListener("click", (e) => {
    if (
      e.target.className == "employees__names--item" &&
      e.target.id != selectedEmployeeId
    )
      selectedEmployeeId = e.target.id;

    if (e.target.className == "employee__delete") {
      employees = employees.filter(
        (emp) => parseInt(emp.id) != parseInt(e.target.parentNode.id)
      );

      if (selectedEmployeeId == parseInt(e.target.parentNode.id)) {
        selectedEmployeeId = employees[0]?.id || -1;
        selectedEmployee = employees[0] || 0;
      }
    }

    renderEmployees();
    renderEmployeeInfo();
  });

  // Render employees

  const renderEmployees = () => {
    employeeList.innerHTML = "";

    employees.forEach((emp) => {
      const employee = document.createElement("span");
      employee.classList.add("employees__names--item");

      if (parseInt(emp.id) == selectedEmployeeId) {
        employee.classList.add("selected");
        selectedEmployee = emp;
      }

      employee.setAttribute("id", emp.id);
      employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="employee__delete"> ❌ </i>`;

      employeeList.append(employee);
    });
  };

  const renderEmployeeInfo = () => {
    if (selectedEmployeeId == -1) {
      employeeInfo.innerHTML = "";
      return;
    }

    employeeInfo.innerHTML = `<img class="employee-img" src=${selectedEmployee.imageUrl} alt="placeholder_dp"> <span>${selectedEmployee.firstName}</span>`;
  };

  renderEmployees();
  renderEmployeeInfo();
})();
