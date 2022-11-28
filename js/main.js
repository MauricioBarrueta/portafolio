/* Evento que muestra un gif mientras se termina de cargar la página, además de mostrarlo por 3seg más */
$(window).on('load', function () { 
    setTimeout(function () {
        $('#loading').hide("fast");
        /* Se activa la animación del texto "Hola Mundo" y la Scroll Bar del navegador */
        $('.h1-h').css("animation-delay", "3.2s");
        $('html').css("overflow", "auto");
    }, 3000);
})

$(document).ready(function () {
    /* Se inicializa AOS Library */
    AOS.init({ once: true, duration: 850, delay: 0, easing: 'ease-in-out' }); 

    /* Resalta el texto en la navbar de acuerdo a la sección en la que se encuentra */
    $('.navbar').on('click', 'a', function () {
        $('.navbar a.active').removeClass('active');
        $(this).addClass('active');        
    });
    $('body').scrollspy({ target: '.navbar' });

    /* Oculta el gadget de Google Translate */
    $(".goog-logo-link").empty();
    $('.goog-te-gadget').html($('.goog-te-gadget').children());

    /* Cambia el texto de la barra de Google Translate */
    $('#google_translate_element').bind('DOMNodeInserted', function (event) {
        $('.goog-te-menu-value span:first').html('Translate');
        $('.goog-te-menu-frame.skiptranslate').on('load', function () {
            setTimeout(function () {
                $('.goog-te-menu-frame.skiptranslate').contents().find('.goog-te-menu2-item-selected .text').html('Translate');
            }, 100);
        });
    });
})

/* Oculta la la lista de la barra de navegación cuando se encuentra desplegada (pantallas pequeñas) */
// const navbarLinks = document.querySelectorAll('.nav-item')
// const navbarToggler = document.querySelector('.navbar-collapse')
// const bsNavbarCollapse = new bootstrap.Collapse(navbarToggler)
// navbarLinks.forEach((link) => {
//     link.addEventListener('click', () => { 
//         bsNavbarCollapse.toggle() 
//     });
// })

$('.navbar-nav>li>a').on('click', function(){
    $('.navbar-collapse').collapse('hide');
});

/* Función que da el efecto 'parallax' a la imagen de fondo al hacer scroll */
const parallaxMain = document.querySelectorAll('.main');
const parallaxContact = document.querySelectorAll(".contactme");
const parallaxFooter = document.querySelectorAll('.footer');
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

/* Función que hace la transición de la imagen de la introducción, entre .png y .gif */
$(".h-image-img").hover(function () {
    $(this).attr('src', '../img/gif.gif');
}, function () {
    $(this).attr('src', '../img/static.png');
});

// const imageOnPhone = document.querySelector('.h-image-img');
// imageOnPhone.addEventListener('touchstart', function () { 
//     imageOnPhone.style.filter = "blur(0)";
//     // imageOnPhone.src = '../img/gif.gif'; 
//  })

/* Función que permite regresar al inicio al dar clic en el botón */
const btnScrollToTop = document.querySelector('.ScrollToTop');
btnScrollToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
});

/* Hace visible el bóton al iniciar el scroll hacia abajo */
window.addEventListener('scroll', e => {
    btnScrollToTop.style.display = window.scrollY > 150 ? 'block' : 'none';
});

/* Para dar el efecto 'sticky' a la navbar al pasar por el elemento oculto <span> con clase 'trigger' */
(new IntersectionObserver(function (e, o) {
    e[0].intersectionRatio > 0 ? document.documentElement.removeAttribute('class') : document.documentElement.setAttribute('class', 'stuck');
})).observe(document.querySelector('.trigger'));

/* Hace zoom a la imagen de las cards del portafolio cada que se pone el cursor */
$(".img-item").hover(function () {
    $(this).closest(".img-item").css("z-index", 1);
    $(this).animate({ height: "205", width: "305" }, "fast");
}, function () {
    $(this).closest(".img-item").css("z-index", 0);
    $(this).animate({ height: "200", width: "300" }, "fast");
});

/* Obtiene el atributo src, alt y title de la imagen seleccionada para pasarla al modal y mostrarlo */
document.addEventListener("click", function (e) {
    if (e.target.classList.contains('img-item')) {
        const src = e.target.getAttribute('src');
        document.querySelector('.img-modal').src = src;
        const myModal = new bootstrap.Modal(document.getElementById('imgPopUpModal'));
        $("#imgPopUpModal p").text($(e.target).attr('alt')); /* Se pasa el valor de 'alt' de la imagen al elemento <p> */
        $("#imgPopUpModal h6").text($(e.target).attr('data-title')); /* Se pasa el valor de 'title' de la imagen al elemento <h6> */
        myModal.show();
    }
});

