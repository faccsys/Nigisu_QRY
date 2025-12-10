// Variables globales
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const btnText = document.getElementById('btnText');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const resultsSection = document.getElementById('resultsSection');
const resultsTitle = document.getElementById('resultsTitle');
const resultsContainer = document.getElementById('resultsContainer');
const initialMessage = document.getElementById('initialMessage');
const noResultsMessage = document.getElementById('noResultsMessage');

// URL de la API
//const API_URL = 'http://localhost:5345/api/D_Genbco_T/Retrieve';
const API_URL =   'https://localhost:7345/api/D_Genbco_T/Retrieve';

// Función asíncrona principal para buscar tarjetas
async function buscarTarjetas() {
    const searchTerm = searchInput.value.trim();

    // Validación básica
    if (!searchTerm) {
        mostrarError('Por favor ingresa un término de búsqueda');
        return;
    }

    // Preparar UI para la búsqueda
    mostrarCargando(true);
    ocultarMensajes();

    try {
        // Petición a la API usando fetch
        const response = await fetch(API_URL);

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }

        // Procesamiento de datos: convertir respuesta a JSON
        const data = await response.json();

        // Filtrar resultados basados en el término de búsqueda
        const resultadosFiltrados = data.filter(tarjeta => 
            tarjeta.Bconombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tarjeta.Bcocodigo.toString().includes(searchTerm)
        );

        // Mostrar resultados
        if (resultadosFiltrados.length > 0) {
            mostrarResultados(resultadosFiltrados);
        } else {
            mostrarSinResultados();
        }

    } catch (error) {
        // Manejo de errores con try...catch
        console.error('Error al buscar tarjetas:', error);
        
        let mensajeError;
        if (error.message.includes('Failed to fetch')) {
            mensajeError = 'Error de conexión: No se pudo conectar con el servidor. Verifica que la API esté ejecutándose en localhost:7345';
        } else if (error.message.includes('HTTP')) {
            mensajeError = `Error del servidor: ${error.message}`;
        } else {
            mensajeError = `Error inesperado: ${error.message}`;
        }
        
        mostrarError(mensajeError);
    } finally {
        mostrarCargando(false);
    }
}

// Función para renderizar resultados dinámicamente
function mostrarResultados(tarjetas) {
    // Limpiar contenedor antes de inyectar nuevo HTML
    resultsContainer.innerHTML = '';

    // Actualizar título con cantidad de resultados
    resultsTitle.textContent = `Resultados (${tarjetas.length})`;

    // Crear HTML dinámicamente usando forEach
    tarjetas.forEach(tarjeta => {
        const card = crearTarjetaHTML(tarjeta);
        resultsContainer.innerHTML += card;
    });

    // Mostrar sección de resultados
    resultsSection.classList.remove('hidden');
}

// Función para crear el HTML de cada tarjeta
function crearTarjetaHTML(tarjeta) {
    const limiteFormateado = formatearMoneda(tarjeta.Bcolimite);
    const tipoTexto = tarjeta.Bcotipo === 'T' ? 'Tarjeta de Crédito' : 'Otro';

    return `
        <div class="card">
            <div class="card-header">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                    <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
                <span class="card-code">#${tarjeta.Bcocodigo}</span>
            </div>
            <div class="card-body">
                <h3 class="card-title">${tarjeta.Bconombre}</h3>
                <div>
                    <p class="card-limit-label">Límite de Crédito</p>
                    <p class="card-limit-value">${limiteFormateado}</p>
                </div>
                <div class="card-footer">
                    <div>
                        <p class="card-type-label">Tipo</p>
                        <p class="card-type-value">${tipoTexto}</p>
                    </div>
                    <div class="card-badge">Activa</div>
                </div>
            </div>
        </div>
    `;
}

// Función para formatear moneda
function formatearMoneda(cantidad) {
    return new Intl.NumberFormat('es-EC', {
        style: 'currency',
        currency: 'USD'
    }).format(cantidad);
}

// Función para mostrar estado de cargando
function mostrarCargando(cargando) {
    if (cargando) {
        searchBtn.disabled = true;
        btnText.textContent = 'Buscando...';
        const icon = searchBtn.querySelector('.btn-icon');
        if (icon) icon.classList.add('spinning');
    } else {
        searchBtn.disabled = false;
        btnText.textContent = 'Buscar';
        const icon = searchBtn.querySelector('.btn-icon');
        if (icon) icon.classList.remove('spinning');
    }
}

// Función para mostrar errores
function mostrarError(mensaje) {
    errorText.textContent = mensaje;
    errorMessage.classList.remove('hidden');
    resultsSection.classList.add('hidden');
    initialMessage.classList.add('hidden');
    noResultsMessage.classList.add('hidden');
}

// Función para mostrar mensaje sin resultados
function mostrarSinResultados() {
    noResultsMessage.classList.remove('hidden');
    resultsSection.classList.add('hidden');
    initialMessage.classList.add('hidden');
}

// Función para ocultar todos los mensajes
function ocultarMensajes() {
    errorMessage.classList.add('hidden');
    initialMessage.classList.add('hidden');
    noResultsMessage.classList.add('hidden');
}

// Event Listeners
searchBtn.addEventListener('click', buscarTarjetas);

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        buscarTarjetas();
    }
});

// Limpiar error cuando el usuario empieza a escribir
searchInput.addEventListener('input', () => {
    if (!errorMessage.classList.contains('hidden')) {
        errorMessage.classList.add('hidden');
    }
});