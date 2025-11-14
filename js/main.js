window.onload = () => {
    //* Se agregaron intentos para prevenir que la página se quede en el loader en el raro caso de que falle el fetch()
    const loadRetries = 3
    let attempts = 0
    /* Se obtienen los template antes de que se ejecute cualquier otra función */
    const loadTemplates = () => {
        attempts++
        fetch('./templates/templates.html')
            .then(res => {
                /* Verifica si el status es diferente de 200 (OK), si es así, se manda el error al catch() */
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`)
                }
                //* Se convierte todo el contenido del template a texto
                return res.text()
            })
            /* Se crea un elemento <div> en dónde se inyecta todo el contenido del template */
            .then(tempText => {
                const templateDiv = document.createElement('div')
                templateDiv.style.display = 'none'
                templateDiv.innerHTML = tempText
                document.body.appendChild(templateDiv)

                //* Estructura del map: [ id, selector CSS del destino, método ]
                const mapTempContent = [
                    ['java-projects', '.java-project-icon', 'prepend'],
                    ['netbeans-projects', '.netbeans-project-icon', 'appendChild'],
                    ['mysql-icon', '.mysql-prj-icon', 'append'],
                    ['firebase-host-projects', '.firebase-hosting', 'appendChild'],
                    ['angular-projects', '.angular-project-icons', 'prepend'],
                    ['php-projects', '.php-projects-icons', 'appendChild'],
                    ['static-projects', '.static-projects-icons', 'appendChild'],
                    ['unity-projects', '.unity-projects-icons', 'prepend'],
                    ['multi-css-frameworks-projects', '.multi-css', 'append'],
                    ['skills-template', '.cards-container', 'append']
                ];

                /* Verifica si existe el template, si existe, lo clona e inyecta en los elementos que coincidan con el selector CSS */
                mapTempContent.forEach(([id, selector, method]) => {
                    const template = templateDiv.querySelector(`#${id}`)
                    if (!template || template.tagName !== 'TEMPLATE') {
                        console.log(`Error al obtener el template ${id}`)
                        return
                    }
                    const selectors = document.querySelectorAll(selector)
                    selectors.forEach(item => {
                        item[method](template.content.cloneNode(true))
                    });
                });
                /* Template que se inyecta aparte ya que usa el método insertBefore() */
                const springTemp = templateDiv.querySelector('#spring-projects')
                const springSelectors = document.querySelectorAll('#template-icons')
                springSelectors.forEach(temp => { temp.parentNode.insertBefore(springTemp.content.cloneNode(true), temp) });                

                //* Se elimina el elemento <div> previamente creado en donde se insertó todo el contenido del template
                templateDiv.remove()

                runAfterTempLoad()
            })
            .catch(e => {
                console.error(`Error inesperado no. ${attempts} de cargar el template: `, e)
                const errorMsg = document.querySelector('#status-not-ok'), errorMsgText = document.querySelector('#status-error-text')
                attempts < loadRetries ? setTimeout(() => { loadTemplates() }, 1000) : (errorMsgText.textContent = savedLang === 'es' ? 'No fue posible cargar el contenido. Verifique su conexión e intente nuevamente' : 'Unable to load the content. Please check your connection and try again', errorMsg.style.display = 'flex') 
            });
    }

    const savedLang = localStorage.getItem('lang')
    /* Se ejecuta solo si no hubo ningún error al obtener los templates, de lo contrario, se muestra un mensaje de error arriba del loader */
    const runAfterTempLoad = () => {
        /* Verifica si existe un idioma almacenado en localStorage o si se asigna uno por defecto */
        savedLang ? langChange(savedLang) : langChange('es')

        //* Si detecta que la página se recargó despues de haber desactivado Google Translate se muestra el loader sin llamar a la función setTimeout
        const hideLoader = () => {
            document.getElementById('loading-popup').style.display = 'none'
            document.querySelector('html').style.overflow = 'auto'
        };
        const ignoreLoader = localStorage.getItem('ignoreLoader') === 'true'        
        ignoreLoader ? (hideLoader(), localStorage.removeItem('ignoreLoader')) : setTimeout(hideLoader, 1500)

        AOS.init({ once: false })

        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    }
    
    loadTemplates()
};


