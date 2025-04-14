# PoE Dolphin

<div align="center">
  <img src="frontend/src/poe-dolphin-logo.png" alt="PoE Dolphin Logo" width="250" />
  <h3>A lightweight trade assistant for Path of Exile card traders</h3>
  
  [![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)](https://nodejs.org/)
</div>

## 📖 Overview

PoE Dolphin is a specialized trading tool designed for Path of Exile players looking to efficiently trade The Enlightened divination cards. It automatically fetches and filters trade offers based on your budget, giving you real-time access to the best deals available.

Unlike heavyweight trading companions, PoE Dolphin focuses on doing one thing exceptionally well - helping you maximize your currency when trading for specific high-value cards.

## ✨ Features

- **Real-time Trade Data**: Connects to the official Path of Exile trade API
- **Automatic Price Filtering**: Set your maximum chaos orb budget and see only relevant offers
- **One-Click Trading**: Copy whisper messages to clipboard with a single click
- **Low Resource Usage**: Lightweight application that won't impact your game performance
- **Automatic Refreshing**: Trade data updates every 2 minutes
- **Modern UI**: Clean, dark-themed interface designed for gamers

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/poe-dolphin.git
   cd poe-dolphin
   ```

2. Install server dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd server
   node app.js
   ```

2. In a new terminal, start the frontend:
   ```bash
   cd frontend
   npm start
   ```

3. Access the application at `http://localhost:3000`

## 🛠️ Technology Stack

### Frontend
- React.js
- CSS3 with custom variables
- Fetch API

### Backend
- Node.js
- Express
- In-memory caching

## 🧠 How It Works

1. The backend server connects to Path of Exile's trade API and requests current offers for The Enlightened divination card
2. Results are cached for 2 minutes to respect API rate limits
3. The frontend filters these results based on your maximum chaos orb budget
4. Matching offers are displayed with price per card and ready-to-use whisper messages

## ⚙️ Configuration

### Maximum Chaos Amount

Adjust the "Max Chaos Amount" input to set your trading budget. The application will only show offers that cost at most this amount of chaos orbs per card.


## ⚠️ Disclaimer

PoE Dolphin is not affiliated with or endorsed by Grinding Gear Games.
