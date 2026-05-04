function loadComponent(elementId, url) {
    return fetch(url)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Falha ao carregar ' + url);
            }
            return response.text();
        })
        .then(function(html) {
            var container = document.getElementById(elementId);
            if (container) {
                container.innerHTML = html;
            }
        });
}

function setupSharedFooterActions() {
    var moveTopBtn = document.getElementById('moveTopBtn');
    var moveTopText = document.getElementById('moveTopText');
    var facebookLink = document.getElementById('facebookLink');
    var facebookText = document.getElementById('facebookText');

    if (moveTopBtn && moveTopText) {
        moveTopBtn.addEventListener('mouseenter', function() {
            moveTopText.style.display = 'inline-block';
        });
        moveTopBtn.addEventListener('mouseleave', function() {
            moveTopText.style.display = 'none';
        });
        moveTopBtn.addEventListener('click', function() {
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }

    if (facebookLink && facebookText) {
        facebookLink.addEventListener('mouseenter', function() {
            facebookText.style.display = 'inline-block';
        });
        facebookLink.addEventListener('mouseleave', function() {
            facebookText.style.display = 'none';
        });
    }
}

function initSharedComponents() {
    Promise.all([
        loadComponent('site-header', 'header.html'),
        loadComponent('site-footer', 'footer.html')
    ]).then(setupSharedFooterActions).catch(function(error) {
        console.error('Erro ao carregar componentes compartilhados:', error);
    });
}

document.addEventListener('DOMContentLoaded', initSharedComponents);