/* Da el efecto 'Parallax' a la imagen de fondo de toda la sección 'Main' y la sección de 'Contact' */
const main = document.querySelectorAll('.main'), contact = document.querySelectorAll(".contactme")
window.addEventListener("scroll", () => {
    let offset = window.scrollY
    main.forEach((parallax) => { parallax.style.backgroundPositionY = (offset - parallax.offsetTop) * 0.6 + 'px' }) 
    contact.forEach((parallax) => { parallax.style.backgroundPositionY = (offset - parallax.offsetTop) * 0.6 + 'px' }) 
})

/* Muestra u oculta el botón 'scroll to top' al deslizar hacia abajo, además de que se asigna el evento */
const scrollTopBtn = document.querySelector('.scroll-to-top')
window.addEventListener('scroll', () => {    
    scrollTopBtn.style.display = window.scrollY > 200 ? 'block' : 'none', scrollTopBtn.style.opacity = window.scrollY > 200 ? '.85' : '0'    
});

/* Se cambia la posición de la navbar a 'sticky-top' usando la API Intersection Observer, que es llamada cuando el elemento 'target' intercepta la parte superior de la página */
(new IntersectionObserver((trigger) => {
    trigger[0].intersectionRatio > 0 ? document.documentElement.removeAttribute('class') : document.documentElement.setAttribute('class', 'stuck')
})).observe(document.querySelector('.trigger'))

/* Oculta automáticamente la navbar cuando navbar-toggler está visible y se da clic en cualquier link */
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link")
    const navbarCollapse = document.getElementById("navbarNav")

    /* Se obtiene la instancia del collapse activo y lo oculta al hacer clic en cualquiera de los links */
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse)
            bsCollapse.hide()
        });
    });
});

/* Abre la página del archivo correspondiente al Currículum de acuerdo al idioma actual de la página */
const cvBtn = document.getElementById('btn-cv'), cvPath = 'https://mauriciobarrueta.github.io/portafolio/files/CV-Edgar-Mauricio-Barrueta-Aguirre.pdf'
cvBtn.addEventListener('click', () => {
    cvBtn.href = currLang === 'es' ? `${cvPath}#page=1` : `${cvPath}#page=2`
})

/* Se obtiene los atributos 'src', 'alt' y 'title' de la imagen del proyecto seleccionado para mostrarlo en el Modal */
const modal = document.getElementById('projectModal'), modalImg = document.querySelector('.img-modal')
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('img-item')) {  
        document.querySelector('html').style.overflow = 'hidden' //* Se deshabilita el scroll mientras la ventana esté abierta
        modalImg.src = event.target.getAttribute('src')
        $('.modal-header h6').text($(event.target).attr('data-title')), $('.modal-footer p').text($(event.target).attr('alt')) 

        /* Activa Google Translate si el idioma actual es inglés */
        if (currLang === 'en') {
            enableTranslation('en')            
            const redirect = localStorage.getItem('redirectAfterTranslate') //* Valor en localStorage creado en enableTranslation()
            if (redirect === 'true') {
                localStorage.removeItem('redirectAfterTranslate') 
                /* Para prevenir que cargue el traductor antes que el contenido de la ruta */
                setTimeout(() => {
                    loadGoogleTranslate()
                }, 300);
            }
        }
        $('#projectModal').modal('show')
        /* Función que se ejecuta al cerrar el Modal */
        modal.addEventListener('hidden.bs.modal', () => {
            //* Verifica si se activó el traductor, si es así, el scroll del sitio se habilita automáticamente después de recargar el sitio
            if(currLang === 'es') document.querySelector('html').style.overflow = 'auto'

            /* Se deshabilita Google Translate si es que se activó, regresando al idioma inglés del sitio guardado en localStorage */
            if(currLang === 'en') { this.destroyGoogleTranslate() }            
        })
    }     
});

