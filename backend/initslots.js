const mongoose = require('mongoose');
const SlotModel = require('./models/Slots');

const initializeSlots = async () => {
  try {
    const slot = await SlotModel.findOne();
    if (!slot) {
      await SlotModel.create({ slots: 5 });
      console.log('Slots initialized with 5 slots');
    } else {
      console.log('Slots already initialized');
    }
  } catch (err) {
    console.error('Error initializing slots:', err);
  }
};

// Connect to MongoDB and initialize slots
mongoose.connect('mongodb://localhost:27017/Vigyaan', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    initializeSlots();
  })
  .catch((err) => console.error('Failed to connect to MongoDB', err));
