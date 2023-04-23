import React from "react";

const Offer = ({ offer }) => {
  const copyToClipboard = (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  };

  return (
    <div className="offer">
      <p className="offer-text">{offer.chaosPricePerCardMessage}</p>
      <p className="offer-text">{offer.inGameWhisperMessage}</p>
      <button
        className="button"
        onClick={() => copyToClipboard(offer.inGameWhisperMessage)}
      >
        Copy to clipboard
      </button>
    </div>
  );
};

export default Offer;
