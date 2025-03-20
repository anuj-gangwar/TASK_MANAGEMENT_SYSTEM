document.getElementById("graphToggle").addEventListener("click", function () {
    let graphDiv = document.getElementById("graphHistory");
    graphDiv.classList.toggle("show");
});

// Bar Chart (Industry Module Progress)
var barCtx = document.getElementById("barChart").getContext("2d");
var barChart = new Chart(barCtx, {
    type: "bar",
    data: {
        labels: ["Planning", "Development", "Testing", "Deployment", "Maintenance"],
        datasets: [{
            label: "Completion Percentage",
            data: [90, 70, 50, 30, 10],
            backgroundColor: ["red", "orange", "yellow", "green", "blue"]
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: "Completion (%)"
                }
            }
        }
    }
});

// Line Chart (Industry Module Timeline)
var lineCtx = document.getElementById("lineChart").getContext("2d");
var lineChart = new Chart(lineCtx, {
    type: "line",
    data: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
        datasets: [{
            label: "Module Progress",
            data: [10, 30, 50, 70, 100],
            borderColor: "blue",
            backgroundColor: "rgba(0, 0, 255, 0.2)",
            fill: true
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: "Progress (%)"
                }
            }
        }
    }
});

// Pie Chart (Resource Allocation in Modules)
var pieCtx = document.getElementById("pieChart").getContext("2d");
var pieChart = new Chart(pieCtx, {
    type: "pie",
    data: {
        labels: ["Planning", "Development", "Testing", "Deployment", "Maintenance"],
        datasets: [{
            label: "Resource Allocation",
            data: [20, 35, 15, 20, 10],
            backgroundColor: ["red", "orange", "yellow", "green", "blue"]
        }]
    },
    options: {
        responsive: true
    }
});




// document.addEventListener('DOMContentLoaded', function () {
//     // Graph Toggle Functionality
//     document.getElementById("toggleGraph").addEventListener("click", function () {
//         let graphSection = document.getElementById("graphHistory");
//         let icon = document.getElementById("toggleIcon");

//         if (graphSection.classList.contains("show")) {
//             graphSection.classList.remove("show");
//             icon.textContent = "+";
//             loadCharts();
//             linegraph();
//             piegraph();

//         } else {
//             graphSection.classList.add("show");
//             icon.textContent = "-";
//             loadCharts();
//             linegraph();
//             piegraph();  
//  // Fetch data when section is opened
//         }
//     });
//     function loadCharts() {
//         // Bar Chart
//         new Chart(document.getElementById("barChart"), {
//             type: "bar",
//             data: {
//                 labels: ["Planning", "Development", "Testing", "Deployment", "Maintance"],
//                 datasets: [{
//                     label: "It &",
//                     data: [12, 19, 3, 5, 2],
//                     backgroundColor: ["red", "blue", "yellow", "green", "purple"],
                    
//                 }]
//             },
//             options:{
//                 maintainAspectRatio:false
//             }
//         });
//     }
//     function linegraph(){
//         // Line Chart
//         new Chart(document.getElementById("lineChart"),{
//             type: "line",
//             data: {
//                 labels: ["Procurement", "Production", "Quality Check ", "Logistic", "sales"],
//                 datasets: [{
//                     label: "Sales",
//                     data: [10, 20, 15, 25, 30],
//                     borderColor: "blue",
//                     fill: false,
//                 }]
//             },
//             options:{
//                 maintainAspectRatio:false
//             }
//         });
//     }
//     function piegraph(){
//         // Pie Chart
//         new Chart(document.getElementById("pieChart"), {
//             type: "pie",
//             data: {
//                 labels: ["Pending", "Running", "Complete"],
//                 datasets: [{
//                     label: "Fruits",
//                     data: [10, 20, 30],
//                     backgroundColor: ["red", "yellow", "green"]
//                 }]
//             },
//             options:{
//                 maintainAspectRatio:false
//             }
//         });
//     }
// });







 