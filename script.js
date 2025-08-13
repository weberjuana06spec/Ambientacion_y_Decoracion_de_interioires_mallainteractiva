document.addEventListener("DOMContentLoaded", () => {
    const materias = document.querySelectorAll(".materia");

    // Cargar estado desde localStorage
    let aprobadas = JSON.parse(localStorage.getItem("aprobadas")) || [];

    function actualizarEstado() {
        materias.forEach(materia => {
            const id = materia.dataset.id;
            const requisitos = materia.dataset.req.split(",");
            let bloqueada = false;

            // Tooltip dinámico
            if (materia.dataset.req === "") {
                materia.setAttribute("data-tooltip", "Sin requisitos");
            } else if (materia.dataset.req === "ALL") {
                materia.setAttribute("data-tooltip", "Requiere aprobar TODAS las materias previas");
            } else {
                const nombresReq = requisitos.map(reqId => {
                    const reqElem = document.querySelector(`.materia[data-id='${reqId}']`);
                    return reqElem ? reqElem.textContent : "";
                });
                materia.setAttribute("data-tooltip", "Requisitos:\n" + nombresReq.join("\n"));
            }

            // Bloqueo/desbloqueo
            if (materia.dataset.req === "ALL") {
                bloqueada = materias.length - 1 !== aprobadas.length;
            } else if (requisitos[0] !== "") {
                bloqueada = !requisitos.every(reqId => aprobadas.includes(reqId));
            }

            materia.classList.remove("aprobada", "bloqueada");
            if (aprobadas.includes(id)) {
                materia.classList.add("aprobada");
            } else if (bloqueada) {
                materia.classList.add("bloqueada");
            }
        });
    }

    // Click en materia
    materias.forEach(materia => {
        materia.addEventListener("click", () => {
            if (materia.classList.contains("bloqueada")) return;

            const id = materia.dataset.id;
            if (aprobadas.includes(id)) {
                aprobadas = aprobadas.filter(m => m !== id);
            } else {
                aprobadas.push(id);
            }
            localStorage.setItem("aprobadas", JSON.stringify(aprobadas));
            actualizarEstado();
        });
    });

    actualizarEstado();
});
