document.addEventListener('DOMContentLoaded', function () {
    // Graph Toggle Functionality
    document.getElementById("toggleGraph").addEventListener("click", function () {
        let graphSection = document.getElementById("graphHistory");
        let icon = document.getElementById("toggleIcon");

        if (graphSection.classList.contains("show")) {
            graphSection.classList.remove("show");
            icon.textContent = "+";
            loadCharts();
            linegraph();
            piegraph();

        } else {
            graphSection.classList.add("show");
            icon.textContent = "-";
            loadCharts();
            linegraph();
            piegraph();  
 // Fetch data when section is opened
        }
    });
    function loadCharts() {
        // Bar Chart
        new Chart(document.getElementById("barChart"), {
            type: "bar",
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
                datasets: [{
                    label: "Votes",
                    data: [12, 19, 3, 5, 2],
                    backgroundColor: ["red", "blue", "yellow", "green", "purple"]
                }]
            }
        });
    }
    function linegraph(){
        // Line Chart
        new Chart(document.getElementById("lineChart"),{
            type: "line",
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May"],
                datasets: [{
                    label: "Sales",
                    data: [10, 20, 15, 25, 30],
                    borderColor: "blue",
                    fill: false
                }]
            }
        });
    }
    function piegraph(){
        // Pie Chart
        new Chart(document.getElementById("pieChart"), {
            type: "pie",
            data: {
                labels: ["Pending", "Running", "Complete"],
                datasets: [{
                    label: "Fruits",
                    data: [10, 20, 30],
                    backgroundColor: ["red", "yellow", "green"]
                }]
            }
        });
    }
});







 