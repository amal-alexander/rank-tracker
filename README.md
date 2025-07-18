# Rank Tracker

A simple Google Apps Script for tracking keyword rankings in Google Search using the SerpAPI. This script is designed to work within a Google Sheets document and helps you monitor how your keywords are performing for a specific domain.

## Features

- **Bulk Keyword Tracking:** Checks rankings for a list of keywords.
- **Google Sheets Integration:** Reads keywords from your sheet and writes ranking data back.
- **SERP API Integration:** Uses [SerpAPI](https://serpapi.com/) to fetch Google search results.
- **Performance Report:** Automatically generates a summary report of keyword visibility and top 10 presence.

## How It Works

1. **Input:**  
   - List your target keywords in column A (starting from row 5) of your Google Sheet.
2. **Configuration:**  
   - Set your domain, country, language, and SerpAPI API key in the script's `config` object.
3. **Tracking:**  
   - Run the `trackKeywordRanks` function.
   - The script fetches your site's position for each keyword.
   - Results (rank and URL) are written to columns B and C.
   - A performance report is generated below your data.

## Script Overview

- `trackKeywordRanks()`: Main function to process all keywords, update the sheet, and generate the report.
- `getKeywordPosition(keyword, config)`: Fetches the keyword position and result URL from SerpAPI.

## Installation & Setup

1. **Copy the Script:**
   - Open your Google Sheet.
   - Go to **Extensions > Apps Script**.
   - Paste the contents of `rank-tracker.js` into the script editor.

2. **Configure:**
   - In the `config` object:
     - Replace `"domain.com"` with your domain.
     - Set your country and language codes.
     - Add your SerpAPI API key.

3. **Add Keywords:**
   - Starting from cell A5, enter one keyword per row.

4. **Run:**
   - Save the script and click the play ▶️ button to run `trackKeywordRanks`.

## Example Sheet Layout

|   A (Keyword)   |   B (Position)   |   C (URL)   |
|-----------------|-----------------|-------------|
| keyword1        | 3               | https://... |
| keyword2        | Not Found       |             |
| ...             | ...             | ...         |

A summary report will be appended below the data.

## Notes

- **API Key:** Get your free API key from [SerpAPI](https://serpapi.com/).
- **Quota:** The script sleeps 1 second between requests to avoid rate limits.
- **Error Handling:** If a keyword can't be fetched, the script logs an error and continues.

## License

MIT License

## Disclaimer

This tool is for educational and personal use. Be mindful of your API usage and comply with SerpAPI's terms.
