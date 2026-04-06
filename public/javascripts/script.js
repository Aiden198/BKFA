const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(dropdown => {
    const dropdownBtn = dropdown.querySelector(".dropdown-btn");

    dropdownBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        dropdowns.forEach(d => { // romove others
            if(d !== dropdown) d.classList.remove("active");
        });

        dropdown.classList.toggle("active"); // toggle current
    });
});

document.addEventListener("click", () => { // listens for click and removes
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove("active");
    });
});

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  // Hide all
  }
  slides[slideIndex-1].style.display = "block"; // Show current
}
