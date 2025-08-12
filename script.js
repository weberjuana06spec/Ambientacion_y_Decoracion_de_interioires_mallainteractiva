document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll("button");

  // Estado de cada materia
  const estado = {};

  // Inicialización: bloquear las que tienen requisitos
  botones.forEach(btn => {
    const id = btn.dataset.id;
    estado[id] = false; // no aprobada
    if (btn.dataset.req) {
      btn.classList.add("bloqueado");
    }
  });

  botones.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;

      // Si está bloqueada, no hace nada
      if (btn.classList.contains("bloqueado")) return;

      // Marcar como aprobada
      estado[id] = true;
      btn.classList.add("aprobado");

      // Desbloquear materias que dependan de esta
      botones.forEach(otherBtn => {
        const requisitos = otherBtn.dataset.req?.split(",") || [];
        if (requisitos.length > 0) {
          const todosAprobados = requisitos.every(reqId => estado[reqId]);
          if (todosAprobados) {
            otherBtn.classList.remove("bloqueado");
          }
        }
      });
    });
  });
});
