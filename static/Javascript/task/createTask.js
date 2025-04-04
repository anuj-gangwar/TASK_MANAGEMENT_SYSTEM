document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const taskNameInput = document.getElementById("task_name");

    form.addEventListener("submit", function (event) {
        const taskName = taskNameInput.value.trim();

        // Check if task name is empty
        if (!taskName) {
            alert("Task name is required.");
            event.preventDefault();
            return;
        }

        // Check length (3-100 characters)
        if (taskName.length < 3 || taskName.length > 50) {
            alert("Task name must be between 3 and 100 characters.");
            event.preventDefault();
            return;
        }

        // Check for valid characters (letters, numbers, spaces)
        const taskNamePattern = /^[A-Za-z0-9\s]+$/;
        if (!taskNamePattern.test(taskName)) {
            alert("Task name can only contain letters, numbers, and spaces.");
            event.preventDefault();
            return;
        }
    });
});
