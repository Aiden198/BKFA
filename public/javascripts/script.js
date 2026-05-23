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