/* Permite mostrar u ocultar los proyectos que se ocultan automáticamente en pantallas menores a 800 píxeles. */
const projBtn = document.getElementById('show-projects'), limit = document.querySelector('.projects-limit'), hidden = document.querySelector('.hidden-projects')
projBtn.addEventListener('click', () => {
    limit.style.display === 'none' ? (limit.style.display = "contents", hidden.style.display = 'none', projBtn.href = '#Projects', projBtn.innerHTML = currLang === 'es' ? 'Ver más' : 'Show more')
        : (limit.style.display = 'none', hidden.style.display = 'contents', projBtn.href = 'javascript:;', projBtn.innerHTML = currLang === 'es' ? 'Ver menos' : 'Show less')
});

/* Se obtienen los datos del formulario para enviar un e-mail mediante el esquema 'mailto' */
const contactForm = document.querySelector('.contact-form-container'), mailto = document.querySelector('#mailto'), sendBtn = document.getElementById('send-email-btn')
contactForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(contactForm), spinner = `&nbsp;<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`
    sendBtn.disabled = true, sendBtn.innerHTML = currLang === 'es' ? `Procesando... ${spinner}` : `Processing... ${spinner}`     
    setTimeout(function () {
        sendBtn.disabled = false, sendBtn.innerHTML = currLang === 'es' ? 'Enviar' : 'Send'  
        alertText.innerHTML = currLang === 'es' ? `Espere un momento, la aplicación del correo se iniciará en breve...` : `Please wait, the email app will be initialized soon...`
        showAlert()             
        mailto.setAttribute('href', `mailto:mauba22@outlook.com?subject=Hola, te contacto desde tu portafolio, soy ${formData.get('name')}, mi correo es: ${formData.get('email')}&body=${formData.get('message')}`)
        mailto.click()
    }, 3500)    
});
/* Se asigna el URL de LinkedIn dependiendo el idioma actual */
const linkedinBtn = document.getElementById('linkedin-url'), linkedinUrl = 'http://www.linkedin.com/in/mauricio-barrueta'
linkedinBtn.addEventListener('click', () => {linkedinBtn.href = currLang === 'es' ? `${linkedinUrl}` : `${linkedinUrl}/?locale=en_US` })

/* Traduce el contenido de toda la página a inglés o español */
var currLang //* Almacena el idioma actual de la página
const langChange = (lang) => {
    currLang = lang
    localStorage.setItem('lang', lang) //* Se almacena el lenguaje en el localStorage
    $(`[data-${lang}]`).text( function() { 
        return $(this).data(lang) 
    })

    //* Cambia la imagen central de la introducción dependiendo el idioma
    document.querySelector('.intro-middle-img img').src = currLang === 'es' ? `./img/back-front-es.webp` : `./img/back-front-en.webp`

    //* Cambia el valor del atributo 'data-label-hover' de un elemento en la sección de 'Sobre mí'
    const nameHeading = document.querySelector('.abt-name-text')
    nameHeading.dataset.labelHover = currLang === 'es' ? 'Desarrollador Web' : 'Web Developer' 

    //* Cambia los valores del atributo 'placeholder' del form en la sección de 'Contacto' */
    let namePlaceholder = document.querySelector('.form-name'), emailPlaceholder = document.querySelector('.form-email')
    lang === 'es' ? (namePlaceholder.setAttribute('placeholder', 'Ingresa tu nombre'), emailPlaceholder.setAttribute('placeholder', 'Ejemplo: correo@email.com'))
        : (namePlaceholder.setAttribute('placeholder', 'Enter your name'), emailPlaceholder.setAttribute('placeholder', 'Example: user@email.com'))
}
$('.lang-btn').click(function() {
    langChange($(this).data('lang'))    
    langChangeAlert()    
})
const langChangeAlert = () => {    
    $('.changing-lang').modal('show')
    setTimeout(() => { 
        $('.changing-lang').modal('hide') 
    }, 2500)   
}

