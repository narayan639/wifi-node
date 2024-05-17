const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/bssid', (req, res) => {
  exec("iwlist wlan0 scan | grep 'Address: '", (err, stdout, stderr) => {
    if (err) {
      console.error(`Error: ${err.message}`);
      res.status(500).json({ error: 'Could not retrieve BSSID' });
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      res.status(500).json({ error: 'Could not retrieve BSSID' });
      return;
    }
    
    // Extract BSSID from the output
    const lines = stdout.split('\n');
    const bssidLine = lines.find(line => line.includes('Cell'));
    if (bssidLine) {
      const bssid = bssidLine.trim().split(' ')[4];
      res.json({ bssid });
    } else {
      res.status(500).json({ error: 'Could not retrieve BSSID' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});