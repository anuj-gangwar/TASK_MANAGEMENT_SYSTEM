
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
  