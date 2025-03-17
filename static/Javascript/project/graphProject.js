document.addEventListener('DOMContentLoaded', function() {

    // Graph Toggle Functionality
    document.getElementById("toggleGraph").addEventListener("click", function () {
        let graphSection = document.getElementById("graphHistory");
        let icon = document.getElementById("toggleIcon");

        if (graphSection.classList.contains("show")) {
            graphSection.classList.remove("show");
            icon.textContent = "+";
        } else {
            graphSection.classList.add("show");
            icon.textContent = "-";
        }
    });

    function getDataFromTable() {
        const table = document.getElementById('taskTable');
        const labels = [];
        const data = [];

        const rows = table.querySelectorAll('tbody tr');

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length >= 5) {
                labels.push(cells[1].textContent.trim()); // Project Name
                const progressBar = cells[4].querySelector('.progress-bar');
                if (progressBar) {  // Check if progress bar exists
                    const progressText = progressBar.style.width;
                    const progressValue = parseFloat(progressText);
                    data.push(progressValue);
                } else {
                    data.push(0); // Default to 0 if no progress bar
                }
            }
        });
        return { labels, data };
    }

    let barChartInstance, lineChartInstance, pieChartInstance;

    function createChart(canvasId, type, data, options) {
        const canvas = document.getElementById(canvasId);
        canvas.width = canvas.offsetWidth; //use offsetWidth instead of 300
        canvas.height = 300;  // Set the height

        const ctx = canvas.getContext('2d');
        return new Chart(ctx, {
            type: type,
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                ...options, // Merge additional options
            }
        });
    }

    function updateBarChart() {
        const tableData = getDataFromTable();
        const labels = tableData.labels;
        const data = tableData.data;

        const backgroundColors = ['red', 'blue', 'yellow', 'green', 'purple', 'orange'];
        const slicedColors = backgroundColors.slice(0, labels.length);

        if (barChartInstance) {
            barChartInstance.destroy();
        }

        const chartData = {
            labels: labels,
            datasets: [{
                label: 'Project Progress',
                data: data,
                backgroundColor: slicedColors
            }]
        };

        const chartOptions = {
           scales: {
                y: {
                    beginAtZero: true, // Start the Y axis at 0
                    max: 100             // Set the maximum value of the Y axis to 100
                }
            }
        };

        barChartInstance = createChart('barChart', 'bar', chartData, chartOptions);
    }

    function updateLineChart() {
        const tableData = getDataFromTable();
        const labels = tableData.labels;
        const data = tableData.data;

        if (lineChartInstance) {
            lineChartInstance.destroy();
        }

        const chartData = {
            labels: labels,
            datasets: [{
                label: 'Project Progress',
                data: data,
                borderColor: 'blue',
                fill: false
            }]
        };

         const chartOptions = {
           scales: {
                y: {
                    beginAtZero: true, // Start the Y axis at 0
                    max: 100             // Set the maximum value of the Y axis to 100
                }
            }
        };

        lineChartInstance = createChart('lineChart', 'line', chartData, chartOptions);
    }

    function updatePieChart() {
        const tableData = getDataFromTable();
        const labels = tableData.labels;
        const data = tableData.data;

        const backgroundColors = ['red', 'yellow', 'pink', 'lightblue', 'lightgreen'];
        const slicedColors = backgroundColors.slice(0, labels.length);

        if (pieChartInstance) {
            pieChartInstance.destroy();
        }

        const chartData = {
            labels: labels,
            datasets: [{
                label: 'Project Progress',
                data: data,
                backgroundColor: slicedColors
            }]
        };
          const chartOptions = {};

        pieChartInstance = createChart('pieChart', 'pie', chartData, chartOptions);
    }

    // Initial chart population
    updateBarChart();
    updateLineChart();
    updatePieChart();

    // Update charts when a status dropdown changes
    const statusDropdowns = document.querySelectorAll('.status-dropdown');
    statusDropdowns.forEach(dropdown => {
        dropdown.addEventListener('change', function() {
            updateBarChart();
            updateLineChart();
            updatePieChart();
        });
    });

});