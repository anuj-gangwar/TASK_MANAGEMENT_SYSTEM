
    document.getElementById("statusFilter").addEventListener("change", function() {
        let filter = this.value;
        let rows = document.querySelectorAll("tbody tr");

        rows.forEach(row => {
            let status = row.querySelector("td:nth-child(6) span").textContent.trim();

            if (filter === "on-hold") {
                row.style.display = (status === "On Hold") ? "" : "none";
            } else {
                row.style.display = "";
            }
        });
    });
