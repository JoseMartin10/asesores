
    // Función para formatear el valor numérico con separadores de miles
    function formatNumberInput(inputElementId, hiddenElementId) {
        let inputElement = document.getElementById(inputElementId);
        let hiddenElement = document.getElementById(hiddenElementId);
        
        inputElement.addEventListener('input', function (e) {
            let value = e.target.value;

            // Elimina todos los caracteres que no sean dígitos
            value = value.replace(/\D/g, '');

            // Formatea el valor numérico con separadores de miles
            let formattedValue = new Intl.NumberFormat('es-ES').format(value);

            // Asigna el valor formateado de vuelta al input visible
            e.target.value = formattedValue;

            // Actualiza el valor del input oculto con el valor numérico sin separadores
            hiddenElement.value = value;

            // Mostrar el valor numérico sin separadores en la consola
            let numericValue = parseInt(value, 10);
        });
    }

    // Llamar a la función para ambos inputs
    formatNumberInput('ingresosUsuario', 'ingresos');
    formatNumberInput('cuotaMaximaUsuario', 'cuotaMaxima');

