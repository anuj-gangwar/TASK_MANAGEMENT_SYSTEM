function openStatusPopup(projectId) {
    // Find the selected status from the dropdown in the same row
    const statusText = document.querySelector(`[data-project-id='${projectId}']`).closest('tr').querySelector('.status-dropdown').value;

    // Update the modal content with the selected status
    document.getElementById('statusDetails').textContent = statusText; // Use textContent for displaying static text

    const statusModal = new bootstrap.Modal(document.getElementById('statusPopupModal'));
    statusModal.show();
}


function saveStatusUpdate() {
    const newStatus = document.getElementById('statusUpdate').value;
    const comments = document.getElementById('statusComments').value;
    alert(`Status updated to: ${newStatus}\nComments: ${comments}`);
}

document.addEventListener('DOMContentLoaded', function () {
    // Bar chart
    const barCtx = document.getElementById('barChart').getContext('2d');
    const barChart = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: 'Bar Chart Example',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple', 'orange']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            width: 300, // Added explicit width
            height: 250 // Added explicit height
        }
    });

    // Line chart
    const lineCtx = document.getElementById('lineChart').getContext('2d');
    const lineChart = new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Line Chart Example',
                data: [10, 15, 7, 12, 8, 14],
                borderColor: 'blue',
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            width: 300, // Added explicit width
            height: 250  // Added explicit height
        }
    });

    // Pie chart
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    const pieChart = new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: ['Apples', 'Bananas', 'Cherries'],
            datasets: [{
                label: 'Pie Chart Example',
                data: [30, 40, 30],
                backgroundColor: ['red', 'yellow', 'pink']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            width: 300, // Added explicit width
            height: 250  // Added explicit height
        }
    });

    let taskIdToDelete = null;

    // Capture the task ID when delete button is clicked
    document.querySelectorAll('.delete-task').forEach(button => {
        button.addEventListener('click', function () {
            taskIdToDelete = this.getAttribute('data-project-id');
        });
    });

    const confirmDeleteButton = document.getElementById('confirmDelete');
    if (confirmDeleteButton) {
        confirmDeleteButton.addEventListener('click', function () {
            if (taskIdToDelete) {
                // Perform delete operation (Replace with actual delete function)
                // Note:  The URL for the fetch was incorrect and will need to be updated.  I have commented out the line as it is.
                // fetch(`/deleteTask/${taskIdToDelete}`, {
                //    method: 'DELETE',
                //})

                // For now, just simulate the deletion with an alert
                alert(`Simulating deletion of task with ID: ${taskIdToDelete}`);

                // Reset taskIdToDelete
                taskIdToDelete = null;

                // Close the modal
                const deleteConfirmationModal = document.getElementById('deleteConfirmationModal');
                if (deleteConfirmationModal) {
                    const modal = bootstrap.Modal.getInstance(deleteConfirmationModal);
                    if (modal) {
                        modal.hide();
                    }
                }
            }
        });
    } else {
        console.warn("confirmDelete button not found.  Check your HTML.");
    }
});

function navigateToGraph() {
    window.location.href = './Module_Graph';
}