document.addEventListener("DOMContentLoaded", function () {
    const courses = document.querySelectorAll(".course");

    // Cargar progreso guardado
    const savedState = JSON.parse(localStorage.getItem("approvedCourses")) || [];

    courses.forEach(course => {
        const id = course.getAttribute("data-id");
        const requisitos = course.getAttribute("data-req");

        // Tooltip con requisitos
        if (requisitos) {
            course.title = "Requisitos: " + requisitos
                .split(",")
                .map(reqId => {
                    const reqCourse = document.querySelector(`.course[data-id="${reqId}"]`);
                    return reqCourse ? reqCourse.textContent : `ID ${reqId}`;
                })
                .join(", ");
        }

        // Marcar como aprobado si estaba guardado
        if (savedState.includes(id)) {
            course.classList.add("approved");
        }

        // Inicializar bloqueo si no cumple requisitos
        if (!checkRequirements(id)) {
            course.classList.add("locked");
        }

        // Evento de click
        course.addEventListener("click", function () {
            if (course.classList.contains("locked") && !course.classList.contains("approved")) return;

            course.classList.toggle("approved");

            saveProgress();
            updateLocks();
        });
    });

    function checkRequirements(id) {
        const course = document.querySelector(`.course[data-id="${id}"]`);
        const requisitos = course.getAttribute("data-req");
        if (!requisitos) return true;

        return requisitos.split(",").every(reqId =>
            document.querySelector(`.course[data-id="${reqId}"]`).classList.contains("approved")
        );
    }

    function updateLocks() {
        courses.forEach(course => {
            const id = course.getAttribute("data-id");
            if (checkRequirements(id)) {
                course.classList.remove("locked");
            } else {
                if (!course.classList.contains("approved")) {
                    course.classList.add("locked");
                }
            }
        });
    }

    function saveProgress() {
        const approvedIds = [...courses]
            .filter(course => course.classList.contains("approved"))
            .map(course => course.getAttribute("data-id"));
        localStorage.setItem("approvedCourses", JSON.stringify(approvedIds));
    }

    updateLocks();
});
