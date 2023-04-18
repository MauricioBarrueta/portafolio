const javaTemplate = document.getElementById('java-projects');
const javaProjectsCards = document.querySelectorAll('.java-project-icon');
/* Icono de Java para la mayoría de proyectos */
javaProjectsCards.forEach(card => {
    const templateContent = javaTemplate.content.cloneNode(true);
    card.prepend(templateContent);   
});

const mysqlTemplate = document.getElementById('mysql-icon');
const mysqlProjectCard = document.querySelectorAll('.mysql-prj-icon');
/* Ícono de MySQL para la mayoría de proyectos */
mysqlProjectCard.forEach(card => {
    const templateContent = mysqlTemplate.content.cloneNode(true);
    card.appendChild(templateContent);    
});

const template = document.getElementById("php-projects");
const phpCardsClasses = document.querySelectorAll('.php-projects-icons');
/* Íconos para proyectos PHP */
phpCardsClasses.forEach(card => {
    const templateContent = template.content.cloneNode(true);
    card.appendChild(templateContent);
});

const staticIconsTemplate = document.getElementById('static-projects');
const staticCardClasses = document.querySelectorAll('.static-projects-icons');
/* Íconos para proyectos web estáticos */
staticCardClasses.forEach(card => {
    const templateContent = staticIconsTemplate.content.cloneNode(true);
    card.prepend(templateContent);
});

const unityProjectsTemplate = document.getElementById('unity-projects');
const unityCards = document.querySelectorAll('.unity-projects-icons');
/* Íconos para proyectos Unity */
unityCards.forEach(card => {
    const templateContent = unityProjectsTemplate.content.cloneNode(true);
    card.prepend(templateContent);
});