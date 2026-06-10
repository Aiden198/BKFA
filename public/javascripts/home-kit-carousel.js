document.addEventListener("DOMContentLoaded", () => {
  // Support more than one kit carousel without sharing scroll state.
  const carousels = document.querySelectorAll("[data-kit-carousel]");

  carousels.forEach((carousel) => {
    const track = carousel.querySelector("[data-kit-track]");
    const prevButton = carousel.querySelector("[data-kit-prev]");
    const nextButton = carousel.querySelector("[data-kit-next]");

    if (!track || !prevButton || !nextButton) {
      // Ignore incomplete markup instead of breaking other page scripts.
      return;
    }

    // Move by one complete card plus the CSS gap between cards.
    const getStep = () => {
      const firstCard = track.querySelector(".kit-item-card");
      if (!firstCard) {
        return track.clientWidth;
      }

      const styles = window.getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || "0");
      return firstCard.getBoundingClientRect().width + gap;
    };

    const updateControls = () => {
      // The small tolerance avoids floating-point scroll values leaving a
      // button enabled when the track is already at either end.
      const maxScrollLeft = track.scrollWidth - track.clientWidth;
      prevButton.disabled = track.scrollLeft <= 8;
      nextButton.disabled = track.scrollLeft >= maxScrollLeft - 8;
    };

    const scrollCards = (direction) => {
      const step = getStep();
      // Desktop advances two cards, while compact layouts advance one.
      const cardsVisible = window.innerWidth <= 900 ? 1 : 2;

      track.scrollBy({
        left: direction * step * cardsVisible,
        behavior: "smooth"
      });
    };

    prevButton.addEventListener("click", () => scrollCards(-1));
    nextButton.addEventListener("click", () => scrollCards(1));
    track.addEventListener("scroll", updateControls, { passive: true });
    window.addEventListener("resize", updateControls);

    updateControls();
  });
});
