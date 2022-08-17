var cedula = "", fecha = "", longi = "", lati = "";
var app = angular.module("dommatos", []);
app.controller("customersCtrl", function ($scope, $http) {

  var host = "http://dommatos-env.eba-mzrreypi.us-east-2.elasticbeanstalk.com/services/AccessApi/consultaClientes"

  $http.post(host, {
    "tipo": 0,
    "fecha": "",
    "usario": ""

  })
    .then(function (response) {
      $scope.clientes = response.data.usarios;
      $scope.totalPay = response.data.totalPago;
    });

  $scope.consultaMesNoPago = function () {
    var mes = document.getElementById("mesFactura").value;
    var anio = document.getElementById("anioFactura").value;
    var fecha = anio + "-" + mes + "-02";
    $scope.clientes = {};
    $http.post(host, {
      "tipo": 2,
      "fecha": fecha,
      "usario": ""

    })
      .then(function (response) {
        $scope.clientes = response.data.usarios;
        $scope.totalPay = response.data.totalPago;
      });

  }
  $scope.consultaMesPago = function () {
    var mes = document.getElementById("mesFactura").value;
    var anio = document.getElementById("anioFactura").value;
    var fecha = anio + "-" + mes + "-02";
    $http.post(host, {
      "tipo": 1,
      "fecha": fecha,
      "usario": ""

    })
      .then(function (response) {
        $scope.clientes = response.data.usarios;
        $scope.totalPay = response.data.totalPago;
      });

  }
  $scope.consultaClientes = function () {
    $http.post(host, {
      "tipo": 0,
      "fecha": "",
      "usario": ""

    })
      .then(function (response) {
        $scope.clientes = response.data.usarios;
        $scope.totalPay = response.data.totalPago;
      });

  }
  $('#verPagoModel').on('show.bs.modal', function (event) {
    var cedulaCliente = $(event.relatedTarget).data('cedula');
    var nombreCliente = $(event.relatedTarget).data('nombre');

    console.log("ver");
    cedula = cedulaCliente;
    var hostPagos = "http://dommatos-env.eba-mzrreypi.us-east-2.elasticbeanstalk.com/services/AccessApi/consultaPagos"

    $http.post(hostPagos, {
      "idUser": cedula
    })
      .then(function (response) {
        $scope.Pagos = response.data.pagos;
        $scope.totalPay = response.data.totalPago;

      });

  });






  $('#registroPagoModel').on('show.bs.modal', function (event) {
    var cedulaCliente = $(event.relatedTarget).data('cedula');
    var nombreCliente = $(event.relatedTarget).data('nombre');

    console.log("pagar");
    cedula = cedulaCliente;

    $(this).find("#cedulaUsuario").text(cedulaCliente);
    $(this).find("#nombreUsuario").attr("value", nombreCliente);

  });


  $('#registroUsuarioModel').on('show.bs.modal', function (event) {
    var cedulaCliente = $(event.relatedTarget).data('cedula');
    var nombreCliente = $(event.relatedTarget).data('nombre');
    var telefonoPpal = $(event.relatedTarget).data('tel1');
    var telefonoOpc = $(event.relatedTarget).data('tel2');
    var fechaCreacion = $(event.relatedTarget).data('creacion');
    var direccion = $(event.relatedTarget).data('direccion');
    var plan = $(event.relatedTarget).data('plan');
    var ip = $(event.relatedTarget).data('ip');
    var ppoe = $(event.relatedTarget).data('ppoe');
    var descripcion = $(event.relatedTarget).data('descripcion');
    var latitud = localStorage.getItem('lat');
    var longitud = localStorage.getItem('lng');
    var nodo = $(event.relatedTarget).data('nodo');
    var valPago = $(event.relatedTarget).data('valorplan');
    console.log("pagoooo = "+nodo);
    var estado = true;
    console.log("Modal");
    cedula = cedulaCliente;
    $(this).find("#cedulaUsuario").text(cedulaCliente);
    $(this).find("#nombreUsuario").attr("value", nombreCliente);
    $(this).find("#telPpal").attr("value", telefonoPpal);
    $(this).find("#telOpc").attr("value", telefonoOpc);
    $(this).find("#fechaCreacion").attr("value", fechaCreacion);
    $(this).find("#dirUser").attr("value", direccion);
    $(this).find("#planUsuario").val(plan);
    $(this).find("#dirIP").attr("value", ip);
    $(this).find("#dirPPOE").attr("value", ppoe);
    $(this).find("#descripcionUsuario").text(descripcion);
    $(this).find("#nodo").attr("value", nodo);
    $(this).find("#valorPlan").attr("value", valPago);
  });
});




