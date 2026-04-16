//AQUI TODA LA LOGICA DE LAS FUNCIONES DEL NEGOCIO
 function calcularDisponible(ingresos, egresos) {
    let valorDisponible=ingresos-egresos;
    if(valorDisponible<0){
        return 0;
    }
    return valorDisponible;
}

function calcularCapacidadPago(montoDisponible){
    let capacidadPago=montoDisponible/2;
    return capacidadPago;


}

function mostrarEnSpan(idSpan,valor){
    let componente=document.getElementById(idSpan);
    componente.textContent=valor;
}

function CalcularInteresSimple(monto,tasa,plazoAnios){
    let interes = plazoAnios*monto*(tasa/100);
    return interes;

}

function calcularTotalPagar(monto,interes){
    let total = monto+interes+100;
    return total;
}

function calcularCuotaMesual(total,plazoAnios){
    let cuotaMensual=total/(plazoAnios*12);
    return cuotaMensual;
}