# Claude Code Project Memory

## Project Overview
**Fund My Porsche** - A simple donation website allowing users to donate €1 to help fund a Porsche purchase.

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Payment**: Stripe integration (live keys configured)
- **Backend**: Netlify Functions (serverless)
- **Hosting**: Netlify with custom domain `fundmyporsche.com`
- **Repository**: https://github.com/Edudiro/fundmyporsche.git

## Key Configuration

### Environment Variables (Netlify)
- `SECRET_KEY` = Stripe Secret Key (live mode: `sk_live_...`)

### Stripe Configuration
- **Publishable Key**: `pk_live_51Rmy3xJwqlgdGWp9kH4h1QmActaukdwmx4vdTGrY4HdqzygrXfDM6D96zvF2ItNvcCjRbk8rVJlhYC0ROI39hHRG00ylEFYdNr` (configured in script.js)
- **Payment Amount**: €1.00 (100 cents)
- **Currency**: EUR

### Deployment
- **Git**: Connected to Netlify for auto-deployment on push
- **Domain**: fundmyporsche.com (purchased and configured)
- **Functions**: `/.netlify/functions/create-checkout-session`

## File Structure
```
/
├── index.html                          # Main donation page
├── style.css                           # Responsive styling with gradient design
├── script.js                           # Stripe payment integration
├── netlify.toml                        # Netlify configuration
├── netlify/functions/
│   └── create-checkout-session.js      # Stripe checkout session creator
├── package.json                        # Dependencies (Stripe, Netlify CLI)
└── README.md                           # Setup instructions
```

## Development Commands
- `npm install` - Install dependencies
- `netlify dev` - Local development server
- `git push` - Deploy to production (auto-deploy)

## Important Notes
- **Live Stripe Mode**: Using live keys (sk_live_, pk_live_)
- **Environment Variable**: Named `SECRET_KEY` in Netlify (not `STRIPE_SECRET_KEY`)
- **Payment Flow**: Button → Netlify Function → Stripe Checkout → Thank You Page
- **Testing**: Use real cards only (live mode active)

## Recent Issues Fixed
1. Fixed Stripe environment variable name mismatch (`SECRET_KEY` vs `STRIPE_SECRET_KEY`)
2. Moved Stripe initialization inside function for proper env access
3. Added error handling for missing environment variables

## Next Steps
- Set up custom domain DNS if not already done
- Monitor payment transactions in Stripe dashboard
- Consider adding analytics/tracking