$(function () {
  var actualizarHora = function () {
    var fecha = new Date(),
      horaP = fecha.getHours(),
      minutosP = fecha.getMinutes(),
      segundosP = fecha.getSeconds(),
      hora = fecha.getHours(),
      minutos = fecha.getMinutes(),
      segundos = fecha.getSeconds(),
      diaSemana = fecha.getDay(),
      dia = fecha.getDate(),
      mes = fecha.getMonth(),
      anio = fecha.getFullYear(),
      ampm;


    var $pHoras = $("#horas"),
      $pSegundos = $("#segundos"),
      $pMinutos = $("#minutos"),
      $pDelivery = $("#deliveryPrice"),
      $pDiaSemana = $("#diaSemana"),
      $pDia = $("#dia"),
      $pMes = $("#mes"),
      $pAnio = $("#anio");
    $pHClock = $("#horaClock");
    var semana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    $pDiaSemana.text(semana[diaSemana]);
    $pDia.text(dia);
    $pMes.text(meses[mes]);
    $pAnio.text(anio);
    if (hora >= 12) {
      hora = hora - 12;
      ampm = "PM";
    } else {
      ampm = "AM";
    }
    if (hora == 0) {
      hora = 12;
    }
    if (hora < 10) { hora = "0" + hora };
    if (minutos < 10) { minutos = "0" + minutos };
    if (segundos < 10) { segundos = "0" + segundos };

    $pHClock.text(hora + " : " + minutos + " : " + segundos + "  " + ampm)
    if (horaP >= 7 && horaP < 18) { $pDelivery.text("Domicilio:  $ 5.000") }
    else if (horaP === 18) { $pDelivery.text("Domicilio:  $ 5.500") }
    else if (horaP === 19) { $pDelivery.text("Domicilio:  $ 6.000") }
    else if (horaP === 20) { $pDelivery.text("Domicilio:  $ 6.500") }
    else if (horaP === 21) { $pDelivery.text("Domicilio:  $ 7.000") }
    else if (horaP === 22) { $pDelivery.text("Domicilio:  $ 7.500") }
    else if (horaP === 23) { $pDelivery.text("Domicilio:  $ 8.000") }
    else if (horaP >= 0 && horaP < 7) { $pDelivery.text("Domicilio:  $ 10.000") }

  };


});

function registroPago() {
  var host = "http://dommatos-env.eba-mzrreypi.us-east-2.elasticbeanstalk.com/services/AccessApi/registroPago";
  var cedulaCliente = cedula;
  var mes = document.getElementById("mesFacturaPago").value;
  var factura = document.getElementById("facturaPago").value;
  var pago = document.getElementById("valorPagado").value;
  var estado = true;
  var fecha = "2021-" + mes + "-02";
  if (factura.length == 0 || factura.length > 16 || isNaN(factura) || factura == null) {
    message = message + 'Error Factura \n'
    estado = false;

  }/*email if( !(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)/.test(valor)) ) {
    return false;
  }*/

  if (estado) {
    let obj = {
      "idUsuario": cedulaCliente.toString(),
      "fechaPago": fecha.toString(),
      "factura": factura.toString(),
      "valorPago":pago.toString(),
    };


    var myJSON = JSON.stringify(obj);

    let xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.requestMode = 'no-cors';
    xhr.open("POST", host, true);
    xhr.onload = () => {

      // print JSON response
      if (xhr.status >= 200 && xhr.status < 300) {
        // parse JSON
        const response = JSON.parse(xhr.responseText);
        if (response.codigo == 0) {
          alert(response.mensaje);
        } else {
          alert(response.mensaje);
        }
        console.log(response.codigo);
      }
    };
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');

    xhr.onerror = function () {
      alert("Por favor valide la conexión a Internet, o Comuniquese con el administrador para validar la disponibilidad del Servicio");
    };
    xhr.send(myJSON);
  } else {
    alert("Por favor valide los siguientes campos:\n\n" + message);
  }


};


