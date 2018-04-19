const express = require('express');
const _ = require('underscore');
const { getTracks } = require('./utils/soundcloud');


const router = express.Router();

router.get('/typeahead', async (req, res) => {
  const { text: query } = req.query;

  // Filter small queries.
  if (query.length < 3) {
    return res.json([{
      title: '<em>Keep typing...</em>',
      text: ''
    }]);
  }

  const tracks = await getTracks(query);

  // Let the user know if there are no results.
  if (_.isEmpty(tracks)) {
    return res.json([{
      title: '<em>(no results)</em>',
      text: ''
    }]);
  }

  const results = tracks.map((track) => {
    return {
      title: `${track.title} (${track.likes_count} likes)`,

      // Sent to /resolve.
      text: JSON.stringify({
        name: track.title,
        url: track.permalink_url
      })
    };
  });

  res.json(results);
});

router.get('/resolver', (req, res) => {
  const { text: trackData } = req.query;
  const { name, url } = JSON.parse(trackData);

  res.send({
    body: `
      Check out <a href="${url}">${name}</a> on SoundCloud!
    `,
    subject: name
  });
});

module.exports = router;
