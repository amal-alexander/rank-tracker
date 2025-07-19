function trackKeywordRanks() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const keywords = sheet.getRange("A5:A104").getValues().flat().filter(k => k); // max 100
  const positions = [];
  const urls = [];

  const config = {
    domain: "domain.com", // change to your domain
    country: "us",                        // e.g. 'us', 'in', etc.
    language: "en",                       // e.g. 'en'
    apiKey: "ADD-API_KEY" // replace with your key
  };

  for (let i = 0; i < keywords.length; i++) {
    const keyword = keywords[i];
    const result = getKeywordPosition(keyword, config);
    positions.push([result.position]);
    urls.push([result.url]);

    Utilities.sleep(1000); // delay to avoid SerpApi rate limits
  }

  sheet.getRange(5, 2, positions.length).setValues(positions); // B column
  sheet.getRange(5, 3, urls.length).setValues(urls);           // C column

  // === METRICS SUMMARY ===
  let ranking = 0;
  let topTen = 0;
  const totalKeywords = positions.length;

  for (let i = 0; i < positions.length; i++) {
    const pos = positions[i][0];
    if (typeof pos === 'number') {
      ranking++;
      if (pos <= 10) topTen++;
    }
  }

  const rankingRate = totalKeywords > 0 ? Math.round((ranking / totalKeywords) * 100) : 0;
  const topTenRate = totalKeywords > 0 ? Math.round((topTen / totalKeywords) * 100) : 0;

  const report = `🎯 SEO KEYWORD TRACKING REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌐 Domain: ${config.domain}
📅 Report Date: ${new Date().toLocaleDateString()}

📊 PERFORMANCE METRICS:
▪️ Total Keywords: ${totalKeywords}
▪️ Keywords Found: ${ranking}
▪️ Found in Top 10: ${topTen}
▪️ Visibility Rate: ${rankingRate}%
▪️ Top 10 Rate: ${topTenRate}%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

  Logger.log(report);

  const reportStartRow = 5 + totalKeywords + 2; // leave space
  sheet.getRange(reportStartRow, 1).setValue(report);
}


function getKeywordPosition(keyword, config) {
  const base = "https://serpapi.com/search.json";
  const params = `?engine=google&q=${encodeURIComponent(keyword)}&hl=${config.language}&gl=${config.country}&num=100&api_key=${config.apiKey}`;
  const url = base + params;

  try {
    const response = UrlFetchApp.fetch(url);
    const json = JSON.parse(response.getContentText());

    const results = json.organic_results || [];
    for (let i = 0; i < results.length; i++) {
      const resultUrl = results[i].link || "";
      if (resultUrl.includes(config.domain)) {
        return { position: i + 1, url: resultUrl };
      }
    }

    return { position: "Not Found", url: "" };
  } catch (e) {
    Logger.log("Error fetching keyword: " + keyword + " — " + e.message);
    return { position: "Error", url: "" };
  }
}
