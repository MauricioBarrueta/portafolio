var iframe = document.getElementById('template'), iframeLoaded = false
iframe.addEventListener('load', () =>  {
    var iframeContent = iframe.contentDocument || iframe.contentWindow.document
    iframeLoaded = iframeContent !== null || iframeContent !== undefined || iframeContent !== '' ? true : false
    /* Se asignan los elementos del archivo 'template' */
    const javaTemp = iframeContent.getElementById('java-projects'), javaProjects = document.querySelectorAll('.java-project-icon')
        javaProjects.forEach(card => { card.prepend(javaTemp.content.cloneNode(true)) })
    const mysqlTemp = iframeContent.getElementById('mysql-icon'), mysqlProjects = document.querySelectorAll('.mysql-prj-icon')
        mysqlProjects.forEach(card => { card.append(mysqlTemp.content.cloneNode(true)) })
    const netbeansTemp = iframeContent.getElementById('netbeans-projects'), netbeansProjects = document.querySelectorAll('.netbeans-project-icon')
        netbeansProjects.forEach(card => { card.appendChild(netbeansTemp.content.cloneNode(true)) })
    const firebaseTemp = iframeContent.getElementById('firebase-host-projects'), firebaseProjects = document.querySelectorAll('.firebase-hosting')
        firebaseProjects.forEach(element => { element.appendChild(firebaseTemp.content.cloneNode(true)) })
    const angularTemp = iframeContent.getElementById('angular-projects'), angularProjects = document.querySelectorAll('.angular-project-icons')
        angularProjects.forEach(card => { card.prepend(angularTemp.content.cloneNode(true)) })
    const phpTemp = iframeContent.getElementById("php-projects"), phpProjects = document.querySelectorAll('.php-projects-icons')
        phpProjects.forEach(card => { card.appendChild(phpTemp.content.cloneNode(true)) })
    const staticTemp = iframeContent.getElementById('static-projects'), staticProjects = document.querySelectorAll('.static-projects-icons')
        staticProjects.forEach(card => { card.appendChild(staticTemp.content.cloneNode(true)) })
    const unityTemp = iframeContent.getElementById('unity-projects'), unityProjects = document.querySelectorAll('.unity-projects-icons')
        unityProjects.forEach(card => { card.prepend(unityTemp.content.cloneNode(true)) })
    const multiCssTemp = iframeContent.getElementById('multi-css-frameworks-projects'), multiCssProjects = document.querySelectorAll('.multi-css')
        multiCssProjects.forEach(element => { element.append(multiCssTemp.content.cloneNode(true)) })
    const springTemp = iframeContent.getElementById('spring-projects'), springProjects = document.querySelectorAll('#template-icons')
        springProjects.forEach(template => { template.parentNode.insertBefore(springTemp.content.cloneNode(true), template) })
    const skillsTemp = iframeContent.getElementById('skills-template'), skillsContainer = document.querySelectorAll('.cards-container')
        skillsContainer.forEach(skills => { skills.append(skillsTemp.content.cloneNode(true)) })
})

window.onload = () => {
    if (iframeLoaded) {
        setTimeout(function () {
            document.getElementById('loading-popup').style.display = 'none'
            document.querySelector('html').style.overflow = 'auto'
        }, 1500);
        /* Se asigna el lenguaje Español como predeterminado */
        langChange('es')

        AOS.init({ once: false })

        /* Se oculta el plugin de Google Translate para mostrarlo únicamente cuando se abra la ventana 'modal' */
        $('.goog-logo-link').empty()
        $('.goog-te-gadget').html($('.goog-te-gadget').children())

        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    } else { location.reload(true) }
}

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

/* Abre la página del archivo correspondiente al Currículum de acuerdo al idioma actual de la página */
const cvBtn = document.getElementById('btn-cv'), cvPath = 'https://mauriciobarrueta.github.io/portafolio/files/CV-Edgar-Mauricio-Barrueta-Aguirre.pdf'
cvBtn.addEventListener('click', () => {
    cvBtn.href = currLang === 'es' ? `${cvPath}#page=1` : `${cvPath}#page=2`
})

