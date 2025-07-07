const urlService = require('../services/urlService');

exports.createShortUrl = async (req, res) => {
  try {
    const { url, validity, shortcode } = req.body;
    const result = await urlService.createShortUrl(url, validity, shortcode);
    res.status(201).json(result);
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const shortcode = req.params.shortcode;
    const stats = await urlService.getStats(shortcode);
    res.status(200).json(stats);
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};
 