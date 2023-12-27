const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser')

const app = express();
const port = 3000;

// Example state data
const states = [
  {"state": "Lagos", "lat": 6.5244, "lon": 3.3792},
  {"state": "Abuja", "lat": 9.0765, "lon": 7.3986},
  {"state": "Cross River", "lat":  5.8702, "lon": 8.5988},
  {"state": "Istanbul", "lat":  41.0082, "lon": 28.9784},
  {"state": "Kwara", "lat":  8.9669, "lon": 4.3874},
  // Add more states
 
];

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
  try {
    // Fetch weather data for each state
    for (const state of states) {
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${state.lat}&lon=${state.lon}&appid=a2a2f5d4815381d6eb1f18769dfe79e3`);
      // Process the weather data (response.data) and add it to the state object
      state.weather = result.data;
    }

    res.render('index.ejs', { states });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});