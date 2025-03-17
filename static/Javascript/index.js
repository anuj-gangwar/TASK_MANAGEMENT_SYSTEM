document.addEventListener('DOMContentLoaded', function () {
    const barCtx = document.getElementById('barChart').getContext('2d');
    const lineCtx = document.getElementById('lineChart').getContext('2d');
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    const taskTable = document.getElementById('taskTable');

    // Chart Instances
    let barChart, lineChart, pieChart;

    // Get Elements
    const taskStatusCard = document.getElementById('taskStatusCard');
    const chartContainer = document.getElementById('filterAndChartContainer');
    const projectFilter = document.getElementById('projectFilter');
    const moduleFilter = document.getElementById('moduleFilter');
    const mainToggleButton = document.querySelector('.toggle-btn');

    // *****************************************************************
    // Helper Functions (Generic)
    function getUniqueValuesFromTable(table, columnIndex) {
        const uniqueValues = new Set();
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const cell = row.querySelectorAll('td')[columnIndex];
            if (cell) {
                uniqueValues.add(cell.textContent.trim());
            }
        });
        return Array.from(uniqueValues);
    }

    function populateFilter(filterElement, values) {
        filterElement.innerHTML = '<option value="">All</option>';
        values.forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            filterElement.appendChild(option);
        });
    }

    function getModulesForProject(selectedProject) {
        const modules = new Set();
        const rows = taskTable.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            const projectName = cells[1].textContent.trim();
            if (projectName === selectedProject) {
                modules.add(cells[2].textContent.trim());
            }
        });
        return Array.from(modules);
    }

    // Data Calculation Functions
    function calculateStatusCounts(project = null, module = null) {
        let completed = 0;
        let running = 0;
        let pending = 0;
       

        const rows = taskTable.querySelectorAll('tbody tr');

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            const projectName = cells[1].textContent.trim();
            const moduleName = cells[2].textContent.trim();
            const statusText = cells[6].textContent.trim().toLowerCase();

            if ((!project || projectName === project) && (!module || moduleName === module)) {
                if (statusText === 'completed') {
                    completed++;
                } else if (statusText === 'running') {
                    running++;
                } else {
                    pending++;
                }
            }
        });

        return { Completed: completed, Running: running, Pending: pending };
    }

    function calculateModuleCounts(project = null, module = null) {
        const moduleCounts = {};
        const rows = taskTable.querySelectorAll('tbody tr');

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            const projectName = cells[1].textContent.trim();
            const moduleName = cells[2].textContent.trim();

            if ((!project || projectName === project) && (!module || moduleName === module)) {
                moduleCounts[moduleName] = (moduleCounts[moduleName] || 0) + 1;
            }
        });

        return moduleCounts;
    }

    // Chart Rendering Functions
    function renderBarChart(project = null, module = null) {
        const statusCounts = calculateStatusCounts(project, module);

        if (barChart) {
            barChart.destroy();
        }

        barChart = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['Completed', 'Running', 'Pending'],
                datasets: [{
                    label: 'Task Count',
                    data: Object.values(statusCounts),
                    backgroundColor: ['green', 'blue', 'yellow']
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                maintainAspectRatio: false
            }
        });
    }

    function renderLineChart(project = null, module = null) {
        const statusCounts = calculateStatusCounts(project, module);

        if (lineChart) {
            lineChart.destroy();
        }

        lineChart = new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: ['Completed', 'Running', 'Pending'],
                datasets: [{
                    label: 'Task Trend',
                    data: Object.values(statusCounts),
                    borderColor: 'purple',
                    fill: false
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                maintainAspectRatio: false
            }
        });
    }

    function renderPieChart(project = null, module = null) {
        const moduleCounts = calculateModuleCounts(project, module);

        if (pieChart) {
            pieChart.destroy();
        }

        pieChart = new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: Object.keys(moduleCounts),
                datasets: [{
                    data: Object.values(moduleCounts),
                    backgroundColor: ['orange', 'purple', 'pink', 'cyan', 'brown']
                }]
            },
            options: {
                maintainAspectRatio: false
            }
        });
    }

    // *****************************************************************
    //  Setup Filters and Event Listeners
    const projects = getUniqueValuesFromTable(taskTable, 1);
    populateFilter(projectFilter, projects);

    projectFilter.addEventListener('change', function () {
        const selectedProject = this.value;
        moduleFilter.innerHTML = '<option value="">All</option>';
        moduleFilter.disabled = !selectedProject;

        if (selectedProject) {
            const modules = getModulesForProject(selectedProject);
            populateFilter(moduleFilter, modules);
        }

        renderAllCharts(selectedProject, moduleFilter.value);
    });

    moduleFilter.addEventListener('change', function () {
        renderAllCharts(projectFilter.value, this.value);
    });

    function renderAllCharts(project = null, module = null) {
        renderBarChart(project, module);
        renderLineChart(project, module);
        renderPieChart(project, module);
    }

    // *****************************************************************
    //  Setup Main Toggle Button
    mainToggleButton.addEventListener('click', function () {
        const isCollapsed = !chartContainer.classList.contains('show');
        chartContainer.classList.toggle('show');
        this.textContent = isCollapsed ? '-' : '+'; // Update toggle text 

        // Disable or enable filters based on chart visibility
        projectFilter.disabled = isCollapsed;
        moduleFilter.disabled = isCollapsed || !projectFilter.value;
    });

    // Initial Render
    renderAllCharts();
});