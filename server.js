const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Load links from links.json
let links = require('./links.json');

// Redirect endpoint
app.get('/:code', (req, res) => {
  const code = req.params.code;
  const url = links[code];

  if (url) {
    res.redirect(url);
  } else {
    res.status(404).send('Report not found, please reach our 24x7 Round the clock customer care service');
  }
});

// Endpoint to update links.json (for internal use)
app.use(express.json());
app.post('/update-link', (req, res) => {
  const { code, newUrl } = req.body;

  if (code && newUrl) {
    links[code] = newUrl;

    // Save updated links back to links.json
    fs.writeFileSync('./links.json', JSON.stringify(links, null, 2));
    res.send(`Link for "${code}" updated to: ${newUrl}`);
  } else {
    res.status(400).send('Please provide both "code" and "newUrl"');
  }
});

app.listen(PORT, () => {
  console.log(`Gd Diagnostic running at http://localhost:${PORT}`);
});
