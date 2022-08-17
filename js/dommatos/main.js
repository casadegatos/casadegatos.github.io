function validarUsuario() {
  
    var user = document.getElementById("usuario").value;
    var pass = document.getElementById("password").value;
    if (user === 'customer' && pass === 'dommatos#') {
        $('#exampleModal').modal('hide');
        $('#registroUsuarioModel').modal('show');

    }else {
        alert("ERROR: Autenticación - Usuario o Clave incorrectas");
    }

};

function initMap() {
    var latitud;
    var longitud;
    var latitudSol;
    var longitudSol;
    var search = document.getElementById('dirUser');
    var searchBoxUsr = new google.maps.places.Autocomplete(search);
    searchBoxUsr.setComponentRestrictions(
        { 'country': ['col'] });
    google.maps.event.addListener(searchBoxUsr, 'place_changed', function () {
        var places = searchBoxUsr.getPlace();
        latitud = places.geometry.location.lat();
        longitud = places.geometry.location.lng();
        localStorage.setItem('lat', latitud);
        localStorage.setItem('lng', longitud);
        console.log(latitud);

    });
    var searchModal = document.getElementById('dirSol');
    var searchBox = new google.maps.places.Autocomplete(searchModal);
    searchBox.setComponentRestrictions(
        { 'country': ['col'] });
    google.maps.event.addListener(searchBox, 'place_changed', function () {
        var places = searchBox.getPlace();
        latitudSol = places.geometry.location.lat();
        longitudSol = places.geometry.location.lng();
        localStorage.setItem('latSol', latitudSol);
        localStorage.setItem('lngSol', longitudSol);

    });


}

function registroUsuario() {
    var host = "http://calaos.co:8080/DommApi/services/AccessApi/registroUsuario";
    var cedulaCliente = document.getElementById("cedulaUsuario").value;
    var nombreCliente = document.getElementById("nombreUsuario").value;
    var telefonoPpal = document.getElementById("telPpal").value;
    var telefonoOpc = document.getElementById("telOpc").value;
    var fechaCreacion = Date.now();
    var departamento = document.getElementById("password").value;
    var ciudad = document.getElementById("password").value;
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
    var estado = true;
    var valPago = document.getElementById("valorPlan").value;

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
    if (!(/^\d{10}$/.test(telefonoPpal)) ) {
        message = message + 'Telefono Principal \n'
        estado = false;
    }if(telefonoOpc.length>0 && !(/^\d{10}$/.test(telefonoOpc))){
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
            "pago": valPago.toString(),
        };
        console.log(localStorage.getItem('lat'));


        var myJSON = JSON.stringify(obj);

        let xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.requestMode = 'no-cors';
        xhr.open("POST", host,true);
        xhr.onload = () => {

            // print JSON response
            if (xhr.status >= 200 && xhr.status < 300) {
                // parse JSON
                const response = JSON.parse(xhr.responseText);
                if (response.codigo == 0) {
                    document.getElementById("cedulaUsuario").value = '';
                    document.getElementById("nombreUsuario").value = '';
                    document.getElementById("telPpal").value = '';
                    document.getElementById("telOpc").value = '';
                    document.getElementById("password").value = '';
                    document.getElementById("password").value = '';
                    document.getElementById("dirUser").value = '';
                    document.getElementById("dirIP").value = '';
                    document.getElementById("dirPPOE").value = '';
                    document.getElementById("descripcionUsuario").value = '';
                    document.getElementById("nodo").value = '';
                    document.getElementById("valorPlan").value = '';
                    alert(response.mensaje);
                }else{
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
    }else{
        alert("Por favor valide los siguientes campos:\n\n"+message);
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

function registroSolicitud() {
    var host = "http://dommatos-env.eba-mzrreypi.us-east-2.elasticbeanstalk.com/services/AccessApi/registroSolicitud";
    var descripcion = document.getElementById("messageSol").value;
    var nombreCliente = document.getElementById("nameSol").value;
    var telefonoPpal = document.getElementById("telSol").value;
    var correo = document.getElementById("emailSol").value;
    var direccion = document.getElementById("dirSol").value;
    var latitud = localStorage.getItem('latSol');
    var longitud = localStorage.getItem('lngSol');
    var obj =
    {
        "nombre": nombreCliente,
        "direccion": direccion,
        "latitud": latitud,
        "longitud": longitud,
        "descripcion": descripcion,
        "telefono": telefonoPpal,
        "correo": correo
    };
    var myJSON = JSON.stringify(obj);
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.requestMode = 'no-cors';
    xhr.open("POST", host);

    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    xhr.send(myJSON);

};
async function postFormData(url, data) {
    var headers = new Headers();


    headers.append('Accept', 'application/json');
    headers.set("Content-Type", "application/json");
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');

    const response = await fetch(url, {
        method: 'POST',
        headers: [
            ["Content-Type", "application/json"]
        ],
        body: (JSON.stringify(data)),


        mode: 'no-cors',
    });
    return await response.json();
}



