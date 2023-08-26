var iframe = document.getElementById('iframeTemplate');
iframe.onload = function() {
    var iframeContent = iframe.contentDocument || iframe.contentWindow.document;

    const javaTemplate = iframeContent.getElementById('java-projects')
    const javaProjectsCards = document.querySelectorAll('.java-project-icon');    
    javaProjectsCards.forEach(card => {
        const templateContent = javaTemplate.content.cloneNode(true);
        card.prepend(templateContent);
    });

    const netbeansTemplate = iframeContent.getElementById('netbeans-projects');
    const netbeansProjectsCards = document.querySelectorAll('.netbeans-project-icon');
    netbeansProjectsCards.forEach(card => {
        const templateContent = netbeansTemplate.content.cloneNode(true);
        card.appendChild(templateContent);
    });

    const angularTemplate = iframeContent.getElementById('angular-projects');
    const angularProjectsCards = document.querySelectorAll('.angular-project-icons');
    angularProjectsCards.forEach(card => {
        const templateContent = angularTemplate.content.cloneNode(true);
        card.prepend(templateContent);
    });
    
    const scssTemplate = iframeContent.getElementById('scss-projects')
    const scssProjectsCards = document.querySelectorAll('.scss-project-icons')
    scssProjectsCards.forEach(card => {
        const templateContent = scssTemplate.content.cloneNode(true);
        card.prepend(templateContent)
    });

    const mysqlTemplate = iframeContent.getElementById('mysql-icon');
    const mysqlProjectCard = document.querySelectorAll('.mysql-prj-icon');
    mysqlProjectCard.forEach(card => {
        const templateContent = mysqlTemplate.content.cloneNode(true);
        card.appendChild(templateContent);
    });

    const template = iframeContent.getElementById("php-projects");
    const phpCardsClasses = document.querySelectorAll('.php-projects-icons');
    phpCardsClasses.forEach(card => {
        const templateContent = template.content.cloneNode(true);
        card.appendChild(templateContent);
    });

    const staticIconsTemplate = iframeContent.getElementById('static-projects');
    const staticCardClasses = document.querySelectorAll('.static-projects-icons');
    staticCardClasses.forEach(card => {
        const templateContent = staticIconsTemplate.content.cloneNode(true);
        card.prepend(templateContent);
    });

    const unityProjectsTemplate = iframeContent.getElementById('unity-projects');
    const unityCards = document.querySelectorAll('.unity-projects-icons');
    unityCards.forEach(card => {
        const templateContent = unityProjectsTemplate.content.cloneNode(true);
        card.prepend(templateContent);
    });

    const skillsTemplate = iframeContent.getElementById('skills-template')    
    const skillsCardContainer = document.querySelectorAll('.cards-container')
    skillsCardContainer.forEach(skills => {
        const templateContent = skillsTemplate.content.cloneNode(true);
        skills.append(templateContent)
    }); 

    const jsTemplate = iframeContent.getElementById('js-jquery-projects');    
    const spanAfterJspIcons = document.getElementById('jspProjectIconsBefore');
    const jspTemplateContent = jsTemplate.content.cloneNode(true)    
    spanAfterJspIcons.parentNode.insertBefore(jspTemplateContent, spanAfterJspIcons)   
    
    const fullStackTemplate = iframeContent.getElementById('fullstack-project')
    const spanAfterFullIcons = document.getElementById('fullstackIconsBefore')
    const fullTemplateContent = fullStackTemplate.content.cloneNode(true)
    spanAfterFullIcons.parentNode.insertBefore(fullTemplateContent, spanAfterFullIcons)

    const springThymeleafTemplate = iframeContent.getElementById('spring-thymeleaf-projects')
    const iconAfter = document.querySelectorAll('#icon-after-sprThy')   
    iconAfter.forEach(template => {
        const springThymTempContent = springThymeleafTemplate.content.cloneNode(true)
        template.parentNode.insertBefore(springThymTempContent, template)
    });    
}