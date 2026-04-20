// Utility
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// REGISTER
function register() {
  const user = regUser.value.trim();
  const pass = regPass.value.trim();
  const error = document.getElementById("regError");

  if (user.length < 3 || pass.length < 4) {
    error.innerText = "Username >=3, Password >=4";
    return;
  }

  let users = getUsers();

  if (users.find(u => u.user === user)) {
    error.innerText = "User already exists";
    return;
  }

  users.push({ user, pass });
  saveUsers(users);

  alert("Registered!");
  location.href = "index.html";
}

// LOGIN
function login() {
  const user = loginUser.value.trim();
  const pass = loginPass.value.trim();
  const error = document.getElementById("loginError");

  let users = getUsers();

  const found = users.find(u => u.user === user && u.pass === pass);

  if (!found) {
    error.innerText = "Invalid credentials";
    return;
  }

  localStorage.setItem("session", user);
  location.href = "dashboad.html";
}

// RESET PASSWORD
function resetPassword() {
  const user = fpUser.value.trim();
  const pass = fpPass.value.trim();
  const error = document.getElementById("fpError");

  let users = getUsers();
  let index = users.findIndex(u => u.user === user);

  if (index === -1) {
    error.innerText = "User not found";
    return;
  }

  users[index].pass = pass;
  saveUsers(users);

  alert("Password updated");
  location.href = "index.html";
}

// DASHBOARD
if (window.location.pathname.includes("dashboard.html")) {
  const session = localStorage.getItem("session");

  if (!session) {
    location.href = "index.html";
  } else {
    document.getElementById("userDisplay").innerText = "Hello, " + session;
  }
}

// LOGOUT
function logout() {
  localStorage.removeItem("session");
  location.href = "index.html";
}
