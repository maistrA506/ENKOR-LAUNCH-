// ENKOR Landing Page - Main Application Logic
// This file contains reusable functions for the landing page

/**
 * Format countdown timer values with leading zeros
 * @param {number} value - The number to format
 * @returns {string} - Formatted number with leading zero if needed
 */
function formatTimeValue(value) {
    return String(value).padStart(2, '0');
}

/**
 * Update countdown timer display
 * @param {string} targetDateString - Target date string (e.g., 'June 18, 2026 00:00:00')
 */
function initializeCountdown(targetDateString) {
    const targetDate = new Date(targetDateString).getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            // Launch complete - reset to zeros
            setCountdownDisplay(0, 0, 0, 0);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdownDisplay(days, hours, minutes, seconds);
    }

    // Initial update
    updateCountdown();
    
    // Update every second
    setInterval(updateCountdown, 1000);
}

/**
 * Set countdown display values in DOM
 * @param {number} days 
 * @param {number} hours 
 * @param {number} minutes 
 * @param {number} seconds 
 */
function setCountdownDisplay(days, hours, minutes, seconds) {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl) daysEl.innerHTML = formatTimeValue(days);
    if (hoursEl) hoursEl.innerHTML = formatTimeValue(hours);
    if (minutesEl) minutesEl.innerHTML = formatTimeValue(minutes);
    if (secondsEl) secondsEl.innerHTML = formatTimeValue(seconds);
}

/**
 * Track WhatsApp pre-order clicks for analytics
 * @param {string} productName - Name of the product being pre-ordered
 */
function trackPreOrder(productName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'pre_order_click', {
            'product_name': productName
        });
    }
}

/**
 * Initialize WhatsApp pre-order handlers
 */
function initializeWhatsAppHandlers() {
    const preOrderButton = document.querySelector('.enkor-cta');
    if (preOrderButton) {
        preOrderButton.addEventListener('click', () => {
            trackPreOrder('ENKOR Multi-Product');
        });
    }
}

// Document ready initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeCountdown('June 18, 2026 00:00:00');
    initializeWhatsAppHandlers();
});