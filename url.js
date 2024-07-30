function shortenUrl() {
    const longUrl = document.getElementById('long-url').value;
    // Replace this with your backend API call to shorten the URL
    const shortUrl = 'http://your-api-endpoint/shorten?longUrl=' + encodeURIComponent(longUrl);
  
    // Assuming your API returns the shortened URL
    fetch(shortUrl)
      .then(response => response.json())
      .then(data => {
        document.getElementById('short-url').value = data.shortUrl;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection (replace with your connection string)
mongoose.connect('mongodb://localhost:27017/url_shortener', { useNewUrlParser: true });

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String
});

const Url = mongoose.model('Url', urlSchema);

app.use(bodyParser.json());

app.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  // Generate a short code (e.g., using a random string generator)
  const shortCode = generateShortCode();

  const url = new Url({
    originalUrl: longUrl,
    shortUrl: shortCode
  });

  try {
    await url.save();
    res.json({ shortUrl: `your-domain/${shortCode}` });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error shortening URL');
  }
});

app.get('/:shortCode', async (req, res) => {
  const shortCode = req.params.shortCode;

  try {
    const url = await Url.findOne({ shortUrl: shortCode });
    if (url) {
      res.redirect(url.originalUrl);
    } else {
      res.status(404).send('URL not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching URL');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

  