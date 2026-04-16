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