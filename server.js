const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8050;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// ---------------------------------------------------------------------------
// Asset configuration
// ---------------------------------------------------------------------------
const ASSETS = {
  // =========================================================================
  // EQUITY INDICES
  // =========================================================================
  "S&P 500": {
    priceTicker: "SPY",
    volTicker: "^VIX",
    volLabel: "VIX (Implied Vol)",
    priceLabel: "SPY (S&P 500 ETF)",
    description: "CBOE VIX measures 30-day implied volatility of S&P 500 options. The most widely watched fear gauge in financial markets.",
    category: "Equity Indices",
  },
  "Nasdaq 100": {
    priceTicker: "QQQ",
    volTicker: "^VXN",
    volLabel: "VXN (Implied Vol)",
    priceLabel: "QQQ (Nasdaq-100 ETF)",
    description: "CBOE VXN measures 30-day implied volatility of Nasdaq-100 options. Tracks tech-heavy index sentiment.",
    category: "Equity Indices",
  },
  "Russell 2000": {
    priceTicker: "IWM",
    volTicker: "^RVX",
    volLabel: "RVX (Implied Vol)",
    priceLabel: "IWM (Russell 2000 ETF)",
    description: "CBOE RVX measures 30-day implied volatility of Russell 2000 options. Gauge of small-cap risk sentiment.",
    category: "Equity Indices",
  },
  "Dow Jones": {
    priceTicker: "DIA",
    volTicker: null,
    volLabel: "30-Day Realized Vol",
    priceLabel: "DIA (Dow Jones ETF)",
    description: "30-day realized volatility of the Dow Jones Industrial Average ETF.",
    category: "Equity Indices",
  },

  // =========================================================================
  // ENERGY (CME CVOL products)
  // =========================================================================
  "WTI Crude Oil": {
    priceTicker: "CL=F",
    volTicker: "^OVX",
    volLabel: "OVX (Implied Vol)",
    priceLabel: "CL=F (WTI Crude Futures)",
    description: "CME CVOL product. CBOE OVX implied vol shown as proxy. WTI crude oil is the global benchmark for oil pricing.",
    category: "Energy",
  },
  "Natural Gas": {
    priceTicker: "NG=F",
    volTicker: null,
    volLabel: "30-Day Realized Vol",
    priceLabel: "NG=F (Henry Hub Nat Gas Futures)",
    description: "CME CVOL product. Henry Hub natural gas futures — key US energy benchmark. Realized vol calculated from daily returns.",
    category: "Energy",
  },
  "RBOB Gasoline": {
    priceTicker: "RB=F",
    volTicker: null,
    volLabel: "30-Day Realized Vol",
    priceLabel: "RB=F (RBOB Gasoline Futures)",
    description: "CME CVOL product. RBOB gasoline futures — the benchmark for US gasoline prices.",
    category: "Energy",
  },
  "Heating Oil": {
    priceTicker: "HO=F",
    volTicker: null,
    volLabel: "30-Day Realized Vol",
    priceLabel: "HO=F (NY Harbor ULSD Futures)",
    description: "CME CVOL product. NY Harbor ULSD (heating oil/diesel) futures.",
    category: "Energy",
  },

  // =========================================================================
  // AGRICULTURE (CME CVOL products)
  // =========================================================================
  Corn: {
    priceTicker: "ZC=F",
    volTicker: null,
    volLabel: "30-Day Realized Vol",
    priceLabel: "ZC=F (Corn Futures)",
    description: "CME CVOL product. CBOT corn futures — the most actively traded grain contract globally.",
    category: "Agriculture",
  },
  Soybeans: {
    priceTicker: "ZS=F",
    volTicker: null,
    volLabel: "30-Day Realized Vol",
    priceLabel: "ZS=F (Soybean Futures)",
    description: "CME CVOL product. CBOT soybean futures — key global oilseed benchmark.",
    category: "Agriculture",
  },
  Wheat: {
    priceTicker: "ZW=F",
    volTicker: null,
    volLabel: "30-Day Realized Vol",
    priceLabel: "ZW=F (Wheat Futures)",
    description: "CME CVOL product. CBOT soft red winter wheat futures.",
    category: "Agriculture",
  },
  "Soybean Oil": {
    priceTicker: "ZL=F",
    volTicker: null,
    volLabel: "30-Day Realized Vol",
    priceLabel: "ZL=F (Soybean Oil Futures)",
    description: "CME CVOL product. CBOT soybean oil futures — used in food and biofuel production.",
    category: "Agriculture",
  },
  "Soybean Meal": {
    priceTicker: "ZM=F",
    volTicker: null,
    volLabel: "30-Day Realized Vol",
    priceLabel: "ZM=F (Soybean Meal Futures)",
    description: "CME CVOL product. CBOT soybean meal futures — primary animal feed ingredient.",
    category: "Agriculture",
  },
  "Live Cattle": {
    priceTicker: "LE=F",
    volTicker: null,
    volLabel: "30-Day Realized Vol",
    priceLabel: "LE=F (Live Cattle Futures)",
    description: "CME CVOL product. CME live cattle futures — benchmark for beef pricing.",
    category: "Agriculture",
  },
  "Lean Hogs": {
    priceTicker: "HE=F",
    volTicker: null,
    volLabel: "30-Day Realized Vol",
    priceLabel: "HE=F (Lean Hog Futures)",
    description: "CME CVOL product. CME lean hog futures — benchmark for pork pricing.",
    category: "Agriculture",
  },

  // =========================================================================
  // METALS (CME CVOL products)
  // =========================================================================
  Gold: {
    priceTicker: "GC=F",
    volTicker: "^GVZ",
    volLabel: "GVZ (Implied Vol)",
    priceLabel: "GC=F (Gold Futures)",
    description: "CME CVOL product. CBOE GVZ implied vol shown as proxy. COMEX gold futures — the world's safe-haven benchmark.",
    category: "Metals",
  },
  Silver: {
    priceTicker: "SI=F",
    volTicker: "^VXSLV",
    volLabel: "VXSLV (Implied Vol)",
    priceLabel: "SI=F (Silver Futures)",
    description: "CME CVOL product. CBOE VXSLV implied vol shown as proxy. COMEX silver futures.",
    category: "Metals",
  },
  Copper: {
    priceTicker: "HG=F",
    volTicker: null,
    volLabel: "30-Day Realized Vol",
    priceLabel: "HG=F (Copper Futures)",
    description: "CME CVOL product. COMEX copper futures — often called 'Dr. Copper' for its economic sensitivity.",
    category: "Metals",
  },
  Platinum: {
    priceTicker: "PL=F",
    volTicker: null,
    volLabel: "30-Day Realized Vol",
    priceLabel: "PL=F (Platinum Futures)",
    description: "CME CVOL product. NYMEX platinum futures — industrial and precious metal.",
    category: "Metals",
  },

  // =========================================================================
  // INTEREST RATES / TREASURIES (CME CVOL products)
  // =========================================================================
  "10-Year Treasury": {
    priceTicker: "ZN=F",
    volTicker: "^TYVIX",
    volLabel: "TYVIX (Implied Vol)",
    priceLabel: "ZN=F (10-Yr Treasury Futures)",
    description: "CME CVOL product. CBOE TYVIX implied vol shown as proxy. 10-year Treasury note futures — key rate benchmark.",
    category: "Treasuries",
  },
  "30-Year Treasury": {
    priceTicker: "ZB=F",
    volTicker: null,
    volLabel: "30-Day Realized Vol",
    priceLabel: "ZB=F (30-Yr Treasury Futures)",
    description: "CME CVOL product. 30-year Treasury bond futures — long-duration rate benchmark.",
    category: "Treasuries",
  },
  "5-Year Treasury": {
    priceTicker: "ZF=F",
    volTicker: null,
    volLabel: "30-Day Realized Vol",
    priceLabel: "ZF=F (5-Yr Treasury Futures)",
    description: "CME CVOL product. 5-year Treasury note futures — intermediate-term rate benchmark.",
    category: "Treasuries",
  },
  "2-Year Treasury": {
    priceTicker: "ZT=F",
    volTicker: null,
    volLabel: "30-Day Realized Vol",
    priceLabel: "ZT=F (2-Yr Treasury Futures)",
    description: "CME CVOL product. 2-year Treasury note futures — short-term rate expectations.",
    category: "Treasuries",
  },

  // =========================================================================
  // FX / CURRENCIES (CME CVOL G5 products)
  // =========================================================================
  "EUR/USD": {
    priceTicker: "EURUSD=X",
    volTicker: "^EVZ",
    volLabel: "EVZ (Implied Vol)",
    priceLabel: "EUR/USD",
    description: "CME CVOL G5 product. CBOE EVZ implied vol shown as proxy. The world's most traded currency pair.",
    category: "Currencies",
  },
  "GBP/USD": {
    priceTicker: "GBPUSD=X",
    volTicker: null,
    volLabel: "30-Day Realized Vol",
    priceLabel: "GBP/USD",
    description: "CME CVOL G5 product. British pound vs US dollar — 'Cable'.",
    category: "Currencies",
  },
  "USD/JPY": {
    priceTicker: "JPY=X",
    volTicker: null,
    volLabel: "30-Day Realized Vol",
    priceLabel: "USD/JPY",
    description: "CME CVOL G5 product. US dollar vs Japanese yen — major safe-haven pair.",
    category: "Currencies",
  },
  "AUD/USD": {
    priceTicker: "AUDUSD=X",
    volTicker: null,
    volLabel: "30-Day Realized Vol",
    priceLabel: "AUD/USD",
    description: "CME CVOL G5 product. Australian dollar vs US dollar — commodity-linked currency.",
    category: "Currencies",
  },
  "USD/CAD": {
    priceTicker: "CAD=X",
    volTicker: null,
    volLabel: "30-Day Realized Vol",
    priceLabel: "USD/CAD",
    description: "CME CVOL G5 product. US dollar vs Canadian dollar — 'Loonie', oil-correlated.",
    category: "Currencies",
  },

  // =========================================================================
  // CRYPTO
  // =========================================================================
  Bitcoin: {
    priceTicker: "BTC-USD",
    volTicker: null,
    volLabel: "30-Day Realized Vol",
    priceLabel: "BTC-USD",
    description: "30-day realized volatility of Bitcoin, calculated from daily returns and annualized.",
    category: "Crypto",
  },
  Ethereum: {
    priceTicker: "ETH-USD",
    volTicker: null,
    volLabel: "30-Day Realized Vol",
    priceLabel: "ETH-USD",
    description: "30-day realized volatility of Ethereum, calculated from daily returns and annualized.",
    category: "Crypto",
  },
  Solana: {
    priceTicker: "SOL-USD",
    volTicker: null,
    volLabel: "30-Day Realized Vol",
    priceLabel: "SOL-USD",
    description: "30-day realized volatility of Solana, calculated from daily returns and annualized.",
    category: "Crypto",
  },

  // =========================================================================
  // TOP 50 STOCKS (by market cap / popularity)
  // =========================================================================
  Apple: { priceTicker: "AAPL", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "AAPL", description: "Apple Inc. — Consumer electronics, software, and services.", category: "Stocks" },
  Microsoft: { priceTicker: "MSFT", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "MSFT", description: "Microsoft Corp. — Cloud computing, enterprise software, and AI.", category: "Stocks" },
  NVIDIA: { priceTicker: "NVDA", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "NVDA", description: "NVIDIA Corp. — GPU and AI chip leader.", category: "Stocks" },
  Amazon: { priceTicker: "AMZN", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "AMZN", description: "Amazon.com Inc. — E-commerce and cloud computing (AWS).", category: "Stocks" },
  "Alphabet (GOOGL)": { priceTicker: "GOOGL", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "GOOGL", description: "Alphabet Inc. — Google parent, search, cloud, and AI.", category: "Stocks" },
  Meta: { priceTicker: "META", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "META", description: "Meta Platforms Inc. — Social media (Facebook, Instagram) and AR/VR.", category: "Stocks" },
  Tesla: { priceTicker: "TSLA", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "TSLA", description: "Tesla Inc. — Electric vehicles, energy storage, and AI/robotics.", category: "Stocks" },
  "Berkshire Hathaway": { priceTicker: "BRK-B", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "BRK-B", description: "Berkshire Hathaway Inc. — Warren Buffett's diversified conglomerate.", category: "Stocks" },
  Broadcom: { priceTicker: "AVGO", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "AVGO", description: "Broadcom Inc. — Semiconductors and infrastructure software.", category: "Stocks" },
  JPMorgan: { priceTicker: "JPM", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "JPM", description: "JPMorgan Chase & Co. — Largest US bank by assets.", category: "Stocks" },
  "Eli Lilly": { priceTicker: "LLY", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "LLY", description: "Eli Lilly & Co. — Pharma leader (diabetes, obesity, oncology).", category: "Stocks" },
  Visa: { priceTicker: "V", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "V", description: "Visa Inc. — Global payments technology.", category: "Stocks" },
  "UnitedHealth": { priceTicker: "UNH", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "UNH", description: "UnitedHealth Group — Largest US health insurer.", category: "Stocks" },
  Walmart: { priceTicker: "WMT", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "WMT", description: "Walmart Inc. — World's largest retailer.", category: "Stocks" },
  "Exxon Mobil": { priceTicker: "XOM", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "XOM", description: "Exxon Mobil Corp. — Largest US oil and gas company.", category: "Stocks" },
  Mastercard: { priceTicker: "MA", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "MA", description: "Mastercard Inc. — Global payments network.", category: "Stocks" },
  "Procter & Gamble": { priceTicker: "PG", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "PG", description: "Procter & Gamble Co. — Consumer staples giant.", category: "Stocks" },
  "Johnson & Johnson": { priceTicker: "JNJ", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "JNJ", description: "Johnson & Johnson — Diversified healthcare.", category: "Stocks" },
  Costco: { priceTicker: "COST", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "COST", description: "Costco Wholesale Corp. — Membership warehouse retailer.", category: "Stocks" },
  "Home Depot": { priceTicker: "HD", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "HD", description: "Home Depot Inc. — Largest home improvement retailer.", category: "Stocks" },
  Abbvie: { priceTicker: "ABBV", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "ABBV", description: "AbbVie Inc. — Biopharmaceuticals (immunology, oncology).", category: "Stocks" },
  Netflix: { priceTicker: "NFLX", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "NFLX", description: "Netflix Inc. — Streaming entertainment leader.", category: "Stocks" },
  "Bank of America": { priceTicker: "BAC", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "BAC", description: "Bank of America Corp. — Major US commercial bank.", category: "Stocks" },
  Salesforce: { priceTicker: "CRM", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "CRM", description: "Salesforce Inc. — Enterprise CRM and cloud software.", category: "Stocks" },
  AMD: { priceTicker: "AMD", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "AMD", description: "Advanced Micro Devices — CPUs, GPUs, and data center chips.", category: "Stocks" },
  Chevron: { priceTicker: "CVX", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "CVX", description: "Chevron Corp. — Integrated oil and gas major.", category: "Stocks" },
  Adobe: { priceTicker: "ADBE", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "ADBE", description: "Adobe Inc. — Creative and document management software.", category: "Stocks" },
  "Coca-Cola": { priceTicker: "KO", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "KO", description: "Coca-Cola Co. — World's largest beverage company.", category: "Stocks" },
  PepsiCo: { priceTicker: "PEP", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "PEP", description: "PepsiCo Inc. — Beverages and Frito-Lay snacks.", category: "Stocks" },
  Merck: { priceTicker: "MRK", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "MRK", description: "Merck & Co. — Global pharma (Keytruda, vaccines).", category: "Stocks" },
  Intel: { priceTicker: "INTC", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "INTC", description: "Intel Corp. — Semiconductor manufacturing and design.", category: "Stocks" },
  Disney: { priceTicker: "DIS", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "DIS", description: "Walt Disney Co. — Media, entertainment, and theme parks.", category: "Stocks" },
  "Cisco": { priceTicker: "CSCO", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "CSCO", description: "Cisco Systems Inc. — Networking and cybersecurity.", category: "Stocks" },
  Oracle: { priceTicker: "ORCL", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "ORCL", description: "Oracle Corp. — Enterprise database, cloud, and AI infrastructure.", category: "Stocks" },
  "Goldman Sachs": { priceTicker: "GS", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "GS", description: "Goldman Sachs Group — Investment banking and trading.", category: "Stocks" },
  "Morgan Stanley": { priceTicker: "MS", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "MS", description: "Morgan Stanley — Wealth management and investment banking.", category: "Stocks" },
  Pfizer: { priceTicker: "PFE", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "PFE", description: "Pfizer Inc. — Global pharmaceutical company.", category: "Stocks" },
  Nike: { priceTicker: "NKE", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "NKE", description: "Nike Inc. — World's largest athletic footwear and apparel.", category: "Stocks" },
  "McDonald's": { priceTicker: "MCD", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "MCD", description: "McDonald's Corp. — World's largest fast-food chain.", category: "Stocks" },
  Boeing: { priceTicker: "BA", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "BA", description: "Boeing Co. — Aerospace, defense, and commercial aviation.", category: "Stocks" },
  "Caterpillar": { priceTicker: "CAT", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "CAT", description: "Caterpillar Inc. — Construction and mining equipment.", category: "Stocks" },
  "3M": { priceTicker: "MMM", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "MMM", description: "3M Co. — Diversified industrial conglomerate.", category: "Stocks" },
  "American Express": { priceTicker: "AXP", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "AXP", description: "American Express Co. — Premium payments and financial services.", category: "Stocks" },
  Palantir: { priceTicker: "PLTR", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "PLTR", description: "Palantir Technologies — AI and big data analytics for government and enterprise.", category: "Stocks" },
  Uber: { priceTicker: "UBER", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "UBER", description: "Uber Technologies — Ride-sharing and delivery platform.", category: "Stocks" },
  "T-Mobile": { priceTicker: "TMUS", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "TMUS", description: "T-Mobile US — Major wireless carrier.", category: "Stocks" },
  "Wells Fargo": { priceTicker: "WFC", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "WFC", description: "Wells Fargo & Co. — Diversified financial services.", category: "Stocks" },
  "Lockheed Martin": { priceTicker: "LMT", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "LMT", description: "Lockheed Martin Corp. — Aerospace and defense contractor.", category: "Stocks" },
  Starbucks: { priceTicker: "SBUX", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "SBUX", description: "Starbucks Corp. — Global coffeehouse chain.", category: "Stocks" },
  "GameStop": { priceTicker: "GME", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "GME", description: "GameStop Corp. — Video game retailer, meme stock icon.", category: "Stocks" },
  "AMC Entertainment": { priceTicker: "AMC", volTicker: null, volLabel: "30-Day Realized Vol", priceLabel: "AMC", description: "AMC Entertainment — Movie theater chain, meme stock.", category: "Stocks" },
};

