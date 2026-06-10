document.addEventListener("DOMContentLoaded", () => {
  const flyElements = document.querySelectorAll(".fly-in");

  function normaliseDirection(dir) {
    if (!dir) return "up"; // default to catch mistakes

    dir = dir.toLowerCase();

    if (dir === "u") return "up";
    if (dir === "d") return "down";
    if (dir === "l") return "left";
    if (dir === "r") return "right";

    if (["up", "down", "left", "right"].includes(dir)) {
      return dir;
    }

    return "up"; // just in case
  }

  function isVisibleOnLoad(element) {
    const rect = element.getBoundingClientRect(); // rel position
    return rect.top < window.innerHeight && rect.bottom > 0; // returns true if any part visible
  }

  const observer = new IntersectionObserver((entries, obs) => { // triggers when entering viewport
    entries.forEach((entry) => {
      if (entry.isIntersecting || entry.intersectionRatio > 0) { //function of observer but safer
        const el = entry.target;
        el.classList.add("fly-show");
        obs.unobserve(el);
      }
    });
  }, {
    threshold: 0,
    rootMargin: "0px 0px -10% 0px" // lets the element enter bottom 10% before triggering
  });

  flyElements.forEach((element) => {
    if (isVisibleOnLoad(element)) {
      element.classList.add("fly-show");  // if already visible, just show it without animation
    } else {
      const direction = normaliseDirection(element.dataset.fly); // prepare animation for later
      element.classList.add("fly-in-prepare");
      element.classList.add(`fly-start-${direction}`);
      observer.observe(element);
    }
  });
});