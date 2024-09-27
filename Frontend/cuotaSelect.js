document.addEventListener("DOMContentLoaded", function() {
    const cuotaCesantiaCheckbox = document.getElementById("cuotaCesantia");
    const cuotaPrimaCheckbox = document.getElementById("cuotaPrima");
    const cuotasTrueContainer = document.getElementById("cuotasTrue");
    const fechaEntregaInput = document.getElementById("fechaEntrega");

    // Función para actualizar los select en cuotasTrue
    function actualizarSelects() {
        // Limpiar contenido actual de cuotasTrue
        cuotasTrueContainer.innerHTML = '';

        // Obtener la fecha de entrega seleccionada
        const fechaEntrega = new Date(fechaEntregaInput.value);
        const fechaActual = new Date();

        // Calcular diferencia de meses entre la fecha actual y la fecha de entrega
        const mesesDiferencia = diferenciaMeses(fechaActual, fechaEntrega);

        // Determinar el número de opciones para el select de prima
        let numOpcionesPrima = calcularNumeroOpciones(mesesDiferencia);

        // Determinar el número de opciones para el select de cesantía (la mitad de las opciones de prima)
        let numOpcionesCesantia = countMarchesBetweenDates(fechaActual, fechaEntrega); // Redondeo hacia arriba para asegurar un número entero



        function countMarchesBetweenDates(currentDate, futureDate) {
            // Convertir las fechas a objetos Date
            let startDate = new Date(currentDate);
            let endDate = new Date(futureDate);
            
            // Inicializar contador de meses de marzo
            let marchCount = 0;
            
            // Bucle para recorrer los meses desde la fecha actual hasta la fecha futura
            while (startDate <= endDate) {
                // Si el mes es marzo (los meses en JavaScript son de 0 a 11, marzo es el mes 2)
                if (startDate.getMonth() === 1) {
                    marchCount++;
                }
                
                // Avanzar un mes
                startDate.setMonth(startDate.getMonth() + 1);
            }
            
            return marchCount;
        }
   
        // Generar opciones para el select de prima si está marcado el checkbox
        if (cuotaPrimaCheckbox.checked) {
            let labelPrima = document.createElement("label");
            labelPrima.textContent = "¿Cuántas cuotas de prima?";

            let selectPrima = document.createElement("select");
            selectPrima.id = "selectPrima"; // Asignar un ID para seleccionar más adelante

            for (let i = 1; i <= numOpcionesPrima; i++) {
                let option = document.createElement("option");
                option.value = `${i}`;
                option.textContent = `${i}`;
                selectPrima.appendChild(option);
            }

            cuotasTrueContainer.appendChild(labelPrima);
            cuotasTrueContainer.appendChild(selectPrima);

            // Agregar event listener para registrar el valor seleccionado cuando cambien los selects
            selectPrima.addEventListener("change", function() {
                let valorSeleccionado = this.value || 0; // Si el valor es null o undefined, usar 0
                // console.log("Valor seleccionado en prima: ", valorSeleccionado);
            });

            // Disparar evento change manualmente para registrar el valor inicial
            selectPrima.dispatchEvent(new Event('change'));
        }

        // Generar opciones para el select de cesantía si está marcado el checkbox
        if (cuotaCesantiaCheckbox.checked) {
            let labelCesantia = document.createElement("label");
            labelCesantia.textContent = "¿Cuántas cuotas de cesantía?";

            let selectCesantia = document.createElement("select");
            selectCesantia.id = "selectCesantia"; // Asignar un ID para seleccionar más adelante

            for (let i = 1; i <= numOpcionesCesantia; i++) {
                let option = document.createElement("option");
                option.value = `${i}`;
                option.textContent = `${i}`;
                selectCesantia.appendChild(option);
            }

            cuotasTrueContainer.appendChild(labelCesantia);
            cuotasTrueContainer.appendChild(selectCesantia);

            // Agregar event listener para registrar el valor seleccionado cuando cambien los selects
            selectCesantia.addEventListener("change", function() {
                let valorSeleccionado = this.value || 0; // Si el valor es null o undefined, usar 0
                // console.log("Valor seleccionado en cesantía: ", valorSeleccionado);
            });

            // Disparar evento change manualmente para registrar el valor inicial
            selectCesantia.dispatchEvent(new Event('change'));
        }
    }

    // Función para calcular la diferencia de meses entre dos fechas
    function diferenciaMeses(fechaInicio, fechaFin) {
        let diff = (fechaFin.getFullYear() - fechaInicio.getFullYear()) * 12;
        diff += fechaFin.getMonth() - fechaInicio.getMonth();
        return diff;
    }

    // Función para calcular el número de opciones basado en los pasos por meses
    function calcularNumeroOpciones(mesesDiferencia) {
        // Calcular pasos completos de 6 y 12 meses
        let pasosMes6 = Math.floor(mesesDiferencia / 6);
        let pasosMes12 = Math.floor(mesesDiferencia / 12);
    
        // Ajustar para contar la cuota actual si estamos en un mes de junio o diciembre
        let mesActual = new Date().getMonth() + 1; // Sumar 1 porque getMonth() devuelve de 0 a 11
        if (mesActual === 6 || mesActual === 12) {
            pasosMes6++;
        }
    
        // Sumar los pasos completos de 6 y 12 meses
        return pasosMes6;
    }
    
    // Escuchar cambios en los checkboxes y en la fecha de entrega para actualizar los select
    cuotaCesantiaCheckbox.addEventListener("change", actualizarSelects);
    cuotaPrimaCheckbox.addEventListener("change", actualizarSelects);
    fechaEntregaInput.addEventListener("change", actualizarSelects);

    // Llamar a la función inicialmente para establecer el estado inicial
    actualizarSelects();
});