/* Activa el la barra de Google Translate al dar clic sobre una imagen */
$('.img-item').on('click', function () {
    new google.translate.TranslateElement({
        pageLanguage: 'es',
        includedLanguages: 'en,es',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
});

/* Función que restaura el idioma original, ya sea si estaba en español o en inglés, al cerrar el modal */
const ImageModal = document.getElementById('imgPopUpModal')
ImageModal.addEventListener('hidden.bs.modal', function () {
    var gooTrlFrame = document.getElementsByClassName('goog-te-banner-frame')[0];
    if (!gooTrlFrame) return;
    var innerDoc = gooTrlFrame.contentDocument || gooTrlFrame.contentWindow.document;
    var restore = innerDoc.getElementsByTagName("button");
    for (var i = 0; i < restore.length; i++) {
        if (restore[i].id.indexOf("restore") >= 0) {
            restore[i].click();
            var close = innerDoc.getElementsByClassName("goog-close-link");
            close[0].click();
            return;
        }
    }
});

/* Función del botón para mostrar y ocultar los demás proyectos */
const showMoreProjectsBtn = document.querySelector('.show-more-btn');
function showMoreProjects() {
    var cardsVisible = document.getElementById("visible");
    var cardsHidden = document.getElementById("hidden");
    var btnShowHiddenCards = document.getElementById("show-more-btn");

    if (cardsVisible.style.display === "none") {
        btnShowHiddenCards.innerHTML = "<i class='fa-solid fa-caret-down fa-bounce'></i>"; 
        btnShowHiddenCards.setAttribute("data-title", "Mostrar más - Show more"); cardsVisible.style.display = "flex"; cardsHidden.style.display = "none";
    } else {
        cardsVisible.style.display = "none";
        btnShowHiddenCards.innerHTML = "<i class='fa-solid fa-caret-up fa-bounce'></i>"; 
        btnShowHiddenCards.setAttribute("data-title", "Mostrar menos - Show less"); cardsHidden.style.display = "flex"; cardsHidden.style.flexWrap = "wrap";
        cardsHidden.style.alignContent = "center"; cardsHidden.style.justifyContent = "space-around"; cardsHidden.style.gap = "15px";
    }
    if (btnShowHiddenCards.getAttribute("data-title", "Mostrar más - Show more") && cardsHidden.style.display === "none") {
        document.querySelector('#portafolio').scrollIntoView({ behavior: 'smooth' });
    }
}

showMoreProjectsBtn.addEventListener('click', showMoreProjects);

/* Función que obtiene los datos del formulario para enviar el correo electrónico */
const $form = document.querySelector('#c-form');
const btnEmailTo = document.querySelector('#myEmail');
$form.addEventListener('submit', onSubmit)

function onSubmit(event) {
    event.preventDefault()
    const form = new FormData(this)
    const btnSendEmail = $('#btnSendEmail')
    const btnHtmlElements = btnSendEmail.html() // Almacena las caracteristicas del botón    
    $(btnSendEmail).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>').prop('disabled', true)

    /* Función que agrega un spinner y texto al botón antes de completar el envío del formulario */
    setTimeout(function () {
        $(btnSendEmail).html(btnHtmlElements).prop('disabled', false) // Regresa el btn a como estaba originalmente
        btnEmailTo.setAttribute('href', `mailto:mauba22@outlook.com?subject=Quiero contactar: ${form.get('name')} - ${form.get('email')}&body=${form.get('message')}`)
        btnEmailTo.click();
    }, 4000)
}

/* Función para copiar texto al portapapeles */
const btnCopyEmail = document.querySelector('.copy-btn')
function copyEmail() {
    var copyText = document.getElementById("email-copy");
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* Para móviles */
    navigator.clipboard.writeText(copyText.value);
    alert("Correo electrónico copiado al portapapeles");
}
btnCopyEmail.addEventListener('click', copyEmail);

/* Función para traducir entre español e inglés */
function switchLang(lang) {
    $("[data-" + lang + "]").text(function (i, e) {
        return $(this).data(lang);
    });
}
switchLang("es");
/* Ejecuta la función para traducir y muestra el modal de carga al mismo tiempo */
$(".switchlang").click(function () {
    modalSpinner();
    switchLang($(this).data("lang"))
});

/* Muestra un modal con un 'loader' por 3s al traducir la página */
function modalSpinner() {
    $('.modalSpinner').modal('show');
    setTimeout(function () {
        $('.modalSpinner').modal('hide');
    }, 3000);
}

/* Bootstrap Tooltip */
var tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
var tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))