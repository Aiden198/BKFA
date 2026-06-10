document.addEventListener("DOMContentLoaded", () => {
  // Hero slides are layered in CSS; this script only changes the active one.
  const slides = document.querySelectorAll(".hero-feature__slide");

  // A single slide needs no timer or accessibility state changes.
  if (slides.length <= 1) {
    return;
  }

  let activeIndex = 0;

  // Keep the visual active class and screen-reader visibility in sync.
  const showSlide = (nextIndex) => {
    slides[activeIndex].classList.remove("is-active");
    slides[activeIndex].setAttribute("aria-hidden", "true");

    activeIndex = nextIndex;

    slides[activeIndex].classList.add("is-active");
    slides[activeIndex].setAttribute("aria-hidden", "false");
  };

  slides.forEach((slide, index) => {
    slide.setAttribute("aria-hidden", index === activeIndex ? "false" : "true");
  });

  // Change this delay to make the homepage hero rotate faster or slower.
  window.setInterval(() => {
    showSlide((activeIndex + 1) % slides.length);
  }, 5000);
});
