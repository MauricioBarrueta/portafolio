/* Evento que muestra un gif mientras se termina de cargar la página, además de mostrarlo por 3seg más */
$(window).on('load', function () { 
    setTimeout(function () {
        $('#loading').toggle(322);
        /* Se activa la animación del texto de la introducción y la barra del navegador */
        $('.h1-h').css("animation-delay", "3.22s");
        $('html').css("overflow", "auto");
    }, 3000);
})

$(document).ready(function () {
    AOS.init({ once: true, duration: 850, delay: 0, easing: 'ease-in-out' }); /* Se inicializa AOS Library */
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
    let offset = window.pageYOffset;
    parallaxMain.forEach(function (parallaxEffect, i) {
        parallaxEffect.style.backgroundPositionY = (offset - parallaxEffect.offsetTop) * 0.6 + "px";
    }) 
    parallaxContact.forEach(function (parallaxEffect, i) {
        parallaxEffect.style.backgroundPositionY = (offset - parallaxEffect.offsetTop) * 0.6 + "px";
    }) 
    parallaxFooter.forEach(function (parallaxEffect, i) {
        parallaxEffect.style.backgroundPositionY = (offset - parallaxEffect.offsetTop) * 0.6 + "px";
    })   
})

/* Hace visible el bóton al iniciar el scroll hacia abajo */
window.addEventListener('scroll', () => {
    btnScrollToTop.style.display = window.scrollY > 150 ? 'block' : 'none';
});
/* Función que permite regresar al inicio al dar clic en el botón */
const btnScrollToTop = document.querySelector('.ScrollToTop');
btnScrollToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
});

/* Para dar el efecto 'sticky' a la navbar al pasar por el elemento oculto <span> con clase 'trigger' */
(new IntersectionObserver(function (e, o) {
    e[0].intersectionRatio > 0 ? document.documentElement.removeAttribute('class') : document.documentElement.setAttribute('class', 'stuck');
})).observe(document.querySelector('.trigger'));
/* Oculta la lista desplegable de la Navbar después de seleccionar un link (para pantallas pequeñas) */
$('.navbar-nav>li>a').on('click', function() {
    $('.navbar-collapse').collapse('hide');
});

/* Obtiene el atributo src, alt y title de la imagen seleccionada para pasarla al modal y mostrarlo */
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('img-item')) {  
        const imgSrc = e.target.getAttribute('src');
        document.querySelector('.img-modal').src = imgSrc;
        const myModal = new bootstrap.Modal(document.getElementById('imgPopUpModal'));
        $("#imgPopUpModal p").text($(e.target).attr('alt')); /* Se pasa el valor de 'alt' de la imagen al elemento <p> del Modal */
        $("#imgPopUpModal h6").text($(e.target).attr('data-title')); /* Se pasa el valor de 'title' de la imagen al elemento <h6> del Modal */
        
        /* Se activa la barra de Google Translate */
        new google.translate.TranslateElement({ pageLanguage: 'es', includedLanguages: 'en,es', 
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE }, 'google_translate_element'); 
        // $('.VIpgJd-ZVi9od-xl07Ob-lTBxed').attr("href", "#/"); /* Evita que se vuelva al inicio al elegir un idioma del plugin de Google */
        $('.VIpgJd-ZVi9od-xl07Ob-lTBxed').removeAttr('href') /* Se le quita el atributo 'href' a la barra de Google Translate */

        myModal.show();
        $('html').css("overflow", "hidden")            
    } else { $('html').css("overflow", "auto") }
});

/* Función que restaura el idioma original de la página al cerrar el Modal */
const ImageModal = document.getElementById('imgPopUpModal')
ImageModal.addEventListener('hidden.bs.modal', function () {
    var googleTranslateFrame = document.getElementsByClassName('VIpgJd-ZVi9od-ORHb-OEVmcd')[0]; /* goog-te-banner-frame */
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

/* Función del botón para mostrar y ocultar los proyectos que no aparecen en la lista inicial */
const showMoreProjectsBtn = document.querySelector('.show-more-btn');
const showAndHideProjects = () => {
    var cardsVisible = document.getElementById("cardsLimit");
    var cardsHidden = document.getElementById("hiddenCards");
    var btnShowHiddenCards = document.getElementById("show-more-btn");
    if (cardsVisible.style.display === "none") {
        btnShowHiddenCards.innerHTML = "<i class='fa-solid fa-chevron-down fa-bounce'></i>", btnShowHiddenCards.setAttribute("data-title", "Mostrar más - Show more");
        cardsVisible.style.display = "flex", cardsHidden.style.display = "none";
    } else {
        cardsVisible.style.display = "none";
        btnShowHiddenCards.innerHTML = "<i class='fa-solid fa-chevron-up fa-bounce'></i>", btnShowHiddenCards.setAttribute("data-title", "Mostrar menos - Show less");
        cardsHidden.style.display = "flex", cardsHidden.style.flexWrap = "wrap", cardsHidden.style.alignContent = "center",
        cardsHidden.style.justifyContent = "space-around", cardsHidden.style.gap = "15px";
    }
    if (btnShowHiddenCards.getAttribute("data-title", "Mostrar más - Show more") && cardsHidden.style.display === "none") {
        document.querySelector('#Projects').scrollIntoView({ behavior: 'smooth' });
    }
}
showMoreProjectsBtn.addEventListener('click', showAndHideProjects);

/* Función que obtiene los datos del formulario para enviar el correo electrónico */
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
            showAlertSpan(); alertText.innerHTML = `Copiado al portapapeles - Copied to clipboard '<i class="fa-solid fa-clipboard"></i>'`
        })
        .catch(() => {
            showAlertSpan(); alertText.innerHTML = `'<i class="fa-solid fa-triangle-exclamation"></i>' Error inesperado!! Copia el correo electrónico manualmente`
        });
});

/* Función para traducir la página entre Inglés y Español */
function switchLang(lang) {
    $("[data-" + lang + "]").text(function (i, e) { 
        return $(this).data(lang); 
    });
}
switchLang("es"); /* Se manda el idioma Español como predeterminado */
$(".switchlang").click(function () { /* Se llama a la función para traducir y muestra el modal de carga al mismo tiempo */
    modalSpinner();
    switchLang($(this).data("lang"))
});
/* Muestra un modal con un 'loader' por 3s al traducir la página */
function modalSpinner() {
    $('.modalSpinner').modal('show');
    setTimeout(function () { $('.modalSpinner').modal('hide'); }, 3000);
}

const alertDialog = document.getElementById('alertSpan'), alertText = document.getElementById('alert-text'),
    closeAlert = document.querySelector('.close-alert');
/* Muestra un Alert dependiendo la acción que lo requiera */
const showAlertSpan = () => {   
    alertDialog.classList.remove('hide');
    alertDialog.classList.add('show');   
    setTimeout(function () { closeAlertSpan(); }, 6000);
}
/* Función para ocultar el Alert Span */
const closeAlertSpan = () => {
    alertDialog.classList.remove('show');
    alertDialog.classList.add('hide');     
}
closeAlert.addEventListener('click', closeAlertSpan)

/* Bootstrap Tooltip */
var tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
var tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))