function validateLength(input, min, max, errorId) {
    const errorField = document.getElementById(errorId);
    if (input.value.length < min) {
      errorField.textContent = `Minimum ${min} characters required.`;
    } else if (input.value.length > max) {
      errorField.textContent = `Maximum ${max} characters allowed.`;
    } else {
      errorField.textContent = "";
    }
  }

  function validateEmail(input, errorId) {
    const errorField = document.getElementById(errorId);
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    errorField.textContent = emailPattern.test(input.value) ? "" : "Enter a valid email address.";
  }

  function validatePhone(input, errorId) {
    const errorField = document.getElementById(errorId);
    errorField.textContent = /^[0-9]{10}$/.test(input.value) ? "" : "Enter a valid 10-digit phone number.";
  }