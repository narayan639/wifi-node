const express = require('express');
const { execSync } = require('child_process');
const cors=require("cors")

const app = express();
const port = 5000;
app.use(cors())

app.get('/bssid', (req, res) => {
    // Retrieve BSSID of the Wi-Fi network
    const bssid = getWifiBSSID();

    // Compare BSSID with the authorized BSSID
    if (bssid) {
        // Authorized BSSID
        res.send(bssid);
    } else {
        // Unauthorized BSSID
        res.status(403).send('no BSSID.');
    }
});

// Function to retrieve BSSID of the Wi-Fi network
function getWifiBSSID() {
    // Execute command to retrieve Wi-Fi connection information
    const output = execSync('iw dev wlan0 link').toString();
    console.log("o",output)

    // Extract BSSID from the output
    const matches = output.match(/Connected to ([\w:]+)/);
    console.log("m",matches)
    if (matches && matches.length > 1) {
        return matches[1];
    }

    return null;
}

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
