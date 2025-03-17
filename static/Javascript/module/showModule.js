
document.addEventListener("DOMContentLoaded", function () {
    let deleteButtons = document.querySelectorAll(".btn-danger[data-bs-toggle='modal']");
    let confirmDeleteBtn = document.getElementById("confirmDelete");

    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            let moduleId = this.getAttribute("data-id"); // Get module ID
            confirmDeleteBtn.setAttribute("data-id", moduleId);
        });
    });

    confirmDeleteBtn.addEventListener("click", function () {
        let moduleId = this.getAttribute("data-id");
        if (moduleId) {
            console.log("Deleting module with ID:", moduleId);
            // Example: window.location.href = `/delete/module/${moduleId}/`;
        }
    });
});

