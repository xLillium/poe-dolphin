const express = require('express');
const axios = require('axios');
const app = express();

const port = process.env.PORT || 5000;

app.get('/api', async (req, res) => {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://www.pathofexile.com/api/trade/exchange/Crucible',
      headers: {
        'authority': 'www.pathofexile.com',
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.5',
        'content-type': 'application/json',
        'cookie': 'cf_clearance=fBXmiszCq2awVZ9HoNjP8EzZOrDxT58S7d4DR9hSppU-1681067074-0-160; POESESSID=4ef42adc41e392639ea028f4a3040f04',
        'origin': 'https://www.pathofexile.com',
        'referer': 'https://www.pathofexile.com/trade/exchange/Crucible',
        'sec-ch-ua': '"Chromium";v="112", "Brave";v="112", "Not:A-Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'sec-gpc': '1',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
        'x-requested-with': 'XMLHttpRequest',
      },
      data: {
        query: {
          status: {
            option: 'online',
          },
          have: ['chaos'],
          want: ['the-enlightened'],
          minimum: 2,
        },
        sort: {
          have: 'asc',
        },
        engine: 'new',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching data from Path of Exile API');
  }
});

app.listen(port, () => {
  console.log(`Express API listening at http://localhost:${port}`);
});
