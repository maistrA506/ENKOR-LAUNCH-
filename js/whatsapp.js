/**
 * ENKOR WhatsApp Pre-Order Integration
 * Handles WhatsApp Click-to-Chat functionality for product pre-orders
 */

// Configuration - UPDATE WITH YOUR BUSINESS NUMBER
const WHATSAPP_CONFIG = {
    businessNumber: '+254793602226', // Kenya country code example
    defaultMessage: 'I want to pre-order ENKOR',
    messageTemplates: {
        EK3161: 'Hi, I\'m interested in pre-ordering the ENKOR EK3161 Multimedia Speaker System',
        EK3160: 'Hi, I\'m interested in pre-ordering the ENKOR EK3160 Compact Multimedia Speaker',
        EKSB61: 'Hi, I\'m interested in pre-ordering the ENKOR EKSB61 2:1:2 CH Soundbar System'
    },
    productInfo: {
        EK3161: { name: 'EK3161 Multimedia Speaker', price: '4,400' },
        EK3160: { name: 'EK3160 Compact Speaker', price: '4,300' },
        EKSB61: { name: 'EKSB61 Soundbar System', price: 'TBD' }
    }
};

/**
 * Encode message for WhatsApp URL
 * @param {string} message - Plain text message
 * @returns {string} - URL encoded message
 */
function encodeWhatsAppMessage(message) {
    return encodeURIComponent(message);
}

/**
 * Generate WhatsApp Click-to-Chat URL
 * @param {string} productId - Product identifier (EK3161, EK3160, EKSB61)
 * @returns {string} - WhatsApp URL
 */
function generateWhatsAppURL(productId = null) {
    const number = WHATSAPP_CONFIG.businessNumber.replace(/[^0-9]/g, '');
    const message = productId && WHATSAPP_CONFIG.messageTemplates[productId] 
        ? WHATSAPP_CONFIG.messageTemplates[productId]
        : WHATSAPP_CONFIG.defaultMessage;
    
    const encodedMessage = encodeWhatsAppMessage(message);
    return `https://wa.me/${number}?text=${encodedMessage}`;
}

/**
 * Create WhatsApp pre-order button
 * @param {string} productId - Product identifier
 * @param {string} containerSelector - CSS selector for button container
 */
function createWhatsAppButton(productId, containerSelector = '.enkor-cta') {
    const button = document.querySelector(containerSelector);
    if (button) {
        const url = generateWhatsAppURL(productId);
        button.href = url;
        button.target = '_blank';
        button.rel = 'noopener noreferrer';
    }
}

/**
 * Handle product-specific pre-order with analytics
 * @param {string} productId - Product identifier
 */
function preOrderProduct(productId) {
    const product = WHATSAPP_CONFIG.productInfo[productId];
    
    // Track analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'pre_order_whatsapp', {
            'product_id': productId,
            'product_name': product.name,
            'product_price': product.price
        });
    }
    
    // Redirect to WhatsApp
    const url = generateWhatsAppURL(productId);
    window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Get product information
 * @param {string} productId - Product identifier
 * @returns {object} - Product details
 */
function getProductInfo(productId) {
    return WHATSAPP_CONFIG.productInfo[productId] || null;
}

/**
 * Update WhatsApp business number (for dynamic configuration)
 * @param {string} newNumber - New business phone number
 */
function updateWhatsAppNumber(newNumber) {
    WHATSAPP_CONFIG.businessNumber = newNumber;
}

/**
 * Get all available products
 * @returns {array} - Array of product IDs
 */
function getAvailableProducts() {
    return Object.keys(WHATSAPP_CONFIG.productInfo);
}

// Export for modular use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateWhatsAppURL,
        createWhatsAppButton,
        preOrderProduct,
        getProductInfo,
        updateWhatsAppNumber,
        getAvailableProducts,
        WHATSAPP_CONFIG
    };
}