/* Crea el efecto lupa al pasar el cursor por las imágenes */
function startMagnifyingGlass(id, zoom = 2) {
  const projectImg = document.getElementById(id)
  if (!projectImg) return

  /* Se crea una única vez el elemento correspondiente a la lupa */
  const magnifier = document.createElement('div')
  magnifier.classList.add('img-magnifier-glass')
  magnifier.style.backgroundRepeat = 'no-repeat'
  magnifier.style.display = 'none'
  projectImg.parentElement.insertBefore(magnifier, projectImg)

  /* Función que configura los atributos background-size y background-image dependiendo las dimensiones de la imagen */    
  const configureBackground = () => {
    const rect = projectImg.getBoundingClientRect()
    
    /* Se obtiene el tamaño actual de la pantalla */
    const dispW = rect.width
    const dispH = rect.height
    //* Si la imagen aún no tiene dimensiones, usa el natural como respaldo
    const safeW = dispW || projectImg.naturalWidth || projectImg.width
    const safeH = dispH || projectImg.naturalHeight || projectImg.height

    /* Ajusta el tamaño del fondo dependiendo el valor del zoom y asigna la imagen como background de la lupa, ambas acciones una única vez */
    magnifier.style.backgroundSize = `${safeW * zoom}px ${safeH * zoom}px`
    magnifier.style.backgroundImage = `url('${projectImg.src}')`
  };

  /* Función que agrega el movimiento a la lupa, actualizando la posición y el valor de la propiedad background-position */
  const moveMagnifier = (event) => {
    event.preventDefault()
    const rect = projectImg.getBoundingClientRect()

    /* Obtiene la posición del cursor relativa al de la imagen */
    let x = event.pageX - rect.left - window.scrollX
    let y = event.pageY - rect.top - window.scrollY

    const imgW = rect.width
    const imgH = rect.height
    const w = magnifier.offsetWidth / 2
    const h = magnifier.offsetHeight / 2

    //* Se limita el movimiento de la lupa para que no se salga de la imagen
    if (x > imgW - (w / zoom)) x = imgW - (w / zoom)
    if (x < w / zoom) x = w / zoom
    if (y > imgH - (h / zoom)) y = imgH - (h / zoom)
    if (y < h / zoom) y = h / zoom
    
    /* Posiciona la lupa centrada en el cursor y ajusta la zona de la imagen que se esta mostrando con zoom */
    magnifier.style.left = `${x - w}px`; magnifier.style.top = `${y - h}px`    
    magnifier.style.backgroundPosition = `-${(x * zoom) - w}px -${(y * zoom) - h}px`
  };

  /* Se dispara el evento cuando el cursor se pasa sobre la imagen, activando la lupa */
  projectImg.addEventListener('mouseenter', () => {
    configureBackground()
    magnifier.style.display = 'block'
  });

  /* Se dispara al mover el cursor a través de la imagen, actualizando la posición de la lupa */
  projectImg.addEventListener('mousemove', moveMagnifier)

  /* Se dispara al quitar el cursor de la imagen, ocultando la lupa */
  projectImg.addEventListener('mouseleave', () => {
    magnifier.style.display = 'none'
  });

  /* Verifica si la propiedad 'src' de la imagen cambia */
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      //* Si cambia, actualiza el background de la lupa
      if (m.type === 'attributes' && m.attributeName === 'src') {
        configureBackground()
      }
    }
  });
  /* Se activa el observable para detectar cambios en la imagen en tiempo real */
  observer.observe(projectImg, { attributes: true })

  /* Previene errores de responsividad, si la lupa esta activa y cambia el tamaño de la pantalla, se recalcula el fondo */
  window.addEventListener('resize', () => {
    if (magnifier.style.display !== 'none') configureBackground()
  });

  /* Para permitir que también funcione en pantallas táctiles */
  projectImg.addEventListener('touchstart', (e) => {
    e.preventDefault() //* Previene que se abra el popup del navegador

    configureBackground()
    magnifier.style.display = 'block'
    //* Posiciona la lupa de acuerdo a la posición del primer toque
    if (e.touches && e.touches[0]) moveMagnifier(e.touches[0])
  }, { passive: false });

  /* Se dispara al mover el deslizar el dedo en la pantalla, actualizando la posición de la lupa */
  projectImg.addEventListener('touchmove', (e) => {
    e.preventDefault()

    if (e.touches && e.touches[0]) moveMagnifier(e.touches[0])
  }, { passive: false });

  /* Se dispara al levantar el dedo de la pantalla, ocultando la lupa */
  projectImg.addEventListener('touchend', () => {
    magnifier.style.display = 'none'
  });
}

/* Se inicializa la lupa en los elementos que se deseen */
document.addEventListener('DOMContentLoaded', () => {
  startMagnifyingGlass('intro-middle-img', 1.5) //* Introducción
  startMagnifyingGlass('project-image', 1.5) //* Proyectos
});