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

let slideIndex = 0;

// Next/previous controls
function pushSlides(n) {
  	showSlides(slideIndex += n);
}

function showSlides(n) {
    const images = document.querySelectorAll('.hero-feature img');
    let i = 0;
    if (n >= images.length) {slideIndex = 0}
    if (n < 0) {slideIndex = images.length-1}
    for (i = 0; i < images.length; i++) {
      	images[i].dataset.index = i; // give index numbers to all images in NodeList
	images[i].style.display = "none";  // Hide all
    }

    images[slideIndex].style.display = "inline"; // Show current
}
