const request = require('request-promise');


// Our SoundCloud App client ID.
const CLIENT_ID = '90802818691006a750c78dbcf1fa9793';

/**
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

/**
 * @param {String} query - A SoundCloud search query.
 *
 * @returns {Promise}
 */
async function getTracks(query) {
  return makeApiCall('tracks',
    { q: query }
  );
}

module.exports = {
  getTracks
};
