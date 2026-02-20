// Fake companies
let stocks = [
  {name: "BananaTech", price: 100, volatility: 0.02, drift: 0.001},
  {name: "SpaceBread", price: 50, volatility: 0.04, drift: 0.002},
  {name: "DuckCoin", price: 20, volatility: 0.07, drift: 0.003}
];

// Player
let player = {
  cash: 10000,
  portfolio: {}
};

// Update prices
function updatePrices() {
  stocks.forEach(stock => {
    let randomShock = (Math.random() - 0.5) * stock.volatility;
    stock.price *= (1 + stock.drift + randomShock);
  });
}

// Buy
function buy(stockName) {
  let stock = stocks.find(s => s.name === stockName);

  if(player.cash >= stock.price) {
    player.cash -= stock.price;
    player.portfolio[stockName] =
      (player.portfolio[stockName] || 0) + 1;
  }
}

// Sell
function sell(stockName) {
  if(player.portfolio[stockName] > 0) {
    let stock = stocks.find(s => s.name === stockName);

    player.cash += stock.price;
    player.portfolio[stockName]--;
  }
}

// UI
function updateUI() {
  document.getElementById("money").innerHTML =
    "Money: $" + player.cash.toFixed(2);

  let stocksDiv = document.getElementById("stocks");
  stocksDiv.innerHTML = "";

  stocks.forEach(stock => {
    let div = document.createElement("div");
    div.className = "stock";

    div.innerHTML =
      `<h3>${stock.name}</h3>
       Price: $${stock.price.toFixed(2)}<br>
       <button onclick="buy('${stock.name}')">Buy</button>
       <button onclick="sell('${stock.name}')">Sell</button>`;

    stocksDiv.appendChild(div);
  });

  let portfolio = document.getElementById("portfolio");
  portfolio.innerHTML = "";

  for(let s in player.portfolio) {
    portfolio.innerHTML +=
      `${s}: ${player.portfolio[s]} shares<br>`;
  }
}

// Game loop
setInterval(() => {
  updatePrices();
  updateUI();
}, 1000);