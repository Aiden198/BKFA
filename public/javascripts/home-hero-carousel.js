document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".hero-feature__slide");

  if (slides.length <= 1) {
    return;
  }

  let activeIndex = 0;

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

  window.setInterval(() => {
    showSlide((activeIndex + 1) % slides.length);
  }, 5000);
});