// ---------------------------------------------------------------------------
// Yahoo Finance data fetching
// ---------------------------------------------------------------------------
const YahooFinance = require("yahoo-finance2").default;
const yf = new YahooFinance();

async function fetchHistory(ticker, startDate, endDate) {
  try {
    const p1 = startDate instanceof Date ? startDate.toISOString().split("T")[0] : startDate;
    const p2 = endDate instanceof Date ? endDate.toISOString().split("T")[0] : endDate;
    console.log(`Fetching ${ticker} from ${p1} to ${p2}`);

    const result = await yf.chart(ticker, {
      period1: p1,
      period2: p2,
      interval: "1d",
    });

    if (!result || !result.quotes || result.quotes.length === 0) {
      console.log(`No quotes returned for ${ticker}`);
      return [];
    }

    console.log(`Got ${result.quotes.length} quotes for ${ticker}`);
    return result.quotes
      .filter((q) => q.close !== null && q.close !== undefined)
      .map((q) => ({
        date: new Date(q.date).toISOString().split("T")[0],
        close: q.close,
      }));
  } catch (err) {
    console.error(`Error fetching ${ticker}:`, err.message);
    return [];
  }
}

function calcRealizedVol(prices, window = 30) {
  if (prices.length < window + 1) return [];

  // Calculate log returns
  const logReturns = [];
  for (let i = 1; i < prices.length; i++) {
    logReturns.push({
      date: prices[i].date,
      ret: Math.log(prices[i].close / prices[i - 1].close),
    });
  }

  // Rolling std dev, annualized
  const result = [];
  for (let i = window - 1; i < logReturns.length; i++) {
    const slice = logReturns.slice(i - window + 1, i + 1).map((r) => r.ret);
    const mean = slice.reduce((a, b) => a + b, 0) / slice.length;
    const variance =
      slice.reduce((a, b) => a + (b - mean) ** 2, 0) / (slice.length - 1);
    const annualizedVol = Math.sqrt(variance) * Math.sqrt(252) * 100;
    result.push({
      date: logReturns[i].date,
      close: annualizedVol,
    });
  }

  return result;
}

