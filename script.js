// Replace with your actual Stripe publishable key
const STRIPE_PUBLISHABLE_KEY = 'pk_live_51Rmy3xJwqlgdGWp9kH4h1QmActaukdwmx4vdTGrY4HdqzygrXfDM6D96zvF2ItNvcCjRbk8rVJlhYC0ROI39hHRG00ylEFYdNr';

// Initialize Stripe
const stripe = Stripe(STRIPE_PUBLISHABLE_KEY);

// DOM elements
const donateButtons = document.querySelectorAll('.donate-btn');
const mainContent = document.querySelector('.main-content');
const thankYouSection = document.getElementById('thank-you');
const thankYouAmount = document.getElementById('thank-you-amount');

let currentDonationAmount = '';

// Handle donation button clicks
donateButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
        e.preventDefault();
        
        // Get amount and display text from data attributes
        const amount = parseInt(button.dataset.amount);
        const displayAmount = button.dataset.display;
        currentDonationAmount = displayAmount;
        
        // Disable all buttons to prevent double clicks
        donateButtons.forEach(btn => {
            btn.disabled = true;
            btn.classList.add('loading');
            btn.style.opacity = '0.7';
        });
        
        // Update clicked button content
        const btnContent = button.querySelector('.btn-content');
        const originalContent = btnContent.innerHTML;
        btnContent.innerHTML = `
            <span class="amount">...</span>
            <span class="label">PROCESSING</span>
        `;

        try {
            // Create checkout session
            const response = await fetch('/.netlify/functions/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amount,
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
            
            // Reset button states
            donateButtons.forEach(btn => {
                btn.disabled = false;
                btn.classList.remove('loading');
                btn.style.opacity = '1';
            });
            
            // Reset clicked button content
            btnContent.innerHTML = originalContent;
            
            // Show error message
            alert(`Payment failed: ${error.message}`);
        }
    });
});

// Show thank you message
function showThankYou(amount = currentDonationAmount) {
    // Update thank you message with donation amount
    if (thankYouAmount) {
        thankYouAmount.textContent = amount || '€1';
    }
    
    // Hide main content and show thank you
    if (mainContent) {
        mainContent.style.display = 'none';
    }
    if (thankYouSection) {
        thankYouSection.style.display = 'flex';
    }
    
    // Add digital confetti effect (tech style)
    createDigitalConfetti();
}

// Create digital/tech style confetti effect
function createDigitalConfetti() {
    const colors = ['#00ff41', '#00d4ff', '#ffb000'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.width = '4px';
        confetti.style.height = '4px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.boxShadow = `0 0 6px ${confetti.style.backgroundColor}`;
        
        document.body.appendChild(confetti);
        
        // Animate confetti falling
        const duration = 3000 + Math.random() * 2000;
        const rotate = Math.random() * 360;
        
        confetti.animate([
            {
                transform: `translateY(0px) rotate(0deg)`,
                opacity: 1
            },
            {
                transform: `translateY(${window.innerHeight + 100}px) rotate(${rotate}deg)`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => {
            document.body.removeChild(confetti);
        };
    }
}

// Check for successful payment on page load (from URL parameters)
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        // Try to get amount from URL params, fallback to €1
        const amount = urlParams.get('amount') || '€1';
        showThankYou(amount);
    }
});

// Add smooth scroll behavior for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// Real Stripe integration is active!