/* Se obtiene los atributos 'src'-'alt'-'title' de la imagen del proyecto seleccionado para mostrarlo en la ventana 'modal' */
const modal = document.getElementById('projectModal'), modalImg = document.querySelector('.img-modal')
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('img-item')) {  
        document.querySelector('html').style.overflow = 'hidden' //* Se deshabilita el scroll mientras la ventana esté abierta
        modalImg.src = event.target.getAttribute('src')
        $('.modal-header h6').text($(event.target).attr('data-title')), $('.modal-footer p').text($(event.target).attr('alt'))        
        /* Se activa el plugin de Google Translate */
        new google.translate.TranslateElement({ pageLanguage: 'es', includedLanguages: 'en,es', layout: google.translate.TranslateElement.InlineLayout.SIMPLE }, 'google-plugin') 
        $('.VIpgJd-ZVi9od-xl07Ob-lTBxed').removeAttr('href') //* Remueve el atributo 'href' al plugin de Google Translate
        $('#projectModal').modal('show')
        
        /* Restaura el idioma original y el scroll de la página al cerrarse la ventana */
        modal.addEventListener('hidden.bs.modal', () => {
            document.querySelector('html').style.overflow = 'auto' //* Se vuelve a habilitar el scroll de la página
            var googlePlugin = document.getElementsByClassName('VIpgJd-ZVi9od-ORHb-OEVmcd')[0]
            if (!googlePlugin) return
            var innerDoc = googlePlugin.contentDocument || googlePlugin.contentWindow.document
            var restoreLang = innerDoc.getElementsByTagName('button')
            for (var i = 0; i < restoreLang.length; i++) {
                if (restoreLang[i].id.indexOf('restore') >= 0) {
                    restoreLang[i].click()
                    var close = innerDoc.getElementsByClassName('goog-close-link')
                    close[0].click()
                    return
                }
            }
        })
    }     
});

/* Se muestran u ocultan los proyectos que se encuentran ocultos */
const projBtn = document.getElementById('show-projects'), limit = document.querySelector('.projects-limit'), hidden = document.querySelector('.hidden-projects')
projBtn.addEventListener('click', () => {
    limit.style.display === 'none' ? (limit.style.display = "inline", hidden.style.display = 'none', projBtn.href = '#Projects', projBtn.innerHTML = currLang === 'es' ? 'Ver más' : 'Show more')
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

/* Traduce el contenido de toda la página a inglés o español */
var currLang //* Almacena el idioma actual de la página
const langChange = (lang) => {
    currLang = lang
    $(`[data-${lang}]`).text( function() { return $(this).data(lang) })
    var introImg = 'https://raw.githubusercontent.com/MauricioBarrueta/portfolioImagesAPI/main/'
    document.querySelector('.intro-middle-img img').src = currLang === 'es' ? `${introImg}back-front.jpg` : `${introImg}back-front-en.webp`
    /* Idioma del atributo 'placeholder' del formulario de Contacto */
    let namePlaceholder = document.querySelector('.form-name'), emailPlaceholder = document.querySelector('.form-email')
    lang === 'es' ? (namePlaceholder.setAttribute('placeholder', 'Ingresa el nombre aquí:'), emailPlaceholder.setAttribute('placeholder', 'Ej.: correo@email.com'))
        : (namePlaceholder.setAttribute('placeholder', 'Enter the name here:'), emailPlaceholder.setAttribute('placeholder', 'E.g.: myEmail@email.com'))
}
$('.lang-btn').click(function() {
    langChange($(this).data('lang'))    
    langChangeAlert()    
})
const langChangeAlert = () => {    
    $('.changing-lang').modal('show')
    setTimeout(() => { $('.changing-lang').modal('hide') }, 3000)   
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