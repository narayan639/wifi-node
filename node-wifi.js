const express = require('express');
const app = express();
const wifi = require('node-wifi');
const cors=require('cors')
app.use(cors())

app.get('/bssid', (req, res) => {
  wifi.init({
    iface: null // Use default interface (e.g., wlan0)
  });

  wifi.getCurrentConnections((error, currentConnections) => {
    if (error) {
      console.error('Error getting Wi-Fi info:', error);
      res.status(500).json({ error: 'Error getting Wi-Fi info' });
    } else {
      const bssid = currentConnections && currentConnections.length > 0 ? currentConnections[0].bssid : null;
      res.json({ bssid });
    }
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