function registroUsuario() {
  var host = "http://dommatos-env.eba-mzrreypi.us-east-2.elasticbeanstalk.com/services/AccessApi/registroUsuario";
  var cedulaCliente = cedula;
  var nombreCliente = document.getElementById("nombreUsuario").value;
  var telefonoPpal = document.getElementById("telPpal").value;
  var telefonoOpc = document.getElementById("telOpc").value;
  var fechaCreacion = Date.now();
  var departamento = "";
  var ciudad = "";
  var direccion = document.getElementById("dirUser").value;
  var plan = document.getElementById("planUsuario").value;
  var ip = document.getElementById("dirIP").value;
  var ppoe = document.getElementById("dirPPOE").value;
  var descripcion = document.getElementById("descripcionUsuario").value;
  var idTecnico = "123";
  var latitud = localStorage.getItem('lat');
  var longitud = localStorage.getItem('lng');
  var message = '';
  var nodo = document.getElementById("nodo").value;
  var valuePay = document.getElementById("valorPlan").value;
  var estado = true;

  if (nombreCliente == null || nombreCliente.length == 0 || /^\s+$/.test(nombreCliente)) {
    message = 'Nombre \n';
    estado = false;
  }
  if (cedulaCliente.length == 0 || cedulaCliente.length > 16 || isNaN(cedulaCliente) || cedulaCliente == null) {
    message = message + 'Cedula \n'
    estado = false;

  }/*email if( !(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)/.test(valor)) ) {
    return false;
  }*/
  if (!(/^\d{10}$/.test(telefonoPpal))) {
    message = message + 'Telefono Principal \n'
    estado = false;
  } if (telefonoOpc.length > 0 && !(/^\d{10}$/.test(telefonoOpc))) {
    message = message + 'Telefono Opcional \n'
    estado = false;
  }
  if (estado) {
    let obj = {
      "cedulaCliente": cedulaCliente.toString(),
      "nombreCliente": nombreCliente.toString(),
      "telefonoPpal": telefonoPpal.toString(),
      "telefonoOpc": telefonoOpc.toString(),
      "fechaCreacion": fechaCreacion.toString(),
      "departamento": departamento.toString(),
      "ciudad": ciudad.toString(),
      "direccion": direccion.toString(),
      "plan": plan.toString(),
      "ip": ip.toString(),
      "ppoe": ppoe.toString(),
      "descripcion": descripcion.toString(),
      "idTecnico": idTecnico.toString(),
      "latitud": latitud.toString(),
      "longitud": longitud.toString(),
      "nodo": nodo.toString(),
      "pago": valuePay.toString()
    };
    console.log(localStorage.getItem('lat'));


    var myJSON = JSON.stringify(obj);

    let xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.requestMode = 'no-cors';
    xhr.open("POST", host, true);
    xhr.onload = () => {

      // print JSON response
      if (xhr.status >= 200 && xhr.status < 300) {
        // parse JSON
        const response = JSON.parse(xhr.responseText);
        if (response.codigo == 0) {
          alert(response.mensaje);
        } else {
          alert(response.mensaje);
        }
        console.log(response.codigo);
      }
    };
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');

    xhr.onerror = function () {
      alert("Por favor valide la conexión a Internet, o Comuniquese con el administrador para validar la disponibilidad del Servicio");
    };
    xhr.send(myJSON);
  } else {
    alert("Por favor valide los siguientes campos:\n\n" + message);
  }
  /* postFormData(host, obj)
       .then(data => console.log(data))
       .catch(error => console.error(error))
   //$.support.cors = true;
   /*$.post({
       url: host,
       data: myJSON,
       Accept : "application/json",
       headers: {  'Access-Control-Allow-Origin': '/*',  },
       contentType: "application/json",
       crossOrigin: false,
       xhrFields: {
           withCredentials: false
       },
       dataType: "json",
       success: function (data, textStatus, request) {
           console.log(data);
           alert(request.getResponseHeader('some_header'));
       },
   });*/

};