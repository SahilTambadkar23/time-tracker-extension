const express = require('express');
const router = express.Router();
const Track = require('../models/Track');

// POST: Save new track data
router.post('/', async (req, res) => {
  const { domain, duration } = req.body;
  const track = new Track({ domain, duration });
  await track.save();
  res.sendStatus(200);
});

// GET: Weekly track data with optional date range filter
router.get('/weekly', async (req, res) => {
  try {
    let { start, end } = req.query;

    let startDate, endDate;

    if (start && end) {
      // If start and end are provided, use them as date filters
      startDate = new Date(start);
      endDate = new Date(end);
    } else {
      // If no start and end, default to last 7 days
      endDate = new Date();
      startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
    }

    const data = await Track.aggregate([
      {
        $match: {
          timestamp: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: "$domain", // Group by domain
          total: { $sum: "$duration" }, // Sum duration for each domain
        },
      },
    ]);

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
