const loginForm = document.querySelector(".loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitButton = document.querySelector(".submitButton");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const loginError = document.getElementById("loginError");

const regex = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
};

function loginConfirm(e) {
  e.preventDefault();
  let valid = true;

  if (!regex.email.test(emailInput.value.trim())) {
    emailError.textContent = "Please enter a valid email address.";
    valid = false;
  } else {
    emailError.textContent = "";
  }

  if (!regex.password.test(passwordInput.value)) {
    passwordError.textContent =
      "Password must have at least 8 numbers, uppercase letter, lowercase letter, and symbol.";
    valid = false;
  } else {
    passwordError.textContent = "";
  }

  if (valid) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    console.log(users);
    const existingUser = users.find(
      (user) =>
        user.email === emailInput.value.trim() &&
        user.password === passwordInput.value
    );

    if (existingUser) {
      swal("login done successfully!", "", "success", {
        button: "done!",
      });
      loginError.textContent = "";

      setTimeout(function () {
        window.location.href = "../index.html";
      }, 1000);

      loginForm.reset();
    } else {
      loginError.textContent = "email or password is incorrect";
      false;
    }
  }
}

loginForm.addEventListener("submit", loginConfirm);
