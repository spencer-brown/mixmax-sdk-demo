const request = require('request-promise');


// Our SoundCloud App client ID.
const CLIENT_ID = '90802818691006a750c78dbcf1fa9793';

/**
 * GETs a URL like:
 *  
 *  https://api.soundcloud.com/foo?client_id=XYZ&bar=baz
 *
 * @param {String} path - The API path to request.
 * @param {Object} query - Query string parameters.
 *
 * @returns {Promise}
 */
function makeApiCall(path, query) {
  const apiBase = 'https://api.soundcloud.com';
  const url = `${apiBase}/${path}`;

  return request(url, {
    qs: {
      client_id: CLIENT_ID,
      ...query
    },
    json: true
  });
}

function searchTracks(query) {
  return makeApiCall('tracks', {
    q: query
  });
}

module.exports = {
  searchTracks
};
