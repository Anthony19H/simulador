// simulador.js - Controlador con Validaciones Senior

function calcular() {
    // 1. Limpiar mensajes de error previos antes de empezar
    const errores = document.querySelectorAll('.error-msg');
    errores.forEach(e => e.textContent = "");

    // 2. Captura de datos desde el HTML
    const ingresos = parseFloat(document.getElementById("txtIngresos").value);
    const egresos = parseFloat(document.getElementById("txtEgresos").value);
    const monto = parseFloat(document.getElementById("txtMonto").value);
    const plazo = parseInt(document.getElementById("txtPlazo").value);
    const tasa = parseFloat(document.getElementById("txtTasaInteres").value);

    let valido = true;

    // 3. BLOQUE DE VALIDACIONES (Reglas de Negocio)
    // Usamos isNaN para ver si el campo está vacío o tiene letras
    if (isNaN(ingresos) || ingresos <= 0) {
        document.getElementById("errIngresos").textContent = "Ingrese ingresos válidos (mayores a 0).";
        valido = false;
    }
    if (isNaN(egresos) || egresos < 0) {
        document.getElementById("errEgresos").textContent = "Ingrese egresos válidos (mínimo 0).";
        valido = false;
    }
    if (isNaN(monto) || monto < 500 || monto > 50000) {
        document.getElementById("errMonto").textContent = "El monto debe estar entre $500 y $50,000.";
        valido = false;
    }
    if (isNaN(plazo) || plazo < 1 || plazo > 30) {
        document.getElementById("errPlazo").textContent = "El plazo debe ser de 1 a 30 años.";
        valido = false;
    }
    if (isNaN(tasa) || tasa < 1 || tasa > 100) {
        document.getElementById("errTasaInteres").textContent = "La tasa debe estar entre 1% y 100%.";
        valido = false;
    }

    // 4. PARADA DE EMERGENCIA: Si algo no es válido, no hace los cálculos
    if (!valido) {
        return; 
    }

    // 5. LÓGICA DE CÁLCULOS (Solo llega aquí si todo está bien)
    // Nota: Estas funciones están definidas en tu archivo funciones.js
    let disponible = calcularDisponible(ingresos, egresos);
    mostrarEnSpan("spnDisponible", "$" + disponible.toFixed(2));
    
    let capacidadPago = calcularCapacidadPago(disponible);
    mostrarEnSpan("spnCapacidadPago", "$" + capacidadPago.toFixed(2));

    let interesSimple = CalcularInteresSimple(monto, tasa, plazo);
    mostrarEnSpan("spnInteresPagar", "$" + interesSimple.toFixed(2));

    let totalPagar = calcularTotalPagar(monto, interesSimple);
    mostrarEnSpan("spnTotalPrestamo", "$" + totalPagar.toFixed(2));

    let cuotaMensual = calcularCuotaMesual(totalPagar, plazo);
    mostrarEnSpan("spnCuotaMensual", "$" + cuotaMensual.toFixed(2));

    let analizarCredito = aprobarCredito(capacidadPago, cuotaMensual);
    mostrarEnSpan("spnEstadoCredito", analizarCredito);
}

function reiniciar() {
    // 1. Limpiar todos los cuadros de texto
    document.getElementById("txtIngresos").value = "";
    document.getElementById("txtEgresos").value = "";
    document.getElementById("txtMonto").value = "";
    document.getElementById("txtPlazo").value = "";
    document.getElementById("txtTasaInteres").value = "";

    // 2. Borrar todos los mensajes de error (rojos)
    const errores = document.querySelectorAll('.error-msg');
    errores.forEach(err => err.textContent = "");

    // 3. Resetear los resultados a cero
    document.getElementById("spnDisponible").textContent = "$0.00";
    document.getElementById("spnCapacidadPago").textContent = "$0.00";
    document.getElementById("spnInteresPagar").textContent = "$0.00";
    document.getElementById("spnTotalPrestamo").textContent = "$0.00";
    document.getElementById("spnCuotaMensual").textContent = "$0.00";
    document.getElementById("spnEstadoCredito").textContent = "ESPERANDO DATOS...";
}