document.addEventListener("DOMContentLoaded", () => {
  const expandables = document.querySelectorAll(".expandable");

  expandables.forEach((expandable) => {
    const button = expandable.querySelector(".expandable-toggle");
    const content = expandable.querySelector(".expandable-content");

    button.addEventListener("click", () => {
      const isOpen = expandable.classList.contains("open");

      if (isOpen) {
        content.style.maxHeight = content.scrollHeight + "px";
        requestAnimationFrame(() => {
          content.style.maxHeight = "0px";
        });

        expandable.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
      } else {
        expandable.classList.add("open");
        button.setAttribute("aria-expanded", "true");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });

    content.addEventListener("transitionend", () => {
      if (expandable.classList.contains("open")) {
        content.style.maxHeight = "none";
      }
    });
  });

  window.addEventListener("resize", () => {
    expandables.forEach((expandable) => {
      const content = expandable.querySelector(".expandable-content");

      if (expandable.classList.contains("open")) {
        content.style.maxHeight = "none";
      }
    });
  });
});