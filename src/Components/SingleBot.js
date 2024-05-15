import React from "react";

function SingleBot({ bot, enlistedBots, setEnlistedBots }) {
  const isEnlisted = enlistedBots.some(
    (enlistedBot) => enlistedBot.id === bot.id
  );

  function handleDischarge() {
    if (isEnlisted) {
      const updatedEnlistedBots = enlistedBots.filter(
        (enlistedBot) => enlistedBot.id !== bot.id
      );
      setEnlistedBots(updatedEnlistedBots);
    } else {
      setEnlistedBots([...enlistedBots, bot]);

      fetch(`http://localhost:3000/bots/${bot.id}`, {
        method: "DELETE",
      })
        .then((resp) => {
          // Handle response if needed
        })
        .catch((error) => {
          console.error("Error deleting bot:", error);
        });
    }
  }

  return (
    <div className="single bot-card">
      <h2>{bot.name}</h2>
      <img src={bot.avatar_url} alt="..." />
      <p>Health: {bot.health}</p>
      <p>Damage: {bot.damage}</p>
      <p>Armor: {bot.armor}</p>
      {isEnlisted && (
        <button className="discharge-button" onClick={handleDischarge}>
          X
        </button>
      )}
    </div>
  );
}

export default SingleBot;
