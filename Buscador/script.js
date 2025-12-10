// ============================================
// PROYECTO: INTERACTIVIDAD BÁSICA CON DOM
// Semana 5 - JavaScript Básico y DOM
// ============================================

// ============================================
// SELECCIÓN DE ELEMENTOS DEL DOM
// ============================================

// Formulario y elementos de entrada
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const btnClear = document.querySelector('#btn-clear');

// Secciones de la interfaz
const mainInterface = document.querySelector('#main-interface');
const loadingMessage = document.querySelector('#loading-message');
const loadingText = document.querySelector('#loading-text');
const resultsArea = document.querySelector('#results-area');
const resultsContent = document.querySelector('#results-content');

// Botón para nueva búsqueda
const btnNewSearch = document.querySelector('#btn-new-search');

// ============================================
// FUNCIONES DE MANIPULACIÓN DEL DOM
// ============================================

/**
 * Limpia el formulario y el área de resultados
 * Devuelve la interfaz al estado inicial
 */
function limpiarFormulario() {
    // Resetear el formulario completo
    searchForm.reset();
    
    // Alternativa: limpiar manualmente el input
    // searchInput.value = '';
    
    // Limpiar área de resultados
    resultsContent.innerHTML = '';
    
    // Mostrar feedback visual al usuario
    searchInput.focus();
    
    console.log('✅ Formulario limpiado');
}

/**
 * Muestra el mensaje de carga con el término buscado
 * @param {string} searchTerm - El término que el usuario está buscando
 */
function mostrarMensajeCarga(searchTerm) {
    // Ocultar la interfaz principal
    mainInterface.classList.add('hidden');
    
    // Ocultar resultados anteriores si existen
    resultsArea.classList.add('hidden');
    
    // Actualizar el texto del mensaje de carga
    loadingText.textContent = `Buscando información de "${searchTerm}"...`;
    
    // Mostrar el mensaje de carga
    loadingMessage.classList.remove('hidden');
    
    console.log(`🔍 Buscando: ${searchTerm}`);
}

/**
 * Muestra el área de resultados (simulación para esta entrega)
 * @param {string} searchTerm - El término buscado
 */
function mostrarResultados(searchTerm) {
    // Ocultar mensaje de carga
    loadingMessage.classList.add('hidden');
    
    // Crear contenido de ejemplo para los resultados
    // En futuras entregas, aquí se mostrarán los datos de la API
    resultsContent.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <h3 style="color: #4a90e2; margin-bottom: 15px;">
                📋 Resultados para: "${searchTerm}"
            </h3>
            <p style="color: #666; line-height: 1.6;">
                En la siguiente entrega, aquí se mostrarán los datos 
                obtenidos de la API real.
            </p>
            <p style="color: #666; margin-top: 10px;">
                Por ahora, esto demuestra la manipulación del DOM 
                y la interactividad básica.
            </p>
        </div>
    `;
    
    // Mostrar el área de resultados
    resultsArea.classList.remove('hidden');
    
    console.log(`✅ Resultados mostrados para: ${searchTerm}`);
}

/**
 * Vuelve a la interfaz principal de búsqueda
 */
function volverABusqueda() {
    // Ocultar resultados y mensaje de carga
    resultsArea.classList.add('hidden');
    loadingMessage.classList.add('hidden');
    
    // Mostrar la interfaz principal
    mainInterface.classList.remove('hidden');
    
    // Limpiar y enfocar el input
    limpiarFormulario();
    
    console.log('🔙 Volviendo a la búsqueda principal');
}

/**
 * Valida que el input no esté vacío o solo con espacios
 * @param {string} value - El valor a validar
 * @returns {boolean} - True si es válido, false si no
 */
function validarInput(value) {
    // Verificar que no esté vacío después de quitar espacios
    const valorLimpio = value.trim();
    
    if (valorLimpio === '') {
        alert('⚠️ Por favor, ingresa un término de búsqueda');
        return false;
    }
    
    // Validación adicional: mínimo 2 caracteres
    if (valorLimpio.length < 2) {
        alert('⚠️ El término de búsqueda debe tener al menos 2 caracteres');
        return false;
    }
    
    return true;
}

// ============================================
// MANEJADORES DE EVENTOS (EVENT HANDLERS)
// ============================================

/**
 * Maneja el evento de envío del formulario
 * @param {Event} event - El evento submit del formulario
 */
function manejarBusqueda(event) {
    // PASO 1: Prevenir el comportamiento por defecto (recarga de página)
    event.preventDefault();
    
    // PASO 2: Capturar el valor del input
    const searchTerm = searchInput.value;
    
    console.log('🎯 Formulario enviado');
    console.log('📝 Valor capturado:', searchTerm);
    
    // PASO 3: Validar el input
    if (!validarInput(searchTerm)) {
        return; // Detener la ejecución si no es válido
    }
    
    // PASO 4: Mostrar mensaje de carga
    mostrarMensajeCarga(searchTerm);
    
    // PASO 5: Simular una búsqueda con setTimeout
    // (En la siguiente entrega, aquí irá la llamada a la API)
    setTimeout(() => {
        mostrarResultados(searchTerm);
    }, 2000); // 2 segundos de "carga"
}

/**
 * Maneja el evento de clic en el botón de limpiar
 */
function manejarLimpiar() {
    limpiarFormulario();
    console.log('🧹 Botón limpiar presionado');
}

/**
 * Maneja el evento de nueva búsqueda
 */
function manejarNuevaBusqueda() {
    volverABusqueda();
}

// ============================================
// ESCUCHADORES DE EVENTOS (EVENT LISTENERS)
// ============================================

// Evento principal: Submit del formulario
searchForm.addEventListener('submit', manejarBusqueda);

// Evento del botón limpiar
btnClear.addEventListener('click', manejarLimpiar);

// Evento del botón nueva búsqueda
btnNewSearch.addEventListener('click', manejarNuevaBusqueda);

// Evento adicional: Limpiar con tecla Escape
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        if (!resultsArea.classList.contains('hidden')) {
            volverABusqueda();
        } else {
            limpiarFormulario();
        }
    }
});

// ============================================
// INICIALIZACIÓN
// ============================================

// Mensaje de consola para confirmar que el script se cargó
console.log('✅ Script cargado correctamente');
console.log('🎯 Aplicación lista para interactuar');

// Enfocar automáticamente el input al cargar la página
window.addEventListener('load', () => {
    searchInput.focus();
    console.log('🎬 Aplicación inicializada');
});