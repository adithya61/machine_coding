// on document load.

const slides = document.getElementsByClassName("slide");

for (let i = 0; i < slides.length; i++) {
  slides[i].style.transform = `translateX(${i * 100}%)`;
}

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentCounter = 0;

prevBtn.disabled = true;

function next() {
  currentCounter++;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.transform = `translateX(${100 * (i - currentCounter)}%)`;
  }
  handleDisabled();
}

function prev() {
  currentCounter--;
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.transform = `translateX(${100 * (i - currentCounter)}%)`;
  }
  handleDisabled();
}

function handleDisabled() {
  currentCounter == 2 ? (nextBtn.disabled = true) : (nextBtn.disabled = false);
  currentCounter == 0 ? (prevBtn.disabled = true) : (prevBtn.disabled = false);
}
