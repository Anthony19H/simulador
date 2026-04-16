//AQUI EL JAVASCRIPT PARA MANIPULAR EL HTML

function calcular(){

    let ingresos=parseFloat(document.getElementById("txtIngresos").value);
    let egresos=parseFloat(document.getElementById("txtEgresos").value);
    let disponible=calcularDisponible(ingresos,egresos);
    
    let disponibleFormateado = disponible.toFixed(2);
    
    mostrarEnSpan("spnDisponible", disponibleFormateado);
    
    let capacidadPago = calcularCapacidadPago(disponibleFormateado);

    mostrarEnSpan("spnCapacidadPago",capacidadPago);

    let monto=parseInt(document.getElementById("txtMonto").value);
    let plazoAnios=parseInt(document.getElementById("txtPlazo").value);
    let tasa=parseInt(document.getElementById("txtTasaInteres").value);

    let interesSimple=CalcularInteresSimple(monto,plazoAnios,tasa);

    mostrarEnSpan("spnInteresPagar",interesSimple);

}

