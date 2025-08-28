import { navAndFooter } from "../utils/navAndFooter.js";

class Register {
  constructor(formId) {
    this.registerForm = document.getElementById(formId);
    this.fullNameInput = document.getElementById("fullName");
    this.emailInput = document.getElementById("email");
    this.passwordInput = document.getElementById("password");
    this.confirmPasswordInput = document.getElementById("confirmPassword");

    this.fullNameError = document.getElementById("fullNameError");
    this.emailError = document.getElementById("emailError");
    this.passwordError = document.getElementById("passwordError");
    this.confirmPasswordError = document.getElementById("confirmPasswordError");

    this.regex = {
      fullName: /^[A-Za-z\s]{8,}$/,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
    };

    this.registerForm.addEventListener("submit", (e) =>
      this.registerConfirm(e)
    );
  }

  validateInputs() {
    let valid = true;

    if (!this.regex.fullName.test(this.fullNameInput.value.trim())) {
      this.fullNameError.textContent =
        "Full name must be at least 8 letters and contain only letters/spaces.";
      valid = false;
    } else {
      this.fullNameError.textContent = "";
    }

    if (!this.regex.email.test(this.emailInput.value.trim())) {
      this.emailError.textContent = "Please enter a valid email address.";
      valid = false;
    } else {
      this.emailError.textContent = "";
    }

    if (!this.regex.password.test(this.passwordInput.value)) {
      this.passwordError.textContent =
        "Password must have at least 8 numbers, uppercase letter, lowercase letter, and symbol.";
      valid = false;
    } else {
      this.passwordError.textContent = "";
    }

    if (this.passwordInput.value !== this.confirmPasswordInput.value) {
      this.confirmPasswordError.textContent = "Passwords do not match.";
      valid = false;
    } else {
      this.confirmPasswordError.textContent = "";
    }

    return valid;
  }

  registerConfirm(e) {
    e.preventDefault();

    if (this.validateInputs()) {
      const userData = {
        fullName: this.fullNameInput.value.trim(),
        email: this.emailInput.value.trim(),
        password: this.passwordInput.value,
      };

      let users = JSON.parse(localStorage.getItem("users")) || [];
      const existingUser = users.find((user) => user.email === userData.email);

      if (existingUser) {
        this.emailError.textContent = "This email is already registered";
        return;
      }

      users.push(userData);
      localStorage.setItem("users", JSON.stringify(users));

      swal("Register done successfully!", "تم اضافة حسابك بنجاح", "success", {
        button: "done!",
      });

      setTimeout(() => {
        window.location.href = "../login/index.html";
      }, 1000);

      this.registerForm.reset();
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Register("registerForm");
  navAndFooter();
});
