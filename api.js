const express = require('express');
const soundcloud = require('./utils/soundcloud');


const router = express.Router();

router.get('/', async (req, res) => {
  const query = 'hucci';
  const tracks = await soundcloud.searchTracks(query);

  res.send(tracks);
});

router.get('/typeahead', async (req, res) => {
  const text = req.query.text;

  const tracks = await soundcloud.searchTracks(text);

  // TODO: Handle case where no tracks are found.

  const tracksFormatted = tracks.map((track) => {
    return {
      title: track.title,
      text: JSON.stringify({
        url: track.permalink_url,
        trackTitle: track.title
      })
    };
  });

  res.send(tracksFormatted);
});

router.get('/resolver', (req, res) => {
  const text = req.query.text;
  const textParsed = JSON.parse(text);

  const url = textParsed.url;
  const trackTitle = textParsed.trackTitle;

  res.send({
    body: `
      Check out my new fav song: <a href="${url}">${trackTitle}</a>.
    `,
    subject: 'My new fav song'
  });
});

module.exports = router;
