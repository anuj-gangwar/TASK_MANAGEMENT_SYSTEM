document.addEventListener("DOMContentLoaded", function () {
    // Make all input fields non-editable and ensure uniform box sizes
    const inputs = document.querySelectorAll(".form-control");
    inputs.forEach(input => {
        input.setAttribute("readonly", true);
        input.style.height = "40px"; // Ensuring uniform height
    });

    const textareas = document.querySelectorAll("textarea.form-control");
    textareas.forEach(textarea => {
        textarea.setAttribute("readonly", true);
        textarea.style.height = "100px"; // Ensuring uniform height
    });

    // Delete confirmation modal handling
    const deleteButtons = document.querySelectorAll("#confirmDelete");
    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            alert("Module deleted successfully!");
            const modal = document.getElementById("deleteConfirmationModal");
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
        });
    });

    // Progress bar dynamic color change based on percentage
    const progressBar = document.querySelector(".progress-bar");
    if (progressBar) {
        const progressValue = parseInt(progressBar.getAttribute("aria-valuenow"));
        if (progressValue < 30) {
            progressBar.classList.add("bg-danger");
        } else if (progressValue < 70) {
            progressBar.classList.add("bg-warning");
        } else {
            progressBar.classList.add("bg-success");
        }
    }

});