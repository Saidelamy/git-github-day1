import { navAndFooter } from "../utils/navAndFooter.js";

const registerForm = document.querySelector(".registerForm");
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const submitButton = document.querySelector(".submitButton");
const fullNameError = document.getElementById("fullNameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

const regex = {
  fullName: /^[A-Za-z\s]{8,}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
};

function registerConfirm(e) {
  e.preventDefault();
  let valid = true;

  if (!regex.fullName.test(fullNameInput.value.trim())) {
    fullNameError.textContent =
      "Full name must be at least 8 letters and contain only letters/spaces.";
    valid = false;
  } else {
    fullNameError.textContent = "";
  }

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

  if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordError.textContent = "Passwords do not match.";
    valid = false;
  } else {
    confirmPasswordError.textContent = "";
  }

  if (valid) {
    const userData = {
      fullName: fullNameInput.value.trim(),
      email: emailInput.value.trim(),
      password: passwordInput.value,
    };

    let users = JSON.parse(localStorage.getItem("users")) || [];
    console.log(users);
    const existingUser = users.find((user) => user.email === userData.email);

    if (existingUser) {
      emailError.textContent = "This email is already registered";
      return;
    }
    users.push(userData);

    localStorage.setItem("users", JSON.stringify(users));

    swal("Register done successfully!", "تم اضافة حسابك بنجاح", "success", {
      button: "done!",
    });

    setTimeout(function () {
      window.location.href = "../login/index.html";
    }, 1000);
    // submitButton.addEventListener("click", () => {
    //   window.location.href = "../login/index.html";
    // });
    registerForm.reset();
  }
}

registerForm.addEventListener("submit", registerConfirm);

navAndFooter();
