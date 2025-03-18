document.addEventListener('DOMContentLoaded', function () {
    // Graph Toggle Functionality
    document.getElementById("toggleGraph").addEventListener("click", function () {
        let graphSection = document.getElementById("graphHistory");
        let icon = document.getElementById("toggleIcon");

        if (graphSection.classList.contains("show")) {
            graphSection.classList.remove("show");
            icon.textContent = "+";
            fetchChartData();
            console.log("nkevneo")
        } else {
            graphSection.classList.add("show");
            icon.textContent = "-";
            fetchChartData(); 
            console.log("ogenvl") // Fetch data when section is opened
        }
    });
    
    

    chartdata={
        labels: ["HR", "Development", "QA", "Marketing", "Finance", "Support"],
        datasets: [{
            data: [30, 40,30, 27, 18, 42], // Example: Number of employees in each department
            backgroundColor: [
                "rgba(255, 99, 132, 0.6)",  // Light Red
                "rgba(54, 162, 235, 0.6)",  // Light Blue
                "rgba(255, 206, 86, 0.6)",  // Light Yellow
                "rgba(75, 192, 192, 0.6)",  // Light Green
                "rgba(153, 102, 255, 0.6)", // Light Purple
                "rgba(255, 159, 64, 0.6)"   // Light Orange
            ],
            borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
        }]
    };
    // Function to Create Chart
    function createChart(data, type) {
        let canvas = document.getElementById("departmentChart");  // Get canvas for Bar Chart
        let ctx = canvas.getContext("2d");  // Get 2D context
        console.log("vbikd  ")
        
        new Chart(ctx, {
            type: type,  // Use dynamic type
            data: {
                labels: data.labels,  // Use API labels
                datasets:data.datasets
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
    }
linedata={
        "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        "datasets": [{
            "label": "New Employees",
            "data": [3, 5, 8, 10, 12, 6],
            "borderColor": "#FF5733",
            "backgroundColor": "rgba(255, 87, 51, 0.2)",
            "fill": true
        }]
    }
    
    function createlineChart(data, type) {
        let canvas = document.getElementById("lineChart");  // Get canvas for Bar Chart
        let ctx = canvas.getContext("2d");  // Get 2D context
        console.log("vbikd  ")
        
        new Chart(ctx, {
            type: type,  // Use dynamic type
            data: {
                labels: data.labels,  // Use API labels
                datasets:data.datasets
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
    }

    // Fetch Chart Data from Backend
    function fetchChartData() {
        createChart(chartdata,"bar")
        createlineChart(linedata,"line")

        console.log("eovnekel")
        // fetch("/api/chart-data/")  // Django API endpoint
    //     .then(response => {
    //         if (!response.ok) {
        //             throw new Error(`HTTP error! Status: ${response.status}`);
        //         }
        //         return response.json();
        //     })
        //     .then(data => {
            //         console.log("Fetched data:", data);
            //         createChart(data, "bar");  // Create chart with API data
            //     })
            //     .catch(error => {
                //         console.error("Error fetching chart data:", error);
                //     });
            }
            
});








 