/* Función para copiar el correo electrónico al portapapeles y mostrar un mensaje de alerta */
const btnCopyEmail = document.querySelector('.copy-btn')
btnCopyEmail.addEventListener('click', () => {
    var text = document.getElementById('email-copy')
    text.select(), text.setSelectionRange(0, 99999) //* Rango para celulares
    navigator.clipboard.writeText(text.value)
    .then(() => { alertText.innerHTML = currLang === 'es' ? `Correo electrónico copiado al portapapeles` : `E-mail copied to clipboard`, showAlert() })
    .catch(() => { alertText.innerHTML = currLang === 'es' ? `Error inesperado, inténtelo de nuevo` : `Unexpected error, try again`, showAlert() })
})

/* Se muestra u oculta un 'alert' al copiar el e-mail o al enviar un e-mail */
const alertDialog = document.getElementById('alert-popup'), alertText = document.getElementById('alert-text')
const showAlert = () => {   
    alertDialog.classList.remove('hide'), alertDialog.classList.add('show')  
    setTimeout(() => { closeAlert() }, 5000)
}
const closeAlert = () => { alertDialog.classList.remove('show'), alertDialog.classList.add('hide') }

/* Crea la cookie googtrans y habilita el traductor de Google */
const enableTranslation = (lang) => {
    const googTrans = `/es/${lang}` //* Traducción 'es' a 'en'
    //* Se establece 1 año como tiempo de expiración para la cookie que almacena la traducción
    const expireDate = new Date()
    expireDate.setFullYear(expireDate.getFullYear() + 1)

    //* Se crea la cookie 'googtrans' con la cual Google Translate detecta el idioma a utilizar y se guarda en el localStorage
    document.cookie = `googtrans=${googTrans};path=/;domain=${window.location.hostname};expires=${expireDate.toUTCString()}`
    localStorage.setItem('googtrans', googTrans)
    //* Verifica si se debe activar el traductor después de abrir el Modal
    localStorage.setItem('redirectAfterTranslate', 'true')
}

const loadGoogleTranslate = () => {
    if ((window).google?.translate?.TranslateElement) { //* Se verifica si ya se cargó el script
      this.initGoogleTranslate()
      return
    }
    /* Se define la función global que Google Translate espera recibir al cargar el script */
    (window).googleTranslateElementInit = () => { this.initGoogleTranslate() }
    //* Si no se a cargado se crea el elemento de Google Translate para agregarlo al body
    if (!document.getElementById('google_translate_script')) {
      const script = document.createElement('script')
      script.id = 'google_translate_script'
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit' /* Se asigna la función global */
      document.body.appendChild(script)
    }
}

/* Para activar el widget y asignar los idiomas que estarán disponibles, en este caso la traducción es automática */
initGoogleTranslate = () => {
    new (window).google.translate.TranslateElement({
      pageLanguage: 'es',
      includedLanguages: 'en,es',
    }, 'google_translate_element')
}

/* Para desactivar el traductor y volver al idioma original del sitio */
destroyGoogleTranslate = () => {
    const expireDate = new Date()
    //* Se establece 1 año como tiempo de expiración para la cookie que almacena la traducción
    expireDate.setFullYear(expireDate.getFullYear() + 1)

    //* Se restablecen los valores originales de la cookie 'googtrans' y el valor almacenado en el localStorage, definido en el service del traductor
    document.cookie = `googtrans=/en/en;path=/;domain=${window.location.hostname};expires=${expireDate.toUTCString()}`
    localStorage.setItem('googtrans', '/en/en')
    localStorage.removeItem('redirectAfterTranslate')
    localStorage.setItem('ignoreLoader', 'true') //* Evita que se active el setTimeout del Loader al recargar

    /* Se muestra un overlay para evitar que el usuario realice cualquier acción mientras se recarga el sitio, se remueve automáticamente después */
    const overlay = document.createElement('div')
    overlay.id = 'disable-overlay'
    document.body.appendChild(overlay)

    location.reload()
}