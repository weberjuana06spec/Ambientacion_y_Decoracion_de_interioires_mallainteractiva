document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll("button");

  let estado = {};

  // Cargar estado guardado si existe
  if (localStorage.getItem("estadoMaterias")) {
    estado = JSON.parse(localStorage.getItem("estadoMaterias"));
  }

  // Inicializar estado
  botones.forEach(btn => {
    const id = btn.dataset.id;
    if (estado[id] === undefined) estado[id] = false;

    if (btn.dataset.req) {
      btn.classList.add("bloqueado");
    }

    if (estado[id]) {
      btn.classList.add("aprobado");
    }
  });

  function actualizarBloqueos() {
    botones.forEach(otherBtn => {
      const requisitos = otherBtn.dataset.req?.split(",") || [];
      if (requisitos.length > 0) {
        const todosAprobados = requisitos.every(reqId => estado[reqId]);
        if (todosAprobados) {
          otherBtn.classList.remove("bloqueado");
        } else {
          otherBtn.classList.add("bloqueado");
          otherBtn.classList.remove("aprobado");
          estado[otherBtn.dataset.id] = false;
        }
      }
    });
  }

  actualizarBloqueos();

  botones.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;

      if (btn.classList.contains("bloqueado") && !estado[id]) return;

      // Toggle aprobado / no aprobado
      estado[id] = !estado[id];
      btn.classList.toggle("aprobado", estado[id]);

      // Guardar cambios
      localStorage.setItem("estadoMaterias", JSON.stringify(estado));

      // Actualizar desbloqueos y bloqueos
      actualizarBloqueos();
    });
  });
});
