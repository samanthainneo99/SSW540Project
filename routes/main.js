const express = require('express');
const router = express.Router();
const data = require('../data/getApi');

router.get('/', async (req, res) => {
  const num = await data.getBookings();
  res.render('availableRooms', {
    numAvailableRooms: num,
  });
});

module.exports = router;
