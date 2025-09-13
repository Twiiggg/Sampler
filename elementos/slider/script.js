function scrollSlider(direction) {
  const slider = document.getElementById('cardSlider');
  const cardWidth = slider.children[0].offsetWidth + 16;
  const scrollAmount = cardWidth * 1;
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



// tem que arrumar isso daqui hein

function scrollSlider2(direction) {
  const slider = document.getElementById('cardSlider2');
  const cardWidth = slider.querySelector('.card2').offsetWidth + 16;
  const scrollAmount = cardWidth * 1;
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

function scrollSlider3(direction) {
  const slider = document.getElementById('cardSlider3');
  const cardWidth = slider.querySelector('.card2').offsetWidth + 16;
  const scrollAmount = cardWidth * 1;
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

/* PUBLICAR */

function createTagElement(name, containerId) {
  const tag = document.createElement("div");
  tag.className = "tag-upload";
  tag.innerText = name;

  const close = document.createElement("span");
  close.className = "close";
  close.innerText = "✕";
  close.onclick = () => tag.remove();

  tag.appendChild(close);
  document.getElementById(containerId).appendChild(tag);
}

function addArtist() {
  const input = document.getElementById("artist-input");
  const value = input.value.trim();
  if (value !== "") {
    createTagElement(value, "artist-tags");
    input.value = "";
  }
}

function addTag() {
  const input = document.getElementById("tag-input");
  let value = input.value.trim();

  if (value !== "") {
    if (!value.startsWith("#")) {
      value = "#" + value;
    }
    createTagElement(value, "tag-tags");
    input.value = "";
  }
}

document.getElementById("publish-btn").addEventListener("click", () => {
  Swal.fire({
    title: 'Publicado!',
    text: 'O sample foi publicado com sucesso.',
    icon: 'success',
    confirmButtonText: 'OK'
  }).then((result) => {
    if (result.isConfirmed) {
      // Redireciona para outra página
      window.location.href = "index.html"; // Altere para o destino real
    }
  });
});

function abrirBarraLateral() {
  document.getElementById("barraLateral").classList.add("ativa");
}

function fecharBarraLateral() {
  document.getElementById("barraLateral").classList.remove("ativa");
}