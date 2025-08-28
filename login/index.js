import { navAndFooter } from "../utils/navAndFooter.js";

class Login {
  constructor(formId) {
    this.loginForm = document.getElementById(formId);
    this.emailInput = document.getElementById("email");
    this.passwordInput = document.getElementById("password");
    this.emailError = document.getElementById("emailError");
    this.passwordError = document.getElementById("passwordError");
    this.loginError = document.getElementById("loginError");

    this.regex = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
    };

    // Bind event
    this.loginForm.addEventListener("submit", (e) => this.loginConfirm(e));
  }

  validateInputs() {
    let valid = true;

    // email
    if (!this.regex.email.test(this.emailInput.value.trim())) {
      this.emailError.textContent = "Please enter a valid email address.";
      valid = false;
    } else {
      this.emailError.textContent = "";
    }

    // password
    if (!this.regex.password.test(this.passwordInput.value)) {
      this.passwordError.textContent =
        "Password must have at least 8 numbers, uppercase letter, lowercase letter, and symbol.";
      valid = false;
    } else {
      this.passwordError.textContent = "";
    }

    return valid;
  }

  loginConfirm(e) {
    e.preventDefault();

    if (this.validateInputs()) {
      let users = JSON.parse(localStorage.getItem("users")) || [];
      const existingUser = users.find(
        (user) =>
          user.email === this.emailInput.value.trim() &&
          user.password === this.passwordInput.value
      );

      if (existingUser) {
        localStorage.setItem("username", existingUser.fullName);
        localStorage.setItem("isLoggedIn", "true");

        swal("login done successfully!", "", "success", {
          button: "done!",
        });

        this.loginError.textContent = "";

        setTimeout(() => {
          window.location.href = "../index.html";
        }, 1000);

        this.loginForm.reset();
      } else {
        this.loginError.textContent = "email or password is incorrect";
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Login("loginForm");
  navAndFooter();
});
