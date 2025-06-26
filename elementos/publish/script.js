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
      window.location.href = "outra-pagina.html"; // Altere para o destino real
    }
  });
});
