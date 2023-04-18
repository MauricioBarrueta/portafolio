/* Evento que inicializa la función al dar clic sobre la imagen */
const img = document.querySelector('.img-modal');
img.addEventListener('click', startMagnifyingGlass("myimage", 2.5));

/* Función que habilita la lupa (Magnifying Glass) */
function startMagnifyingGlass(imgId, zoomValue) {  
  const getImgClick = document.querySelector('.img-modal');
  getImgClick.addEventListener("click", function () {
    var selectedImage, magnifyingGlass, width, height, bw;
    selectedImage = document.getElementById(imgId);
    /* Se crea el div y su clase que conendrá la Magnifying Glass */
    magnifyingGlass = document.createElement("div");
    magnifyingGlass.setAttribute("class", "img-magnifier-glass");
    selectedImage.parentElement.insertBefore(magnifyingGlass, selectedImage);
    /* Se le asignan las propiedades */
    magnifyingGlass.style.backgroundImage = "url('" + selectedImage.src + "')";
    magnifyingGlass.style.backgroundRepeat = "no-repeat";
    magnifyingGlass.style.backgroundSize = (selectedImage.width * zoomValue) + "px " + (selectedImage.height * zoomValue) + "px";
    bw = 3;
    width = magnifyingGlass.offsetWidth / 2;
    height = magnifyingGlass.offsetHeight / 2;

    /* Ejecuta la función al mover la lupa sobre la imagen */
    magnifyingGlass.addEventListener("mousemove", moveMagnifier);
    selectedImage.addEventListener("mousemove", moveMagnifier);
    /* Para pantallas touch */
    magnifyingGlass.addEventListener("touchmove", moveMagnifier, { passive: true });
    selectedImage.addEventListener("touchmove", moveMagnifier, { passive: true });

    /* Función en donde se asignan las coordenadas 'x' y 'y' del cursor */
    function moveMagnifier(e) {
      var cursorPosition, x, y;
      e.preventDefault(); /* Previente cualquier otra acción que pueda ocurrir mientras este activa la lupa */
      cursorPosition = getCursorPos(e); /* Se le asigna a la variable la posición del cursor obtenida en la función */
      x = cursorPosition.x;
      y = cursorPosition.y;
      /* Para prevenir que la lupa se posicione fuera de la imagen */
      if (x > selectedImage.width - (width / zoomValue)) { x = selectedImage.width - (width / zoomValue); }
      if (x < width / zoomValue) { x = width / zoomValue; }
      if (y > selectedImage.height - (height / zoomValue)) { y = selectedImage.height - (height / zoomValue); }
      if (y < height / zoomValue) { y = height / zoomValue; }

      /* Manda la posición de la lupa */
      magnifyingGlass.style.left = (x - width) + "px";
      magnifyingGlass.style.top = (y - height) + "px";
      /* Muestra lo que la lupa esta observando */
      magnifyingGlass.style.backgroundPosition = "-" + ((x * zoomValue) - width + bw) + "px -" + ((y * zoomValue) - height + bw) + "px";
    }

    /* Funcion que obtiene las posiciones 'x', 'y' del cursor */
    function getCursorPos(e) {
      var a, x = 0, y = 0;
      e = e || window.event;
      /* Obtiene las posiciones 'x', 'y' de la imagen */
      a = selectedImage.getBoundingClientRect();
      /* Calcula las coordenadas 'x', 'y' del cursor, relativas a la imagen */
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /* Considera cualquier desplazamiento de la página (scroll) */
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x: x, y: y };
    }
  })

  /* Función que desactiva el zoom al tocar el botón */
  const ZoomOut = document.querySelector('.zoomout')
  ZoomOut.addEventListener('click', zoomOut)
  function zoomOut() {
    var zooms = document.querySelectorAll(".img-magnifier-glass");
    for (var x = 0; x < zooms.length; x++) {
      zooms[x].parentNode.removeChild(zooms[x]);
    }
  }

  /* Función que desactiva el zoom al cerrar el modal */
  const myModal = document.getElementById('imgPopUpModal')
  myModal.addEventListener('hidden.bs.modal', event => {
    var zooms = document.querySelectorAll(".img-magnifier-glass");
    for (var x = 0; x < zooms.length; x++) {
      zooms[x].parentNode.removeChild(zooms[x]);
    }
  })
}