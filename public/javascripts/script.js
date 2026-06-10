const dropdowns = document.querySelectorAll(".dropdown");

// Add click support to dropdown buttons while leaving linked headings alone.
dropdowns.forEach(dropdown => {
    const dropdownBtn = dropdown.querySelector(".dropdown-btn");

    if (!dropdownBtn || dropdownBtn.tagName.toLowerCase() === "a") {
        return;
    }

    dropdownBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        // Close the other menus before opening or closing this one.
        dropdowns.forEach(d => {
            if(d !== dropdown) d.classList.remove("active");
        });

        dropdown.classList.toggle("active");
    });
});

// Clicking anywhere outside a dropdown closes all open menus.
document.addEventListener("click", () => {
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove("active");
    });
});
