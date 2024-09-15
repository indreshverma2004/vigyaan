const mongoose = require('mongoose');
const { Schema } = mongoose;

const slotSchema = new Schema({
  slots: Number,
});

const SlotModel = mongoose.model('Slot', slotSchema); // Changed 'slots' to 'Slot' for clarity
module.exports = SlotModel;