// ---------------------------------------------------------------------------
// API endpoints
// ---------------------------------------------------------------------------

const CATEGORY_ORDER = [
  "Equity Indices", "Stocks", "Energy", "Agriculture",
  "Metals", "Treasuries", "Currencies", "Crypto",
];

app.get("/api/assets", (req, res) => {
  const grouped = {};
  for (const [name, cfg] of Object.entries(ASSETS)) {
    if (!grouped[cfg.category]) grouped[cfg.category] = [];
    grouped[cfg.category].push({
      name,
      priceLabel: cfg.priceLabel,
      volLabel: cfg.volLabel,
      description: cfg.description,
    });
  }
  // Return in defined order
  const ordered = {};
  for (const cat of CATEGORY_ORDER) {
    if (grouped[cat]) ordered[cat] = grouped[cat];
  }
  res.json(ordered);
});

app.get("/api/data/:asset", async (req, res) => {
  const assetName = req.params.asset;
  const days = req.query.days !== undefined ? parseInt(req.query.days) : 365;
  const cfg = ASSETS[assetName];

  if (!cfg) {
    return res.status(404).json({ error: "Asset not found" });
  }

  try {
    const end = new Date();
    const start = new Date();
    // days=0 means "max history" — go back to 1970
    const isMax = days === 0;
    if (isMax) {
      start.setFullYear(1970, 0, 1);
    } else {
      start.setDate(start.getDate() - days - 60); // Extra buffer for rolling calc
    }

    const cutoff = new Date();
    if (isMax) {
      cutoff.setFullYear(1970, 0, 1);
    } else {
      cutoff.setDate(cutoff.getDate() - days);
    }

    // Fetch price data
    const priceData = await fetchHistory(cfg.priceTicker, start, end);
    if (priceData.length === 0) {
      return res.status(500).json({ error: `No price data for ${cfg.priceTicker}` });
    }

    // Fetch or calculate volatility
    let volData = [];
    let volLabel = cfg.volLabel;
    let hasImpliedVol = false;

    if (cfg.volTicker) {
      volData = await fetchHistory(cfg.volTicker, start, end);
      if (volData.length > 0) {
        hasImpliedVol = true;
      }
    }

    // Fall back to realized vol
    if (volData.length === 0) {
      volData = calcRealizedVol(priceData);
      volLabel = "30-Day Realized Vol (Annualized)";
    }

    // Always calculate realized vol for comparison
    const realizedVol = hasImpliedVol ? calcRealizedVol(priceData) : [];

    // Trim to requested window
    const cutoffStr = cutoff.toISOString().split("T")[0];
    const trimmedPrice = priceData.filter((p) => p.date >= cutoffStr);
    const trimmedVol = volData.filter((p) => p.date >= cutoffStr);
    const trimmedRealized = realizedVol.filter((p) => p.date >= cutoffStr);

    // Compute stats
    const latestPrice =
      trimmedPrice.length > 0
        ? trimmedPrice[trimmedPrice.length - 1].close
        : null;
    const firstPrice = trimmedPrice.length > 0 ? trimmedPrice[0].close : null;
    const priceChange =
      latestPrice && firstPrice
        ? ((latestPrice - firstPrice) / firstPrice) * 100
        : 0;

    const latestVol =
      trimmedVol.length > 0
        ? trimmedVol[trimmedVol.length - 1].close
        : null;
    const volValues = trimmedVol.map((v) => v.close).filter((v) => v != null);
    const volHigh = volValues.length > 0 ? Math.max(...volValues) : null;
    const volLow = volValues.length > 0 ? Math.min(...volValues) : null;
    const volMean =
      volValues.length > 0
        ? volValues.reduce((a, b) => a + b, 0) / volValues.length
        : null;
    const volPercentile =
      latestVol && volValues.length > 10
        ? (volValues.filter((v) => v < latestVol).length / volValues.length) *
          100
        : null;

    res.json({
      price: trimmedPrice,
      vol: trimmedVol,
      realizedVol: trimmedRealized,
      volLabel,
      hasImpliedVol,
      priceLabel: cfg.priceLabel,
      description: cfg.description,
      stats: {
        latestPrice,
        latestVol,
        priceChange,
        volHigh,
        volLow,
        volMean,
        volPercentile,
      },
    });
  } catch (err) {
    console.error(`Error for ${assetName}:`, err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------------------------------
// Start server
// ---------------------------------------------------------------------------
// For local development: start the server
// For Vercel: export the app
if (process.env.VERCEL) {
  module.exports = app;
} else {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Volatility Dashboard running at http://localhost:${PORT}`);
  });
}
