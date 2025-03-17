
document.addEventListener("DOMContentLoaded", function () {
    let taskData = [
        { status: "In Progress", department: "Finance", priority: "High" },
        { status: "Completed", department: "IT", priority: "Medium" },
        { status: "Pending", department: "Human Resources", priority: "Low" },
        { status: "In Progress", department: "Finance", priority: "High" }
    ];

    function countOccurrences(array, key) {
        return array.reduce((acc, obj) => {
            acc[obj[key]] = (acc[obj[key]] || 0) + 1;
            return acc;
        }, {});
    }

    let statusCounts = countOccurrences(taskData, "status");
    let departmentCounts = countOccurrences(taskData, "department");
    let priorityCounts = countOccurrences(taskData, "priority");

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

    createChart("taskStatusChart", Object.keys(statusCounts), Object.values(statusCounts), colors, "Task Status Distribution");
    createChart("departmentChart", Object.keys(departmentCounts), Object.values(departmentCounts), colors, "Department-wise Task Distribution");
    createChart("priorityChart", Object.keys(priorityCounts), Object.values(priorityCounts), colors, "Task Priority Levels");
});

function toggleCharts() {
    let container = document.getElementById("chartsContainer");
    let button = event.target;

    if (container.style.display === "none") {
        container.style.display = "block";
        button.innerHTML = "−";
    } else {
        container.style.display = "none";
        button.innerHTML = "+";
    }
}











document.addEventListener("DOMContentLoaded", function () {
    let taskData = [];

    // Extract data from the table
    document.querySelectorAll("#taskTable tbody tr").forEach(row => {
        let cols = row.querySelectorAll("td");
        taskData.push({
            status: cols[4].innerText.trim(),
            department: cols[2].innerText.trim(),
            priority: cols[3].innerText.trim()
        });
    });

    // Count occurrences for each category
    function countOccurrences(array, key) {
        return array.reduce((acc, obj) => {
            acc[obj[key]] = (acc[obj[key]] || 0) + 1;
            return acc;
        }, {});
    }

    let statusCounts = countOccurrences(taskData, "status");
    let departmentCounts = countOccurrences(taskData, "department");
    let priorityCounts = countOccurrences(taskData, "priority");

    // Function to create a chart
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

    // Define color scheme
    const colors = ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff", "#ff9f40"];

    // Create charts
    createChart("taskStatusChart", Object.keys(statusCounts), Object.values(statusCounts), colors, "Task Status Distribution");
    createChart("departmentChart", Object.keys(departmentCounts), Object.values(departmentCounts), colors, "Department-wise Task Distribution");
    createChart("priorityChart", Object.keys(priorityCounts), Object.values(priorityCounts), colors, "Task Priority Levels");
});





function updateCharts() {
    let taskData = {};
    let departmentData = {};
    let priorityData = {};
    let priorityLabels = [];

    document.querySelectorAll("#taskTable tbody tr").forEach(row => {
        let status = row.cells[4].textContent.trim();
        let department = row.cells[2].textContent.trim();
        let priority = row.cells[3].textContent.trim();

        taskData[status] = (taskData[status] || 0) + 1;
        departmentData[department] = (departmentData[department] || 0) + 1;
        priorityData[priority] = (priorityData[priority] || 0) + 1;
    });

    priorityLabels = Object.keys(priorityData);
    let priorityValues = Object.values(priorityData);

    // Update Task Status Chart (Pie Chart)
    taskStatusChart.data.labels = Object.keys(taskData);
    taskStatusChart.data.datasets[0].data = Object.values(taskData);
    taskStatusChart.update();

    // Update Department Chart (Bar Chart)
    departmentChart.data.labels = Object.keys(departmentData);
    departmentChart.data.datasets[0].data = Object.values(departmentData);
    departmentChart.update();

    // Update Priority Chart (Line Chart)
    priorityChart.data.labels = priorityLabels;
    priorityChart.data.datasets[0].data = priorityValues;
    priorityChart.update();
}

// Initialize Charts
const taskStatusChart = new Chart(document.getElementById("taskStatusChart"), {
    type: "pie",
    data: {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: ["#FF5733", "#33FF57", "#3385FF", "#FF33A1"]
        }]
    },
    options: {
        responsive: true
    }
});

const departmentChart = new Chart(document.getElementById("departmentChart"), {
    type: "bar",
    data: {
        labels: [],
        datasets: [{
            label: "Number of Tasks",
            data: [],
            backgroundColor: "#3498db"
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

const priorityChart = new Chart(document.getElementById("priorityChart"), {
    type: "line",
    data: {
        labels: [],
        datasets: [{
            label: "Task Priority Levels",
            data: [],
            borderColor: "#FF4500",
            backgroundColor: "rgba(255, 69, 0, 0.2)",
            fill: true
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




let taskIdToDelete = null; // Declare once at the beginning

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