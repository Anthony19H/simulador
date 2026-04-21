function calcular() {
    // 1. Limpiar mensajes de error previos
    const errores = document.querySelectorAll('.error-msg');
    errores.forEach(e => e.textContent = "");

    // 2. Captura de datos
    const ingresos = parseFloat(document.getElementById("txtIngresos").value);
    const arriendo = parseFloat(document.getElementById("txtArriendo").value); //
    const alimentacion = parseFloat(document.getElementById("txtAlimentacion").value); //
    const varios = parseFloat(document.getElementById("txtVarios").value); //

    const monto = parseFloat(document.getElementById("txtMonto").value);
    const plazo = parseInt(document.getElementById("txtPlazo").value);
    const tasa = parseFloat(document.getElementById("txtTasaInteres").value);

    let valido = true;

    // 3. BLOQUE DE VALIDACIONES ESTRICTO
    if (isNaN(ingresos) || ingresos <= 0) {
        document.getElementById("errIngresos").textContent = "Ingrese ingresos válidos.";
        valido = false;
    }

    // Validación individual de los nuevos campos
    if (isNaN(arriendo) || arriendo < 0) {
        document.getElementById("errArriendo").textContent = "Ingrese un monto (o 0).";
        valido = false;
    }
    if (isNaN(alimentacion) || alimentacion < 0) {
        document.getElementById("errAlimentacion").textContent = "Ingrese un monto (o 0).";
        valido = false;
    }
    if (isNaN(varios) || varios < 0) {
        document.getElementById("errVarios").textContent = "Ingrese un monto (o 0).";
        valido = false;
    }

    // Validaciones de préstamo
    if (isNaN(monto) || monto < 500 || monto > 50000) {
        document.getElementById("errMonto").textContent = "Monto inválido.";
        valido = false;
    }
    if (isNaN(plazo) || plazo < 1 || plazo > 30) {
        document.getElementById("errPlazo").textContent = "Plazo inválido.";
        valido = false;
    }
    if (isNaN(tasa) || tasa < 1 || tasa > 100) {
        document.getElementById("errTasaInteres").textContent = "Tasa inválida.";
        valido = false;
    }

    // 4. PARADA DE EMERGENCIA: Si algo no es válido, no hace los cálculos
    if (!valido) {
        // Si no es válido, reseteamos el total de gastos a 0 para no confundir
        document.getElementById("spnTotalGastos").textContent = "$0.00";
        return; 
    }

    // 5. LÓGICA DE CÁLCULOS (Solo llega aquí si TODO es válido)
    let totalGastos = arriendo + alimentacion + varios; //
    mostrarEnSpan("spnTotalGastos", "$" + totalGastos.toFixed(2)); //

    // Importante: usar totalGastos en lugar de la variable antigua
    let disponible = calcularDisponible(ingresos, totalGastos);
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