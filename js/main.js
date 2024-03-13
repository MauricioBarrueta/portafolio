window.onload = () => {
    setTimeout(function () {
        $('#loading').hide(152);
        $('html').css("overflow", "auto");
    }, 1500);

    /* Se activa la animación del texto de la introducción y el scroll */
    $('.h1-h').css("animation-delay", "1.52s");
    switchLang('es') 

    var tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    var tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))           
}

$(document).ready(function () {     
    /* Verifica si el iframe se ha cargado */
    var iframe = document.getElementById('iframeTemplate');
    if(iframe === null) window.location.reload()

    /* Se inicializa AOS Library */
    AOS.init({ 
        startEvent: 'DOMContentLoaded', once: true, delay: 150, duration: 950, easing: 'ease-out' 
    });    

    /* Resalta el texto en la navbar de acuerdo a la sección en la que se encuentra */
    $('.navbar').on('click', 'a', function () { 
        $('.navbar a.active').removeClass('active');
        $(this).addClass('active');
    });
    $('body').scrollspy({ target: '.navbar' });

    /* Oculta el gadget de Google Translate para mostrarlo únicamente cuando se muestre el Modal */
    $(".goog-logo-link").empty();
    $('.goog-te-gadget').html($('.goog-te-gadget').children());
})

/* Función que da el efecto 'parallax' a la imagen de fondo al hacer scroll */
const parallaxMain = document.querySelectorAll('.main'),  parallaxContact = document.querySelectorAll(".contactme"), 
    parallaxFooter = document.querySelectorAll('.footer');
window.addEventListener("scroll", function () {
    let offset = window.scrollY;
    parallaxMain.forEach(function (parallaxEffect) {
        parallaxEffect.style.backgroundPositionY = (offset - parallaxEffect.offsetTop) * 0.6 + "px";
    }) 
    parallaxContact.forEach(function (parallaxEffect) {
        parallaxEffect.style.backgroundPositionY = (offset - parallaxEffect.offsetTop) * 0.6 + "px";
    }) 
    parallaxFooter.forEach(function (parallaxEffect) {
        parallaxEffect.style.backgroundPositionY = (offset - parallaxEffect.offsetTop) * 0.6 + "px";
    })   
})

/* Hace visible el bóton al iniciar el scroll hacia abajo y se crea la función que permite volver al inicio */
window.addEventListener('scroll', () => {    
    btnScrollToTop.style.display = window.scrollY > 200 ? 'block' : 'none';
    btnScrollToTop.style.opacity = window.scrollY > 200 ? '.85' : '0';
});
const btnScrollToTop = document.querySelector('.ScrollToTop');
btnScrollToTop.addEventListener('click', () => {
    window.scrollTo({ 
        top: 0, left: 0, behavior: "smooth" 
    });
});

/* Para dar el efecto 'sticky' a la navbar al pasar por el elemento oculto <span> con clase 'trigger' */
(new IntersectionObserver(function (trigger) {
    trigger[0].intersectionRatio > 0 ? document.documentElement.removeAttribute('class') : document.documentElement.setAttribute('class', 'stuck');
})).observe(document.querySelector('.trigger'));
/* Oculta la lista desplegable de la navbar después de seleccionar un link (pantallas pequeñas) */
$('.navbar-nav>li>a').on('click', function() { $('.navbar-collapse').collapse('hide'); });

/* Abre la página del CV de acuerdo al idioma actual del sitio */
const openCvButton = document.getElementById('btn-cv')
const cvFileUrl = 'https://mauriciobarrueta.github.io/portafolio/files/CV-Edgar Mauricio Barrueta Aguirre.pdf'
openCvButton.addEventListener('click', () => {
    openCvButton.href = actualLang == 'es' ? `${cvFileUrl}#page=1` : `${cvFileUrl}#page=2`
})

/* Obtiene el atributo src, alt y title de la imagen del proyecto seleccionado y se pasan al Modal */
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('img-item')) {  
        $('html').css("overflow", "hidden") /* Se deshabilita el scroll de la página mientras la ventana esté abierta */  
        const projectImage = e.target.getAttribute('src');
        document.querySelector('.img-modal').src = projectImage;
        const myModal = new bootstrap.Modal(document.getElementById('imgPopUpModal'));
        $("#imgPopUpModal p").text($(e.target).attr('alt')); 
        $("#imgPopUpModal h6").text($(e.target).attr('data-title')); 
        
        /* Se activa la barra de Google Translate */
        new google.translate.TranslateElement({ pageLanguage: 'es', includedLanguages: 'en,es', 
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE }, 'google_translate_element'); 
        $('.VIpgJd-ZVi9od-xl07Ob-lTBxed').removeAttr('href') /* Se le quita el atributo 'href' a la barra de Google Translate */
        myModal.show();
    }     
});

