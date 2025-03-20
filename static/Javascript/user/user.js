document.addEventListener("DOMContentLoaded", function () {
    const statusDropdown = document.getElementById("statusDropdown");
    const statusSelect = document.getElementById("statusSelect");
    const saveStatusButton = document.getElementById("saveStatus");

    // Function to update the dropdown text & color
    function updateStatus(selectedStatus) {
        statusDropdown.textContent = selectedStatus;
        statusDropdown.className = "btn dropdown-toggle"; // Reset button style

        // Change button color based on status
        if (selectedStatus === "Active") {
            statusDropdown.classList.add("btn-success");
        } else if (selectedStatus === "Inactive") {
            statusDropdown.classList.add("btn-danger");
        } else if (selectedStatus === "Pending") {
            statusDropdown.classList.add("btn-warning");
        } else if (selectedStatus === "Suspended") {
            statusDropdown.classList.add("btn-dark");
        } else {
            statusDropdown.textContent = "Select Status"; // Default text
            statusDropdown.classList.add("btn-secondary");
        }
    }

    // Set initial dropdown text based on selected status in <select>
    updateStatus(statusSelect.value);

    // When Save is clicked, update the dropdown text
    saveStatusButton.addEventListener("click", function () {
        let selectedStatus = statusSelect.value;
        updateStatus(selectedStatus);

        // 🔹 Send an API request to save the new status (Fix 304 Issue)
        fetch("/api/update-status/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache, no-store, must-revalidate", // Disable caching
                "Pragma": "no-cache",
                "Expires": "0"
            },
            body: JSON.stringify({ status: selectedStatus })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            return response.json();
        })
        .then(data => {
            console.log("Status updated successfully:", data);
        })
        .catch(error => {
            console.error("Error updating status:", error);
        })
        .finally(() => {
            // 🔹 Ensure the modal closes even if an error occurs
            let modal = bootstrap.Modal.getInstance(document.getElementById("statusModal"));
            modal.hide();
        });
    });
});
