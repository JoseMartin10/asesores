document.addEventListener("DOMContentLoaded", function() {
    const selectContrato = document.getElementById("contrato");
    const opcionesExtras = document.getElementById("opcionesExtras");
    const agregarSubsidio = document.getElementById("agregarSubsidio");

    const opcionesOriginales = []; // Array para guardar las opciones originales

    // Guardar las opciones originales
    for (let i = 0; i < agregarSubsidio.options.length; i++) {
        opcionesOriginales.push(agregarSubsidio.options[i]);
    }

    function filtrarOpciones() {
        // Borrar todas las opciones actuales
        agregarSubsidio.innerHTML = '';

        if (selectContrato.value === "independiente") {
            opcionesExtras.style.display = "none";

            // Mostrar solo las opciones con value "0" y "1"
            opcionesOriginales.forEach(option => {
                if (option.value === "0" || option.value === "1") {
                    agregarSubsidio.appendChild(option.cloneNode(true));
                }
            });
        } else if (selectContrato.value === "empleado") {
            opcionesExtras.style.display = "block";

            // Mostrar todas las opciones
            opcionesOriginales.forEach(option => {
                agregarSubsidio.appendChild(option.cloneNode(true));
            });
        }
    }

    // Filtrar opciones al cargar la página
    filtrarOpciones();

    // Escuchar cambios en el select
    selectContrato.addEventListener("change", filtrarOpciones);
});