/* Muestra un alert (SweetAlert2) al dar clic en un proyecto que usa Firebase Hosting */
const alertFirebaseHost = (url) => {    
    Swal.fire({
        titleText: 'En caso de que el navegador por defecto bloqueé el sitio, da clic en un ícono similar a "\u{f023}" para permitir de manera manual el acceso a la página',
        text: '** Esta acción NO afecta absolutamente en nada la seguridad del navegador ni mucho menos la de tu dispositivo **',        
        confirmButtonText: 'OK',
        confirmButtonColor: '#4B7F83'
    }).then((result) => {
        if (result.value) {
            window.open(url, '_blank')
        }
    });    
}

/* Función que restaura el idioma original de la página al cerrar el Modal */
const ImageModal = document.getElementById('imgPopUpModal')
ImageModal.addEventListener('hidden.bs.modal', function () {
    $('html').css("overflow", "auto"); /* Se habilita nuevamente el scroll de la página al cerrar la ventana */
    var googleTranslateFrame = document.getElementsByClassName('VIpgJd-ZVi9od-ORHb-OEVmcd')[0];
    if (!googleTranslateFrame) return;
    var innerDoc = googleTranslateFrame.contentDocument || googleTranslateFrame.contentWindow.document;
    var restoreLang = innerDoc.getElementsByTagName("button");
    for (var i = 0; i < restoreLang.length; i++) {
        if (restoreLang[i].id.indexOf("restore") >= 0) {
            restoreLang[i].click();
            var close = innerDoc.getElementsByClassName("goog-close-link");
            close[0].click();
            return;
        }
    }
});

/* Muestra u oculta los proyectos correspondientes */
const showHideBtn = document.getElementById("show-more-projects");
showHideBtn.addEventListener('click', () => {
    const visibleLimit = document.querySelector('.projects-limit')
    const hideProjects = document.querySelector(".hidden-projects");
    if(visibleLimit.style.display === 'none') {
        visibleLimit.style.display = "inline", hideProjects.style.display = "none", showHideBtn.href = '#Projects',
        showHideBtn.innerHTML = `Ver más &nbsp; \u{f078} &nbsp; See more`        
    } else {            
        visibleLimit.style.display = "none", hideProjects.style.display = "flex", hideProjects.style.flexWrap = 'wrap', hideProjects.style.justifyContent = 'center',       
        hideProjects.style.gap = '15px', showHideBtn.innerHTML = `Ver menos &nbsp; \u{f077} &nbsp; See less`, showHideBtn.href = 'javascript:;'
    } 
})

/* Función que obtiene los datos del formulario para enviar el correo electrónico mediante el esquema 'mailto' */
const emailForm = document.querySelector('#c-form'), btnEmailTo = document.querySelector('#myEmail');
emailForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(emailForm)
    const btnSendEmail = $('#btnSendEmail')
    const btnHtmlElements = btnSendEmail.html() /* Almacena las caracteristicas del botón */
    /* Agrega un spinner y texto al botón antes de completar el envío del formulario */
    $(btnSendEmail).html('Procesando...&nbsp;<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>').prop('disabled', true)
    setTimeout(function () {
        $(btnSendEmail).html(btnHtmlElements).prop('disabled', false) /* Restaura el botón a su valor inicial */
        btnEmailTo.setAttribute('href', `mailto:mauba22@outlook.com?subject=Te contacto desde tu portafolio: ${formData.get('name')} - ${formData.get('email')}&body=${formData.get('message')}`)
        btnEmailTo.click();
    }, 4000)
});

/* Función para copiar el correo electrónico al portapapeles */
const btnCopyEmail = document.querySelector('.copy-btn')
btnCopyEmail.addEventListener('click', () => {
    var copyText = document.getElementById("email-copy");
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* Para dispositivos móviles */
    navigator.clipboard.writeText(copyText.value)
        .then(() => {
            showAlertSpan()
            alertText.innerHTML = `Copiado al portapapeles - Copied to clipboard &#xf328;`
        })
        .catch(() => {
            showAlertSpan()
            alertText.innerHTML = `Error inesperado - Unexpected error &#xf071;`
        });
});

/* Función para traducir la página entre Inglés y Español */
var actualLang
function switchLang(lang) {
    $("[data-" + lang + "]").text(function (i, e) { return $(this).data(lang);  });
    actualLang = lang
}
$(".switchlang").click(function () {
    modalSpinner()
    switchLang($(this).data("lang"))    
});
const modalSpinner = () => {
    $('.modalSpinner').modal('show');
    setTimeout(function () { $('.modalSpinner').modal('hide'); }, 3000)
}

const alertDialog = document.getElementById('alertSpan'), alertText = document.getElementById('alert-text'),
    closeAlert = document.querySelector('.close-alert');
/* Función que muestra un Alert dependiendo la acción que lo requiera */
const showAlertSpan = () => {   
    alertDialog.classList.remove('hide');
    alertDialog.classList.add('show');   
    setTimeout(function () { closeAlertSpan(); }, 5000);
}
const closeAlertSpan = () => {
    alertDialog.classList.remove('show');
    alertDialog.classList.add('hide');     
}
closeAlert.addEventListener('click', closeAlertSpan)