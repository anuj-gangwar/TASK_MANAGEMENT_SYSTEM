
    document.addEventListener('DOMContentLoaded', function () {
        const storedTableData = localStorage.getItem('tableData');

        if (!storedTableData) {
            console.error("❌ No data found in localStorage!");
            showNoDataMessage();
            return;
        }

        const tableData = JSON.parse(storedTableData);
        
        if (!tableData.rows || tableData.rows.length === 0) {
            console.error("⚠️ Stored data is empty or invalid:", tableData);
            showNoDataMessage();
            return;
        }

        console.log("📊 Loaded Table Data:", tableData);

        const departmentNames = tableData.rows.map(row => row.departmentName);
        const userCounts = tableData.rows.map(row => row.users);

        if (departmentNames.length === 0 || userCounts.length === 0) {
            console.warn("⚠️ No valid department names or user counts found.");
            showNoDataMessage();
            return;
        }

        const backgroundColors = departmentNames.map((_, i) => `hsl(${(i * 45) % 360}, 70%, 50%)`);

        const ctx = document.getElementById('departmentChart').getContext('2d');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: departmentNames,
                datasets: [{
                    label: 'User Count per Department',
                    data: userCounts,
                    backgroundColor: backgroundColors,
                    borderColor: "#222",
                    borderWidth: 2,
                    borderRadius: 5,
                    barThickness: 40
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: "#ddd" },
                        ticks: { font: { size: 14, weight: 'bold' }, color: "#333" }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { font: { size: 14, weight: 'bold' }, color: "#333" }
                    }
                }
            }
        });

        function showNoDataMessage() {
            document.getElementById('departmentChart').parentNode.innerHTML = 
                '<p class="text-danger text-center">⚠️ No data available to display the chart.</p>';
        }
    });
