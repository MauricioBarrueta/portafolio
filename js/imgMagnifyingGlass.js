/* Efecto 'Magnifying Glass' o lupa, mediante un elemento 'div' generado sobre la imagen del proyecto */
const startMagnifyingGlass = (id, zoom) => {  
  const image = document.querySelector('.img-modal')
  image.addEventListener('click', () => {
    var projectImg, magnifier, width, height, borderWidth
    projectImg = document.getElementById(id)
    /* Se crea e inserta el elemento 'div' que dará el efecto */
    magnifier = document.createElement('div')
    magnifier.setAttribute('class', 'img-magnifier-glass')
    magnifier.style.backgroundImage = `url('${projectImg.src}')`, magnifier.style.backgroundRepeat = 'no-repeat', 
      magnifier.style.backgroundSize = `${projectImg.width * zoom}px ${projectImg.height * zoom}px`
    projectImg.parentElement.insertBefore(magnifier, projectImg)

    /* S obtienen las posiciones x, y del cursor */
    const getCursorPos = (event) => {
      var a, x = 0, y = 0
      event = event || window.event
      a = projectImg.getBoundingClientRect() /* Posiciones x, y de la imagen */      
      x = event.pageX - a.left, y = event.pageY - a.top /* Coordenadas x, y del cursor, relativas a la imagen */
      x = x - window.scrollX, y = y - window.scrollY /* Considera cualquier desplazamiento de la página (scroll) */
      return { x: x, y: y }
    }

    /* Se asignan las coordenadas x, y del cursor */
    width = magnifier.offsetWidth / 2, height = magnifier.offsetHeight / 2, borderWidth = 3
    const moveMagnifier = (event) => {
      event.preventDefault()
      var cursorPos, x, y
      cursorPos = getCursorPos(event); /* Se asigna la posición del cursor obtenida en la función */
      x = cursorPos.x, y = cursorPos.y
      /* Previene que el efecto se posicione fuera de la imagen */
      if (x > projectImg.width - (width / zoom)) x = projectImg.width - (width / zoom)
      if (x < width / zoom) x = width / zoom
      if (y > projectImg.height - (height / zoom)) y = projectImg.height - (height / zoom)
      if (y < height / zoom) y = height / zoom
      /* Manda la posición al efecto para mostrar la parte de la imagen que se está observando */      
      magnifier.style.left = `${x - width}px`, magnifier.style.top = `${y - height}px`     
      magnifier.style.backgroundPosition = '-' + ((x * zoom) - width + borderWidth) + 'px -' + ((y * zoom) - height + borderWidth) + 'px'
    }
    /* Se asignan los eventos 'mouse' y 'touch' a la imagen y al elemento del efecto */
    magnifier.addEventListener('mousemove', moveMagnifier), projectImg.addEventListener('mousemove', moveMagnifier)
    magnifier.addEventListener('touchmove', moveMagnifier, { passive: true }), projectImg.addEventListener('touchmove', moveMagnifier, { passive: true })
  })
}
document.querySelector('.img-modal').addEventListener('click', startMagnifyingGlass('project-image', 2.5))

/* Función para desactivar el efecto al dar clic sobre el botón 'zoom out' o al cerrar la ventana 'modal' */
const zoomOut = () => {
  var zoom = document.querySelectorAll(".img-magnifier-glass");
  for (var i = 0; i < zoom.length; i++) {
    zoom[i].parentNode.removeChild(zoom[i])
  }
}
document.getElementById('projectModal').addEventListener('hidden.bs.modal', zoomOut)