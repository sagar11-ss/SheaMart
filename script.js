/* =========================================================
   SHEAMART WEBSITE
   Interactive Features — JavaScript Features
   Created by Syed Taqi 
   ========================================================= */


/* ---------------------------------------------------------
   FEATURE 1 — WELCOME MESSAGE
   --------------------------------------------------------- */

function welcomeUser() {
    alert("Welcome to SheaMart!");
}


/* ---------------------------------------------------------
   FEATURE 2 — DARK MODE
   --------------------------------------------------------- */

function updateDarkModeIcon() {
    const btn = document.getElementById("darkModeBtn");
    if (!btn) return;

    btn.textContent = document.body.classList.contains("dark-mode")
        ? "☀️"
        : "🌙";
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    localStorage.setItem(
        "sheamart-dark-mode",
        document.body.classList.contains("dark-mode")
    );

    updateDarkModeIcon();
}

// Apply saved preference immediately (before first paint of content)
if (localStorage.getItem("sheamart-dark-mode") === "true") {
    document.body.classList.add("dark-mode");
}


/* ---------------------------------------------------------
   FEATURE 3 — PRODUCT SEARCH (products.html)
   --------------------------------------------------------- */

function searchProducts() {
    const input = document.getElementById("searchInput");
    const resultText = document.getElementById("searchResult");

    if (!input) return;

    const keyword = input.value.trim().toLowerCase();
    const cards = document.querySelectorAll(".product-card");
    let matches = 0;

    cards.forEach(function (card) {
        const name = card.querySelector("h3").textContent.toLowerCase();
        const isMatch = name.includes(keyword);

        card.style.display = isMatch ? "" : "none";

        if (isMatch) matches++;
    });

    if (resultText) {
        if (keyword === "") {
            resultText.textContent = "";
        } else if (matches === 0) {
            resultText.textContent =
                'No products found for "' + input.value + '".';
        } else {
            resultText.textContent =
                "Showing " + matches +
                (matches === 1 ? " result" : " results") +
                ' for "' + input.value + '"';
        }
    }
}


/* ---------------------------------------------------------
   FEATURE 4 — CONTACT FORM VALIDATION (contact.html)
   --------------------------------------------------------- */

function showFormStatus(text, success) {
    const status = document.getElementById("formStatus");
    if (!status) return;

    status.textContent = text;
    status.className = "form-status " + (success ? "form-success" : "form-error");
}

function validateForm() {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    // If this script runs on a page without the contact form, do nothing
    if (!name || !email || !message) return true;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.value.trim() === "") {
        showFormStatus("Please enter your name.", false);
        return false;
    }

    if (email.value.trim() === "" || !emailPattern.test(email.value.trim())) {
        showFormStatus("Please enter a valid email address.", false);
        return false;
    }

    if (message.value.trim() === "") {
        showFormStatus("Please write a message before sending.", false);
        return false;
    }

    // No backend yet, so we confirm on-page instead of submitting.
    showFormStatus("✅ Message sent! We'll get back to you soon.", true);
    document.getElementById("contactForm").reset();

    return false;
}


/* ---------------------------------------------------------
   FEATURE 5 — CUSTOMER FEEDBACK (contact.html)
   --------------------------------------------------------- */

function showRating() {
    const rating = document.getElementById("rating");
    const feedback = document.getElementById("feedback");

    if (!rating || !feedback) return;

    feedback.textContent = "Thank you! Rating: " + rating.value;

    feedback.className = "";

    if (rating.value === "Excellent" || rating.value === "Good") {
        feedback.classList.add("feedback-positive");
    } else if (rating.value === "Average") {
        feedback.classList.add("feedback-neutral");
    } else {
        feedback.classList.add("feedback-negative");
    }
}


/* ---------------------------------------------------------
   FEATURE 6 — SHOPPING CART COUNTER (products.html)
   --------------------------------------------------------- */

let cart = 0;

function addToCart(button) {
    cart++;

    const counter = document.getElementById("cartCount");
    if (counter) counter.textContent = cart;

    const originalText = button.innerHTML;
    button.innerHTML = "✓ Added";

    setTimeout(function () {
        button.innerHTML = originalText;
    }, 900);
}


/* ---------------------------------------------------------
   INITIALISATION
   --------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
    updateDarkModeIcon();

    document.querySelectorAll(".cart-button").forEach(function (btn) {
        btn.addEventListener("click", function () {
            addToCart(btn);
        });
    });
});
