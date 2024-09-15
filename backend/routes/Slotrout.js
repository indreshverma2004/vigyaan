const express = require('express');
const router = express.Router();
const SlotModel = require('../models/Slots');

// Route to get the current number of slots
router.get('/slot', async (req, res) => {
  try {
    const slot = await SlotModel.findOne();
    if (!slot) {
      return res.status(404).json({ success: false, message: 'Slots not found' });
    }
    return res.json({ success: true, slots: slot.slots });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Route to decrement the slot count
router.post('/decrementSlot', async (req, res) => {
  try {
    const slot = await SlotModel.findOne();
    if (!slot || slot.slots <= 0) {
      return res.status(400).json({ success: false, message: 'No available slots to decrement' });
    }

    slot.slots -= 1;
    await slot.save();

    return res.json({ success: true, slotsRemaining: slot.slots });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
