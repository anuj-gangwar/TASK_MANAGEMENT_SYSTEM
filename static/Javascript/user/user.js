<script>
                document.addEventListener("DOMContentLoaded", function () {
                    let employeeData = [
                        { department: "HR", role: "Manager", status: "Active" },
                        { department: "IT", role: "Developer", status: "Inactive" },
                        { department: "Finance", role: "Analyst", status: "Active" },
                        { department: "IT", role: "Developer", status: "Active" }
                    ];
        
                    function countOccurrences(array, key) {
                        return array.reduce((acc, obj) => {
                            acc[obj[key]] = (acc[obj[key]] || 0) + 1;
                            return acc;
                        }, {});
                    }
        
                    let departmentCounts = countOccurrences(employeeData, "department");
                    let roleCounts = countOccurrences(employeeData, "role");
                    let statusCounts = countOccurrences(employeeData, "status");
        
                    function createChart(canvasId, labels, data, backgroundColors, title) {
                        new Chart(document.getElementById(canvasId), {
                            type: "doughnut",
                            data: {
                                labels: labels,
                                datasets: [{
                                    data: data,
                                    backgroundColor: backgroundColors
                                }]
                            },
                            options: {
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { position: "bottom" },
                                    title: { display: true, text: title }
                                }
                            }
                        });
                    }
        
                    const colors = ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff"];
        
                    createChart("departmentChart", Object.keys(departmentCounts), Object.values(departmentCounts), colors, "Department Distribution");
                    createChart("roleChart", Object.keys(roleCounts), Object.values(roleCounts), colors, "Role Distribution");
                    createChart("statusChart", Object.keys(statusCounts), Object.values(statusCounts), colors, "Employee Status");
                });
        
                function toggleEmployeeCharts() {
                    let container = document.getElementById("employeeChartsContainer");
                    let button = event.target;
        
                    if (container.classList.contains("hidden")) {
                        container.classList.remove("hidden");
                        button.innerHTML = "−";
                    } else {
                        container.classList.add("hidden");
                        button.innerHTML = "+";
                    }
                }
            </script>



<script>
    // Function to update the charts based on the table data
    function updateCharts() {
        let departmentData = {};
        let roleData = {};
        let statusData = {};

        document.querySelectorAll(".table tbody tr").forEach(row => {
            const department = row.cells[2].textContent.trim();
            const role = row.cells[3].textContent.trim();
            const statusBadge = row.cells[4].querySelector('.badge');
            const status = statusBadge ? statusBadge.textContent.trim() : 'Unknown';

            departmentData[department] = (departmentData[department] || 0) + 1;
            roleData[role] = (roleData[role] || 0) + 1;
            statusData[status] = (statusData[status] || 0) + 1;
        });

        // Update Department Chart (Bar Chart)
        departmentChart.data.labels = Object.keys(departmentData);
        departmentChart.data.datasets[0].data = Object.values(departmentData);
        departmentChart.update();

        // Update Role Chart (Pie Chart)
        roleChart.data.labels = Object.keys(roleData);
        roleChart.data.datasets[0].data = Object.values(roleData);
        roleChart.update();

        // Update Status Chart (Doughnut Chart)
        statusChart.data.labels = Object.keys(statusData);
        statusChart.data.datasets[0].data = Object.values(statusData);
        statusChart.update();
    }

    // Initialize Charts
    const departmentChart = new Chart(document.getElementById("departmentChart"), {
        type: "bar",
        data: {
            labels: [],
            datasets: [{
                label: "Number of Employees",
                data: [],
                backgroundColor: "#2ecc71" // Green color
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const roleChart = new Chart(document.getElementById("roleChart"), {
        type: "pie",
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: ["#3498db", "#9b59b6", "#f39c12", "#e74c3c"] // Different colors
            }]
        },
        options: {
            responsive: true
        }
    });

    const statusChart = new Chart(document.getElementById("statusChart"), {
        type: "doughnut",
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: ["#3498db", "#e74c3c"] // Blue and red colors
            }]
        },
        options: {
            responsive: true
        }
    });

    // Run updateCharts initially
    updateCharts();
</script>


<script>
    let taskIdToDelete = null;

    // Capture the task ID when delete button is clicked
    document.querySelectorAll('.delete-task').forEach(button => {
        button.addEventListener('click', function () {
            taskIdToDelete = this.getAttribute('data-project-id');
        });
    });

    document.getElementById('confirmDelete').addEventListener('click', function () {
        if (taskIdToDelete) {
            // Perform delete operation (Replace with actual delete function)
            fetch(`/deleteTask/${taskIdToDelete}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    alert('Task Deleted Successfully');
                    window.location.href = "taskPage.html"; // Redirect after deletion
                } else {
                    alert('Error deleting task');
                }
            })
            .catch(error => console.error('Error:', error));

            // Hide the modal
            let modal = bootstrap.Modal.getInstance(document.getElementById('deleteConfirmationModal'));
            modal.hide();
        }
    });
</script>