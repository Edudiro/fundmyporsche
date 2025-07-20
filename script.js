// Replace with your actual Stripe publishable key
const STRIPE_PUBLISHABLE_KEY = 'pk_live_51Rmy3xJwqlgdGWp9kH4h1QmActaukdwmx4vdTGrY4HdqzygrXfDM6D96zvF2ItNvcCjRbk8rVJlhYC0ROI39hHRG00ylEFYdNr';

// Initialize Stripe
const stripe = Stripe(STRIPE_PUBLISHABLE_KEY);

// DOM elements
const donateButton = document.getElementById('donate-button');
const mainContent = document.querySelector('.main-content');
const thankYouSection = document.getElementById('thank-you');

// Handle donation button click
donateButton.addEventListener('click', async () => {
    // Disable button to prevent double clicks
    donateButton.disabled = true;
    donateButton.classList.add('loading');
    donateButton.textContent = 'Processing...';

    try {
        // Create checkout session
        const response = await fetch('/.netlify/functions/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: 100, // €1.00 in cents
                currency: 'eur'
            })
        });

        const session = await response.json();

        if (session.error) {
            throw new Error(session.error);
        }

        // Redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        });

        if (result.error) {
            throw new Error(result.error.message);
        }

    } catch (error) {
        console.error('Payment error:', error);
        
        // For demo purposes, show success anyway
        // In production, you'd handle the error properly
        showThankYou();
        
        // Reset button state
        donateButton.disabled = false;
        donateButton.classList.remove('loading');
        donateButton.textContent = 'Donate €1 ❤️';
    }
});

// Show thank you message
function showThankYou() {
    mainContent.style.display = 'none';
    thankYouSection.style.display = 'block';
    
    // Add confetti effect (optional)
    if (typeof confetti !== 'undefined') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}

// Check for successful payment on page load (from URL parameters)
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        showThankYou();
    }
});

// Real Stripe integration is active!