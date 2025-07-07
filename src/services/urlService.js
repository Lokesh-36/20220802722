const { generateShortCode } = require('../utils/shortCodeGenerator');
const store = {}; // Replace with DB or in-memory store
const clicks = {};

exports.createShortUrl = async (url, validity = 30, shortcode) => {
  const code = shortcode || generateShortCode();

  if (store[code]) {
    throw { statusCode: 400, message: 'Shortcode already exists' };
  }

  const expiry = new Date(Date.now() + validity * 60000).toISOString();
  store[code] = { url, createdAt: new Date().toISOString(), expiry };
  clicks[code] = [];

  return { shortLink: `https://hostname:port/${code}`, expiry };
};

exports.getStats = async (shortcode) => {
  const data = store[shortcode];
  if (!data) {
    throw { statusCode: 404, message: 'Shortcode not found' };
  }

  return {
    url: data.url,
    createdAt: data.createdAt,
    expiry: data.expiry,
    totalClicks: clicks[shortcode].length,
    clicks: clicks[shortcode] // Add timestamp, referrer, geo info in production
  };
};
