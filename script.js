document.addEventListener("DOMContentLoaded", () => {
    const materias = document.querySelectorAll(".materia");
    const tooltip = document.getElementById("tooltip");

    // Cargar estado desde localStorage
    let estado = JSON.parse(localStorage.getItem("estadoMaterias")) || {};

    // Aplicar estado inicial
    materias.forEach(materia => {
        const id = materia.dataset.id;
        if (estado[id] === "aprobada") {
            materia.classList.add("aprobada");
            materia.classList.remove("bloqueada");
        }
    });

    // Evento click para aprobar/desaprobar
    materias.forEach(materia => {
        materia.addEventListener("click", () => {
            if (materia.classList.contains("bloqueada")) return;

            materia.classList.toggle("aprobada");
            const id = materia.dataset.id;
            estado[id] = materia.classList.contains("aprobada") ? "aprobada" : "pendiente";

            // Guardar estado
            localStorage.setItem("estadoMaterias", JSON.stringify(estado));

            // Actualizar bloqueos
            actualizarBloqueos();
        });

        // Mostrar tooltip
        materia.addEventListener("mouseenter", (e) => {
            if (materia.classList.contains("bloqueada")) {
                const req = materia.dataset.req;
                const nombreReq = document.querySelector(`.materia[data-id="${req}"]`)?.innerText || "";
                tooltip.innerText = `Debes aprobar: ${nombreReq}`;
                tooltip.style.opacity = 1;
                tooltip.style.left = e.pageX + 10 + "px";
                tooltip.style.top = e.pageY + 10 + "px";
            }
        });

        materia.addEventListener("mousemove", (e) => {
            tooltip.style.left = e.pageX + 10 + "px";
            tooltip.style.top = e.pageY + 10 + "px";
        });

        materia.addEventListener("mouseleave", () => {
            tooltip.style.opacity = 0;
        });
    });

    function actualizarBloqueos() {
        materias.forEach(materia => {
            const req = materia.dataset.req;
            if (req) {
                const aprobado = estado[req] === "aprobada";
                materia.classList.toggle("bloqueada", !aprobado);
            }
        });
    }

    // Aplicar bloqueos iniciales
    actualizarBloqueos();
});
