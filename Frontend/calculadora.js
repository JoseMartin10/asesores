function calcularYGenerar() {
    calcular(); // Ejecuta la función calcular
    setTimeout(generarImagen, 1000); // Ejecuta la función generarImagen después de 1 segundo
} 


function calcular() {

    //Salario Minimo Legal Vigente

    var SMMLV = 1300000;
    // Obtener la fecha actual
    var fechaActual = new Date();


    function capitalizeEachWord(str) {
        return str.replace(/(^\w{1}|\s+\w{1})/g, function (match) {
            return match.toUpperCase();
        });
    }
    
    // Obtener los valores ingresados por el usuario
    var ingresos = parseFloat(document.getElementById("ingresos").value);
    var puntajeSisben = parseInt(document.getElementById("puntajeSisben").value);
    var proyecto = document.getElementById("proyecto").value;
    var email = document.getElementById("email").value;
    var nombre = capitalizeEachWord(document.getElementById("nombre").value);
    

    // Definir los valores predeterminados para valorVivienda y separacion
    var valorVivienda;
    var separacion;
    var fechaFutura;

    // Actualizar valorVivienda y separacion según el proyecto seleccionado
    switch (proyecto) {
        case "brissa-casas":
            valorVivienda = 159000000;
            separacion = 1000000;
            fechaFutura = new Date('2026-01-31');
            proyectoSeleccionado = "./brissa logo app.png"
            break;
        case "brissa-apto-duplex-1er-piso":
            valorVivienda = 145900000;
            separacion = 1000000;
            fechaFutura = new Date('2026-01-31');
            proyectoSeleccionado = "./brissa logo app.png"
            break;
        case "brissa-apto-duplex-3er-piso-3hab":
            valorVivienda = 147900000;
            separacion = 2000000;
            fechaFutura = new Date('2026-01-31');
            proyectoSeleccionado = "./brissa logo app.png"
            break;
        case "brissa-apto-duplex-3er-piso-2hab":
            valorVivienda = 129600000;
            separacion = 1000000;
            fechaFutura = new Date('2026-01-31');
            proyectoSeleccionado = "./brissa logo app.png"
            break;
        case "crescentia":
            valorVivienda = 169900000;
            separacion = 2000000;
            fechaFutura = new Date('2024-12-31');
            proyectoSeleccionado = "./crescentia logo app.png"
            break;
        case "refugio":
            valorVivienda = 163000000;
            separacion = 2000000;
            fechaFutura = new Date('2025-10-31');
            proyectoSeleccionado = "./refugio logo app.png"
            break;
        case "serrania":
            valorVivienda = 129600000;
            separacion = 1000000;
            fechaFutura = new Date('2026-01-31');
            proyectoSeleccionado = "./serrania logo app.png"
            break;
        default:
            // Manejar un caso por defecto si es necesario
            break;
    }

    var diferenciaMilisegundos = fechaFutura - fechaActual;
    var mesesRestantes = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24 * 30.4375));

    // Definir los valores predeterminados para valorCuotaInicial, subsidio, y credito
    var valorCuotaInicial = 0;
    var subsidio = 0;
    var credito = 0;
    var subsidioCompensacion = 0;
    var creditoPesos = 11010;
    var creditoUVR = 5845;

    // Calcular los valores correspondientes al puntaje Sisben y los ingresos
    if (ingresos < SMMLV * 2 && puntajeSisben == 1) {
        subsidio = 26000000;
        subsidioCompensacion = 39000000;
        valorCuotaInicial = (valorVivienda * 0.1) - separacion;
        credito = valorVivienda - subsidio - valorCuotaInicial - subsidioCompensacion;
    } else {
        switch (puntajeSisben) {
            case 1:
                subsidio = 39000000;
                valorCuotaInicial = (valorVivienda * 0.1) - separacion;
                credito = valorVivienda - subsidio - valorCuotaInicial;
                break;
            case 2:
                subsidio = 26000000;
                valorCuotaInicial = (valorVivienda * 0.3) - subsidio - separacion;
                credito = valorVivienda - subsidio - valorCuotaInicial;
                break;
            case 3:
                subsidio = 0;
                valorCuotaInicial = (valorVivienda * 0.3) - separacion;
                credito = valorVivienda - valorCuotaInicial;
                break;
        }
    }

    var ingresosCalculados = ingresos;
    var cuotaEspecialCesantia = ingresos;
    var cuotaEspecialPrima = ingresos / 2;
    var numeroCuotaCesantia = 0;
    var numeroCuotaPrima = 0;
    if (mesesRestantes >= 6 && mesesRestantes < 12) {
        ingresosCalculados = ingresosCalculados / 2;
        numeroCuotaPrima = 1;
    } else if (mesesRestantes >= 12 && mesesRestantes < 18) {
        ingresosCalculados = ingresosCalculados * 2 / 2 + ingresosCalculados;
        numeroCuotaPrima = 2;
        numeroCuotaCesantia = 1;
        cuotaEspecialCesantia = cuotaEspecialCesantia;
    } else if (mesesRestantes >= 18 && mesesRestantes < 24) {
        ingresosCalculados = ingresosCalculados * 3 / 2 + ingresosCalculados;
        numeroCuotaPrima = 3;
        numeroCuotaCesantia = 1;
        cuotaEspecialCesantia = cuotaEspecialCesantia;
    } else if (mesesRestantes >= 24 && mesesRestantes < 30) {
        ingresosCalculados = ingresosCalculados * 4 / 2 + ingresosCalculados * 2;
        numeroCuotaPrima = 4;
        numeroCuotaCesantia = 2;
        cuotaEspecialCesantia = cuotaEspecialCesantia * 2;
    };


    // Calcular cuotaMensualInicial según el valorCuotaInicial

    if (ingresos >= SMMLV * 3) {
        ingresosCalculados = 0;
        numeroCuotaCesantia = 0;
        numeroCuotaPrima = 0;
        cuotaMensualInicial = Math.ceil(valorCuotaInicial / mesesRestantes)

    };


    var cuotaMensualInicial = Math.floor((valorCuotaInicial - ingresosCalculados) / mesesRestantes);

    if (cuotaMensualInicial < 350000) {
        mesesRestantes = Math.ceil((valorCuotaInicial - ingresosCalculados) / 350000)
        cuotaMensualInicial = Math.ceil((valorCuotaInicial - ingresosCalculados) / mesesRestantes);
    };

    creditoPesos = Math.floor(creditoPesos * credito / 1000000);
    creditoUVR = Math.floor(creditoUVR * credito / 1000000);


    // Función para formatear números con espacios cada tres cifras
    function formatNumberWithSpaces(number) {
        return "$" + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    // Dentro de la función calcular(), donde necesitas mostrar los números en las tablas, puedes usar esta función
    document.getElementById("resultado").innerHTML = `
    <img src="${proyectoSeleccionado}" alt="Proyecto" style="width: 50%; margin-bottom:2%">

    <p><strong>Valor de la vivienda: </strong><br>${formatNumberWithSpaces(valorVivienda)}</p>
    <p><strong>Separación: </strong><br>${formatNumberWithSpaces(separacion)}</p>
    <p>La cuota de separación es el primer abono que realizarás, una vez realizado el pago podrás elegir tu vivienda.</p>

    <p><strong>Valor cuota inicial:</strong><br> ${formatNumberWithSpaces(valorCuotaInicial)}</p>
    <p>La cuota inicial es el aporte que pagarás después de tu separación hasta el momento de la escrituración.</p>
    <p><strong>Realizarás los pagos mensuales así:</strong></p>
    <p><strong>${mesesRestantes} cuotas mensuales de: </strong><br>${formatNumberWithSpaces(cuotaMensualInicial)}</p>
    ${numeroCuotaCesantia > 0 ? `<p><strong>${numeroCuotaCesantia} Cuota(s) extra(s) de cesantías de: </strong><br>${formatNumberWithSpaces(cuotaEspecialCesantia)}</p>` : ''}
    ${numeroCuotaPrima > 0 ? `<p><strong>${numeroCuotaPrima} Cuota(s) extra(s) de primas de: </strong><br>${formatNumberWithSpaces(cuotaEspecialPrima)}</p>` : ''}

    ${subsidio != 0 || (ingresos < SMMLV * 2 && puntajeSisben == 1) ? `
    ${subsidio != 0 ? `<p><strong>Subsidio Mi Casa Ya: </strong><br>${formatNumberWithSpaces(subsidio)}</p>` : ''}
    ${subsidio != 0 ? `<p>Deberás cumplir los requisitos especificados en las notas*</p>` : ''}
    ${(ingresos < SMMLV * 2 && puntajeSisben == 1) ? `<p><strong>Subsidio Caja de Compensación: </strong><br>${formatNumberWithSpaces(subsidioCompensacion)}</p>` : ''}
    ${(ingresos < SMMLV * 2 && puntajeSisben == 1) ? `<p>Deberás cumplir los requisitos especificados en las notas*</p>` : ''}` : ''}

    <p><strong>Crédito hipotecario: </strong><br>${formatNumberWithSpaces(credito)}</p>
    <p>Este es el monto que financiarás con el banco. Empezarás a pagar después de la entrega de tu vivienda.</p>
    <p><strong>Cuota aprox. en pesos: </strong><br>${formatNumberWithSpaces(creditoPesos)}</p>
    <p>Deberás cumplir los requisitos especificados en las notas*</p>
    <p><strong>Cuota aprox. en UVR: </strong><br>${formatNumberWithSpaces(creditoUVR)}</p>
    <p>Deberás cumplir los requisitos especificados en las notas*</p>

    <p><strong>Requisitos para programas de subsidios:</strong></p>
    <p>1. No tener casa, lotes o inmuebles en el territorio nacional.</p>
    <p>2. No haber sido beneficiario de ningún programa de vivienda.</p>
    <p>3. Contar con registro de la encuesta SISBEN (Si no tienes SISBEN puedes solicitarlo totalmente gratis, recuerda que no tiene nada que ver con tu sistema de salud).</p>

    <p>Si cumples estos requisitos podrás obtener:</p>
    <p>$39.000.000 (Para personas con calificaciones SISBEN entre A1 y C8)</p>
    <p>$26.000.000 (Para personas con calificaciones SISBEN entre C9 Y D20)</p>

    <p><strong>Recuerda que te acompañamos en todo el proceso de postulación y asignación.</strong></p>
`;


    document.getElementById("cotizacionImagen").innerHTML = `

    <div class="linea-construvid">
    <div class="linea"></div>
    <img src="./logo verde .png" alt="logo">
    </div>

    <div class="identificador">
    <div class="logo-nombre">
    <img src="${proyectoSeleccionado}" alt="Proyecto">
    <p><strong>${nombre}</strong></p>
    </div>
    <p><strong>Valor de la vivienda: </strong>${formatNumberWithSpaces(valorVivienda)}</p>
    <p><strong>Separación: </strong>${formatNumberWithSpaces(separacion)}</p>
    <span>La cuota de separación es el primer abono que realizarás, una vez realizado el pago podrás elegir tu vivienda.</span>
    </div>
    <section class="padre-divs">
    
    <div class="medios-de-pago">
    <p><strong>Valor cuota inicial:</strong> ${formatNumberWithSpaces(valorCuotaInicial)}</p>
    <span>La cuota de inicial es el aporte que pagarás después de tu separación hasta el momento de la escrituración</span>
    <p><strong>Realizarás los pagos mensuales así</strong></p>
    <p><strong>${mesesRestantes} cuotas mensuales de: </strong>${formatNumberWithSpaces(cuotaMensualInicial)}</p>
    ${numeroCuotaCesantia > 0 ? `<p><strong>${numeroCuotaCesantia} Cuota(s) extra(s) de cesantías de: </strong>${formatNumberWithSpaces(cuotaEspecialCesantia)}</p>` : ''}
    ${numeroCuotaPrima > 0 ? `<p><strong>${numeroCuotaPrima} Cuota(s) extra(s) de primas de: </strong>${formatNumberWithSpaces(cuotaEspecialPrima)}</p>` : ''}
    </div>

    ${subsidio != 0 || ingresos < SMMLV * 2 && puntajeSisben == 1 ? `<div class="subsidios">
    ${subsidio != 0 ? `<p><strong>Subsidio Mi Casa Ya: </strong>${formatNumberWithSpaces(subsidio)}</p>` : ''}
    ${subsidio != 0 ? `<span>Deberás cumplir los requisitos especificados en las notas*</span>` : ''}
    ${ingresos < SMMLV * 2 && puntajeSisben == 1 ? `<p><strong>Subsidio Caja de Compensación: </strong>${formatNumberWithSpaces(subsidioCompensacion)}</p>` : ''}
    ${ingresos < SMMLV * 2 && puntajeSisben == 1 ? `<span>Deberás cumplir los requisitos especificados en las notas*</span>` : ''}
    </div>` : ''}

    <div class="creditos">
    <p><strong>Crédito hipotecario: </strong>${formatNumberWithSpaces(credito)}</p>
    <span>Este es el monto que financiarás con el banco. Empezarás a pagar después de la entrega de tu vivienda.</span>
    <p><strong>Cuota aprox. en pesos: </strong>${formatNumberWithSpaces(creditoPesos)}</p>
    <span>Deberás cumplir los requisitos especificados en las notas*</span>
    <p><strong>Cuota aprox. en UVR: </strong>${formatNumberWithSpaces(creditoUVR)}</p>
    <span>Deberás cumplir los requisitos especificados en las notas*</span>

    </div>
    </section>

    <section class="requisitos">
    <p><strong>Requisitos para programas de subsidios:</strong></p>
    <p>1. No tener casa, lotes o inmuebles en el territorio nacional.</p>
    <p>2. No haber sido beneficiario de ningún programa de vivienda.</p>
    <p>3. Contar con registro de la encuesta SISBEN</p>
    <p>(Si no tienes SISBEN puedes solicitarlo totalmente gratis, </p>
    <p>recuerda que no tiene nada que ver con tu sistema de salud)</p>
    <p>Si cumples estos requisitos podrás obtener:</p>
    <p>$39.000.000 (Para personas con calificaciones SISBEN entre A1 y C8</p>
    <p>$26.000.000 (Para personas con calificaciones SISBEN entre C9 Y D20</p><br>
    <span><strong>Recuerda que te acompañamos en todo el proceso de postulación y asignación.</strong></span>
    </section>

    `;

    // Mostrar el botón para generar la imagen
    document.getElementById("generarImagenButton").style.display = "block";
}

