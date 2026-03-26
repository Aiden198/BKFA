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
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0; // returns true if any part visible
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting || entry.intersectionRatio > 0) { // a little redundant but safe
        const el = entry.target;
        el.classList.add("fly-show");
        obs.unobserve(el);
      }
    });
  }, {
    threshold: 0,
    rootMargin: "0px 0px -10% 0px"
  });

  flyElements.forEach((element) => {
    if (isVisibleOnLoad(element)) {
      element.classList.add("fly-show");
    } else {
      const direction = normaliseDirection(element.dataset.fly);
      element.classList.add("fly-in-prepare");
      element.classList.add(`fly-start-${direction}`);
      observer.observe(element);
    }
  });
});