import React, { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";
import logo from "./poe-dolphin-logo.png";
import Offer from "./components/Offer";

const EXCHANGE_API_URL = `http://localhost:5000/api`;

const App = () => {
  const [matchingOffers, setMatchingOffers] = useState([]);
  const [timeSinceLastRefresh, setTimeSinceLastRefresh] = useState(0);
  const [maxChaosAmount, setMaxChaosAmount] = useState(55);
  const lastRefreshed = useRef(null);

  // Find matching offers
  const findMatchingOffers = useCallback(
    (exchangeResult) => {
      const matchingOffers = [];
      for (const property in exchangeResult) {
        if (Object.hasOwnProperty.call(exchangeResult, property)) {
          const tradeOffer = exchangeResult[property];
          const listing = tradeOffer.listing;
          const offers = listing.offers;
          const matchingOffer = offers.find(
            (offer) =>
              offer.exchange.currency === "chaos" &&
              offer.exchange.amount <= maxChaosAmount
          );
          if (matchingOffer) {
            matchingOffers.push({
              chaosPricePerCardMessage: getChaosPricePerCardMessage(
                matchingOffer.exchange
              ),
              inGameWhisperMessage: getInGameWhisperMessage(
                listing.account.lastCharacterName,
                matchingOffer.exchange,
                matchingOffer.item.stock
              ),
            });
          }
        }
      }
      matchingOffers.sort((a, b) => a.chaosPricePerCard - b.chaosPricePerCard);
      return matchingOffers;
    },
    [maxChaosAmount]
  );

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(EXCHANGE_API_URL);
      if (response.ok) {
        const data = await response.json();
        const exchangeResult = data.result;
        const offers = findMatchingOffers(exchangeResult);
        setMatchingOffers(offers);
        lastRefreshed.current = new Date();
      } else {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.log(error);
    }
  }, [findMatchingOffers]);

  useEffect(() => {
    const updateTimes = () => {
      if (lastRefreshed.current) {
        const now = new Date();
        const secondsSinceLastRefresh = Math.floor(
          (now.getTime() - lastRefreshed.current.getTime()) / 1000
        );
        setTimeSinceLastRefresh(secondsSinceLastRefresh);
      }
    };

    fetchData();
    const dataInterval = setInterval(fetchData, 120000);
    const timeInterval = setInterval(updateTimes, 1000);

    return () => {
      clearInterval(dataInterval);
      clearInterval(timeInterval);
    };
  }, [fetchData]);

  // Format displayed message showing the Chaos orb price per Enlightened card for this trade
  function getChaosPricePerCardMessage(exchange) {
    const chaosPricePerCard = exchange.whisper.replace("{0}", exchange.amount);
    return `Price per card: ${chaosPricePerCard}`;
  }

  // Format displayed message to send an in-game whisper to execute the trade
  function getInGameWhisperMessage(lastCharacterName, exchange, stock) {
    const totalChaosPrice = exchange.amount * stock;
    return `@${lastCharacterName} Hi, I'd like to buy your ${stock} The Enlightened for my ${totalChaosPrice} Chaos Orb in Crucible`;
  }

  const updateMaxChaosAmount = (e) => {
    setMaxChaosAmount(Number(e.target.value));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="PoE-Dolphin Logo" className="logo" />
      </header>
      <main>
        <h1 className="page-title">PoE Dolphin</h1>
        <div className="content">
          <section className="controls-section">
            <div className="controls">
              <div className="max-chaos-input">
                <label htmlFor="max-chaos-amount">Max Chaos Amount:</label>
                <input
                  id="max-chaos-amount"
                  type="number"
                  value={maxChaosAmount}
                  onChange={updateMaxChaosAmount}
                />
              </div>
              {lastRefreshed && (
                <p className="last-update">
                  Last update: {timeSinceLastRefresh} seconds ago.
                </p>
              )}
            </div>
          </section>
          <section className="offers-section">
            {matchingOffers.length > 0 ? (
              matchingOffers.map((offer, index) => (
                <Offer key={index} offer={offer} />
              ))
            ) : (
              <p>No matching trades found.</p>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default App;
