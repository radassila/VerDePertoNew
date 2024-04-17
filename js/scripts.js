

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

        // Obtém o formulário e a div
    var formulario = document.getElementById('meuFormulario');
    var div = document.getElementById('divrecife');

    // Adiciona um evento de envio ao formulário
    formulario.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Obtém a opção selecionada
        var recife = document.getElementById('recife').value;

        // Exibe ou oculta a div com base na opção selecionada
        if (recife === 'exibir') {
        div.style.display = 'block';
        } else if (recife === 'ocultar') {
        div.style.display = 'none';
        }

  });
});

function getCityName(latitude, longitude) {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
    .then(response => response.json())
    .then(data => {
        var city = data.address.city;
        if (!city) {
            city = data.address.town;
        }
        if (!city) {
            city = data.address.village;
        }
        if (!city) {
            city = data.address.hamlet;
        }
        document.getElementById('cityName').innerText = "Nome da cidade: " + city;
    })
    .catch(error => console.error('Erro ao obter os dados:', error));
}

function getLocationAndCity() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            getCityName(latitude, longitude);
        }, function(error) {
            console.error('Erro ao obter a localização:', error);
        });
    } else {
        console.error('Geolocalização não é suportada neste navegador.');
    }
}

function renderizarMapa(latitude, longitude) {
    var map = L.map('map').setView([latitude, longitude], 14); // Alteração do valor do zoom para 15

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([latitude, longitude]).addTo(map)
        .bindPopup('Você está aqui.')
        .openPopup();
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        document.querySelector('p').innerHTML = "Latitude = " + position.coords.latitude + "<br>Longitude = " + position.coords.longitude;
        renderizarMapa(position.coords.latitude, position.coords.longitude);
    });
} else {
    document.querySelector('p').innerHTML = "Geolocalização não suportada pelo seu navegador.";
}
