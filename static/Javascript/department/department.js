document.addEventListener("DOMContentLoaded", function () {

    // Function to initialize the chart
    function initializeChart(data) {
        const ctx = document.getElementById('departmentChart').getContext('2d');

        // Destroy the previous chart instance if it exists
        if (window.myChart) {
            window.myChart.destroy();
        }

        // Gradient Background for the chart
        const chartBackgroundGradient = ctx.createLinearGradient(0, 0, 0, 400);
        chartBackgroundGradient.addColorStop(0, 'rgba(75, 192, 192, 0.3)'); // Light Teal
        chartBackgroundGradient.addColorStop(1, 'rgba(54, 162, 235, 0.3)'); // Light Blue

        // Define a vibrant color palette
        const attractiveFormalColors = [
            'rgba(63, 81, 181, 0.8)',   // Indigo (more vibrant)
            'rgba(0, 105, 92, 0.8)',    // Teal (more saturated)
            'rgba(74, 117, 47, 0.8)',   // Forest Green
            'rgba(156, 39, 176, 0.8)',  // Deep Purple
            'rgba(255, 87, 34, 0.8)',   // Deep Orange
            'rgba(3, 169, 244, 0.8)',   // Light Blue
            'rgba(255, 193, 7, 0.8)'    // Amber
        ];


        console.log(data)
        window.myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(item => item.departmentName),
                datasets: [{
                    label: 'Total Users',
                    data: data.map(item => item.users),
                    backgroundColor: (context) => {
                        const index = context.dataIndex;
                        return attractiveFormalColors[index % attractiveFormalColors.length]; // Cycle through colors
                    },
                    borderColor: (context) => {
                        const index = context.dataIndex;
                        return attractiveFormalColors[index % attractiveFormalColors.length].replace('0.7', '1'); // Darken border
                    },
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Users',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)' // Subtle grid lines
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Department Name',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                        grid: {
                            display: false // Remove x-axis grid lines
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Department User Distribution',
                        font: {
                            size: 18,
                            weight: 'bold'
                        },
                        padding: {
                            top: 10,
                            bottom: 30
                        }
                    },
                    legend: {
                        position: 'top', // Place legend at the top
                        align: 'center',
                        labels: {
                            font: {
                                size: 12
                            }
                        }
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                backgroundColor: chartBackgroundGradient, // Apply Gradient
                // Add shadow effect
                plugins: [{
                    beforeDraw: (chart) => {
                        const ctx = chart.canvas.getContext('2d');
                        ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
                        ctx.shadowBlur = 10;
                        ctx.shadowOffsetX = 0;
                        ctx.shadowOffsetY = 4;
                    },
                    afterDraw: (chart) => {
                        const ctx = chart.canvas.getContext('2d');
                        ctx.shadowColor = 'transparent'; // Reset shadow
                        ctx.shadowBlur = 0;
                        ctx.shadowOffsetX = 0;
                        ctx.shadowOffsetY = 0;
                    }
                }]
            }
        });
    }



    function storeTableData() {
        const table = document.querySelector('#taskTable'); // Ensure correct table selection
        if (!table) {
            console.error("Table not found!");
            return;
        }

        const rows = Array.from(table.querySelectorAll('tbody tr')).map(row => {
            const cells = row.querySelectorAll('td');

            if (cells.length < 6) return null; // Skip invalid rows

            return {
                departmentId: cells[1].textContent.trim(), // 2nd column is Department ID
                departmentName: cells[2].textContent.trim(), // 3rd column is Department Name
                manager: cells[3].textContent.trim(), // 4th column is Manager
                users: parseInt(cells[4].textContent.trim()) || 0, // 5th column (user count)
                projectStatus: cells[5].textContent.trim(), // 6th column (project status)
            };
        }).filter(row => row !== null);

        if (rows.length === 0) {
            console.error("No valid table data found.");
            return;
        }

        localStorage.setItem('tableData', JSON.stringify({ rows }));
        console.log("✅ Table data stored successfully:", rows);
    }

    // Function to extract data from the table
    function extractTableData() {
        const table = document.querySelector('#taskTable');
        if (!table) {
            console.error("Table not found!");
            return [];
        }

        const rows = Array.from(table.querySelectorAll('tbody tr')).map(row => {
            const cells = row.querySelectorAll('td');

            if (cells.length < 6) return null; // Skip invalid rows

            return {
                departmentId: cells[1].textContent.trim(), // 2nd column is Department ID
                departmentName: cells[2].textContent.trim(), // 3rd column is Department Name
                manager: cells[3].textContent.trim(), // 4th column is Manager
                users: parseInt(cells[4].textContent.trim()) || 0, // 5th column (user count)
                projectStatus: cells[5].textContent.trim(), // 6th column (project status)
            };
        }).filter(row => row !== null);

        if (rows.length === 0) {
            console.error("No valid table data found.");
            return [];
        }
        return rows;
    }


    // Store table data once the page is loaded
    storeTableData();

    // Initial setup: show table, hide graph
    const taskTableContainer = document.getElementById('taskTableContainer');
    const departmentGraphContainer = document.getElementById('departmentGraphContainer');

    if (taskTableContainer && departmentGraphContainer) {
        taskTableContainer.classList.remove('hidden');
        departmentGraphContainer.classList.add('hidden');
    } else {
        console.error("taskTableContainer or departmentGraphContainer not found.");
    }


    // Function to toggle button styles and content visibility
    function toggleView(showTable) {
        const tableContainer = document.getElementById('taskTableContainer');
        const graphContainer = document.getElementById('departmentGraphContainer');
        const showTableBtn = document.getElementById('showTableBtn');
        const showGraphBtn = document.getElementById('showGraphBtn');


        if (showTable) {
            if (tableContainer && graphContainer) {
                tableContainer.classList.remove('hidden');
                graphContainer.classList.add('hidden');
            }

            if (showTableBtn && showGraphBtn) {
                showTableBtn.classList.add('btn-primary');
                showTableBtn.classList.remove('btn-secondary');
                showGraphBtn.classList.remove('btn-primary');
                showGraphBtn.classList.add('btn-secondary');
            }

        } else {
            if (tableContainer && graphContainer) {
                tableContainer.classList.add('hidden');
                graphContainer.classList.remove('hidden');
            }

            if (showTableBtn && showGraphBtn) {
                showGraphBtn.classList.add('btn-primary');
                showGraphBtn.classList.remove('btn-secondary');
                showTableBtn.classList.remove('btn-primary');
                showTableBtn.classList.add('btn-secondary');
            }

            const tableData = extractTableData();
            initializeChart(tableData); // Initialize the chart *every* time the graph view is shown
        }
    }

    // Event listeners for toggle buttons
    const showTableBtnElement = document.getElementById('showTableBtn');
    const showGraphBtnElement = document.getElementById('showGraphBtn');

    if (showTableBtnElement && showGraphBtnElement) {
        showTableBtnElement.addEventListener('click', function () {
            toggleView(true);
        });

        showGraphBtnElement.addEventListener('click', function () {
            toggleView(false);
        });
    } else {
        console.error("showTableBtn or showGraphBtn not found.");
    }

    // Toggle for Graph History
    const graphHistoryButton = document.querySelector('[data-bs-toggle="collapse"][data-bs-target="#graphHistory"]');
    const graphHistoryDiv = document.getElementById('graphHistory');

    if (graphHistoryButton && graphHistoryDiv) {
        graphHistoryButton.addEventListener('click', function () {
            const isCollapsed = graphHistoryDiv.classList.contains('show');
            if (isCollapsed) {
              graphHistoryButton.querySelector('span').textContent = '▼';
            } else {
              graphHistoryButton.querySelector('span').textContent = '▲';
            }
            const bsCollapse = new bootstrap.Collapse(graphHistoryDiv, {toggle: false});
            if (isCollapsed) {
              bsCollapse.hide();
            } else {
              bsCollapse.show();
            }
        });
    } else {
        console.error("Graph history toggle button or div not found.");
    }

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


    let taskIdToDelete = null;

    // Capture the task ID when delete button is clicked
    document.querySelectorAll('.delete-task').forEach(button => {
        button.addEventListener('click', function () {
            taskIdToDelete = this.getAttribute('data-department-id');
             console.log( 'Delete button clicked for department ID:', taskIdToDelete);
        });
    });

    const confirmDeleteButton = document.getElementById('confirmDelete');
        if (confirmDeleteButton) {
            confirmDeleteButton.addEventListener('click', function () {
                if (taskIdToDelete) {
                   // Here I am setting where exactly to look.  I will find the row, by targeting the department id.
                    const rowToDelete = document.querySelector(`[data-department-id="${taskIdToDelete}"]`).closest('tr');

                    if (rowToDelete) {
                        rowToDelete.remove();
                         alert(`Department with ID ${taskIdToDelete} deleted!`);
                          location.reload()
                    } else {
                        console.error(`Row with department ID ${taskIdToDelete} not found.`);
                    }
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
            console.warn("confirmDelete button not found. Check your HTML.");
        }
});


function navigateToGraph() {
    window.location.href = './Module_Graph';
}