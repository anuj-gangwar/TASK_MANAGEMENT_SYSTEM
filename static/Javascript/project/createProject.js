document.addEventListener('DOMContentLoaded', function() {
    const dateRangeInput = document.getElementById('dateRange');
    const dateRangeIcon = document.getElementById('dateRangeIcon');

    // Initialize daterangepicker
    $(dateRangeInput).daterangepicker({
        opens: 'left',
        autoUpdateInput: false,
        locale: {
            cancelLabel: 'Clear'
        }
    });

    $(dateRangeInput).on('apply.daterangepicker', function(ev, picker) {
        dateRangeInput.value = picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY');
    });

    $(dateRangeInput).on('cancel.daterangepicker', function(ev, picker) {
        dateRangeInput.value = '';
    });

    // Icon click
    dateRangeIcon.addEventListener('click', function(event) {
        event.preventDefault();
        dateRangeInput.focus(); // Try to focus
        $(dateRangeInput).trigger('click'); // Use jQuery to trigger the click
    });

    document.addEventListener("DOMContentLoaded", function () {
        const fileInput = document.getElementById("projectFile");
        const fileNameDisplay = document.getElementById("fileName");
        const uploadBtn = document.getElementById("uploadBtn");

        fileInput.addEventListener("change", function () {
            let file = this.files[0];
            if (file) {
                fileNameDisplay.textContent = file.name; // Show file name
                uploadBtn.disabled = false; // Enable upload button
            } else {
                fileNameDisplay.textContent = "No file chosen";
                uploadBtn.disabled = true;
            }
        });

        uploadBtn.addEventListener("click", function () {
            alert("✅ File Uploaded Successfully!");
        });
    });
});