function generarImagen() {
    html2canvas(document.getElementById('cotizacionImagen'), {
        scale: 2, // Ajusta la escala para mejorar la resolución
        useCORS: true // Permite el uso de imágenes de otros dominios
    }).then(function (canvas) {
        // Convertir el canvas a un Blob
        canvas.toBlob(function (blob) {
            // Crear un enlace de descarga para la imagen localmente
            function capitalizeEachWord(str) {
                return str.replace(/(^\w{1}|\s+\w{1})/g, function (match) {
                    return match.toUpperCase();
                });
            }
            var whatsapp = 'https://api.whatsapp.com/send/?phone=573182711494'
            var link = document.createElement('a');
            var nombreElement = document.getElementById("nombre");
            var nombre = capitalizeEachWord(nombreElement.value);
            var email = document.getElementById("email").value;
            link.download = 'cotizacion.png'; // Establece el nombre del archivo
            link.href = URL.createObjectURL(blob); // Establece el enlace de descarga al Blob
            link.click(); // Simula el clic en el enlace para iniciar la descarga

            // Crear un objeto FormData para enviar el archivo al backend
            var formData = new FormData();
            formData.append('imagen', blob, 'cotizacion.png'); // 'imagen' es el nombre del campo en el FormData

            // Enviar la imagen al backend
            fetch('http://localhost:3000/api/cloudinary/upload', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    // Aquí puedes manejar la respuesta del backend,
                    // como mostrar la URL de la imagen subida o realizar otras acciones.
                    console.log('Imagen subida a Cloudinary:', data.imageUrl);

                    // Agregar la URL de Cloudinary al cuerpo del mensaje de correo electrónico
                    var emailData = {
                        to: email,
                        subject: '¡Aquí tienes tu cotización!',
                        text: 'Contenido del correo en texto plano con la URL de Cloudinary: ' + data.imageUrl,
                        html: '<table align="center" border="0" cellpadding="0" cellspacing="0" width="700"  style="font-family: Montserrat, sans-serif; background-color: white;"> <tr> <td> <table border="0" cellpadding="0" cellspacing="0" width="100%" style=" height: 200px;"> <tr> <td align="left" valign="middle" style="width: 35%; padding-left: -20px;"> <a href="https://construvid.com"> <img src="https://res.cloudinary.com/ds8xgdmgr/image/upload/v1717098363/circulo1_s8v5xy.png" alt="" style="display: block; width: 250px;"> </a> </td> <td align="right" valign="middle" style="width: 35%; padding-right: 10px;"> <a href="https://construvid.com"> <img src="https://res.cloudinary.com/ds8xgdmgr/image/upload/v1717083285/logo_verde_rb58bd.png" alt="" style="display: block; width: 250px; margin-right: 10%;"> </a> </td> </tr> </table> <table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td style="padding: 10px 5%;"> <h1 style="color: #859C4C; font-size: 60px; margin: 0; border-bottom: 4px solid #ADF983; width: fit-content;"> ¡Hola '+nombre+'! </h1> </td> </tr> <tr> <td style="padding: 0 5%;"> <p style="font-size: 25px; margin: 10px 0;">Gracias por contactarnos, queremos que te conviertas en nuestro próximo propietario.</p> <p style="font-size: 25px; margin: 10px 0;">Haciendo clic en el siguiente link podrás ver los detalles de tu cotización.</p> </td> </tr> <tr> <td style="padding: 20px 5%; text-align: center;"> <a href="' + data.imageUrl + '" style="display: inline-block; margin: 10px 0; background-color: #859C4C; padding: 15px 25px; font-size: 35px; border-radius: 60px; color: white; text-decoration: none; font-weight: bold;"> Ver cotización </a> </td> </tr> <tr> <td style="padding: 0 5%;"> <p style="font-size: 25px; margin: 10px 0;">No dudes en comunicarte con nosotros si tienes alguna duda.</p> </td> </tr> <tr> <td style="padding: 20px 5%; text-align: center;"> <a href="' + whatsapp + '" style="display: inline-block; margin: 10px 0; background-color: #ADF983; padding: 15px 25px; font-size: 35px; border-radius: 60px; color: #859C4C; text-decoration: none; font-weight: bold;"> Asesoría vía whatsapp </a> </td> </tr> </table> <table border="0" cellpadding="0" cellspacing="0" width="100%" style=" height: 100px;"> </table> </td> </tr> </table>',
                    };


                    // Enviar el correo electrónico con la URL de Cloudinary incluida en el cuerpo del mensaje
                    fetch('http://localhost:3000/api/email/send-email', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(emailData)
                    })
                        .then(response => response.text())
                        .then(data => {
                            console.log('Correo electrónico enviado:', data);
                        })
                        .catch(error => {
                            // Manejar errores
                            console.error('Error al enviar correo electrónico:', error);
                        });
                })
                .catch(error => {
                    // Manejar errores
                    console.error('Error al subir imagen a Cloudinary:', error);
                });
        }, 'image/png'); // Especifica el tipo MIME de la imagen (en este caso, PNG)
    });
}


