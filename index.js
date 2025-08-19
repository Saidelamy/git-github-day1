let products = [
  {
    id: 1,
    name: "Book",
    price: 200,
    quantity: 5,
    category: "school",
    img: "/images/book.jpg",
  },
  {
    id: 2,
    name: "Pen",
    price: 100,
    quantity: 20,
    category: "school",
    img: "/images/pen.jpg",
  },
  {
    id: 3,
    name: "Coffee",
    price: 50,
    quantity: 15,
    category: "drink",
    img: "/images/coffe.avif",
  },
];

let slider = [
  {
    img: "/images/hero-woman4.jpg",
    title: "New Collection",
    desc: "Shop the latest trends now, Shop the latest trends now, Shop the latest trends now",
    position: { top: "30%", left: "15%" },
  },
  {
    img: "/images/hero-woman2.jpg",
    title: "Summer Sale",
    desc: "Shop the latest trends now, Shop the latest trends now.",
    position: { bottom: "300px", left: "250px" },
  },
  {
    img: "/images/hero-man.jpg",
    title: "Accessories",
    desc: "Shop the latest trends now, Shop the latest trends now.",
    position: { top: "30%", right: "10%", transform: "translateX(-50%)" },
  },

  //   "/images/hero-woman4.jpg",
  //   "/images/hero-woman2.jpg",
  //   "/images/hero-woman1.jpg",
];

let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let heroImg = document.querySelector(".hero-img");
let heroTitle = document.querySelector(".hero-title");
let heroDesc = document.querySelector(".hero-desc");
let heroText = document.querySelector(".hero-text");

let index = 0;

function showImage() {
  let slide = slider[index];

  heroImg.style.backgroundImage = `url(${slide.img})`;

  heroTitle.textContent = slide.title;
  heroDesc.textContent = slide.desc;

  heroText.style.top = "";
  heroText.style.bottom = "";
  heroText.style.left = "";
  heroText.style.right = "";
  heroText.style.transform = "";

  for (let prop in slide.position) {
    heroText.style[prop] = slide.position[prop];
  }
}
function nextHero() {
  index++;
  if (index >= slider.length) {
    index = 0;
  }
  showImage();
}
function prevHero() {
  index--;
  if (index < 0) {
    index = slider.length - 1;
  }
  showImage();
}

next.addEventListener("click", nextHero);
prev.addEventListener("click", prevHero);

showImage();

setInterval(function () {
  nextHero();
}, 3000);
