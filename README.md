# Agent Name: "The Sentinel: Intelligent Supply Chain Guardian"

## The Real-World Problem:

Small businesses struggle to track competitor pricing and supply chain disruptions (news, weather, strikes) because they can't afford expensive analysts.

## What Sentinel Agent does:

**Monitors:** The Agent (Kestra) runs every morning.

**Scrapes:** It fetches product prices from 3 competitor websites and "supply chain news" from RSS feeds.

**Reasons (Gemini):** It uses Google Gemini to summarize the news ("Is there a disruption risk?") and compare prices.

**Acts:** If a risk is high, it auto-drafts an email to suppliers. Finally, it pushes a daily report to a public Vercel dashboard.


## Run and deploy the app

This contains everything you need to run the app locally.


## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
