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
        "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        "datasets": [
            {
                "label": "Sales Data",
                "data": [12, 19, 3, 5, 2, 3],
                "backgroundColor": "rgba(54, 162, 235, 0.5)",
                "borderColor": "rgba(54, 162, 235, 1)",
                "borderWidth": 2
            }
        ]
    }
    
    // Function to Create Chart
    function createChart(data, type) {
        let canvas = document.getElementById("barChart");  // Get canvas for Bar Chart
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








 