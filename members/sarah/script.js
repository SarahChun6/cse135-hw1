document.addEventListener("DOMContentLoaded", () => {

    //light dark 
    const toggleButton = document.getElementById("theme-toggle");

    if (!toggleButton) {
        console.error("Theme toggle button not found!");
        return;
    }

    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem("theme");

    // Function to update button text
    function updateButtonIcon(theme) {
        toggleButton.textContent = theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode";
    }

    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
        updateButtonIcon(savedTheme);
    } else {
        // Set initial state based on system preference
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        updateButtonIcon(systemPrefersDark ? "dark" : "light");
    }

    toggleButton.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme") ||
            (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

        const newTheme = currentTheme === "dark" ? "light" : "dark";

        // Apply theme by setting a data attribute
        document.documentElement.setAttribute("data-theme", newTheme);

        // Save user preference
        localStorage.setItem("theme", newTheme);

        // Update button icon
        updateButtonIcon(newTheme);
    });


    const nameField = document.getElementById("your-name");
    const nameError = document.getElementById("name-error"); // Reference to the error span

    function showError(message, inputField, errorElement) {
        errorElement.textContent = message;
        errorElement.style.opacity = "1";
        inputField.classList.add("error");

        setTimeout(() => {
            errorElement.style.opacity = "0";
            inputField.classList.remove("error");
        }, 2000);
    }

    nameField.addEventListener("input", (event) => {
        const regex = /^[A-Za-z\s'-]+$/;  // Allowed characters: Letters, space, hyphen, apostrophe
        if (!regex.test(event.target.value)) {
            showError("Only letters, spaces, hyphens, and apostrophes are allowed.", nameField, nameError);
            event.target.value = event.target.value.replace(/[^A-Za-z\s'-]/g, ""); // Remove invalid characters immediately
        } else {
            nameError.style.opacity = "0"; // Clear error when input is valid
        }
    });

    //character countdown
    const messageField = document.getElementById("message");
    const charCount = document.getElementById("char-count"); // Reference the existing span
    messageField.parentNode.appendChild(charCount);

    const maxChars = 500; // Character limit

    messageField.addEventListener("input", () => {
        const remaining = maxChars - messageField.value.length;

        charCount.textContent = `Characters remaining: ${remaining}`;

        // Reset styles
        //charCount.style.color = theme === "dark" ? "white" : "black";
        charCount.style.color = "black";

        if (remaining <= 50) {
            charCount.style.color = "orange"; // Warn when 50 or fewer characters are left
        }
        if (remaining <= 10) {
            charCount.style.color = "red"; // Strong warning when 10 or fewer characters are left
        }
    });


});
