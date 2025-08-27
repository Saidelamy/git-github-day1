export function getComponentPath(path, isComponent = true) {
  const depth = window.location.pathname.split("/").length - 2;
  const prefix = "../".repeat(depth);

  if (isComponent) {
    return prefix + "components/" + path;
  } else {
    return prefix + path;
  }
}

export function navAndFooter() {
  fetch(getComponentPath("navbar.html"))
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("navbar").innerHTML = data;

      let logo = document.getElementById("logo");
      let login = document.querySelector(".login");
      let cartIcon = document.querySelector(".cart-icon");
      let register = document.querySelector(".register");
      let logout = document.querySelector(".logout");
      let profileImg = document.querySelector(".profile-img");

      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const userName = localStorage.getItem("username");

      if (isLoggedIn) {
        if (login) login.style.display = "none";
        if (register) register.style.display = "none";
        if (logout) logout.style.display = "block";
        if (profileImg) profileImg.style.display = "block";
        if (cartIcon) cartIcon.style.display = "block";
        let usernameSpan = document.querySelector(".username");
        if (usernameSpan) {
          usernameSpan.textContent = userName;
        }
      } else {
        if (login) login.style.display = "block";
        if (register) register.style.display = "block";
        if (logout) logout.style.display = "none";
        if (profileImg) profileImg.style.display = "none";
        if (cartIcon) cartIcon.style.display = "none";

        let usernameSpan = document.querySelector(".username");
        if (usernameSpan) {
          usernameSpan.textContent = "";
        }
      }

      if (logo) {
        logo.addEventListener("click", () => {
          window.location.href = getComponentPath("index.html", false);
          console.log("first");
        });
      }
      if (cartIcon) {
        cartIcon.addEventListener("click", () => {
          window.location.href = getComponentPath("Cart/index.html", false);
        });
      }
      if (login) {
        login.addEventListener("click", () => {
          window.location.href = getComponentPath("login/index.html", false);
        });
      }
      if (register) {
        register.addEventListener("click", () => {
          window.location.href = getComponentPath("register/index.html", false);
        });
      }
      if (logout) {
        logout.addEventListener("click", () => {
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("username");
          window.location.href = getComponentPath("login/index.html", false);
        });
      }
    });

  // تحميل الفوتر
  fetch(getComponentPath("footer.html"))
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("footer").innerHTML = data;
    });
}
