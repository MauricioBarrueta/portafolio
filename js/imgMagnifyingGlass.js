var imageSRC;
function getSRC(_src) { /* Función que obtiene el 'src' de la imagen seleccionada */ 
  imageSRC= _src;   
}

function magnify(imgID, zoom) { /* Función que habilita la lupa (Magnifying Glass) */
  const ImageClick = document.querySelector('.img-modal');
  ImageClick.addEventListener("click", function() { /* Listener que al dar clic sobre la imagen del modal activa la función 'magnify' */
    var src = imageSRC;    

    var img, glass, w, h, bw;
    img = document.getElementById(imgID);    
  
    /* Se crea el div y su clase que conendrá la Magnifying Glass */
    glass = document.createElement("DIV");
    glass.setAttribute("class", "img-magnifier-glass");  
    /* Se insertan los elementos en el nuevo div */    
    img.parentElement.insertBefore(glass, img);

    /* Se le asignan las propiedades */  
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;
  
    /* Ejecuta la función al mover la lupa sobre la imagen */   
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);
  
    /* Para pantallas touch */
    glass.addEventListener("touchmove", moveMagnifier, {passive: true});
    img.addEventListener("touchmove", moveMagnifier, {passive: true});
    function moveMagnifier(e) {
      var pos, x, y;      
      e.preventDefault(); /* Previente cualquier otra acción que pueda ocurrir mientras este activa la lupa */      
      pos = getCursorPos(e); 
      x = pos.x;
      y = pos.y;

      /* Para prevenir que la lupa se posicione fuera de la imagen */     
      if (x > img.width - (w / zoom)) { x = img.width - (w / zoom); }
      if (x < w / zoom) { x = w / zoom; }
      if (y > img.height - (h / zoom)) { y = img.height - (h / zoom); }
      if (y < h / zoom) { y = h / zoom; }

      /* Manda la posición de la lupa */     
      glass.style.left = (x - w) + "px";
      glass.style.top = (y - h) + "px";

      /* Muestra lo que la lupa esta observando */     
      glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
    }
  
    /* Funcion que obtiene las posiciones x,y del cursor */
    function getCursorPos(e) {
      var a, x = 0, y = 0;
      e = e || window.event;
      /* Obtiene las posiciones x, y de la imagen */     
      a = img.getBoundingClientRect();
      
      /* Calcula las coordenadas x,y del cursor, relativas a la imagen */     
      x = e.pageX - a.left;
      y = e.pageY - a.top;

      /* Considera cualquier desplazamiento de la página (scroll) */      
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x : x, y : y };
    }
  })

  /* Función que desactiva el zoom al tocar el botón */
  const ZoomOut = document.querySelector('.zoomout')
  ZoomOut.addEventListener('click', zoomOut)
  function zoomOut() {
    var zooms = document.querySelectorAll(".img-magnifier-glass");
    for(var x = 0; x < zooms.length; x++) {
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
