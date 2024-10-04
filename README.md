# GIFIFY

GIFIFY is a React-based web application that allows users to search and view GIFs using the GIPHY API.

## Features

- Search for GIFs
- View trending GIFs
- Responsive layout
- Modal view for full-size GIFs

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/gifify.git
   cd gifify
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables (see Environment Setup section below)

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` (or the port specified by your development server)

## Environment Setup

This project requires a GIPHY API key to function. Follow these steps to set up your environment:

1. Copy the `.env.example` file in the root directory and rename it to `.env`:
   ```
   cp .env.example .env
   ```

2. Open the `.env` file and replace the placeholder values with your actual GIPHY API key:
   ```
   VITE_GIPHY_API_KEY=your_giphy_api_key_here
   VITE_GIPHY_API_URL=https://api.giphy.com/v1
   ```

3. Replace `your_giphy_api_key_here` with your actual GIPHY API key. You can obtain an API key by creating an account at [https://developers.giphy.com/](https://developers.giphy.com/).