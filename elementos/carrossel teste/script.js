function scrollSlider(direction) {
  const slider = document.getElementById('cardSlider');
  const cardWidth = slider.querySelector('.card').offsetWidth + 50;
  const scrollAmount = cardWidth * 2;
  const start = slider.scrollLeft;
  const end = start + scrollAmount * direction;
  const duration = 500; // milissegundos (mais alto = mais lento)
  const startTime = performance.now();

  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    slider.scrollLeft = start + (end - start) * easeInOutCubic(progress);

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }

  function easeInOutCubic(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  requestAnimationFrame(animateScroll);
}
