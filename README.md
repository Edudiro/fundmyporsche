# Fund My Porsche 🏎️

A simple, elegant donation website to help fund my Porsche dream!

## Setup Instructions

### 1. Get Your Stripe Keys
1. Create account at [stripe.com](https://stripe.com)
2. Go to Developers → API Keys
3. Copy your Publishable Key and Secret Key

### 2. Configure the Website
1. In `script.js`, replace `pk_test_YOUR_STRIPE_KEY_HERE` with your Stripe Publishable Key
2. When deploying to Netlify, add your Stripe Secret Key as environment variable `STRIPE_SECRET_KEY`

### 3. Deploy to Netlify
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Run `npm install` to install dependencies
3. Deploy: `netlify deploy --prod`
4. Set environment variable in Netlify dashboard: `STRIPE_SECRET_KEY`

### 4. Set Up Domain
1. Buy domain `fundmyporsche.com`
2. In Netlify dashboard, go to Domain settings
3. Add custom domain and follow DNS instructions

### 5. Test Local Development
```bash
npm install
netlify dev
```

Visit `http://localhost:8888` to test locally.

## Features
- ✅ Mobile-responsive design
- ✅ Stripe integration for €1 donations
- ✅ Thank you message after payment
- ✅ Beautiful gradient design
- ✅ Fast loading and user-friendly

## Environment Variables
- `STRIPE_SECRET_KEY` - Your Stripe secret key (set in Netlify dashboard)

## Files Structure
- `index.html` - Main webpage
- `style.css` - Styling and responsive design
- `script.js` - Payment handling and interactions
- `netlify/functions/create-checkout-session.js` - Backend Stripe integration
- `netlify.toml` - Netlify configuration

Good luck with your Porsche fund! 🚗💨